const { Router } = require("express");
const router = new Router();

const apartmentController = require("../controllers/apartment.controller");

router.get("/", apartmentController.getApartments);
router.get("/apartment", apartmentController.getApartment); 
router.post("/apartment");
router.delete("apartment"); 
router.put("/apartment");

module.exports = router;