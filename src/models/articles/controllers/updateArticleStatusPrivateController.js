import logger from '../../../utils/logger.js';
import updateArticleStatusPrivateService from '../services/updateArticleStatusPrivateService.js';

const updateArticleStatusPrivateController = async (req, res) => {
  try {
    if (!req.body) {
      return null;
    }

    await updateArticleStatusPrivateService(req.route.path, req.body.id);

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

export default updateArticleStatusPrivateController;
