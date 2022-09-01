/**
 *
 * @param {*} _req c
 * @param {*} res c
 * @param {*} next c
 */

// eslint-disable-next-line require-jsdoc
function cors(_req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

module.exports = cors;
