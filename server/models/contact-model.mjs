import {AppMongoDB} from "../db/mongo.mjs";
import {MongoCollection} from "../db/config.mjs";
import {ObjectId} from "mongodb";

export const ContactModel = {
  async getContact() {
    const appMongoDB = new AppMongoDB();
    try {
      console.log('getting all contacts');
      await appMongoDB.connect();
      const collection = appMongoDB.db.collection(MongoCollection.Contact);

      const contacts = await collection.find({}).toArray();
      console.log('got all contacts:', contacts);
      return contacts;
    } catch (err) {
      console.error('Error getting all contacts:', err);
      throw err;
    } finally {
      await appMongoDB.close();
    }
  },

  async addContact(phoneNumber, fullName) {
    const appMongoDB = new AppMongoDB();
    try {
      const contact = {
        phoneNumber,
        fullName
      };
      console.log('adding contact:', contact);
      await appMongoDB.connect();
      const collection = appMongoDB.db.collection(MongoCollection.Contact);

      await collection.insertOne(contact);
      console.log('contact added:', contact);
    } catch (err) {
      console.error('Error add contact:', err);
      throw err;
    } finally {
      await appMongoDB.close();
    }
  },

  async deleteContact(id) {
    const appMongoDB = new AppMongoDB();
    try {
      console.log('deleting contact:', id);
      await appMongoDB.connect();
      const collection = appMongoDB.db.collection(MongoCollection.Contact);
      const filter = { _id: new ObjectId(id) };
      const result = await collection.deleteOne(filter);

      if (result.deletedCount === 1) {
        console.log('contact deleted:', id);
      } else {
        console.log('contact not found or already deleted');
      }
    } catch (err) {
      console.error('Error delete contact:', err);
      throw err;
    } finally {
      await appMongoDB.close();
    }
  }

}