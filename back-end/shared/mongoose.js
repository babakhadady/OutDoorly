const mongoose = require("mongoose");
const { getSchemaForCollection } = require("./schema/collectionSchema");
require("dotenv").config();
let connection;

/**
 * Refresh database flag to to drop the current database and create a new one
 * @param {boolean} refreshDatabase
 * @returns mongoose connection
 */
const getMongooseConnection = async (refreshDatabase = false) => {

  const MONGO_CONN_STRING = process.env.MONGO_CONNECTION_STRING;

  const DATABASE_NAME = "outdoorly2";
  if (connection == null) {
    try {
      connection = mongoose.connect(MONGO_CONN_STRING, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        retryWrites: true,
        dbName: DATABASE_NAME,
        writeConcern: {
          w: "majority",
        },
      });
      await connection;
    } catch (err) {
      console.log("Could not connect to database.");
    }
  }

  if (refreshDatabase) {
    mongoose.connection.db.dropDatabase((err, result) => {
      console.log([JSON.stringify(result), JSON.stringify(err)]);
    });
  }
  return connection;
};

/**
 * private method
 * @param {string} collection
 * @param {mongoose.Connection} connection
 * @returns mongoose Model
 */
const getCollectionModel = (collection, mongooseConnection) => {
  const modelSchema = getSchemaForCollection(collection, mongoose);
  return (
    mongoose.models[collection] ||
    mongooseConnection.model(collection, modelSchema, collection)
  );
};

/**
 * Returns a model associated with Mongoose collection, which can be
 * used by Database access layer function for querying
 * @param {string} collectionName
 * @param {*} conn : Mongoose connection object. If not passed a new one will be created
 * @returns {null|Model}
 */
exports.getModelForCollection = async (collectionName = null, conn = null) => {
  if (!collectionName || collectionName === "") {
    return null;
  }
  const mongooseConn = conn || (await getMongooseConnection());
  return getCollectionModel(collectionName, mongooseConn);
};

/**
 *
 * @param {string} collection
 * @param {mongoose.Connection} connection
 * @returns mongoose Model
 */
module.exports.closeConnection = () => mongoose.disconnect();
