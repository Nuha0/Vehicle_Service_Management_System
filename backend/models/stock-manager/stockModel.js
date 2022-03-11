const mongoose = require("mongoose");

const stockPersonalSchema = new mongoose.Schema({
    code : { type: String, required : true },
    name : { type: String, required : true },
    category : { type: String, required : true },
    quantity : { type: String, required : true },
    types : { type: String, required : true },
    price : { type: String, required : true },
   
   
});

const stockPersonal = mongoose.model("stockPersonal",stockPersonalSchema);

module.exports = stockPersonal;