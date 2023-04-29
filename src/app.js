import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import serverSettings from './serverSettings.js';
import corsOptions from './utils/corsOptions.js';
import registrationRoute from './models/users/routes/registrationRoute.js';
import loginRoute from './models/users/routes/loginRoute.js';
import receiveArticlesPrivateRoute from './models/articles/routes/receiveArticlesPrivateRoute.js';
import deleteArtcileByIdPrivateRoute from './models/articles/routes/deleteArtcileByIdPrivateRoute.js';
import updateArticleStatusPrivateRoute from './models/articles/routes/updateArticleStatusPrivateRoute.js';
import receiveArticleByIdPrivateRoute from './models/articles/routes/receiveArticleByIdPrivateRoute.js';
import createArticlePrivateRoute from './models/articles/routes/createArticlePrivateRoute.js';

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
app.use(serverSettings.apiBasePath, deleteArtcileByIdPrivateRoute);
app.use(serverSettings.apiBasePath, updateArticleStatusPrivateRoute);
app.use(serverSettings.apiBasePath, receiveArticleByIdPrivateRoute);
app.use(serverSettings.apiBasePath, createArticlePrivateRoute);

app.listen(serverSettings.apiListenPort);
