import databaseConnection from '../../../services/databaseConnection.js';
import path from 'path';
import logger from '../../../utils/logger.js';
import registrationUserTransformer from '../models/registrationUserTransformer.js';

const checkingForExistingUsers = async (dbConn, reqUrl, email) => {
  const existingUser = await dbConn.collection(reqUrl).findOne({ userEmail: email });

  if (existingUser) {
    const error = new Error('This user already exists!');
    error.statusCode = 400;

    throw error;
  }

  return null;
};


const registrationController = async (req, res) => {
  try {
    if (!req.body) {
      return null;
    }

    const { dbConn } = await databaseConnection();
    const requestUrl = path.basename(req.route.path);
    const registrationModel = await registrationUserTransformer(req.body);
    const { userEmail } = registrationModel;

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
