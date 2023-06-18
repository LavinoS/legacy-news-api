import { startOfYear, endOfYear, format } from 'date-fns';

export default async (dbConn) => {
  const currentDate = new Date();
  const startDate = startOfYear(currentDate);
  const endDate = endOfYear(currentDate);

  const monthlyViewsQuery = [
    {
      $match: {
        date: {
          $gte: startDate,
          $lte: endDate
        }
      }
    },
    {
      $group: {
        _id: { $month: '$date' },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ];

  const monthlyViewsObject = {};

  const monthlyViews = await dbConn.collection('views').aggregate(monthlyViewsQuery).toArray();

  monthlyViews.forEach((view) => {
    const monthIndex = view._id - 1;
    const month = format(new Date(0, monthIndex), 'MMMM');
    monthlyViewsObject[month] = view.count;
  });

  return monthlyViewsObject;
};
