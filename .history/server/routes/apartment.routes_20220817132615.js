const { Router } = require("express");
const router = new Router();

router.get("/apartments");
router.get(""); // get only one
router.post("/apartments");
router.delete("/apartments");
router.put("/apartments");

module.exports = router;