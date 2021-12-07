const mongoose = require("mongoose");
const { Schema } = mongoose;
const AppointmentSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  services: {
    type: [String],
    required: true,
  },
  AppointmentDate: {
    type: String,
    required: true,
  },
  AppointmentTime: {
    type: String,
    required: true,
  },
  Bookingdate: {
    type: Date,
    default: Date.now,
  },
});
// module.exports=mongoose.model('notes',NotesSchema)
const appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = appointment;
