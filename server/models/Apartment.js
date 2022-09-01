const { model, Schema } = require('mongoose');

const Apartment = new Schema({
  name: { type: String, require: true },
  rooms: { type: Number, require: true },
  price: { type: Number, require: true },
  description: { type: String, default: '' },
  icon: {
    type: String,
    default: ''
  },
});

module.exports = model('Apartment', Apartment);
