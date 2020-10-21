const express = require('express');
const router = require('./routes/router.js');
const app = express();
require('dotenv').config(); //api加密

app.use(router);
app.listen(process.env.PORT, ()=> {
  console.log(`Server is running on ${process.env.PORT}`);
});