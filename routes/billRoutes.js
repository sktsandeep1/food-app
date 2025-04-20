const express = require("express");

const {
  billController,
  getBillController,
} = require("../controllers/billController");

const router = express.Router();

router.post("/add-bills", billController);

router.get("/get-bills", getBillController);

module.exports = router;
