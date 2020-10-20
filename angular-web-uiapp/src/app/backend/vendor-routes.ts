import express from 'express';
import MongoClient from './mongo-client'
import { authenticateJWT } from './auth-routes';
var ObjectID = require('mongodb').ObjectID;
import { environment } from '../../environments/environment';
const DATABASE_NAME = environment.mongodb_databasename;

import PostgreClient from './postgre-client';

export var routes = express.Router();


routes.get('/search-hospitals', async (req: any, res: any) => {
  var filter = {};
  console.log('Search Hospitals By: ', req.query.location);

  var postgreClient = new PostgreClient()
  await postgreClient.connect();

  var queryString = 'SELECT * FROM hospital ';
  var queryStringConditions = [];

  if (req.query.location) {
    if (Number(req.query.location))
      queryStringConditions.push(` zipcode = '${req.query.location}'`);
    else
      queryStringConditions.push(` soundex(city) = soundex('${req.query.location}')`);
  }
  if (req.query.name) {
    queryStringConditions.push(` soundex(name) = soundex('${req.query.name}')`);
  }
  if (req.query.minBedCapacity) {
    queryStringConditions.push(` bed_capacity >= ${req.query.minBedCapacity}`);
  }

  if (queryStringConditions.length > 0)
    queryString += ' WHERE ' + queryStringConditions.join('AND')

  queryString += ' LIMIT 100';
  console.log(queryString)

  let result = await postgreClient.client.query(queryString, []);
  let hospitals = [];
  result.rows.forEach(row => {
    hospitals.push({
      id: row.id,
      name: row.name,
      bedCapacity: row.bed_capacity,
      address: row.address_line1 + (row.address_line2 ? ' ' + row.address_line2 : ''),
      city: row.city,
      state: row.state,
      zipcode: row.zipcode,
    })
  });

  await postgreClient.client.end();
  res.json(hospitals);
});


routes.all('*', authenticateJWT, async (req: any, res: any, next: any) => {
  if (req.user && req.user.role == "VENDOR")
    next();
  else
    return res.status(403).json('Not authorized to access Vendor Routes');

});


routes.get('/associated-vendors', async (req: any, res: any) => {
  console.log('Accociated Vendors', req.user);


  var postgreClient = new PostgreClient()
  await postgreClient.connect();
  let result = await postgreClient.client.query(`SELECT v.* FROM nn_user_vendor_relationship AS nn
  LEFT JOIN vendor AS v on v.id = nn.vendor_id
  WHERE user_id = $1::uuid`, [req.user.userId]);

  return res.json(result.rows);
});



routes.post('/update', async (req: any, res: any) => {
  console.log('Update Vendor By Id', req.body);


  var postgreClient = new PostgreClient()
  await postgreClient.connect();
  let result = await postgreClient.updateRecordById('vendor', req.body);

  /*{   
    id: req.body.id, 
    address_line1: req.body.address_line1,
    address_line2: req.body.address_line2,
    address_line3: req.body.address_line3,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    zipcode: req.body.zipcode,
    cuisines: req.body.cuisines
  })*/

  return res.json(result);
});

//Todo: Deprecated  staff related to all the hospitals
routes.get('/staff', async (req: any, res: any) => {
  var filter = {};


  let client = new MongoClient(DATABASE_NAME);
  var hospitals = await client.getRecords('staff', filter);
  res.json(hospitals);
});

// Todo: Deprecated Staff Begin
routes.post('/staff/create', async (req: any, res: any) => {

  var data = req.body;

  var postgreClient = new PostgreClient()
  await postgreClient.connect();

  console.log('Creating new staff member', data);

  var staff_record = {
    first_name: data['firstName'],
    last_name: data['lastName'],
    email: data['email'],
    phone: data['phone'],
    role: data['role']
  }

  var staff = await postgreClient.createRecord('staff', staff_record);
  var nn_relationship_hospital_staff =
    await postgreClient.createRecord('nn_relationship_hospital_staff',
      {
        staff_id: staff.id,
        hospital_id: data['hospitalId']
      });


  res.json(staff);
});

// Todo: Deprecated create staff health issue
routes.post('/staff_health', async (req: any, res: any) => {

  var data = req.body;

  var postgreClient = new PostgreClient()
  await postgreClient.connect();

  console.log('Creating new staff health issue', data);

  let staff_health: any = {
    staff_id: data['staffId'],
    reason: data['reason']
  }

  staff_health = await postgreClient.createRecord('staff_health_issues', staff_health);
  res.json(staff_health.rows[0]);
});

// Todo: Retrieve Deprecated
routes.get('/staff_health', async (req: any, res: any) => {

  var postgreClient = new PostgreClient()
  await postgreClient.connect();


  console.log('checklist for user', req.user);
  var checklist_items = await postgreClient.client.query(
    `
    SELECT * FROM staff_health_issues
WHERE staff_id IN (select staff_id from nn_relationship_staff_vendor
				  WHERE vendor_id IN (SELECT vendor_id FROM nn_relationship_user_vendor
            WHERE user_id = '${req.user.userId}'))
               `
  )

  res.json(checklist_items.rows);
});


routes.get('/staff-health', async (req: any, res: any) => {

  var postgreClient = new PostgreClient()
  await postgreClient.connect();


  console.log('staff-health for user', req.user);
  var staff_health = await postgreClient.client.query(
    `
SELECT SHI.*, S.first_name AS first_name, S.last_name AS last_name 
FROM staff_health_issue AS SHI
LEFT JOIN staff AS S ON S.id = SHI.staff_id
WHERE staff_id IN ( SELECT staff_id FROM nn_staff_kitchen_relationship
  WHERE kitchen_id IN ( select id FROM kitchen
    WHERE vendor_id IN ( SELECT vendor_id FROM nn_user_vendor_relationship
      WHERE user_id = '${req.user.userId}')))
                `
  )
  console.log('vendor-staff-health:', staff_health.rows);
  res.json(staff_health.rows);
});

// Staff END

routes.get('/checklist', async (req: any, res: any) => {

  var postgreClient = new PostgreClient()
  await postgreClient.connect();

var query = `
SELECT * 
FROM checklist
WHERE kitchen_id IN (	SELECT id 
             FROM kitchen
              WHERE vendor_id IN (	SELECT vendor_id 
                          FROM nn_user_vendor_relationship
                              WHERE user_id = '${req.user.userId}'))
           `;
  console.log('Vendor checklist for user', req.user, query);

  var checklist_items = await postgreClient.client.query(query);

  res.json(checklist_items.rows);
});