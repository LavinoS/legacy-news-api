import databaseConnection from '../../../services/databaseConnection.js';
import logger from '../../../utils/logger.js';
import pathParser from '../../../utils/pathParser.js';
import newViewPublicRestTransformer from '../models/newViewPublicRestTransformer.js';

export default async (req, res) => {
  try {
    if (!req.ip) {
      return null;
    }

    const { dbConn } = await databaseConnection();
    const requestUrl = await pathParser(req.route.path);
    const viewModel = await newViewPublicRestTransformer(req.ip);

    await dbConn.collection(requestUrl).insertOne(viewModel);

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
