import {MongoClient, ServerApiVersion} from "mongodb";
import {MongoDatabase, MONGODB_URI} from "./config.mjs";

const appMongoClient = new MongoClient(process.env.MONGODB_URI ?? MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

class AppMongoDB {
  constructor() {
    this.dbName = MongoDatabase.App;
    this.client = new MongoClient(process.env.MONGODB_URI ?? MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  async close() {
    try {
      await this.client.close();
    } catch (error) {
      console.error('Error closing MongoDB connection:', error);
      throw error;
    }
  }

  async testConnection() {
    try {
      await this.client.connect();
      await appMongoClient.db("admin").command({ping: 1});
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    } finally {
      await appMongoClient.close();
    }
  }
}

async function checkConnectionMongoDB() {
    const appMongoClient = new AppMongoDB();
    await appMongoClient.testConnection();
}

export {
  checkConnectionMongoDB,
  AppMongoDB,
};