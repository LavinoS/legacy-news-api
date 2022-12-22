import databaseConnection from '../../../services/databaseConnection.js';
import path from 'path';
import logger from '../../../utils/logger.js';
const getAllUsersController = async (req, res) => {
  try {
    const {
      dbConn
    } = await databaseConnection();
    const requestUrl = path.basename(req.route.path);
    const getUsersCollection = await dbConn.collection(requestUrl).find({}).toArray();
    return res.send(getUsersCollection);
  } catch (e) {
    logger.error(e.message);
    return res.sendStatus(e.status);
  }
};
export default getAllUsersController;