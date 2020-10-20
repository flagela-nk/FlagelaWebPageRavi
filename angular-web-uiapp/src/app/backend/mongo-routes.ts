import express from 'express';

export var routes = express.Router();

const DATABASE_NAME = 'FlagelaDev'

/*
import MongoClient from './mongo-client';
routes.get('/getAllCollections', async (req:any, res:any) => {

    // console.log('Get all Collections: ', req.params.dbName);

    var client = await new MongoClient(DATABASE_NAME)
    var results = await client.getAllCollections();
    res.json(results);

});

routes.get('/getAllCollectionNames', async (req:any, res:any) => {

    var client = await new MongoClient(DATABASE_NAME)
    var collections = await client.getAllCollections();
    var results = collections.map(item => item.name)
    res.json(results);

});


routes.get('/:collectionName/retrieveAll', async (req:any, res:any) => {

    var client = await new MongoClient(DATABASE_NAME)
    var results = await client.getRecords(req.params.collectionName);
    res.json(results);

});

routes.get('/:collectionName/:id', async (req:any, res:any) => {

    var client = await new MongoClient(DATABASE_NAME)
    var results = await client.getRecordById(req.params.collectionName, req.params.id);
    console.log('getRecordById', req.params, results);
    res.json(results);

});


routes.post('/:collectionName/create', async (req:any, res:any) => {

    console.log('Create Collection: ', req.params.collectionName);

    var client = await new MongoClient(DATABASE_NAME)
    var results = await client.createRecord(req.params.collectionName, req.body);
    res.json(results);

});

*/