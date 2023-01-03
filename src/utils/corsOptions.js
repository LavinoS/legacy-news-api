const corsOptions = {
  origin: ['https://locahost:3000', 'https://locahost:3002'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
};

export default corsOptions;
