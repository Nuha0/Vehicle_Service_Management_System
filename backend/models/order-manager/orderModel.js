const mongoose = require("mongoose");

const orderPersonalSchema = new mongoose.Schema({
    dealer_name : { type: String, required : true },
    comp_name : { type: String, required : true },
    dealer_nic : { type: String, required : true },
    dealer_no : { type: String, required : true },
    items : { type: String, required : true },
    quantity : { type: String, required : true },
    quality : { type: String, required : true },
    price : { type: String, required : true },
   
});

const OrderPersonal = mongoose.model("OrderPersonal",orderPersonalSchema);

module.exports = OrderPersonal;