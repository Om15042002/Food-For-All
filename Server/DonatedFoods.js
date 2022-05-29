const express=require('express');
const multer=require('multer')
const mongoose=require("mongoose")
const bcrypt=require('bcryptJs')
const jwt=require('jsonwebtoken')
const Router=express.Router()
const Sequelize=require('sequelize');
const { DATE } = require('sequelize');

const donatedFoodsSchema=new mongoose.Schema({
    donor_id:{type:String,required:true},
    foodname:{type:String,required:true},
    desc:{type:String,required:true},
    no_person:{type:Number,required:true},
    timeofmade:{type:Number,required:true},
    source_address:{type:String,required:true},
    dest_address:{type:String,required:false},
    photo_path:{type:String,required:true},
    donation_date:{type:Date,required:true},
    donated_date:{type:Date,required:false},
    status:{type:String,required:true},
    contact_no:{type:String,required:true}
})


const Food=mongoose.model('DonatedFoods',donatedFoodsSchema)


Router.use(express.static(__dirname+"./Images/"))

var donatedfoodstorage=multer.diskStorage({
    destination:function(res,file,cb){
      cb(null,"./Images/DonatedFood/")
    },
    filename:function(req,file,cb){
      cb(null,Date.now()+file.originalname)
    }
  })
  
var uploaddonatedfoodimage=multer({donatedfoodstorage:donatedfoodstorage}).single('file')
  
Router.get('/getfood',async (req,res)=>{
    const donor_id=req.session.donor_id
    const status='Pending'
    try{
        let food=await Food.find({donor_id:donor_id,status:status});
        console.log(food);
        return res.status(200).json(food)
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})

Router.get('/getallfood',async (req,res)=>{
    const donor_id=req.session.donor_id
    const status='Pending'
    try{
        let food=await Food.find({donor_id:donor_id});
        console.log(food);
        return res.status(200).json(food)
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})

Router.post('/donatefood',uploaddonatedfoodimage,async (req,res)=>{
    const {foodname,desc,no_person,hours,source,mob_no,imgdata}=req.body
    const donor_id=req.session.donor_id
    console.log(req.session.donor_id);
    const status="Pending"
    const photo_path=imgdata
    const destination=""
    const donation_date=Date.now()
    const donated_date=""
    
    // const foodimagetitle=req.file.title
    try{ 
            const food=new Food({donor_id:donor_id,foodname:foodname,desc:desc,no_person:no_person,timeofmade:hours,source_address:source,dest_address:destination,photo_path:photo_path,donation_date:donation_date,donated_date:donated_date,status:status,contact_no:mob_no})
            console.log(food);
            const flag=await food.save()
            console.log(flag);
            return res.status(200).json({msg:"Success"})
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})


module.exports={Router,Food}