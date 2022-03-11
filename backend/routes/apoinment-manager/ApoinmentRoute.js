const router = require("express").Router();
const Apoinment = require("../../models/apoinment-manager/apoinmentModel");

//Add new Apoinment
router.post('/',async(req,res)=>{
    try{
        const {owner,nic,vehecalno,contactno,reason,date,time} = req.body;
       
        const newApoinment = new Apoinment({
            owner,nic,vehecalno,contactno,reason,date,time
        });

        const savedApoinment = await newApoinment.save();
        res.status(200).send({data : savedApoinment});

    }catch(err){
        res.status(500).send({status : err});
    }
})



//View all Apoinments
router.get('/', async(req,res)=>{
    try{
        const allApoinments = await Apoinment.find();
        res.status(200).send({data : allApoinments});
    }catch(err){
        res.status(500).send({data : err});
    }
})



//update Apoinments
router.put("/:id", async(req,res)=>{
    try{
        let _id = req.params.id;
        const {owner,nic,vehecalno,contactno,reason,date,time} = req.body;


        const updateApoinment = new Apoinment({
           _id, owner,nic,vehecalno,contactno,reason,date,time
        });

        await Apoinment.findByIdAndUpdate(_id,updateApoinment)
        res.status(200).send({data : updateApoinment});
             
    }catch(err){
        res.status(500).send({data : err});
    }
})


//This route used to view specific apoinment from table
router.get('/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        const apoinment = await Apoinment.find({_id : id})
        res.status(200).send({data : apoinment});

    }catch(err){
        res.status(500).send({data : err});
    }

})


//This route used to delete apoinmet from table
router.delete('/:id',async(req,res)=>{

    try{
        const id = req.params.id;
        const removedApoinment = await Apoinment.findByIdAndDelete(id)
        res.status(200).send({data : removedApoinment});
    

    }catch(err){
        res.status(500).send({data : err});
    }

})

module.exports = router;