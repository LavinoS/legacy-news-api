import databaseConnection from '../../../services/databaseConnection.js';
import logger from '../../../utils/logger.js';
import pathParser from '../../../utils/pathParser.js';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  try {
    if (!req.body) {
      return null;
    }

    const { dbConn } = await databaseConnection();
    const requestUrl = await pathParser(req.route.path);
    await dbConn.collection(requestUrl).deleteOne({ _id: ObjectId(req.body.id) });

    return res.send({
      success: true
    });
  } catch (e) {
    logger.error(e.message);

    return res.status(e.statusCode || 400).json({
      status: e.statusCode,
      message: e.message,
      success: false
    });
  }
};
