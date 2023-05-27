import databaseConnection from '../../../services/databaseConnection.js';
import pathParser from '../../../utils/pathParser.js';

export default async (route, params) => {
  const { search, author, type, status, limit = '5', page = '1' } = params;
  const parsedLimit = parseInt(limit);
  const parsedPage = parseInt(page);

  const { dbConn } = await databaseConnection();
  const requestUrl = await pathParser(route, 'parse');
  
  const skipPage = (parsedPage - 1) * parsedLimit;
  const filter = {};

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } }
    ];
  }

  if (author) {
    filter.author = { $eq: author };
  }

  if (type) {
    filter.type = { $eq: type };
  }

  if (status) {
    filter.status = { $eq: status };
  }

  return await dbConn.collection(requestUrl).find(filter).limit(parsedLimit).skip(skipPage).toArray();
}