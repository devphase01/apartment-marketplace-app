/**
 *
 * @param {string} name
 * @param {int} price
 * @param {int} rooms
 * @param {string} description
 * @return {object} The status of validation
 */
function isValidRequest(name, price, rooms, description) {
  const nameLen = name.length;
  const descriptionLen = description.length;

  if (nameLen > 99 || nameLen < 1) {
    return {
      status: false,
      message: 'Name should be in range 0 < name.length < 99',
    };
  }

  if (price < 0) {
    return {
      status: false,
      message: 'Price can not be less 0',
    };
  }

  if (rooms < 1) {
    return {
      status: false,
      message: 'Room count can not be less then 0 or equal to',
    };
  }
  if (descriptionLen > 99) {
    return {
      status: false,
      message: 'Description is too long',
    };
  }

  return {
    status: true,
    message: 'Valid!',
  };
}

module.exports = isValidRequest;
