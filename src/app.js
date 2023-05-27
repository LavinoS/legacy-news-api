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

const app = express();

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//CORS usage
app.use(cors(corsOptions));

//User Routes
app.use(serverSettings.apiBasePath, registrationRoute);
app.use(serverSettings.apiBasePath, loginRoute);

//Articles Routes
app.use(serverSettings.apiBasePath, receiveArticlesPrivateRoute);
app.use(serverSettings.apiBasePath, deleteArticleByIdPrivateRoute);
app.use(serverSettings.apiBasePath, updateArticleStatusPrivateRoute);
app.use(serverSettings.apiBasePath, receiveArticleByIdPrivateRoute);
app.use(serverSettings.apiBasePath, createArticlePrivateRoute);
app.use(serverSettings.apiBasePath, editArticleByIdPrivateRoute);

app.listen(serverSettings.apiListenPort);
