const ApartmentModel = require("../models/Apartment");
const isValidRequest = require("../utils/requestValidator");

class ApartmentController {
  async getApartments(req, res) {
    try {
      let apartments = '';

      const { price, rooms } = req.query;

      const sortByPrice = price;
      const filterByRooms = rooms ? parseInt(rooms, 10) : undefined;

      if(await ApartmentModel.countDocuments() === 0) {
        await ApartmentModel.insertMany([
          {
            name: "Чорновола В. просп., 16C",
            price: 27300,
            rooms: 2,
            description: `Загальна площа: 75 кв.м Поверх: 6 Поверховість: 9 Балконів: 1`
          },
          {
            name: "Замарстинівська вул., 153",
            price: 17000,
            rooms: 1,
            description: "Загальна площа: 40 кв.м Поверх: 2 Поверховість: 5 Балконів: 1"
          },
          {
            name: "Кульпарківська вул., 13B",
            price: 19700,
            rooms: 2,
            description: "4 Cпальних місця Загальна площа 90 м² · житлова 40 м² · кухня 17 м²"
          },
          {
            name: "Стрийська вул., 193",
            price: 31100,
            rooms: 2,
            description: "Загальна площа: 78 кв.м Поверх: 6 Поверховість: 9 Балконів: 2"
          },
        ]);
      }

      if (sortByPrice === "asc") apartments = await ApartmentModel.find().sort({ price: 1 });
      else if (sortByPrice === "desc") apartments = await ApartmentModel.find().sort({ price: -1 });
      else apartments = await ApartmentModel.find();

      if (filterByRooms && filterByRooms !== 4) apartments = apartments.filter(apartment => apartment.rooms === filterByRooms);
      else if(filterByRooms && filterByRooms === 4) apartments = apartments.filter(apartment => apartment.rooms >= filterByRooms);

      const totalApartments = await ApartmentModel.countDocuments();

      return res.json({
        totalApartments,
        apartments
      });
    } catch (e) {
      console.log('====================================');
      console.log(e);
      console.log('====================================');
      return res.status(400).json({ message: "Get Error" });
    }
  }

  async getApartment(req, res) {
    try {
      const { id } = req.query;

      const apartment = await ApartmentModel.findOne({ _id: id });

      if(!apartment) return res.status(400).json({ message: "Apartment is not exists" });

      return res.json(apartment);

    } catch (e) {
      console.log('====================================');
      console.log(e);
      console.log('====================================');
      return res.status(400).json({ message: "Get error" });
    }
  }

  async addApartment(req, res) {
    try {
      const { name, rooms, price, description } = req.body;

      const isValid = isValidRequest(name, price, rooms, description);

      if (!isValid.status) return res.status(400).json({ message: isValid.message });

      const apartment = new ApartmentModel({
        name,
        rooms,
        price,
        description
      });

      await apartment.save();
      const totalApartments = await ApartmentModel.count();

      return res.json({
        apartment,
        totalApartments
      });

    } catch (e) {
      console.log('====================================');
      console.log(e);
      console.log('====================================');
      return res.status(400).json({ message: "Post Error" });
    }
  }

  async deleteApartment(req, res) {
    try {
      const { id } = req.query;

      const apartment = await ApartmentModel.findOne({_id: id});

      if (!apartment) return res.status(400).json({ message: "Apartment is not exists." });

      await ApartmentModel.deleteOne(apartment);

      return res.json({ message: `Apartment ${id} was deleted` })
    } catch (e) {
      console.log('====================================');
      console.log(e);
      console.log('====================================');
      return res.status(400).json({ message: "Delete Error" });
    }
  }

  async updateApartment(req, res) {
    try {
      const { name, price, rooms, description } = req.body;
      const { id } = req.query;

      const apartment = await ApartmentModel.findOne({ _id: id });

      if (!apartment) return res.status(400).json({ message: "Apartment is ont exists" });

      const isValid = isValidRequest(name, price, rooms, description);
      if (!isValid.status) return res.status(400).json({ message: isValid.message });

      await ApartmentModel.updateOne(apartment, { name, price, rooms, description });
      return res.json({ name, price, rooms, description, _id: id });

    } catch (e) {
      console.log('====================================');
      console.log(e);
      console.log('====================================');
      return res.json(400).json({ message: "Put error" });
    }
  }
}

module.exports = new ApartmentController();