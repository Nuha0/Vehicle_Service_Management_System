const mongoose = require("mongoose");

const billPersonalSchema = new mongoose.Schema({
    serviceId : { type: String, required : true },
    serName : { type: String, required : true },
    vehiCat : { type: String, required : true },
    disAvail : { type: String, required : true },
    serPrice : { type: String, required : true },
    
   
});

const BillPersonal = mongoose.model("BillPersonal",billPersonalSchema);

module.exports = BillPersonal;