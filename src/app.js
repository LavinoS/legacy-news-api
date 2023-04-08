import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import serverSettings from './serverSettings.js';
import corsOptions from './utils/corsOptions.js';
import registrationRoute from './models/users/routes/registrationRoute.js';
import loginRoute from './models/users/routes/loginRoute.js';

const app = express();

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//CORS usage
app.use(cors(corsOptions));

//User Routes
app.use(serverSettings.apiBasePath, registrationRoute);
app.use(serverSettings.apiBasePath, loginRoute);


app.listen(serverSettings.apiListenPort);
