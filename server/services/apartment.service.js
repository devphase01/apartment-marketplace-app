const ApartmentModel = require('../models/Apartment');
const { announcements, defaultImage } = require('../utils/initialValues');
const isValidRequest = require('../utils/requestValidator');

class ApartmentService {
  async getAll({ price, rooms }) {
    try {
      const sortByPrice = price;
      const filterByRooms = rooms ? parseInt(rooms, 10) : undefined;

      if (await ApartmentModel.countDocuments() === 0) {
        await ApartmentModel.insertMany(announcements);
      }

      const apartments = await ApartmentModel.find()
        .where('rooms').gte(filterByRooms ? filterByRooms : 1).lte(filterByRooms < 4 ?
          filterByRooms :
          Infinity)
        .sort(sortByPrice === 'default' ? '' : { price: sortByPrice === 'desc' ? -1 : 1 });

      const totalApartments = await ApartmentModel.countDocuments();

      return {
        apartments,
        totalApartments
      };
    } catch (error) {
      return new Error({ message: error.message });
    }
  }

  async getOne(id) {
    try {
      const apartment = await ApartmentModel.findOne({ _id: id });

      if (!apartment) return new Error({ message: 'User is not exists.' });

      return apartment;
    } catch (error) {
      return new Error({ message: error.message });
    }
  }

  async add(body) {
    try {
      const isValid = isValidRequest(body);

      if (!isValid.status) {
        return new Error({ message: isValid.message });
      }

      const apartment = new ApartmentModel({
        ...body,
        icon: body.icon ? body.icon : defaultImage
      });
      await apartment.save();

      const totalApartments = await ApartmentModel.count();

      return {
        apartment,
        totalApartments,
      };
    } catch (error) {
      return new Error({ message: error.message });
    }
  }

  async delete(id) {
    try {
      const apartment = await ApartmentModel.findOne({ _id: id });

      if (!apartment) return new Error({ message: 'Apartment is not exists.' });

      await ApartmentModel.deleteOne(apartment);
      return { message: `Apartment ${id} was deleted` };
    } catch (error) {
      return new Error({ message: error.message });
    }
  }

  async update(body) {
    try {
      const { id, name, price, rooms, description, icon } = body;

      const apartment = await ApartmentModel.findOne({ _id: id });

      if (!apartment) return new Error({ message: 'Apartment is ont exists' });

      const isValid = isValidRequest(name, price, rooms, description);
      if (!isValid.status) return new Error({ message: isValid.message });

      await ApartmentModel.updateOne(apartment, { name, price, rooms, description });

      return {
        _id: id,
        name,
        price,
        rooms,
        description,
        icon
      };
    } catch (error) {
      return new Error({ message: error.message });
    }
  }
}

module.exports = new ApartmentService();