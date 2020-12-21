const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const http = require('http');
const pool = require('./config/db.config');
const index = require('./API/routing/index.route');

const express = require('express');
const app = express();
app.use(compression());
app.use(morgan('dev'));
app.options('*', cors());
app.use(cors({ origin: 'http://localhost:5000/' }));
app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
pool.query('USE stackover');
global.pool = pool;

// all the api routes
app.use('/api', index);

// port initialized
const PORT = process.env.PORT || 5000;

// server setup
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`InstiOverflow app running on ${PORT}`);
});