const express=require('express');
const mongoose=require("mongoose")
const Router=express.Router()
const bcrypt=require('bcryptJs')
const jwt=require('jsonwebtoken')
const Donor=require('./DonorSchema')
const {Food}=require('./DonatedFoods') 
const {Cloth}=require('./DonatedClothes')
const {Vessel}=require('./DonatedVessels')
const {Area}=require('./DistributionAreas')
const Volunteer=require('./VolunteerSchema')
  
Router.get('/getfoodrequests',async (req,res)=>{ 
    const status='Pending'
    let datas=[] 
    try{
        let foods=await Food.find({status:status});
        console.log(foods);
        for (const food of foods)     
        {
            let donor=await Donor.findOne({_id:food.donor_id})
            datas.push({item:food,donor:donor})
        }
        let areas=await Area.find();
        let volunteers=await Volunteer.find({work_status:"Free"});
        // console.log(volunteers);
        return res.status(200).json({datas:datas,areas:areas,volunteers:volunteers})
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})

Router.get('/getclothrequests',async (req,res)=>{
    const status='Pending' 
    let datas=[]
    try{
        let cloths=await Cloth.find({status:status});
        for (const cloth of cloths)     
        {
            let donor=await Donor.findOne({_id:cloth.donor_id})
            datas.push({item:cloth,donor:donor})
        }
        let areas=await Area.find();
        let volunteers=await Volunteer.find({work_status:"Free"});
        // console.log(volunteers);
        return res.status(200).json({datas:datas,areas:areas,volunteers:volunteers})
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})

Router.get('/getvesselrequests',async (req,res)=>{
    const status='Pending'
    let datas=[]
    try{
        let vessels=await Vessel.find({status:status});
        for (const vessel of vessels)     
        { 
            let donor=await Donor.findOne({_id:vessel.donor_id})
            datas.push({item:vessel,donor:donor})
        }
        let areas=await Area.find();
        let volunteers=await Volunteer.find({work_status:"Free"});
        // console.log(volunteers);
        return res.status(200).json({datas:datas,areas:areas,volunteers:volunteers})
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})

module.exports=Router