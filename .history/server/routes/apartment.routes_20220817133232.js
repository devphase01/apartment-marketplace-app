const { Router } = require("express");
const router = new Router();

router.get("/apartments");
router.get("/apartment"); // get only one
router.post("/apartment");
router.delete("apartment"); // delete only one
router.put("/apartment");

module.exports = router;