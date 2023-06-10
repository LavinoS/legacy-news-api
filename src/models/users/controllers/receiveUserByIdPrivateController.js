import logger from '../../../utils/logger.js';
import databaseConnection from '../../../services/databaseConnection.js';
import pathParser from '../../../utils/pathParser.js';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  try {
    if (!req.query) {
      return null;
    }

    const { dbConn } = await databaseConnection();
    const requestUrl = await pathParser(req.route.path, 'parse');
    const user = await dbConn.collection(requestUrl).findOne({ _id: ObjectId(req.query.id) });

    return res.send({
      success: true,
      user
    });
  } catch (e) {
    logger.error(e.message);

    return res.status(e.statusCode || 400).json({
      status: e.statusCode,
      message: e.message,
      success: false
    });
  }
}