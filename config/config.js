const mongoose = require("mongoose");
require("colors");

//connect DB Funtion
const connectDb = async () => {
  try {
    const connectt = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    });
    // useNewUrlParser: true;
    // useCreateIndex: true;
    // useUnifiedTopology: true;
    // useFindAndModify: false;
    console.log(`mongodb connected ${connectt.connection.host}`.bgYellow);
  } catch (error) {
    console.log(`Error :${error.message}`.bgRed);
    process.exit(1);
  }
};

// exports
module.exports = connectDb;
