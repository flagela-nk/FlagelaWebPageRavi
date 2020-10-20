
import { formatDate } from './utils'

import express from 'express';
import { authenticateJWT } from './auth-routes';
import PostgreClient from './postgre-client'

import { SearchVendorsRequest, SearchVendorsResponse } from '../model/hospital/search-vendors'

export var routes = express.Router();

// Todo: use to improve performance
// var userHospitalKitchens = { };


(async () => {
  var postgreClient = new PostgreClient()
  await postgreClient.connect();

  /////// search Vendors ///////


  var getSearchVendors = async function (queryParams: SearchVendorsRequest) {
    var queryString = 'SELECT * FROM vendor ';

    var queryStringConditions = [];
    if (queryParams.location) {
      if (Number(queryParams.location))
        queryStringConditions.push(` zipcode = '${queryParams.location}'`);
      else
        queryStringConditions.push(` soundex(city) = soundex('${queryParams.location}')`);
    }
    if (queryParams.name) {

      queryStringConditions.push(` soundex(name) = soundex('${queryParams.name}')`);
    }
    if (queryStringConditions.length > 0)
      queryString += ' WHERE ' + queryStringConditions.join(' AND ')

    queryString += ' LIMIT 100';
    console.log('Hospital Search-Vendors: ', queryString)

    let result = await postgreClient.client.query(queryString, []);
    // await postgreClient.client.end();
    let vendors: any[] = [];
    result.rows.forEach(row => {
      vendors.push({
        id: row.id,
        name: row.name,
        rating: row.avg_rating,
        address: row.address_line1 + (row.address_line2 ? ' ' + row.address_line2 : ''),
        city: row.city,
        state: row.state,
        zipcode: row.zipcode,
        previousClient: 'N/A',
        experience: row.exp_years,
        noOfMealsServed: row.total_meals_served,
        logo_url: row.logo_url
      })
    });

    return vendors;
  }

  var getSearchVendorById = async function (id: string) {
    var queryString = `
SELECT V.* 
FROM vendor AS V
WHERE id = '${id}'
`

    var testimonialQueryString = `
SELECT T.name AS testimonal_name, T.content AS testimonial_content
FROM testimonials AS T
WHERE T.vendor_id = '${id}'
`

  var imagesQueryString = `
SELECT I.image_url AS image_url
FROM images AS I
WHERE I.vendor_id = '${id}'
`

    // console.log('Hospital Search-Vendors-By-Id: ', queryString)

    let result = await postgreClient.client.query(queryString, []);
    let testimonialResult = await postgreClient.client.query(testimonialQueryString, []);
    let imagesResult = await postgreClient.client.query(imagesQueryString, []);
    // console.log(imagesResult.rows)
    // await postgreClient.client.end();
    let vendor: any = null
    result.rows.forEach(row => {
      vendor = {
        id: row.id,
        name: row.name,
        rating: row.avg_rating,
        address: row.address_line1 + (row.address_line2 ? ' ' + row.address_line2 : ''),
        city: row.city,
        state: row.state,
        zipcode: row.zipcode,
        previousClient: 'N/A',
        experience: row.exp_years,
        noOfMealsServed: row.total_meals_served,
        logo_url: row.logo_url,
        testimonials: testimonialResult.rows,
        images: imagesResult.rows?.map(x => x.image_url)
      };
    });

    
    return vendor;
  }

  routes.get('/search-vendors/:id?', async (req: any, res: any) => {
    let queryParams = req.query as SearchVendorsRequest;
    try {
      // console.log('Search Vendors By: ', queryParams);
      var vendors;
      if (req.params.id)
        vendors = await getSearchVendorById(req.params.id);
      else
        vendors = await getSearchVendors(queryParams);
      res.json(vendors);
    } catch (e) {
      console.error('Search Vendors Error: ', queryParams);
      res.status(500).json({ 'message': e.message, queryParams });
    }
  });

  // Validate users with Hopsital role
  routes.all('*', authenticateJWT, async (req: any, res: any, next: any) => {
    // console.log('Hospital-route-interceptor', req.user)
    if (req.user && req.user.role == "HOSPITAL")
      next();
    else
      return res.status(403).json('Not authorized to access Hospital Routes');

  });

  routes.get('/kitchens', async (req: any, res: any) => {
    var kitchens = [];

    // console.log('Kitchens:', req?.user, req?.user?.userId)
    var result = await postgreClient.client.query(
      `
      SELECT * FROM kitchen
      WHERE hospital_id IN (SELECT hospital_id FROM nn_user_hospital_relationship
        WHERE user_id = '${req.user.userId}')
      `
    )
    kitchens = result.rows;
    res.json(kitchens);
  });

  routes.get('/user-hospitals', async (req: any, res: any) => {
    // console.log('staff-health for user', req.user);
    var result = await postgreClient.client.query(
      `
      SELECT nn.hospital_id AS id, H.name 
      FROM nn_user_hospital_relationship AS nn
      LEFT JOIN hospital AS H ON H.id = nn.hospital_id
      WHERE user_id = '${req.user.userId}'
      GROUP BY  nn.hospital_id, name
      `
    )
    // console.log('user-hospitals:', result.rows);
    res.json(result.rows);
  });

  routes.get('/checklist', async (req: any, res: any) => {
    var items = [];

    // console.log('checklist for hospital-user', req.user);
    var checklist_items = await postgreClient.client.query(
      `
      SELECT * 
      FROM checklist
      WHERE kitchen_id IN (	SELECT id 
                   FROM kitchen
                    WHERE hospital_id IN (	SELECT hospital_id 
                                FROM nn_user_hospital_relationship
                                    WHERE user_id = '${req.user.userId}'))
                 `
    );
    // await postgreClient.client.end();

    checklist_items.rows.forEach(element => {
      items.push({
        name: element.item
      })
    });

    // console.log('hospital-checklist-items:', items);
    res.json(items);
  });

  routes.get('/todays-menu', async (req: any, res: any) => {
    var items = [];

    console.log("today's menu for hospital-user", req.user);
    var checklist_items = await postgreClient.client.query(
      `
      SELECT * 
      FROM kitchen_menu
      WHERE kitchen_id IN (	SELECT id 
                   FROM kitchen
                    WHERE hospital_id IN (	SELECT hospital_id 
                                FROM nn_user_hospital_relationship
                                    WHERE user_id = '${req.user.userId}'))
                 `
    );

    // console.log('hospital-checklist-items:', items);
    res.json(checklist_items.rows);
  });

  routes.get('/staff', async (req: any, res: any) => {
    console.log("staff members for hospital-user", req.user);
    var checklist_items = await postgreClient.client.query(
      `
      SELECT * 
      FROM staff WHERE id IN ( 
        SELECT staff_id 
        FROM nn_staff_kitchen_relationship
        WHERE kitchen_id IN (	SELECT id 
                    FROM kitchen
                      WHERE hospital_id IN (	SELECT hospital_id 
                                  FROM nn_user_hospital_relationship
                                      WHERE user_id = '${req.user.userId}')))
                 `
    );

    // console.log('hospital-checklist-items:', items);
    res.json(checklist_items.rows);
  });

  routes.post('/staff', async (req: any, res: any) => {
    console.log("create staff member from hospital-user", req.user, req.body);
    try {
      var staff_member = await postgreClient.createRecord('staff', req.body);

      // console.log('hospital-checklist-items:', items);
      res.json(staff_member);
    } catch (e) {
      res.status(500).json({ 'message': e.message });
    }
  });

  routes.get('/staff-health', async (req: any, res: any) => {

    console.log('staff-health for user', req.user);
    var staff_health = await postgreClient.client.query(

      `
      SELECT SHI.*, S.first_name AS first_name, S.last_name AS last_name 
      FROM staff_health_issue AS SHI
      LEFT JOIN staff AS S ON S.id = SHI.staff_id
  WHERE staff_id IN ( SELECT staff_id FROM nn_staff_kitchen_relationship
   WHERE kitchen_id IN (select id from kitchen
            WHERE hospital_id IN (SELECT hospital_id FROM nn_user_hospital_relationship
              WHERE user_id = '${req.user.userId}')))
                 `
      // `SELECT * FROM public.get_hospital_staff_health WHERE user_id = '${req.user.userId}'`
    )
    console.log('hospital-staff-health:', staff_health.rows);
    res.json(staff_health.rows);
  });


  routes.get('/ratings', async (req: any, res: any) => {
    var ratings = [];

    ratings = [
      { name: 'Food satisfaction', rating: 5 },
      { name: 'Service satisfaction', rating: 0 },
      { name: 'Hygiene standard', rating: 4 },
    ]
    res.json(ratings);
  });


  routes.get('/testimonials', async (req: any, res: any) => {
    var testimonials = [];
    var result = await postgreClient.client.query(
      `
      SELECT T.* 
      FROM testimonials AS T    
  WHERE vendor_id  IN (select vendor_id from kitchen
            WHERE hospital_id IN (SELECT hospital_id FROM nn_user_hospital_relationship
              WHERE user_id = '${req.user.userId}'))
                 `
    )

    testimonials = result.rows;

    res.json(testimonials);
  });


  routes.get('/feedback', async (req: any, res: any) => {
    var feedback = [];

    var result = await postgreClient.client.query(
      `
      SELECT F.* , K.name AS kitchen_name
      FROM feedback AS F   
      LEFT JOIN kitchen AS K ON K.id = F.kitchen_id
  WHERE F.vendor_id IN (select vendor_id from kitchen
            WHERE hospital_id IN (SELECT hospital_id FROM nn_user_hospital_relationship
              WHERE user_id = '${req.user.userId}'))
                 `
    )

    feedback = result.rows;

    res.json(feedback);
  });

  routes.get('/inventory/:kitchenId', async (req: any, res: any) => {


    var result = await postgreClient.client.query(
      `
      SELECT * 
      FROM inventory
      WHERE kitchen_id  = '${req.params.kitchenId}'
      LIMIT 3
      `
    )

    console.log('inventory: ', result.rows);

    res.json(result.rows);
  });

  routes.get('/purchase_summary/:kitchenId', async (req: any, res: any) => {

    var purchasePeriod = "purchase_date = '" + formatDate(new Date()) + "'"
    if (req.query.period && req.query.period != "TODAY") {
      var date = new Date();
      let startDate: Date
      let endDate: Date
      if (req.query.period == 'THIS_WEEK') {
        startDate = new Date(date.setDate(date.getDate() - date.getDay()));
        endDate = new Date(date.setDate(date.getDate() - date.getDay() + 6));
        // purchasePeriod = "purchase_date BETWEEN '" + formatDate(startDate) + "' AND '" + formatDate(endDate) + "'"
      }
      else if (req.query.period == 'THIS_MONTH') {
        startDate = new Date(date.getFullYear(), date.getMonth(), 1);
        endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      }
      else if (req.query.period == 'THIS_YEAR') {
        startDate = new Date(date.getFullYear(), 0, 1);
        endDate = new Date(date.getFullYear(), 11, 31);
      }
      purchasePeriod = "purchase_date BETWEEN '" + formatDate(startDate) + "' AND '" + formatDate(endDate) + "'"
    }
    // console.log('purchase_summary_period_query:', purchasePeriod);

    var result = await postgreClient.client.query(
      `
      SELECT * 
      FROM purchase_summary
      WHERE kitchen_id  = '${req.params.kitchenId}'
      AND  ` + purchasePeriod
    )

    var summary = result.rows;
    var output = {
      totalMealsOrdered: summary.length > 0 ? summary.map(a => Number(a.order_count)).reduce((a, b) => a + b) : 0,
      totalPurchasesAmount: summary.length > 0 ? summary.map(a => Number(a.amount)).reduce((a, b) => a + b) : 0
    }

    // console.log('purchase_summary: ', req.query, summary, output);

    res.json(output);
  });



  routes.get('/factsheet', async (req: any, res: any) => {

    var result = await postgreClient.client.query(
      `
    SELECT F.*, H.name as hospital_name 
    FROM factsheet AS F
    LEFT JOIN hospital AS H on H.id = F.hospital_id
    WHERE hospital_id IN (SELECT hospital_id FROM nn_user_hospital_relationship
      WHERE user_id = '${req.user.userId}')
    `
    )

    console.log('factsheets: ', result.rows);
    res.json(result.rows);
  });

  routes.post('/factsheet/create', async (req: any, res: any) => {
    var factsheet = req.body;

    factsheet["menu_attached"] = factsheet["menu_attached"] ? 1 : 0;

    // console.log('Creating factsheet: ', req.body);
    var result = await postgreClient.createRecord('factsheet', factsheet);

    console.log('Created factsheet: ', result);

    res.json(result);
  });


  routes.post('/factsheet/update', async (req: any, res: any) => {
    var factsheet = req.body;

    factsheet["menu_attached"] = factsheet["menu_attached"] ? 1 : 0;
    // console.log('Updating factsheet: ', req.body);
    var result = await postgreClient.updateRecordById('factsheet', factsheet, factsheet["id"]);

    console.log('Updated factsheet: ', result);
    res.json(result);
  });


  //  Factsheet Bids //
  routes.get('/bids', async (req: any, res: any) => {

    var result = await postgreClient.client.query(
      `
    SELECT B.* , H.name AS hospital_name, F.name AS factsheet_name
    FROM hospital_bid AS B
    LEFT JOIN hospital AS H on H.id = B.hospital_id
    LEFT JOIN factsheet AS F on F.id = B.factsheet_id
    WHERE B.hospital_id IN (SELECT hospital_id FROM nn_user_hospital_relationship
      WHERE user_id = '${req.user.userId}')
    `
    )
    console.log('factsheet-bids: ', result.rows);

    res.json(result.rows);
  });

  routes.post('/bids/create', async (req: any, res: any) => {
    var bid = req.body;
    // console.log('Creating factsheet: ', req.body);
    var result = await postgreClient.createRecord('hospital_bid', bid);
    console.log('Created hospital_bid: ', result);
    res.json(result);
  });

})();







/************** Factsheets **********************/



/*

routes.get('/vendors', async (req: any, res: any) => {
  var filter = {};
  console.log('Search Vendors By: ', req.query.searchby);
  var regexValue = new RegExp(["^", req.query.searchby, "$"].join(""), "i")
  filter = {
    $or: [
      { name: regexValue },
      { city: regexValue },
      { county: regexValue },
      { zip: regexValue }
    ]
  };

  let client = new MongoClient(DATABASE_NAME);
  var vendors = await client.getRecords('vendor', filter);
  res.json(vendors);
});

routes.post('/vendors', async (req: any, res: any) => {
  let client = new MongoClient(DATABASE_NAME);
  var vendors = await client.getRecords('vendor', {});
  res.json(vendors);
});

// Create Hospital
routes.post('/create', async (req: any, res: any) => {
  let client = new MongoClient(DATABASE_NAME);

  let hospitalObj = req.body;
  // validate hospital Id

  var hospitalObjResponse = await client.createRecord('hospital', hospitalObj);

  res.json(hospitalObjResponse);
});


routes.post('/bids/upsert', async (req: any, res: any) => {
  let client = new MongoClient(DATABASE_NAME);

  console.log(req.body)
  let bidObj: HospitalBid = req.body;
  // validate hospital Id
  bidObj['hospitalId'] = ObjectID(bidObj['hospitalId']);

  var bid ;
  if(bidObj['_id'])
  bid = await client.updateRecord('hospital_bid', bidObj);
  else
  bid = await client.createRecord('hospital_bid', bidObj);

  res.json(bid);
});

routes.get('/bids/:hospitalId', async (req: any, res: any) => {
  let client = new MongoClient(DATABASE_NAME);
  var hospitalId = req.params.hospitalId

  var bids = (await client.getRecords('hospital_bid', { hospitalId })) as HospitalBid[];

  res.json(bids);
});

routes.get('/bids-user/:userId', async (req: any, res: any) => {
  let client = new MongoClient(DATABASE_NAME);
  var userId = req.params.userId

  var nnHospitalUser = await getAssociatedHospitals(userId);
  // console.log('NN-User-Hospitals', userId, nnHospitalUser);
  var bids = [];

  if(nnHospitalUser){
    for(var i=0; i<nnHospitalUser.length; i++){
      console.log('User-Hospitals',  nnHospitalUser[i]);
      var hospitalId = ObjectID( nnHospitalUser[i]['hospitalId']);
      var hospitalBids = (await client.getRecords('hospital_bid', { hospitalId : hospitalId }))  as HospitalBid[];
      console.log('User-Hospitals-Results', hospitalBids);
      bids = bids.concat(hospitalBids);
    }

  }
  console.log('User-Hospital-Bids', userId, bids);

  res.json(bids);
});

routes.get('/userhospitals/:userId', async (req: any, res: any) => {
  var userId = req.params.userId

  var nnHospitalUser = await getAssociatedHospitals(userId);
  console.log('NN-User-Hospitals', userId, nnHospitalUser)
  res.json(nnHospitalUser);
});


*/

/* Dummy Data */

/*

  /*
  items = [
    { name: 'Lorem ipsum dolor sit amet' },
    { name: 'Consectetur adipiscing elit' },
    { name: 'Integer molestie lorem at massa' },
    { name: 'Facilisis in pretium nisl aliquet' },
    {
      name: 'Nulla volutpat aliquam velit',
      subItems: [
        { name: 'Phasellus iaculis neque' },
        { name: 'Purus sodales ultricies' },
        { name: 'Vestibulum laoreet porttitor sem' },
        { name: 'Ac tristique libero volutpat at' },
      ]
    },
    { name: 'Faucibus porta lacus fringilla vel' },
  ]*/
