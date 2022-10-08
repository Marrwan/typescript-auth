require('dotenv').config();

import express from 'express';
import config from 'config';
import connectDB from '../utils/dbconnection';
import log from '../utils/logger';


const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

let port = config.get('port')

app.listen(port, () => {
    log.info(`Server started on port https://localhost:${port}`);
    connectDB()
}
);