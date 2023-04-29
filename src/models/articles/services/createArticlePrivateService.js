import databaseConnection from '../../../services/databaseConnection.js';
import AWS from 'aws-sdk';
import { format } from 'date-fns';
import serverSettings from '../../../serverSettings.js';
import articlePrivateTransformer from '../models/articlePrivateTransformer.js';

const uploadFileToS3 = async (file) => {
  if (!file) {
    return null;
  }

  const s3 = new AWS.S3({
    accessKeyId: serverSettings.accessKey,
    secretAccessKey: serverSettings.secretAccessKey,
    region: serverSettings.region
  });

  const params = {
    Bucket: serverSettings.bucketName,
    Key: `${Date.now()}.${file.originalname}`,
    Body: file.buffer
  };

  return await s3.upload(params).promise();
};

export default async (reqUrl, dto) => {
  const { Location } = await uploadFileToS3(dto.file);
  const { dbConn } = await databaseConnection();

  const formattedDate = format(new Date(), 'dd-MM-yyyy');

  const articleModel = await articlePrivateTransformer({ ...dto, file: Location });
  await dbConn.collection(reqUrl).insertOne(articleModel);

  return articleModel;
}