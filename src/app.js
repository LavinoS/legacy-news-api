import express from 'express';
import cors from 'cors';
import getAllUsersRoute from './models/users/routes/getAllUsersRoute.js';
import serverSettings from './serverSettings.js';
import corsOptions from './utils/corsOptions.js';

const app = express();

//CORS usage
app.use(cors(corsOptions));

//User Routes
app.use(serverSettings.apiBasePath, getAllUsersRoute);


app.listen(serverSettings.apiListenPort);
