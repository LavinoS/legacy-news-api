export default async (requestUrl, dbConn) => {
  const aggregation = [{
    $group: {
      _id: null,
      author: { $addToSet: '$author' },
      category: { $addToSet: '$category' },
      status: { $addToSet: '$status' }
    }
  },
    {
      $project: {
        _id: 0,
        author: { $map: { input: '$author', as: 'a', in: { label: '$$a', value: '$$a' } } },
        category: { $map: { input: '$category', as: 't', in: { label: '$$t', value: '$$t' } } },
        status: { $map: { input: '$status', as: 's', in: { label: '$$s', value: '$$s' } } }
      }
    }
  ];

  return await dbConn.collection(requestUrl).aggregate(aggregation).toArray();
}