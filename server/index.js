const express = require('express');
const app = express();
const colors = require('colors');
const dotenv = require('dotenv');
var cors = require('cors');
const cookieParser = require('cookie-parser');
const server = app.listen(3000)
const io = require('socket.io')(server);

const User = require('./models/User');
// server.listen(3000, () => {
//     console.log(`listening on 3000`);
// });
dotenv.config(); //To access/config the DB connection token

//Import Routes
const authRoute = require('./routes/auth');
const matchRoute = require('./routes/match');
const scoreboardRoute = require('./routes/scoreboard');

//Connect to DB
const connectDB = require('./config/db');
connectDB();
const port = process.env.PORT;

//Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());


//Route Middlewares
app.use('/api/users', authRoute);
app.use('/api/match', matchRoute);
app.use('/api/scoreboard', scoreboardRoute);

// Socket initialisation
io.on("connection", (socket) => {
    console.log("New client connected");
    socket.emit('test',"vanakam di maaple server lendhu")
    require('./routes/socket')(socket);
    
    // socket.on("disconnect", () => {
    //   console.log("Client disconnected");
    //   clearInterval(interval);
    // });
  });

app.listen(port, () => console.log(`Server is running on port ${port}`.yellow.bold));
