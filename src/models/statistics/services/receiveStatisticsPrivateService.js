import databaseConnection from '../../../services/databaseConnection.js';
import findWeeklyViewsService from './findWeeklyViewsService.js';
import findWeeklyNewsService from './findWeeklyNewsService.js';
import findAnnuallyViewsService from './findAnnuallyViewsService';
import { endOfDay, startOfDay } from 'date-fns';

export default async () => {
  const { dbConn } = await databaseConnection();

  const currentDate = new Date();
  const startOfToday = startOfDay(currentDate);
  const endOfToday = endOfDay(currentDate);

  const totalViews = await dbConn.collection('views').countDocuments();
  const totalUsers = await dbConn.collection('users').countDocuments();
  const totalNews = await dbConn.collection('articles').countDocuments();
  const todayViews = await dbConn.collection('views').countDocuments({
    date: {
      $gte: startOfToday,
      $lte: endOfToday
    }
  });
  const weeklyViews = await findWeeklyViewsService(dbConn);
  const weeklyNews = await findWeeklyNewsService(dbConn);
  const annuallyViews = await findAnnuallyViewsService(dbConn);

  return { totalViews, totalUsers, totalNews, todayViews, weeklyViews, weeklyNews, annuallyViews };
}