import { startOfWeek, endOfWeek, format } from 'date-fns';

export default async (dbConn) => {
  const currentDate = new Date();
  const startDate = startOfWeek(currentDate);
  const endDate = endOfWeek(currentDate);

  const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const weeklyViewsQuery = [
    {
      $match: {
        publishDate: {
          $gte: format(startDate, 'dd-MM-yyyy'),
          $lte: format(endDate, 'dd-MM-yyyy')
        },
        status: 'published'
      }
    },
    {
      $group: {
        _id: { $dayOfWeek: { $dateFromString: { dateString: '$publishDate', format: '%d-%m-%Y' } } },
        count: { $sum: 1 }
      }
    }
  ];

  const weeklyViewsObject = {
    sunday: 0,
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0
  };

  const weeklyViews = await dbConn.collection('articles').aggregate(weeklyViewsQuery).toArray();

  weeklyViews.forEach((view) => {
    const dayOfWeek = (view._id + 6) % 7;
    weeklyViewsObject[weekDays[dayOfWeek]] = view.count;
  });

  return weeklyViewsObject;
};
