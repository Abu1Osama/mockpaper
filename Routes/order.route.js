
const express=require("express")
const{orderModel}=require("../Models/order.model")
const orderRouter=express.Router()


orderRouter.post("/order",async(req,res)=>{
    try {
        const neworder=new orderModel(req.body)
        await neworder.save()
        res.status(201).send("msg","order successfull")
        
    } catch (error) {
        console.log(error)
    }
})


orderRouter.get("/orders",async(req,res)=>{
    try {
        const order=await orderModel.find({})
        res.status(200).send(order)
    } catch (error) {
        console.log(error)
        res.status(400).send({msg:"something went wrong"})
    }
})

module.exports={
    orderRouter
}
