import {AppMongoDB} from "../db/mongo.mjs";
import {MongoCollection} from "../db/config.mjs";
import {ObjectId} from "mongodb";

export const HistoryCallModel = {
  async getHistoryCall() {
    const appMongoDB = new AppMongoDB();
    try {
      console.log('getting all history calls');
      await appMongoDB.connect();
      const collection = appMongoDB.db.collection(MongoCollection.CallHistory);

      const historyCalls = await collection.find({}).toArray();
      console.log('got all history calls:', historyCalls);
      return historyCalls;
    } catch (err) {
      console.error('Error getting all history calls:', err);
      throw err;
    } finally {
      await appMongoDB.close();
    }
  },

  async addHistoryCall(phoneNumber, timestamp) {
    const appMongoDB = new AppMongoDB();
    try {
      const historyCall = {
        phoneNumber,
        timestamp
      };
      console.log('adding history call:', historyCall);
      await appMongoDB.connect();
      const collection = appMongoDB.db.collection(MongoCollection.CallHistory);

      await collection.insertOne(historyCall);
      console.log('history call added:', historyCall);
    } catch (err) {
      console.error('Error add history call:', err);
      throw err;
    } finally {
      await appMongoDB.close();
    }
  },

  async deleteHistoryCall(id) {
    const appMongoDB = new AppMongoDB();
    try {
      console.log('deleting history call:', id);
      await appMongoDB.connect();
      const collection = appMongoDB.db.collection(MongoCollection.CallHistory);
      const filter = { _id: new ObjectId(id) };
      const result = await collection.deleteOne(filter);

      if (result.deletedCount === 1) {
        console.log('history call deleted:', id);
      } else {
        console.log('history not found or already deleted');
      }
    } catch (err) {
      console.error('Error delete history call:', err);
      throw err;
    } finally {
      await appMongoDB.close();
    }
  }
}