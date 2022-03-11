const router = require("express").Router();
const repairDetails = require("../../models/service-list-manager/repair-details-model");

//Add new vehicle
router.post('/',async(req,res)=>{
    try{
        const {Mileage,Services} = req.body;
       
        const newDetails = new repairDetails({
            Mileage,Services
        });

        const savedDetails = await newDetails.save();
        res.status(200).send({data : savedDetails});

    }catch(err){
        res.status(500).send({status : err});
    }
})



//View all vehicles
router.get('/', async(req,res)=>{
    try{
        const allDetails = await repairDetails.find();
        res.status(200).send({data : allDetails});
    }catch(err){
        res.status(500).send({data : err});
    }
})



//update vehicles
router.put("/:id", async(req,res)=>{
    try{
        let _id = req.params.id;
        const {Mileage,Services} = req.body;

        const updateDetails = new repairDetails({
           _id, Mileage,Services
        });

        await repairDetails.findByIdAndUpdate(_id,updateDetails)
        res.status(200).send({data : updateDetails});
             
    }catch(err){
        res.status(500).send({data : err});
    }
})


//This route used to view specific vehicle from table
router.get('/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        const details = await repairDetails.find({_id : id})
        res.status(200).send({data : details});

    }catch(err){
        res.status(500).send({data : err});
    }

})


//This route used to delete vehicle from table
router.delete('/:id',async(req,res)=>{

    try{
        const id = req.params.id;
        const removedDetails = await repairDetails.findByIdAndDelete(id)
        res.status(200).send({data : removedDetails});
    

    }catch(err){
        res.status(500).send({data : err});
    }

})

module.exports = router;