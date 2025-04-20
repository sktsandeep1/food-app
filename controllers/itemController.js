const itemModel = require("../models/item.model");

// get items
const getItemController = async (req, res) => {
  try {
    const items = await itemModel.find();
    res.status(200).send(items);
    console.log("got the items in itemcontroller");
  } catch (error) {
    console.log(error);
  }
};

// add items
const addItemController = async (req, res) => {
  console.log("request dekhta hun");

  try {
    const newItem = new itemModel(req.body);
    await newItem.save();
    res.status(201).send("Items Created Successfully!");
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Error adding item", error });
  }
};

//update item
const editItemController = async (req, res) => {
  try {
    await itemModel.findOneAndUpdate({ _id: req.body.itemId }, req.body);
    res.status(201).send("Item Updated ");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

//delete item
const deleteItemController = async (req, res) => {
  try {
    const { itemId } = req.body;  
    await itemModel.findOneAndDelete({ _id: itemId });
    res.status(200).send("Item Deleted ");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

module.exports = {
  getItemController,
  addItemController,
  editItemController,
  deleteItemController,
};
