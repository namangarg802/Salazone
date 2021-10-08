const express = require("express");

const Appointment = require("../Models/Appointment");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var fetchuser = require("../Middleware/fetchuser");
router.post("/BookAppointment", fetchuser, async (req, res) => {
  const errors = validationResult(req);
  let success = false;
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {
    const appoint = await Appointment.findOne({ user: req.user.id });
    if (appoint) {
      return res
        .status(400)
        .json({ success, error: "Appointment already exists" });
    }
    const { services, AppointmentDate, AppointmentTime } = req.body;
    const appointment = new Appointment({
      user: req.user.id,
      services,
      AppointmentDate,
      AppointmentTime,
    });
    success = true;
    const savedappointment = await appointment.save();
    res.json({ success, savedappointment });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("some error occured");
  }
});
module.exports = router;
