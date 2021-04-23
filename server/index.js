const express = require('express');
const app = express();
const colors = require('colors');
const dotenv = require('dotenv');
var cors = require('cors');

const User = require('./models/User');

dotenv.config(); //To access/config the DB connection token

//Import Routes
const authRoute = require('./routes/auth');

//Connect to DB
const connectDB = require('./config/db');
connectDB();
const port = process.env.PORT;

//Middleware
app.use(express.json());
app.use(cors());

//Route Middlewares
app.use('/api/users', authRoute);

app.listen(port, () => console.log(`Server is running on port ${port}`.yellow.bold));
