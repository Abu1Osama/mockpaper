const express = require("express");
const bookRouter = express.Router();
const { bookModel } = require("../Models/book.model");
const { validator } = require("../Middlewares/validator");

bookRouter.post("/api/books",  async (req, res) => {
  try {

    const data=new bookModel(req.body)
    await data.save()
    res.status(202).send({"msg":"books added"})
  } catch (error) {
    console.log({ error: error });
    res.status(500).send({ msg: error });
  }
});

bookRouter.get("/api/books",async(req,res)=>{
    try {
        let bookData=await bookModel.find()
        res.status(200).send(bookData);
        
    } catch (error) {
        console.log("error",error)
        res.status(500).send({"msg":error});
    }
})

bookRouter.get("/api/books/:id",async(req,res)=>{
    try {
        let bookData=await bookModel.findOne({_id:req.params.id})
    
            res.status(200).send(bookData);
        
        
    } catch (error) {
        console.log("error",error)
        res.status(500).send({"msg":error});
    }
})


bookRouter.delete("/api/books/:id",async(req,res)=>{
    try {
        let id=req.params.id
        let bookData=await bookModel.findByIdAndDelete({_id:id})
       res.status(202).send({"msg":"book has been deleted"})
        
    } catch (error) {
        console.log("error",error)
        res.status(500).send({"msg":error});
    }
})


bookRouter.patch("/api/books/:id",async(req,res)=>{
    try {
        let id=req.params.id
        const updateData=req.body
        let bookData=await bookModel.findByIdAndUpdate({_id:id},updateData)
        if(bookData.length==0){
            res.status(409).send({"msg":"id is not valid"})
        }else{

            res.status(204).send({"msg":"book with particular id has been updated"});
        }
        
    } catch (error) {
        console.log("error",error)
        res.status(500).send({"msg":error});
    }
})





module.exports={
    bookRouter
}

