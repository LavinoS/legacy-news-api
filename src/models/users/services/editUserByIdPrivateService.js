import databaseConnection from '../../../services/databaseConnection.js';
import pathParser from '../../../utils/pathParser.js';
import { ObjectId } from 'mongodb';

export default async (reqPath, dto) => {
  const { firstName, lastName, userEmail, id, role } = dto;


  const { dbConn } = await databaseConnection();
  const requestUrl = await pathParser(reqPath, 'parse');
  const mongoId = ObjectId(id);

  const aggregation = {
    $set: {}
  };

  if (firstName !== undefined) {
    aggregation.$set.firstName = firstName;
  }

  if (lastName !== undefined) {
    aggregation.$set.lastName = lastName;
  }

  if (userEmail !== undefined) {
    aggregation.$set.userEmail = userEmail;
  }

  if (role !== undefined) {
    aggregation.$set.role = role;
  }

  await dbConn.collection(requestUrl).findOneAndUpdate({ _id: mongoId }, aggregation);
}