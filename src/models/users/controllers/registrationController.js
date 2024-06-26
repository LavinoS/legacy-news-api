import databaseConnection from '../../../services/databaseConnection.js';
import logger from '../../../utils/logger.js';
import registrationUserTransformer from '../models/registrationUserTransformer.js';
import pathParser from '../../../utils/pathParser.js';
import { checkingForExistingUsers } from '../services/registerService.js';

const registrationController = async (req, res) => {
  try {
    if (!req.body) {
      return null;
    }
    const requestUrl = await pathParser(req.route.path, 'parse');
    const registrationModel = await registrationUserTransformer(req.body);

    const { userEmail } = registrationModel;
    const { dbConn } = await databaseConnection();

    await checkingForExistingUsers(dbConn, requestUrl, userEmail);

    await dbConn.collection(requestUrl).insertOne(registrationModel);

    return res.send({
      message: 'User was successfully created!',
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

export default registrationController;
