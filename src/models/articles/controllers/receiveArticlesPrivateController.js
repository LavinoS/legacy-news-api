import databaseConnection from '../../../services/databaseConnection.js';
import logger from '../../../utils/logger.js';
import pathParser from '../../../utils/pathParser.js';

const receiveArticlesPrivateController = async (req, res) => {
  try {
    if (!req.body) {
      return null;
    }

    const { dbConn } = await databaseConnection();
    const requestUrl = await pathParser(req.route.path, 'parse');

    const articles = await dbConn.collection(requestUrl).find({}).toArray();

    return res.send({
      success: true,
      data: articles
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

export default receiveArticlesPrivateController;
