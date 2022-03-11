const mongoose = require("mongoose");

const paymentPersonalSchema = new mongoose.Schema({
    paymentName : { type: String, required : true },
    invoiceNum : { type: String, required : true },
    vehiNum : { type: String, required : true },
    paymentMethod : { type: String, required : true },
    amount : { type: String, required : true },
    date : { type: String, required : true },
    time : { type: String, required : true },
    
   
});

const PaymentPersonal = mongoose.model("PaymentPersonal",paymentPersonalSchema);

module.exports = PaymentPersonal;