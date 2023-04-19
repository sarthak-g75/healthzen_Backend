const mongoose = require("mongoose");
const { Schema } = mongoose;
const AppointmentSchema = new Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    
  },
  status: {
    type: String,
    default: "Open",
  },
  details:{
    type:String,
    
  },
  date:{
    type:Date,
    required:false,
  },

  createDate: {
    type: Date,
    default: Date.now,
  },

});
const Appointment = mongoose.model("appointments", AppointmentSchema);
module.exports = Appointment;
