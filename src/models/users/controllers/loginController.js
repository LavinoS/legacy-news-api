import databaseConnection from '../../../services/databaseConnection.js';
import logger from '../../../utils/logger.js';
import pathParser from '../../../utils/pathParser.js';
import { checkingForUser } from '../services/loginService.js';


const loginController = async (req, res) => {
  try {
    if (!req.body) {
      return null;
    }

    const { dbConn } = await databaseConnection();
    const requestUrl = await pathParser(req.route.path, 'parse');

    const { email, password } = req.body;

    const loginToken = await checkingForUser(dbConn, requestUrl, { email, password });

    return res.send({
      message: `You're logged successfully!`,
      token: loginToken,
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

export default loginController;
