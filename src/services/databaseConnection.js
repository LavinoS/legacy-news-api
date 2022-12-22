import { MongoClient } from 'mongodb';
import serverSettings from '../serverSettings.js';
import logger from '../utils/logger.js';

const databaseConnection = async () => {
  const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: serverSettings.dbConnectionPoolSize || 5,
  };

  try {
    const mongoClient = new MongoClient(
      serverSettings.mongodbServerUrl,
      connectionOptions,
    );

    await mongoClient.connect();

    const db = mongoClient.db(serverSettings.mongodbConnectionInfo.database);

    mongoClient.on('close', () => {
      logger.info('MongoDB connection was closed');
    });

    logger.info('MongoDB connected successfully');

    return {
      dbConn: db,
      dbClient: mongoClient,
    };
  } catch (e) {
    logger.error(`MongoDB connection has failed: ${e.message}`, e.message);

    throw new Error(`MongoDB connection error: ${e.message}`);
  }
};

export default databaseConnection;
