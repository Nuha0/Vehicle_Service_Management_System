const router = require("express").Router();
const Feedback = require("../../models/service-list-manager/feedbackeModel");

//Add new vehicle
router.post('/',async(req,res)=>{
    try{
        const {mail,message} = req.body;
       
        const newFeedback = new Feedback({
            mail,message
        });

        const savedFeedback = await newFeedback.save();
        res.status(200).send({data : savedFeedback});

    }catch(err){
        res.status(500).send({status : err});
    }
})


//View all vehicles
router.get('/', async(req,res)=>{
    try{
        const allFeedbacks = await Feedback.find();
        res.status(200).send({data : allFeedbacks});
    }catch(err){
        res.status(500).send({data : err});
    }
})

module.exports = router;