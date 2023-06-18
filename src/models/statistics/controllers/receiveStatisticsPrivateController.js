import logger from '../../../utils/logger.js';
import receiveStatisticsPrivateService from '../services/receiveStatisticsPrivateService.js';

export default async (req, res) => {
  try {
    const {
      totalViews,
      totalUsers,
      totalNews,
      todayViews,
      weeklyViews,
      weeklyNews,
      annuallyViews
    } = await receiveStatisticsPrivateService();

    return res.send({
      success: true,
      totalViews,
      totalNews,
      totalUsers,
      todayViews,
      weeklyViews,
      weeklyNews,
      annuallyViews
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
