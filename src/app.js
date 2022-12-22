import express from 'express';
import getAllUsersRoute from './models/users/routes/getAllUsersRoute.js';
import serverSettings from './serverSettings.js';

const app = express();

//User Routes
app.use(serverSettings.apiBasePath, getAllUsersRoute);

app.listen(serverSettings.apiListenPort);
