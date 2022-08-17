const { Router } = require("express");
const router = new Router();

const apartmentController = require("../controllers/apartment.controller");

router.get("/", apartmentController.getApartments);
router.get("/apartment", apartmentController.getApartment); 
router.post("/apartment", apartmentController.addApartment);
router.delete("apartment", apartmentController.deleteApartment); 
router.put("/apartment", apartmentController.updateApartment);

module.exports = router;