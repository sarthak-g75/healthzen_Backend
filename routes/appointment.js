const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Appointment = require("../models/Appointment");

const JWT_SECRET = process.env.JWT_SEC;



// Route 2: Book an Appointment using : POST:"/api/appoint/bookAppointment/:id"
router.post("/bookAppointment/:id", fetchuser, async (req, res) => {
    try { 
        let success = false;
        // console.log(req.patient);
        let user = await Doctor.findById(req.params.id);
        // console.log(req.params.id);
        if(!user){
            res.status(404).json({success,message:"Doctor not found"});
            return ;
        }
        if (user.user !== req.user) {
            res.status(401).json({success,message:"Not Allowed"});
            return;
          }
          let appointment = await Appointment.create({
            patientId: req.patient,
            doctorId:req.params.id,
            details:req.body.details,
            date:req.body.date
          })
          // console.log(appointment.id);
        //   appointment = await Appointment.findById()
          let patientUser = await Patient.updateOne({_id:req.patient},{ $push:{appointments:appointment._id}})
         user = await Doctor.updateOne(
            {_id:req.params.id},
            { $push:{appointments:appointment._id} }
          ); 
          success = true;
          res.json({success})
          
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

// Route 3: Get all appointments from a user : POST:"/api/appoint/getAllAppointments"
router.get("/getAllAppointments", fetchuser, async (req, res) => {
    try {
      const patient = await Patient.findById(req.patient).select("appointments");
      // console.log(req.user);
      res.json(patient);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  });
// Route 4: Get all appointments from a doc : POST:"/api/appoint/getAllAppointmentsDoc"
router.get("/getAllAppointmentsDoc", async (req, res) => {


        const token = req.header("auth-token");

  if (!token) {
    res.status(401).send({ error: "Plese Authenticate using a valid token" });
    return;
  }

try{
    const data = jwt.verify(token, JWT_SECRET);
    // console.log(data);
      const user = await Doctor.findById(data).select("appointments");
      // console.log(req.user);
      res.json(user);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = router;