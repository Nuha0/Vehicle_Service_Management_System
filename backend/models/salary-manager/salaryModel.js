const mongoose = require("mongoose");

const salaryPersonalSchema = new mongoose.Schema({
    emp_name : { type: String, required : true },
    emp_nic : { type: String, required : true },
    emp_salary : { type: String, required : true },
    ot_rate : { type: String, required : true },
    total_salary : { type: String, required : true },
   
});

const salaryPersonal = mongoose.model("salaryPersonal",salaryPersonalSchema);

module.exports = salaryPersonal;