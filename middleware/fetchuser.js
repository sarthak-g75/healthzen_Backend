const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SEC;
// const patient= require("../models/Patient");
// const Doctor= require("../models/Doctor");
const Patient = require("../models/Patient");

const fetchuser = async (req, res, next) => {
  // get the user from the jwt token and id to req obj
  const token = req.header("auth-token");

  if (!token) {
    res.status(401).send({ error: "Plese Authenticate using a valid token" });
    return;
  }
  try {
 
    const data = jwt.verify(token, JWT_SECRET);
    // console.log(data);
    // console.log(data)
    
      // role = await Patient.findById(data.patientUser.id).select("role");

        req.patient = data;
        // req.role = role.role;
  
    
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};
module.exports = fetchuser;