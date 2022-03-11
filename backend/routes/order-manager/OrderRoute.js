const router = require("express").Router();
const Order = require("../../models/order-manager/orderModel");

//Add new order
router.post('/',async(req,res)=>{
    try{
        const {dealer_name,comp_name,dealer_nic,dealer_no,items,quantity,quality,price} = req.body;
       
        const newOrder = new Order({
            dealer_name,comp_name,dealer_nic,dealer_no,items,quantity,quality,price
        });

        const savedOrder = await newOrder.save();
        res.status(200).send({data : savedOrder});

    }catch(err){
        res.status(500).send({status : err});
    }
})



//View all Orders
router.get('/', async(req,res)=>{
    try{
        const allOrders = await Order.find();
        res.status(200).send({data : allOrders});
    }catch(err){
        res.status(500).send({data : err});
    }
})



//update Orders
router.put("/:id", async(req,res)=>{
    try{
        let _id = req.params.id;
        const {dealer_name,comp_name,dealer_nic,dealer_no,items,quantity,quality,price} = req.body;


        const updateOrder = new Order({
           _id,dealer_name,comp_name,dealer_nic,dealer_no,items,quantity,quality,price
        });

        await Order.findByIdAndUpdate(_id,updateOrder)
        res.status(200).send({data : updateOrder});
             
    }catch(err){
        res.status(500).send({data : err});
    }
})


//This route used to view specific order from table
router.get('/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        const order = await Order.find({_id : id})
        res.status(200).send({data : order});

    }catch(err){
        res.status(500).send({data : err});
    }

})


//This route used to delete orders from table
router.delete('/:id',async(req,res)=>{

    try{
        const id = req.params.id;
        const removedOrder = await Order.findByIdAndDelete(id)
        res.status(200).send({data : removedOrder});
    

    }catch(err){
        res.status(500).send({data : err});
    }

})

module.exports = router;