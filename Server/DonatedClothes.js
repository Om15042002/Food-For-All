const express=require('express');
const mongoose=require("mongoose")
const bcrypt=require('bcryptJs')
const jwt=require('jsonwebtoken')
const Router=express.Router()
const Sequelize=require('sequelize')

const donatedClothesSchema=new mongoose.Schema({
    donor_id:{type:String,required:true},
    desc:{type:String,required:true},
    source_address:{type:String,required:true},
    dest_address:{type:String,required:false},
    photo_path:{type:String,required:true},
    quantity:{type:Number,required:true},
    donation_date:{type:Date,required:true},
    donated_date:{type:Date,required:false},
    status:{type:String,required:true},
    contact_no:{type:String,required:true}
})


const Cloth=mongoose.model('DonatedClothes',donatedClothesSchema)

Router.get('/getcloth',async (req,res)=>{
    const donor_id=req.session.donor_id
    const status='Pending'
    try{
        let cloth=await Cloth.find({donor_id:donor_id,status:status});
        console.log(cloth);
        return res.status(200).json(cloth)
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})

Router.get('/getallcloth',async (req,res)=>{
    const donor_id=req.session.donor_id
    try{
        let cloth=await Cloth.find({donor_id:donor_id});
        console.log(cloth);
        return res.status(200).json(cloth)
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})

Router.post('/donatecloth',async (req,res)=>{
    const {quantity,desc,source,mob_no,imgdata}=req.body
    const status="Pending"
    const donor_id=req.session.donor_id
    const photo_path=imgdata
    const destination=""
    const donation_date=Date.now()
    const donated_date=""
    try{ 
            const cloth=new Cloth({donor_id:donor_id,desc:desc,source_address:source,dest_address:destination,photo_path:photo_path,quantity:quantity,donation_date:donation_date,donated_date:donated_date,status:status,contact_no:mob_no})
            console.log(cloth);
            const flag=await cloth.save()
            console.log(flag);
            return res.status(200).json({msg:"Success"})
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})


module.exports={Router,Cloth}