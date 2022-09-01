const ApartmentModel = require('../models/Apartment');
const isValidRequest = require('../utils/requestValidator');
const ApartmentService = require('../services/apartment.service');
const { defaultImage } = require('../utils/initialValues');

class ApartmentController {
  async getApartments(req, res) {
    try {
      const { price, rooms } = req.query;

      return res.json(await ApartmentService.getAll({ price, rooms }));
    } catch (e) {
      return res.status(400).json({ message: 'Get Error' });
    }
  }

  async getApartment(req, res) {
    try {
      const id = req.params.id;

      return res.json(await ApartmentService.getOne(id));
    } catch (e) {
      return res.status(400).json({ message: 'Get error' });
    }
  }

  async addApartment(req, res) {
    try {
      const { name, rooms, price, description, icon } = req.body;

      const isValid = isValidRequest(name, price, rooms, description);

      if (!isValid.status) return res.status(400).json({ message: isValid.message });

      let iconURL = icon ? icon : defaultImage;
      
      const apartment = new ApartmentModel({
        name,
        rooms,
        price,
        description,
        icon: iconURL,
      });

      await apartment.save();
      const totalApartments = await ApartmentModel.count();

      return res.json({
        apartment,
        totalApartments,
      });
    } catch (e) {
      console.log('====================================');
      console.log(e);
      console.log('====================================');
      return res.status(400).json({ message: 'Post Error' });
    }
  }

  async deleteApartment(req, res) {
    try {
      const id = req.params.id;

      return res.json(await ApartmentService.delete(id));
    } catch (e) {
      return res.status(400).json({ message: 'Delete Error' });
    }
  }

  async updateApartment(req, res) {
    try {
      const { name, price, rooms, description, icon } = req.body;
      const id = req.params.id;

      return res.json(await ApartmentService.update({
        id,
        name,
        price,
        rooms,
        description,
        icon,
      }));
    } catch (e) {
      return res.json(400).json({ message: 'Put error' });
    }
  }
}

module.exports = new ApartmentController();
