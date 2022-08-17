const { Router } = require("express");
const router = new Router();

router.get("/apartments");
router.get("apartments"); // get only one
router.post("/apartments");
router.delete("apartments"); // delete only one
router.put("/apartments");

module.exports = router;