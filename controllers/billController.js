const billModel = require("../models/bill.model");

const billController = async (req, res) => {
  try {
    const newBills = new billModel(req.body);
    await newBills.save();
    res.send("bill generated successfully");
    console.log("bill generated successfully");
  } catch (error) {
    res.send("something went wrong in billsPage");
    console.log(error, "something went wrong in billsPage");
  }
};

const getBillController = async (req, res) => {
  try {
    const bills = await billModel.find();
    res.send(bills);
    console.log("got the bills in billscontroller");
  } catch (error) {
    console.log(error);
    console.log("bill controller mein error h");
  }
};

module.exports = { billController, getBillController };
