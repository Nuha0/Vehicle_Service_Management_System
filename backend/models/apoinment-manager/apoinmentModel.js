const mongoose = require("mongoose");

const apoinmentPersonalSchema = new mongoose.Schema({
    owner : { type: String, required : true },
    nic : { type: String, required : true },
    vehecalno : { type: String, required : true },
    contactno : { type: String, required : true },
    reason : { type: String, required : true },
    date : { type: Date, required : true },
    time : { type: String, required : true },
   
});

const ApoinmentPersonal = mongoose.model("ApoinmentPersonal",apoinmentPersonalSchema);

module.exports = ApoinmentPersonal;
