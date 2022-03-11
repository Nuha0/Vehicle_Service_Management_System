const router = require("express").Router();
const Salary = require("../../models/salary-manager/salaryModel");

//Add new salary Detail
router.post('/',async(req,res)=>{
    try{
        const {emp_name,emp_nic,emp_salary,ot_rate,total_salary} = req.body;
       
        const newSalary = new Salary({
            emp_name,emp_nic,emp_salary,ot_rate,total_salary
        });

        const savedSalary = await newSalary.save();
        res.status(200).send({data : savedSalary});

    }catch(err){
        res.status(500).send({status : err});
    }
})



//View all Salary Details
router.get('/', async(req,res)=>{
    try{
        const allSalary = await Salary.find();
        res.status(200).send({data : allSalary});
    }catch(err){
        res.status(500).send({data : err});
    }
})



//update Salary Details
router.put("/:id", async(req,res)=>{
    try{
        let _id = req.params.id;
        const {emp_name,emp_nic,emp_salary,ot_rate,total_salary} = req.body;


        const updateSalary = new Salary({
           _id,emp_name,emp_nic,emp_salary,ot_rate,total_salary
        });

        await Salary.findByIdAndUpdate(_id,updateSalary)
        res.status(200).send({data : updateSalary});
             
    }catch(err){
        res.status(500).send({data : err});
    }
})


//This route used to view specific Salary Deatil from table
router.get('/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        const salary = await Salary.find({_id : id})
        res.status(200).send({data : salary});

    }catch(err){
        res.status(500).send({data : err});
    }

})


//This route used to delete Salary Details from table
router.delete('/:id',async(req,res)=>{

    try{
        const id = req.params.id;
        const removedSalary = await Salary.findByIdAndDelete(id)
        res.status(200).send({data : removedSalary});
    

    }catch(err){
        res.status(500).send({data : err});
    }

})

module.exports = router;