var ObjectID = require('mongodb').ObjectID;
const mongoClient = require('mongodb').MongoClient;
import { environment } from '../../environments/environment';

/*

const DEFAULT_LIMIT = 100
const mongodb_url = environment.mongodb_url

export default class MongoClient {
  dbName: string
  _client: any = null;

  async getDbo() {
    if (!this._client)
      this._client = await mongoClient.connect(mongodb_url, { useUnifiedTopology: true })
        .catch(function (err: any) { console.error(err); });
    if (!this._client)
      throw 'Mongo Client not connected';
    let dbo = this._client.db(this.dbName);
    if (dbo)
      return dbo;
    else
      throw 'Database ' + this.dbName + ' not connected';
  }

  async getCollection(collectionName: string) {
    const dbo = await this.getDbo();
    let collection = dbo.collection(collectionName);
    if (collection)
      return collection;
    else
      throw 'Collection ' + collectionName + ' not found';
  }

  constructor(dbName: string) {
    if (!dbName)
      throw 'Database name cannot be empty'
    this.dbName = dbName;
  }

  async getAllCollections() {
    const dbo = await this.getDbo();
    try {
      let collectionsObj = dbo.listCollections();
      let collections = await collectionsObj.toArray();
      return collections;

    } catch (error) {
      throw 'Cannot connect to client';
    }
  }

  async getRecords(collectionName: string, query?: any) {

    const dbo = await this.getDbo();
    let collection = dbo.collection(collectionName);
    let res = await collection.find(query).limit(DEFAULT_LIMIT);
    let results = await res.toArray();

    return results;
  }

  async getRecordById(collectionName: string, id: any) {

    const dbo = await this.getDbo();
    let collection = dbo.collection(collectionName);
    let result = await collection.findOne({ _id: id });

    return result;
  }

  async getRecord(collectionName: string, query: any) {

    const dbo = await this.getDbo();
    let collection = dbo.collection(collectionName);
    let result = await collection.findOne(query);

    return result;
  }

  async hasRecords(collectionName: string, query: any) {

    const dbo = await this.getDbo();
    let collection = dbo.collection(collectionName);

    let results = await collection.count(query);
    if (results > 0)
      return true;
    else
      return false;
  }

  async createRecord(collectionName: string, data: any) {

    const dbo = await this.getDbo();
    let collection = dbo.collection(collectionName);

    delete data['_id'];
    let res = await collection.insertOne(data);
    console.log('Created Record:', res.ops[0]);
    return res.ops[0];
  }

  async patchRecord(collectionName: string, data: any) {

    const dbo = await this.getDbo();
    let collection = dbo.collection(collectionName);

    let filter;
    if (data._id) {
      filter = { _id: ObjectID(data._id) };
      delete data['_id'];
    }
    else throw 'Id not Found in data';

    let res = await collection.updateOne(filter, { $set: data });
    res = await collection.findOne(res._id);
    return res;
  }

  async updateRecord(collectionName: string, data: any) {

    const dbo = await this.getDbo();
    let collection = dbo.collection(collectionName);

    let filter;
    if (data._id) {
      filter = { _id: ObjectID(data._id) };
      delete data['_id'];
    }
    else throw 'Id not Found in data';

    let res = await collection.findOneAndReplace(filter, data);

    // console.log('UpdatedRecord(Before):', res)
    res = await collection.findOne(filter._id);
    // console.log('UpdatedRecord (After):', res)
    return res;
  }

  async deleteRecord(collectionName: string, id: string) {

    const dbo = await this.getDbo();
    let collection = dbo.collection(collectionName);

    let res = await collection.deleteOne({ "_id": ObjectID(id) });
    return true;
  }

  async deleteRecords(collectionName: string, query: any | boolean) {

    const dbo = await this.getDbo();
    let collection = dbo.collection(collectionName);

    let res = await collection.deleteMany(query);
    // console.log('MongoDB-Delete', res.deletedCount);
    return res.deletedCount;
  }

  async dropCollection(collectionName: string) {
    const dbo = await this.getDbo();
    let result = await dbo.dropCollection(collectionName);
    console.log("Collection " + collectionName + " dropped!");
    return true;
  }

  // Data fields
  async removeFieldToAllDocuments(collectionName: string, fieldName: string) {

    const dbo = await this.getDbo();
    let collection = dbo.collection(collectionName);

    let template: any = {};
    template[fieldName] = { '$exists': true };

    let obj: any = {}
    obj[fieldName] = "";
    var data = { $unset: obj }

    collection.updateMany(template, data, (err: any, collection: any) => {
      if (err) throw err;
    });

    return collection;
  }

  async addFieldToAllDocuments(collectionName: string, fieldName: string, defaultValue?: any) {


    const dbo = await this.getDbo();
    let collection = dbo.collection(collectionName);

    let template: any = {};
    template[fieldName] = { '$exists': false };
    let obj: any = {}
    obj[fieldName] = defaultValue;
    var data = { $set: obj }

    await collection.updateMany(template, data, (err: any, collection: any) => {
      if (err) throw err;
      console.log('Modified Count: ', collection.modifiedCount);
    });

    return collection;
  }



}
*/