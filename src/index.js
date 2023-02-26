import express from 'express';
import initAPIRoutes from './routes/api';
import bodyParser from 'body-parser';
require('dotenv').config();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let port = process.env.PORT || 6969;

initAPIRoutes(app);

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
})
