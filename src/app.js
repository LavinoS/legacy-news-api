import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import serverSettings from './serverSettings.js';
import corsOptions from './utils/corsOptions.js';

import registrationRoute from './models/users/routes/registrationRoute.js';
import loginRoute from './models/users/routes/loginRoute.js';
import receiveArticlesPrivateRoute from './models/articles/routes/receiveArticlesPrivateRoute.js';
import deleteArticleByIdPrivateRoute from './models/articles/routes/deleteArticleByIdPrivateRoute.js';
import updateArticleStatusPrivateRoute from './models/articles/routes/updateArticleStatusPrivateRoute.js';
import receiveArticleByIdPrivateRoute from './models/articles/routes/receiveArticleByIdPrivateRoute.js';
import createArticlePrivateRoute from './models/articles/routes/createArticlePrivateRoute.js';
import editArticleByIdPrivateRoute from './models/articles/routes/editArticleByIdPrivateRoute.js';
import receiveUsersPrivateRoute from './models/users/routes/receiveUsersPrivateRoute.js';
import receiveUserByIdPrivateRoute from './models/users/routes/receiveUserByIdPrivateRoute.js';
import deleteUserByIdPrivateRoute from './models/users/routes/deleteUserByIdPrivateRoute.js';
import editUserByIdPrivateRoute from './models/users/routes/editUserByIdPrivateRoute.js';
import createNewViewPublicRoute from './models/views/routes/createNewViewPublicRoute.js';
import receiveStatisticsPrivateRoute from './models/statistics/routes/receiveStatisticsPrivateRoute.js';

const app = express();

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//CORS usage
app.use(cors(corsOptions));

//User Routes
app.use(serverSettings.apiBasePath, registrationRoute);
app.use(serverSettings.apiBasePath, loginRoute);
app.use(serverSettings.apiBasePath, receiveUsersPrivateRoute);
app.use(serverSettings.apiBasePath, receiveUserByIdPrivateRoute);
app.use(serverSettings.apiBasePath, deleteUserByIdPrivateRoute);
app.use(serverSettings.apiBasePath, editUserByIdPrivateRoute);

//Articles Routes
app.use(serverSettings.apiBasePath, receiveArticlesPrivateRoute);
app.use(serverSettings.apiBasePath, deleteArticleByIdPrivateRoute);
app.use(serverSettings.apiBasePath, updateArticleStatusPrivateRoute);
app.use(serverSettings.apiBasePath, receiveArticleByIdPrivateRoute);
app.use(serverSettings.apiBasePath, createArticlePrivateRoute);
app.use(serverSettings.apiBasePath, editArticleByIdPrivateRoute);

//Views Routes
app.use(serverSettings.apiBasePath, createNewViewPublicRoute);

//Statistics
app.use(serverSettings.apiBasePath, receiveStatisticsPrivateRoute);

app.listen(serverSettings.apiListenPort);
