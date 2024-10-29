const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Load environment variables
require('dotenv').config();

// Connect to database
const db = require('./db/mongoose');



// Create express app and add middlewares
const app = express();

app.use(cors({
  origin: process.env.CLIENT,
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

app.use(express.json());

app.use(cookieParser());


//routes



//TEST
app.use('/api/test/',require("./test/loginTest"));
app.use('/api/test/mail',require("./test/mailTest"))


//Routes 

app.use('/api/auth/', require("./routes/credential.routes"));




//middleware for error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server error');
});



// Set up routes
const routes = require('./routes');
app.use('/api', routes);

//TEST
app.use('/api/test/',require("./test/loginTest"));
app.use('/api/test/mail',require("./test/mailTest"))



// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});