const express=require('express');
const Router=express.Router()
const path=require('path')
const Donor=require('./DonorSchema')
const bcrypt=require("bcryptjs")

Router.get('/getalldonor',async (req,res)=>{
    try {
        let donors=await Donor.find(); 
        // console.log(volunteers);
        res.status(400).json(donors)
    } catch (error) {
        console.log(error);
        res.status(400).json("Something went wrong !!")
    }
})

Router.post('/donorsignup',async (req,res)=>{
    // console.log(req.body);
    const {name,username,password,age,gender,email,mob_no,reason}=req.body
    try{ 
        var exists=await Donor.findOne({username:username})
        console.log(exists);
        if(exists)
        {
            return res.status(400).json({msg:"Exist"})
        }        
        else
        {
            const donor=new Donor({name:name,username:username,password:password,gender:gender,age:age,email_id:email,mob_no:mob_no})
            console.log(donor);
            await donor.save()
                return res.status(200).json({msg:"Success"})
        }
    }
    catch(error)
    {
        // console.log(error);
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})

Router.post('/donorlogin',async (req,res)=>{
    // console.log(req.body);
    var token;
    const {username,password}=req.body
    try{ 
        var exists=await Donor.findOne({username:username})
        console.log(exists);
        if(exists)
        {
            const isMatch=await bcrypt.compare(password,exists.password)
            if(isMatch)
            {
                token=await exists.generateToken();
                res.cookie('donorcookie',token)
                if(!req.session.donor_id){
                    req.session.donor_id=exists._id;
                    console.log(exists._id);
                    console.log(req.session.donor_id)
                }              
                return res.status(200).json({msg:"Success"})
            }
        }        
        return res.status(400).json({msg:"Not found"})
    }
    catch(error)
    {
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})

Router.post('/donorlogout',async (req,res)=>{
    // console.log(req.body);
    var token;
    try{ 
            res.clearCookie("donorcookie")        
            return res.status(200).json({msg:"Loggedout"})
    }
    catch(error)
    {
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})

module.exports=Router