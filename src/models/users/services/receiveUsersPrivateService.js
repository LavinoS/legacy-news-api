import databaseConnection from '../../../services/databaseConnection.js';

export default async (route, params) => {
  const { limit = '5', page = '1' } = params;

  const parsedLimit = parseInt(limit);
  const parsedPage = parseInt(page);

  const { dbConn } = await databaseConnection();
  const skipPage = (parsedPage - 1) * parsedLimit;

  return await dbConn.collection(route).find().limit(parsedLimit).skip(skipPage).toArray();
}