const express = require('express');
const app = express();
const session = require('express-session');
const dotenv = require('dotenv');
var cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config(); //To access/config the DB connection token

//Import Routes
const authRoute = require('./routes/auth');
const matchRoute = require('./routes/match');
const scoreboardRoute = require('./routes/scoreboard');

//Connect to DB
const connectDB = require('./config/db');
connectDB();
const port = process.env.PORT || 4000;

//Middleware
app.use(express.json());

// This is to enable cookie in browser when using heroku
app.set('trust proxy', 1);

app.use(cookieParser());

// app.use(
// 	session({
// 		name: 'random_session',
// 		secret: process.env.COOKIE_SECRET || 'change it (super secret)',
// 		resave: true,
// 		saveUninitialized: false,
// 		cookie: {
// 			secure: true,
// 			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
// 		},
// 	})
// );

app.use(
	cors({
		origin: process.env.CLIENT_URL || 'https://fantasy-11.vercel.app',
		credentials: true, //access-control-allow-credentials:true
		optionSuccessStatus: 200,
	})
);

//Route Middlewares
app.use('/api/users', authRoute);
app.use('/api/match', matchRoute);
app.use('/api/scoreboard', scoreboardRoute);

// Socket initialisation

app.listen(port, () =>
	console.log(`Server is running on port ${port}`.yellow.bold)
);
