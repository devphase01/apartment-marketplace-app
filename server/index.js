const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const apartmentRouter = require('./routes/apartment.routes');
const corsMiddleware = require('./middleware/cors.middleware');

const app = express();
const PORT = config.get('serverPORT');

app.use(corsMiddleware);
app.use(express.json());
app.use('/api/apartments', apartmentRouter);

const start = async () => {
  try {
    await mongoose.connect(config.get('dbURL'));

    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
  } catch (e) {
    console.log('====================================');
    console.log(e);
    console.log('====================================');
  }
};

start();
