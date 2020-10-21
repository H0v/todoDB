const mongoose = require("mongoose");
const connectDB = async () => {
  const response = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  console.log("DB Connected to ", response.connection.host);
};

module.exports = connectDB;
