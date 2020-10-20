import MongoClient from './mongo-client'
import { HospitalBid } from '../model/hospital/bids';
var ObjectID = require('mongodb').ObjectID;
import { environment } from '../../environments/environment';
const DATABASE_NAME = environment.mongodb_databasename;


import express from 'express';
import { authenticateJWT } from './auth-routes';
import PostgreClient from './postgre-client'

export var routes = express.Router();


routes.get('/search-vendors', async (req: any, res: any) => {
  var filter = {};
  console.log('Search Vendors By: ', req.query.location);

  var postgreClient = new PostgreClient()
  await postgreClient.connect();

  var queryString = 'SELECT * FROM vendor ';
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

  if (queryStringConditions.length > 0)
    queryString += ' WHERE ' + queryStringConditions.join('AND')
  queryString += ' LIMIT 100';
  console.log(queryString)

  let result = await postgreClient.client.query(queryString, []);
  let vendors = [];
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
      experience: 'N/A',
      noOfMealsServed: 'N/A'
    })
  });;
  res.json(vendors);
});


routes.all('*', authenticateJWT, async (req: any, res: any, next: any) => {
  // console.log('Hospital-route-interceptor', req.user)
  if (req.user && req.user.role == "PATIENT")
    next();
  else
    return res.status(403).json('Not authorized to access Hospital Routes');

});


routes.get('/available-menu', async (req: any, res: any) => {
  var items = [];

  items = [
    { name: 'Eget porttitor lorem' },
    { name: 'Faucibus porta lacus fringilla vel' },
    { name: 'Integer molestie lorem at massa' },
    { name: 'Facilisis in pretium nisl aliquet' },    
    { name: 'Consectetur adipiscing elit' },
  ]
  res.json(items);
});
