const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
var loginRouter = require('./routes/login');
var adminRouter = require('./routes/admin');
var instructorRouter = require('./routes/instructor');
var dotenv = require('dotenv').config()


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/login", loginRouter);
app.use("/api/admin", adminRouter);
app.use("/api/instructor", instructorRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
;
