const { Router } = require("express");
const router = new Router();

const apartmentController = require("../controllers/apartment.controller");

router.get("", apartmentController.getApartments);
router.post("", apartmentController.addApartment);

router.get("/apartment", apartmentController.getApartment); 
router.delete("/apartment", apartmentController.deleteApartment); 
router.put("/apartment", apartmentController.updateApartment);

module.exports = router;