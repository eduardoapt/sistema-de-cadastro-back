const mongoose = require("mongoose");
require("dotenv").config();
const AutoIncrement = require("mongoose-sequence")(mongoose);
const mongoDataBase = mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = async () => {
  mongoDBConnection = await mongoDataBase;
};
