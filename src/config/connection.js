const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const mongoDataBase = mongoose.connect("mongodb://localhost:27017/nodejs", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = async () => {
  mongoDBConnection = await mongoDataBase;
};
