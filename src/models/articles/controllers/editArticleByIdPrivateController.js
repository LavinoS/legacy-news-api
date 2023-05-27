import logger from '../../../utils/logger.js';
import editArticleByIdPrivateService from '../services/editArticleByIdPrivateService.js';

const editArticleByIdPrivateController = async (req, res) => {
  try {
    if (!req.body) {
      return null;
    }

    await editArticleByIdPrivateService(req.route.path, { ...req.body, file: req.file });

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

export default editArticleByIdPrivateController;
