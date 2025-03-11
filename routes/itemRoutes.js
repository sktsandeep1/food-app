const express = require("express");

const {getItemController, addItemController} = require("../controllers/itemController")
const router = express.Router();


// routes

// method - get
router.get('/get-item', getItemController)

// method - post
router.post("/add-item", addItemController);

// method - post

// method - post

// method - post


module.exports = router;