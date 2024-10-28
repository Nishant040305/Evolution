const express = require('express');

require('dotenv').config();
//connect database
const db = require('./db/mongoose');

const app = express();


//Add cross origin resorse shareing
const cors = require("cors");
app.use(cors({
  origin:process.env.CLIENT,
  methods:"GET,POST,PUT,DELETE",
  credentials:true
}));
app.use(express.json());


//Add cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());


//routes



//TEST
app.use('/api/test/',require("./test/loginTest"));
//middleware for error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server error');
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});