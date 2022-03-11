const mongoose = require("mongoose");

const repairDetailsSchema = new mongoose.Schema({
    Mileage : { type: String, required : true },
    Services : { type: String, required : true },
   
});

const RepairDetails = mongoose.model("RepairDetails",repairDetailsSchema);

module.exports = RepairDetails;