export default async (dbConn) => {
  const currentDate = new Date();

  const startOfWeek = new Date(currentDate);
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

  const endOfWeek = new Date(currentDate);
  endOfWeek.setHours(23, 59, 59, 999);
  endOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay()));

  const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const weeklyViewsQuery = [
    {
      $match: {
        date: {
          $gte: startOfWeek,
          $lte: endOfWeek
        }
      }
    },
    {
      $group: {
        _id: { $dayOfWeek: '$date' },
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

  const weeklyViews = await dbConn.collection('views').aggregate(weeklyViewsQuery).toArray();

  weeklyViews.forEach((view) => {
    const dayOfWeek = (view._id + 6) % 7;
    weeklyViewsObject[weekDays[dayOfWeek]] = view.count;
  });

  return weeklyViewsObject;
}