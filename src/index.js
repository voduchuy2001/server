import express from 'express';
import initAPIRoutes from './routes/api';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from "cors"
require('dotenv').config();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

let port = process.env.PORT || 6969;

initAPIRoutes(app);
app.use((req, res) => {
    return res.status(404).json({
        msg: '404 Page not found!'
    });
});


app.listen(port, () => {
    console.log('Server is running on [http://localhost:' + port + ']');
})
