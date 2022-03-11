const router = require("express").Router();
const Bill = require("../../models/billing-management/billingModel");


//Add new Billig Details
router.post('/',async(req,res)=>{
    try{
        const {serviceId, serName, vehiCat, disAvail, serPrice} = req.body;
       
        const newBill = new Bill({
            serviceId,serName,vehiCat,disAvail,serPrice
        });

        const savedBill = await newBill.save();
        res.status(200).send({data : savedBill});

    }catch(err){
        res.status(500).send({status : err});
    }
})



//View all Billing Details
router.get('/', async(req,res)=>{
    try{
        const allBills = await Bill.find();
        res.status(200).send({data : allBills});
    }catch(err){
        res.status(500).send({data : err});
    }
})



//update Billing Details
router.put("/:id", async(req,res)=>{
    try{
        let _id = req.params.id;
        const {serviceId, serName, vehiCat, disAvail, serPrice} = req.body;


        const updateBill = new Bill({
           _id, serviceId, serName, vehiCat, disAvail, serPrice
        });

        await Bill.findByIdAndUpdate(_id,updateBill)
        res.status(200).send({data : updateBill});
             
    }catch(err){
        res.status(500).send({data : err});
    }
})


//This route used to view specific Billing detail from table
router.get('/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        const bill = await Bill.find({_id : id})
        res.status(200).send({data : bill});

    }catch(err){
        res.status(500).send({data : err});
    }

})


//This route used to delete Billing detail from table
router.delete('/:id',async(req,res)=>{

    try{
        const id = req.params.id;
        const removedBill = await Bill.findByIdAndDelete(id)
        res.status(200).send({data : removedBill});
    

    }catch(err){
        res.status(500).send({data : err});
    }

})

module.exports = router;