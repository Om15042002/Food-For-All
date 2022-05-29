const express=require('express');
const Router=express.Router()
const path=require('path')
const Requester=require('./RequesterSchema')
const bcrypt=require("bcryptjs")

Router.get('/getallrequester',async (req,res)=>{
    try {
        let requesters=await Requester.find(); 
        // console.log(volunteers);
        res.status(400).json(requesters)
    } catch (error) {
        console.log(error);
        res.status(400).json("Something went wrong !!")
    }
})

Router.post('/requestersignup',async (req,res)=>{
    // console.log(req.body);
    const {name,username,password,age,gender,email,mob_no,reason}=req.body
    try{ 
        var exists=await Requester.findOne({username:username})
        console.log(exists);
        if(exists)
        {
            return res.status(400).json({msg:"Exist"})
        }        
        else
        {
            const requester=new Requester({name:name,username:username,password:password,gender:gender,age:age,email_id:email,mob_no:mob_no})
            await requester.save()
                return res.status(200).json({msg:"Success"})
        }
    }
    catch(error)
    {
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})

Router.post('/requesterlogin',async (req,res)=>{
    // console.log(req.body);
    var token;
    const {username,password}=req.body
    try{ 
        var exists=await Requester.findOne({username:username})
        console.log(exists);
        if(exists)
        {
            const isMatch=await bcrypt.compare(password,exists.password)
            if(isMatch)
            { 
                token=await exists.generateToken();
                res.cookie('requestercookie',token)
                if(!req.session.requester_id){
                    req.session.requester_id=exists._id;
                    console.log(exists._id);
                    console.log(req.session.requester_id)
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

Router.post('/requesterlogout',async (req,res)=>{
    // console.log(req.body);
    var token;
    try{ 
            res.clearCookie("requestercookie")        
            return res.status(200).json({msg:"Loggedout"})
    }
    catch(error)
    {
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})

module.exports=Router