const router = require("express").Router();
const Stock = require("../../models/stock-manager/stockModel");

//Add new stock
router.post('/',async(req,res)=>{
    try{
        const {code,name,category,quantity,types,price} = req.body;
       
        const newStock = new Stock({
            code,name,category,quantity,types,price
        });

        const savedStock = await newStock.save();
        res.status(200).send({data : savedStock});

    }catch(err){
        res.status(500).send({status : err});
    }
})



//View all Stocks
router.get('/', async(req,res)=>{
    try{
        const allStocks = await Stock.find();
        res.status(200).send({data : allStocks});
    }catch(err){
        res.status(500).send({data : err});
    }
})



//update Stocks
router.put("/:id", async(req,res)=>{
    try{
        let _id = req.params.id;
        const {code,name,category,quantity,types,price} = req.body;


        const updateStock = new Stock({
           _id, code,name,category,quantity,types,price
        });

        await Stock.findByIdAndUpdate(_id,updateStock)
        res.status(200).send({data : updateStock});
             
    }catch(err){
        res.status(500).send({data : err});
    }
})


//This route used to view specific Stock from table
router.get('/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        const stock = await Stock.find({_id : id})
        res.status(200).send({data : stock});

    }catch(err){
        res.status(500).send({data : err});
    }

})


//This route used to delete stock from table
router.delete('/:id',async(req,res)=>{

    try{
        const id = req.params.id;
        const removedStock = await Stock.findByIdAndDelete(id)
        res.status(200).send({data : removedStock});
    

    }catch(err){
        res.status(500).send({data : err});
    }

})

module.exports = router;