const ApartmentModel = require("../models/Apartment");
const isValidRequest = require("../utils/requestValidator");
const config = require("config");

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
            description: `Загальна площа: 75\nкв.м Поверх: 6\nПоверховість: 9\nБалконів: 1`,
            icon: "https://firebasestorage.googleapis.com/v0/b/fe-upload-70d57.appspot.com/o/images%2Festate1.png?alt=media&token=4386703e-072b-42ce-989d-df0b0a4844dc"
          },
          {
            name: "Замарстинівська вул., 153",
            price: 17000,
            rooms: 1,
            description: `Загальна площа: 40 кв.м\nПоверх: 2\nПоверховість: 5\nБалконів: 1`,
            icon: "https://firebasestorage.googleapis.com/v0/b/fe-upload-70d57.appspot.com/o/images%2Festate2.png?alt=media&token=62d5eb9c-4695-49d2-9609-5bce382d7858"
          },
          {
            name: "Кульпарківська вул., 13B",
            price: 19700,
            rooms: 2,
            description: `Cпальних місця: 4\nЗагальна площа 90 м²\nжитлова 40 м²\nкухня 17 м²\nПоверховість: 5`,
            icon: "https://firebasestorage.googleapis.com/v0/b/fe-upload-70d57.appspot.com/o/images%2Festate3.png?alt=media&token=4e993d70-7cad-4b55-b8c7-508d0d4f6384"
          },
          {
            name: "Стрийська вул., 193",
            price: 31100,
            rooms: 2,
            description: `Загальна площа: 78 кв.м\nПоверх: 6\nПоверховість: 9\nБалконів: 2`,
            icon: "https://firebasestorage.googleapis.com/v0/b/fe-upload-70d57.appspot.com/o/images%2Festate4.png?alt=media&token=84568794-2484-4bb2-ad86-d83d7596075b"
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
      const id = req.params.id;

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
      const { name, rooms, price, description, icon } = req.body;

      const isValid = isValidRequest(name, price, rooms, description);

      if (!isValid.status) return res.status(400).json({ message: isValid.message });

      let iconURL = "https://t-cf.bstatic.com/xdata/images/hotel/square600/214928356.webp?k=897527c745c9c410d77d7ade09d70fbfac836f9339b50f5255b96aac887b310e&o=&s=1";
      if(icon) {
        iconURL = icon;
      }

      const apartment = new ApartmentModel({
        name,
        rooms,
        price,
        description,
        icon: iconURL
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
      const id = req.params.id;

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
      const { name, price, rooms, description, icon } = req.body;
      const id = req.params.id;

      const apartment = await ApartmentModel.findOne({ _id: id });

      if (!apartment) return res.status(400).json({ message: "Apartment is ont exists" });

      const isValid = isValidRequest(name, price, rooms, description);
      if (!isValid.status) return res.status(400).json({ message: isValid.message });

      await ApartmentModel.updateOne(apartment, { name, price, rooms, description });
      return res.json({ name, price, rooms, description, icon, _id: id});

    } catch (e) {
      console.log('====================================');
      console.log(e);
      console.log('====================================');
      return res.json(400).json({ message: "Put error" });
    }
  }
}

module.exports = new ApartmentController();