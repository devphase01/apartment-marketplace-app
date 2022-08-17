const { Router } = require("express");
const router = new Router();

router.get("/");
router.get("/apartment"); 
router.post("/apartment");
router.delete("apartment"); 
router.put("/apartment");

module.exports = router;