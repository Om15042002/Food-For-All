const express=require('express');
const Router=express.Router()
const path=require('path')
const Volunteer=require('./VolunteerSchema') 
const bcrypt=require('bcryptJs')
// const session=require('express-session');


Router.get('/getallvolunteer',async (req,res)=>{
    try {
        let volunteers=await Volunteer.find();
        // console.log(volunteers);
        res.status(400).json(volunteers)
    } catch (error) {
        console.log(error);
        res.status(400).json("Something went wrong !!")
    }
}) 

Router.post('/volunteersignup',async (req,res)=>{
    // console.log(req.body);
    const {name,username,password,gender,age,email,mob_no,reason}=req.body
    const status="Pending"
    try{ 
        var exists=await Volunteer.findOne({username:username})
        console.log(exists);
        if(exists)
        {
            return res.status(400).json({msg:"Exist"})
        }        
        else
        {
            const volunteer=new Volunteer({name:name,username:username,password:password,gender:gender,age:age,
            email_id:email,mob_no:mob_no,reason:reason,status:status,work_status:"Free"})
            console.log(volunteer);
            const flag=await volunteer.save()
            return res.status(200).json({msg:"Success"})
        }
    }
    catch(error)
    {
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})

Router.post('/volunteerlogin',async (req,res)=>{
    // console.log(req.body);
    var token;
    const {username,password}=req.body
    try{ 
        var exists=await Volunteer.findOne({username:username})
        // console.log(exists);
        if(exists)
        {
            const isMatch=await bcrypt.compare(password,exists.password)
            if(isMatch)
            {
                token=await exists.generateToken();
                res.cookie('volunteercookie',token)
                if(!req.session.volunteer_id){
                    req.session.volunteer_id=exists._id;
                    console.log(exists._id);
                    console.log(req.session.volunteer_id)
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

Router.post('/volunteerlogout',async (req,res)=>{
    // console.log(req.body);
    var token;
    try{ 
            res.clearCookie("volunteercookie")     
            console.log("Hii"); 
            return res.status(200).json({msg:"Loggedout"})
    }
    catch(error)
    {
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})

module.exports=Router