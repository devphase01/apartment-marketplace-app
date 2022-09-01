const { Router } = require('express');
const router = new Router();

const apartmentController = require('../controllers/apartment.controller');

router.get('', apartmentController.getApartments);
router.post('', apartmentController.addApartment);

router.get('/:id', apartmentController.getApartment);
router.delete('/:id', apartmentController.deleteApartment);
router.put('/:id', apartmentController.updateApartment);

module.exports = router;
