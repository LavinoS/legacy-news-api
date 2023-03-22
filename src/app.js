import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import getAllUsersRoute from './models/users/routes/getAllUsersRoute.js';
import serverSettings from './serverSettings.js';
import corsOptions from './utils/corsOptions.js';
import registrationRoute from './models/users/routes/registrationRoute.js';

const app = express();

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//CORS usage
app.use(cors(corsOptions));

//User Routes
app.use(serverSettings.apiBasePath, getAllUsersRoute);
app.use(serverSettings.apiBasePath, registrationRoute);


app.listen(serverSettings.apiListenPort);
