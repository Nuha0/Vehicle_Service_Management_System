const router = require("express").Router();
const Payment = require("../../models/financial-manager/financialModel");

//Add new invoice
router.post('/',async(req,res)=>{
    try{
        const {paymentName,invoiceNum,vehiNum,paymentMethod,amount,date,time} = req.body;
       
        const newPayment = new Payment({
            paymentName,invoiceNum,vehiNum,paymentMethod,amount,date,time
        });

        const savedPayment = await newPayment.save();
        res.status(200).send({data : savedPayment});

    }catch(err){
        res.status(500).send({status : err});
    }
})



//View all invoices
router.get('/', async(req,res)=>{
    try{
        const allPayments = await Payment.find();
        res.status(200).send({data : allPayments});
    }catch(err){
        res.status(500).send({data : err});
    }
})



//update payments
router.put("/:id", async(req,res)=>{
    try{
        let _id = req.params.id;
        const {paymentName,invoiceNum,vehiNum,paymentMethod,amount,date,time} = req.body;


        const updatePayment = new Payment({
           _id, paymentName,invoiceNum,vehiNum,paymentMethod,amount,date,time
        });

        await Payment.findByIdAndUpdate(_id,updatePayment)
        res.status(200).send({data : updatePayment});
             
    }catch(err){
        res.status(500).send({data : err});
    }
})


//This route used to view specific payment from table
router.get('/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        const payment = await Payment.find({_id : id})
        res.status(200).send({data : payment});

    }catch(err){
        res.status(500).send({data : err});
    }

})


//This route used to delete invoice from table
router.delete('/:id',async(req,res)=>{

    try{
        const id = req.params.id;
        const removedPayment = await Payment.findByIdAndDelete(id)
        res.status(200).send({data : removedPayment});
    

    }catch(err){
        res.status(500).send({data : err});
    }

})

module.exports = router;