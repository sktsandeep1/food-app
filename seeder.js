const mongoose = require ("mongoose")
const dotenv = require("dotenv");
const connectDb = require ('./config/config');
const itemModel = require('./models/item.model');
const dataItems = require('./utils/data');

// config
dotenv.config()
connectDb();


// function seeder

const importData = async () => {
    try {
        await itemModel.deleteMany()
        const itemsdata = await itemModel.insertMany(dataItems);
        console.log('all items added'.bgGreen)
        process.exit();
    } catch (error) {
        console.log(`${error}`.bgRed.inverse);
        process.exit(1)
    }
}
 importData();