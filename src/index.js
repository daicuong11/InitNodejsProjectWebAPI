require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const connectDB = require('./config/db/index');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const port = process.env.PORT || 8080;

const route = require('./routes');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

const corsOptions = {
  origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(express.static(path.join(__dirname, 'public')));

connectDB();

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// Security
app.use(helmet());
app.use(limiter);
app.use(cors(corsOptions));

// Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
