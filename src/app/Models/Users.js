const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Users = mongoose.Schema(
  {
    sequentialId: { type: Number },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    perfil: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

Users.plugin(AutoIncrement, {
  id: "id_seq",
  inc_field: "sequentialId",
});

module.exports = mongoose.model("user", Users);
