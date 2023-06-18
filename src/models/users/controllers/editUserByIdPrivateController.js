import logger from '../../../utils/logger.js';
import editUserByIdPrivateService from '../services/editUserByIdPrivateService.js';

export default async (req, res) => {
  try {
    if (!req.body) {
      return null;
    }

    await editUserByIdPrivateService(req.route.path, req.body);

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

}