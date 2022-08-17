const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();

app.use(express.json());

const start = async () => {
  try {
    await mongoose.connect(config.get("dbURL"));
  } catch (e) {
    console.log('====================================');
    console.log(e);
    console.log('====================================');
  }
}