import databaseConnection from '../../../services/databaseConnection.js';
import logger from '../../../utils/logger.js';
import pathParser from '../../../utils/pathParser.js';
import articlePrivateTransformer from '../models/articlePrivateTransformer.js';
import createArticlePrivateService from '../services/createArticlePrivateService.js';

const createArticlePrivateController = async (req, res) => {
  try {
    if (!req.body || !req.file) {
      return null;
    }

    const requestUrl = await pathParser(req.route.path, 'parse');

    const processedArticle = await createArticlePrivateService(requestUrl, { ...req.body, file: req.file });

    return res.send({
      success: true,
      data: processedArticle
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

export default createArticlePrivateController;
