const { Router } = require("express");
const router = new Router();

router.get("/apartments");
router.get(""); // get only one
router.post("/apartments");
router.delete(""); // delete only one
router.put("/apartments");

module.exports = router;