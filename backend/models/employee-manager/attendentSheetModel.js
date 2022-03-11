const mongoose = require("mongoose");

const employeePositionSchema = new mongoose.Schema({
    mail : { type: String, required : true },
    startTime : { type: String, required : true },
    endTime : { type: String, required : true },
});

const EmployeePosition = mongoose.model("EmployeePosition",employeePositionSchema);

module.exports = EmployeePosition;
