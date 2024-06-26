import parseEnv from './config/parseEnv.js';
import mongoUri from 'mongodb-uri';

const serverSettings = {
  apiBaseUrl: parseEnv('API_BASE_URL'),
  apiListenPort: parseEnv('API_PORT', 'number'),
  apiBasePath: parseEnv('API_BASE_PATH'),

  storeBaseUrl: parseEnv('STORE_BASE_URL'),

  adminBaseURL: parseEnv('ADMIN_BASE_URL'),

  mongodbServerUrl: parseEnv('DB_CONNECTION_URI'),
  mongodbConnectionInfo: mongoUri.parse(parseEnv('DB_CONNECTION_URI')),
  mongodbDatabaseName: parseEnv('DB_NAME'),
  dbConnectionPoolSize: parseEnv('DB_CONNECTION_POOL_SIZE', 'number', false),

  bucketName: parseEnv('BUCKET_NAME'),
  accessKey: parseEnv('S3_ACCESS_KEY'),
  secretAccessKey: parseEnv('S3_SECRET_ACCESS_KEY'),
  region: parseEnv('S3_REGION')
};

export default serverSettings;
