import databaseConnection from '../../../services/databaseConnection.js';
import pathParser from '../../../utils/pathParser.js';
import { ObjectId } from 'mongodb';
import createError from 'http-errors';
import { format } from 'date-fns';

export default async (reqUrl, id) => {
  const { dbConn } = await databaseConnection();
  const requestUrl = await pathParser(reqUrl);
  const mongoId = ObjectId(id);

  const currentDocument = await dbConn.collection(requestUrl).findOne({ _id: mongoId });

  if (!currentDocument) {
    throw createError(401, `This document doesn't exists`);
  }

  const statusValue = currentDocument.status === 'published' ? 'draft' : 'published';
  const publishDate = currentDocument.status === 'draft' ? format(new Date(), 'dd-MM-yyyy') : '';
  const aggregation = { $set: { status: statusValue, publishDate: publishDate } };

  await dbConn.collection(requestUrl).findOneAndUpdate({ _id: mongoId }, aggregation);
}