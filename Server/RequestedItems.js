const express=require('express');
const mongoose=require("mongoose")
const bcrypt=require('bcryptJs')
const jwt=require('jsonwebtoken')
const Router=express.Router()
const Sequelize=require('sequelize');
const { DATE } = require('sequelize');
const Requester=require('./RequesterSchema')
const Volunteer=require('./VolunteerSchema')
const {Food}=require('./DonatedFoods')
const {Cloth}=require('./DonatedClothes')
const {Vessel}=require('./DonatedVessels')

const requestedItemsSchema=new mongoose.Schema({
    requester_id:{type:String,required:true},
    item_id:{type:String,required:false},
    desc:{type:String,required:true},
    no_person:{type:Number,required:false},
    source_address:{type:String,required:false},
    photo_path:{type:String,required:true},
    quantity: { type: Number, required: false }, 
    request_date:{type:Date,required:true},
    requestfullfilled_date:{type:Date,required:false},
    status:{type:String,required:true},
    contact_no:{type:String,required:true},
    requesttype:{type:String,required:true}
})


const Item=mongoose.model('RequestedItems',requestedItemsSchema)

Router.get('/getrequestedfoods',async (req,res)=>{
    const status="Pending"
    const requesttype="food"
    let datas=[]
    console.log("Hiiii");
    try{
        let requests=await Item.find({status:status,requesttype:requesttype});
        console.log(requests);
        for (const request of requests)     
        {
            let requester=await Requester.findOne({_id:request.requester_id})
            datas.push({request:request,requester:requester})
        }
        console.log("seperation");
        console.log(datas);
        let foods=await Food.find({status:"Pending"});
        // console.log(foods);
        let volunteers=await Volunteer.find({work_status:"Free"});
        // console.log(volunteers);
        return res.status(200).json({datas:datas,foods:foods,volunteers:volunteers})
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})

Router.get('/getrequestedcloths',async (req,res)=>{
    const status="Pending"
    const requesttype="cloth"
    let datas=[]
    try{
        let requests=await Item.find({status:status,requesttype:requesttype});
        for (const request of requests)     
        {
            let requester=await Requester.findOne({_id:request.requester_id})
            datas.push({request:request,requester:requester})
        }
        let cloths=await Cloth.find({status:"Pending"});
        let volunteers=await Volunteer.find({work_status:"Free"});
        console.log(volunteers);
        return res.status(200).json({datas:datas,cloths:cloths,volunteers:volunteers})
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})

Router.get('/getrequestedvessels',async (req,res)=>{
    const status="Pending"
    const requesttype="vessel"
    let datas=[]
    try{
        let requests=await Item.find({status:status,requesttype:requesttype});
        for (const request of requests)     
        {
            let requester=await Requester.findOne({_id:request.requester_id})
            datas.push({request:request,requester:requester})
        }
        let vessels=await Vessel.find({status:"Pending"});
        let volunteers=await Volunteer.find({work_status:"Free"});
        console.log(volunteers);
        return res.status(200).json({datas:datas,vessels:vessels,volunteers:volunteers})
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})

Router.get('/getfoodrequest',async (req,res)=>{
    const requester_id=req.session.requester_id
    const status="Pending"
    const requesttype="food"
    console.log("HII");
    try{
        let item=await Item.find({requester_id:requester_id,status:status,requesttype:requesttype});
        console.log(item);
        return res.status(200).json(item)
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})

Router.get('/getvesselrequest',async (req,res)=>{
    const requester_id=req.session.requester_id
   
    const status='Pending'
    const itemtype="vessel"
    try{
        let item=await Item.find({requester_id:requester_id,status:status,requesttype:itemtype});
        console.log(item);
        return res.status(200).json(item)
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})
Router.get('/getclothrequest',async (req,res)=>{
    const requester_id=req.session.requester_id
    const status='Pending'
    const itemtype="cloth"
    try{
        let item=await Item.find({requester_id:requester_id,status:status,requesttype:itemtype});
        console.log(item);
        return res.status(200).json(item)
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})

Router.get('/getallfoodrequest',async (req,res)=>{
    const requester_id=req.session.requester_id
    const itemtype="food"
    try{
        let item=await Item.find({requester_id:requester_id,requesttype:itemtype});
        console.log(item);
        return res.status(200).json(item)
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})
Router.get('/getallvesselrequest',async (req,res)=>{
    const requester_id=req.session.requester_id
    const itemtype="vessel"
    try{
        let item=await Item.find({requester_id:requester_id,requesttype:itemtype});
        console.log(item);
        return res.status(200).json(item)
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})
Router.get('/getallclothrequest',async (req,res)=>{
    const requester_id=req.session.requester_id
    const itemtype="cloth"
    try{
        let item=await Item.find({requester_id:requester_id,requesttype:itemtype});
        console.log(item);
        return res.status(200).json(item)
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})


Router.post('/requestitem',async (req,res)=>{
    const {desc,no_person,quantity,requesttype,source,mob_no,imgdata}=req.body
    const requester_id=req.session.requester_id
    const status="Pending"
    const photo_path=imgdata
    const request_date=Date.now()
    const requestfullfilled_date="";

    try{ 
            const item=new Item({requester_id:requester_id,desc:desc,no_person:no_person,source_address:source,photo_path:photo_path,quantity:quantity,request_date:request_date,requestfullfilled_date:requestfullfilled_date,status:status,contact_no:mob_no,requesttype:requesttype})
            console.log(item);
            const flag=await item.save()
            console.log(flag);
            return res.status(200).json({msg:"Success"})
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})


module.exports={Router,Item}