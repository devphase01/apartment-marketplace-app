const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();
const PORT = config.get("serverPORT");

app.use(express.json());

const start = async () => {
  try {
    await mongoose.connect(config.get("dbURL"));

    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

  } catch (e) {
    console.log('====================================');
    console.log(e);
    console.log('====================================');
  }
}

start();