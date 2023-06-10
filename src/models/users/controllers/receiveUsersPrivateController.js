import logger from '../../../utils/logger.js';
import databaseConnection from '../../../services/databaseConnection.js';
import pathParser from '../../../utils/pathParser.js';
import receiveUsersPrivateService from '../services/receiveUsersPrivateService.js';

export default async (req, res) => {
  try {
    if (!req.query) {
      return null;
    }

    const { dbConn } = await databaseConnection();
    const requestUrl = await pathParser(req.route.path);

    const users = await receiveUsersPrivateService(requestUrl, req.query);
    const totalUsers = await dbConn.collection(requestUrl).countDocuments();

    return res.send({
      success: true,
      data: users,
      total: totalUsers
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