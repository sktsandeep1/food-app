const itemModel = require("../models/item.model")


// get items
const getItemController = async (req, res) => {
    try {
        const items = await itemModel.find();
        res.status(200).send(items);
    } catch (error) {
        console.log(error);
        
    }
}

// add items
const addItemController = async (req, res) => {
console.log("request dekhta hun")

try {
    const newItem = new itemModel(req.body);
    await newItem.save();
    res.status(201).send("Items Created Successfully!");
} catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Error adding item", error });
}


};

module.exports = {getItemController, addItemController}