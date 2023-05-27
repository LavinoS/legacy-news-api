import databaseConnection from '../../../services/databaseConnection.js';
import logger from '../../../utils/logger.js';
import pathParser from '../../../utils/pathParser.js';
import generateArticlesFilterService from '../services/generateArticlesFilterService.js';
import receiveArticlesPrivateService from '../services/receiveArticlesPrivateService.js';

const receiveArticlesPrivateController = async (req, res) => {
  try {
    if (!req.body) {
      return null;
    }

    const { dbConn } = await databaseConnection();
    const requestUrl = await pathParser(req.route.path, 'parse');

    const articles = await receiveArticlesPrivateService(req.route.path, req.query);
    const filters = await generateArticlesFilterService(requestUrl, dbConn);
    const totalArticles = await dbConn.collection(requestUrl).countDocuments();

    return res.send({
      success: true,
      data: articles,
      filters: filters,
      total: totalArticles
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
