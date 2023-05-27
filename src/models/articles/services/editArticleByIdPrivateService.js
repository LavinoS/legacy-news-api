import databaseConnection from '../../../services/databaseConnection.js';
import pathParser from '../../../utils/pathParser.js';
import { ObjectId } from 'mongodb';
import { uploadFileToS3 } from './createArticlePrivateService.js';
import { format } from 'date-fns';

export default async (reqPath, dto) => {
  const { file, id, title, summary, slug, author, type, alt, featuredImage, sections } = dto;

  let image = featuredImage;

  const { dbConn } = await databaseConnection();
  const requestUrl = await pathParser(reqPath, 'parse');
  const mongoId = ObjectId(id);


  if (file) {
    const { Location } = await uploadFileToS3(file);
    image = Location;
  }

  const aggregation = {
    $set: {
      publishDate: format(new Date(), 'dd-MM-yyyy')
    }
  };

  if (title !== undefined) {
    aggregation.$set.title = title;
  }

  if (summary !== undefined) {
    aggregation.$set.summary = summary;
  }

  if (slug !== undefined) {
    aggregation.$set.slug = slug;
  }

  if (author !== undefined) {
    aggregation.$set.author = author;
  }

  if (type !== undefined) {
    aggregation.$set.type = type;
  }

  if (featuredImage !== undefined || file !== undefined) {
    aggregation.$set.featuredImage = image;
  }

  if (alt !== undefined) {
    aggregation.$set.featuredImageAlt = alt;
  }

  if (sections !== undefined) {
    aggregation.$set.sections = JSON.parse(sections);
  }

  await dbConn.collection(requestUrl).findOneAndUpdate({ _id: mongoId }, aggregation);
}