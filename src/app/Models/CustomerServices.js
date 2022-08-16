const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const CustomerServices = mongoose.Schema(
  {
    serviceId: { type: Number },
    clientName: { type: String, required: true },
    clientCPF: { type: Number, required: true },
    startingTime: { type: Date },
    receptionTime: { type: Date },
    nurseRoomTime: { type: Date },
    doctorTime: { type: Date },
  },
  {
    timestamps: true,
  }
);

CustomerServices.plugin(AutoIncrement, {
  id: "id_service",
  inc_field: "serviceId",
});

module.exports = mongoose.model("customerService", CustomerServices);
