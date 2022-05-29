const express=require('express');
const mongoose=require("mongoose")
const Router=express.Router()
const bcrypt=require('bcryptJs')
const jwt=require('jsonwebtoken')
const Donor=require('./DonorSchema')
const {Food}=require('./DonatedFoods')
const {Cloth}=require('./DonatedClothes')
const {Vessel}=require('./DonatedVessels') 
const Volunteer=require('./VolunteerSchema')
const {Area}=require('./DistributionAreas')
const {Item}=require('./RequestedItems')

const assignedTasksSchema=new mongoose.Schema({ 
    volunteer_id:{type:String,required:true},
    donation_type:{type:String,required:true},
    donation_id:{type:String,required:true},
    source_address:{type:String,required:true},
    dest_address:{type:String,required:true},
    accept_status:{type:String,required:true},
    donated_status:{type:String,required:true},
    reason:{type:String,required:false},
    requested_date:{type:Date,required:true} 
})


const Task=mongoose.model('AssignedTasks',assignedTasksSchema)

Router.post('/newtask',async (req,res)=>{
    try {
        //update status in item
        console.log(req.body);
        const {volunteer,area,itemId,type}=req.body
        var item,flag
        if(type==="Food")
        {
            item=await Food.findOne({_id:itemId})
            flag=await Food.updateOne({_id:itemId},{$set:{status:"Assigned"}})
        }
        else if(type==="Cloth")
        {
            item=await Cloth.findOne({_id:itemId})
            flag=await Cloth.updateOne({_id:itemId},{$set:{status:"Assigned"}})
        }
        else
        {
            item=await Vessel.findOne({_id:itemId})
            flag=await Vessel.updateOne({_id:itemId},{$set:{status:"Assigned"}})
        }
        try{
            await Task.deleteOne({$and:[{donation_id:itemId},{accept_status:"Rejected"}]});
            console.log("executed");
        }
        catch(error){
            console.log("because of delee");
        }
        let newtask=new Task({volunteer_id:volunteer,donation_type:type,donation_id:itemId,source_address:item.source_address,dest_address:area,accept_status:"Pending",donated_status:"Pending",reason:"",requested_date:Date.now()})
        flag=await newtask.save()
        await Area.updateOne({address:area},{$set:[{status:"Received"},{lastdate:Date.now()}]})
        // await Volunteer.updateOne({_id:volunteer},{$set:{work_status:"Assigned"}})
        return res.status(200).json({msg:"Success"})

    } catch (error) {
        console.log(error);
        res.status(400).json("Somethig went wrong !!")
    }
});
 
Router.post('/newtaskforrequest',async (req,res)=>{
    try {
        //update status in item
        console.log(req.body);
        const {volunteer,item,itemId,area,type}=req.body
        var donation,flag 
        console.log(itemId);
        console.log(area);
        if(type==="Food")
        {
            donation=await Food.findOne({_id:item})
            flag=await Food.updateOne({_id:item},{$set:{status:"Assigned"}})
        }
        else if(type==="Cloth")
        {
            donation=await Cloth.findOne({_id:item})
            flag=await Cloth.updateOne({_id:item},{$set:{status:"Assigned"}})
        }
        else
        {
            donation=await Vessel.findOne({_id:item})
            flag=await Vessel.updateOne({_id:item},{$set:{status:"Assigned"}})
        }
        let newtask=new Task({volunteer_id:volunteer,donation_type:type,donation_id:item,source_address:donation.source_address,dest_address:area,accept_status:"Pending",donated_status:"Pending",reason:"",requested_date:Date.now()})
        flag=await newtask.save()
        await Item.updateOne({_id:itemId},{$set:{status:"In Progress"}})
        // await Volunteer.updateOne({_id:volunteer},{$set:{work_status:"Assigned"}})
        return res.status(200).json({msg:"Success"})

    } catch (error) {
        console.log(error);
        res.status(400).json("Somethig went wrong !!")
    }
});

Router.get('/getpendingrequests',async (req,res)=>{
    try {
        let datas=[]    
        let tasks=await Task.find({accept_status:"Pending"})
        var item,volunteer
        console.log("Hiii");
        console.log(tasks);
        if(tasks){
            for (const task of tasks)     
            {  
                if(task.donation_type=="Food")
                {
                    item=await Food.findOne({_id:task.donation_id})
                }
                else if(task.donation_type=="Cloth")
                {
                    item=await Cloth.findOne({_id:task.donation_id})
                }
                else if(task.donation_type=="Vessel")
                {
                    item=await Vessel.findOne({_id:task.donation_id})
                }
                volunteer=await Volunteer.findOne({_id:task.volunteer_id})
                // console.log(volunteer);
                datas.push({task:task,item:item,volunteer:volunteer})
            }
            return res.status(200).json(datas)
        }   
        else
        {
            return res.status(200).json("Not found")
        }
    } 
    catch (error) {
        console.log(error);
        res.status(400).json("Something went wrong !!")
    }
})

Router.get('/getadminrejectedrequests',async (req,res)=>{
    try {
        let datas=[]     
        let tasks=await Task.find({accept_status:"Rejected"})
        var item,volunteer
        if(tasks){
            for (const task of tasks)     
            { 
                if(task.donation_type=="Food")
                {
                    item=await Food.findOne({_id:task.donation_id})
                }
                else if(task.donation_type=="Cloth")
                {
                    item=await Cloth.findOne({_id:task.donation_id})
                }
                else if(task.donation_type=="Vessel")
                {
                    item=await Vessel.findOne({_id:task.donation_id})
                }
                volunteer=await Volunteer.findOne({_id:task.volunteer_id})
                datas.push({task:task,item:item,volunteer:volunteer})
            }
            let areas=await Area.find();
            let volunteers=await Volunteer.find({work_status:"Free"});
            // console.log(areas);
            // console.log(volunteers);
            return res.status(200).json({datas:datas,areas:areas,volunteers:volunteers})
        }   
        else
        {
            return res.status(200).json("Not found")
        }
    }
    catch(error){
        console.log(error);
        res.status(400).json("Something went wrong !!")
    }
})
 
Router.get('/getassignedtasks',async (req,res)=>{
    console.log("Hiii",req.session.volunteer_id);
    // var task=new Task({volunteer_id:req.session.volunteer_id,donation_type:"Food",donation_id:"1m3mndsxx1324",source_address:"Thasra",dest_address:"Thasra",accept_status:"accept",donated_status:"pending",reason:""})
    // await task.save() 
    let datas=[]
    var allotments=await Task.find({volunteer_id:req.session.volunteer_id})
    var item,donor
    if(allotments){
        for (const allotment of allotments)     
        {
            if(allotment.donation_type=="Food")
            {
                console.log("In food type");
                item=await Food.findOne({_id:allotment.donation_id})
            }
            else if(allotment.donation_type=="Cloth")
            {
                console.log("In cloth type");
                item=await Cloth.findOne({_id:allotment.donation_id})
            }
            else if(allotment.donation_type=="Vessel")
            {
                console.log("In vessel type");
                item=await Vessel.findOne({_id:allotment.donation_id})
            }
            donor=await Donor.findOne({_id:item.donor_id})
            datas.push({allotment:allotment,item:item,donor:donor})
        }
        
        // console.log(datas);
        return res.status(200).json(datas)
    }   
    else{
        // console.log(allotments);
        return res.status(200).json("Not found")
    }
})

Router.get('/getassignedrequests',async (req,res)=>{
    // console.log("Hiii",req.session.volunteer_id);
    let datas=[]
    var allotments=await Task.find({$and:[{volunteer_id:req.session.volunteer_id},{accept_status:"Pending"}]})
    var item,donor
    console.log(allotments);
    if(allotments){
        for (const allotment of allotments)     
        {
            if(allotment.donation_type=="Food")
            {
                item=await Food.findOne({_id:allotment.donation_id})
                console.log(item);
            }
            else if(allotment.donation_type=="Cloth")
            {
                item=await Cloth.findOne({_id:allotment.donation_id})
                console.log(item);
            }
            else if(allotment.donation_type=="Vessel")
            {
                item=await Vessel.findOne({_id:allotment.donation_id})
                console.log(item);
            }
            donor=await Donor.findOne({_id:item.donor_id})
            datas.push({allotment:allotment,item:item,donor:donor})
        }
        return res.status(200).json(datas)
    }   
    else{
        return res.status(200).json("Not found")
    }
})

Router.post('/requestresponse',async (req,res)=>{
    try{
        const {allotment_id,reason}=req.body
        // console.log(allotment_id);
        var allotment=await Task.findOne({_id:allotment_id})
        var flag
        if(reason==null){
            flag=await Task.updateOne({$and:[{volunteer_id:req.session.volunteer_id},{donation_id:allotment.donation_id}]},{$set:{accept_status:"Accepted"}})
            await Volunteer.updateOne({_id:req.session.volunteer_id},{$set:{work_status:"Assigned"}})
            await Area.updateOne({address:allotment.dest_address},{$set:[{status:"Assigned"},{lastdate:Date.now()}]})
        }
        else
        {
            flag=await Task.updateOne({$and:[{volunteer_id:req.session.volunteer_id},{donation_id:allotment.donation_id}]},{$set:{accept_status:"Rejected"},reason:reason})
            await Volunteer.updateOne({_id:req.session.volunteer_id},{$set:{work_status:"Free"}})
            await Area.updateOne({address:allotment.dest_address},{$set:[{status:""},{lastdate:""}]})
        }
        if(flag)
        {
            res.status(200).json({msg:"Success"})
        }
        else
        {   
            res.status(400).json({msg:"Something went wrong"})
        }
    }   
    catch(error){
        console.log(error);z
        res.status(400).json({msg:"Something went wrong"}) 
    }
})

Router.get('/getpendingworks',async (req,res)=>{
    // console.log("Hiii",req.session.volunteer_id);
    let datas=[]
    var allotments=await Task.find({$and:[{volunteer_id:req.session.volunteer_id},{accept_status:"Accepted"},{donated_status:"Pending"}]})
    var item,donor
    // console.log(allotments); 
    if(allotments){
        for (const allotment of allotments)     
        { 
            if(allotment.donation_type=="Food")
            {
                item=await Food.findOne({_id:allotment.donation_id})
            }
            else if(allotment.donation_type=="Cloth")
            {
                item=await Cloth.findOne({_id:allotment.donation_id})
            }
            else if(allotment.donation_type=="Vessel")
            {
                item=await Vessel.findOne({_id:allotment.donation_id})
            }
            donor=await Donor.findOne({_id:item.donor_id})
            datas.push({allotment:allotment,item:item,donor:donor})
        }
        return res.status(200).json(datas)
    }   
    else{
        return res.status(200).json("Not found")
    }  
})

Router.post('/taskcompleted',async (req,res)=>{
    try{
        const {allotment_id}=req.body
        var allotment=await Task.findOne({_id:allotment_id})
        console.log(allotment);
        var flag=await Task.updateOne({$and:[{volunteer_id:req.session.volunteer_id},{donation_id:allotment.donation_id}]},{$set:{donated_status:"Completed"}})
        if(flag)
        {
            if(allotment.donation_type=="Food")
            {
                flag=await Food.updateOne({_id:allotment.donation_id},{$set:{dest_address:allotment.dest_address,donated_date:Date.now(),status:"Completed"}})
            }
            else if(allotment.donation_type=="Cloth")
            {
                flag=await Cloth.updateOne({_id:allotment.donation_id},{$set:{dest_address:allotment.dest_address,donated_date:Date.now(),status:"Completed"}})
            }
            else if(allotment.donation_type=="Vessel")
            {
                flag=await Vessel.updateOne({_id:allotment.donation_id},{$set:{dest_address:allotment.dest_address,donated_date:Date.now(),status:"Completed"}})
            }
            await Item.updateOne({item_id:allotment.donation_id},{$set:{requestfullfilled_date:Date.now(),status:"Completed"}})
            await Volunteer.updateOne({_id:req.session.volunteer_id},{$set:{work_status:"Free"}})
            res.status(200).json({msg:"Success"})
            await Area.updateOne({address:allotment.dest_address},{$set:[{status:"Received"},{lastdate:Date.now()}]})
        }
        else
        {   
            res.status(400).json({msg:"Something went wrong"})
        }
    }   
    catch(error){
        console.log(error);
        res.status(400).json({msg:"Something went wrong"})
    }
})

Router.get('/getrejectedrequests',async (req,res)=>{
    // console.log("Hiii",req.session.volunteer_id);
    let datas=[]
    var allotments=await Task.find({$and:[{volunteer_id:req.session.volunteer_id},{accept_status:"Rejected"}]})
    var item,donor
    // console.log(allotments); 
    if(allotments){ 
        for (const allotment of allotments)     
        {
            if(allotment.donation_type=="Food")
            {
                item=await Food.findOne({_id:allotment.donation_id})
            }
            else if(allotment.donation_type=="Cloth")
            {
                item=await Cloth.findOne({_id:allotment.donation_id})
            }
            else if(allotment.donation_type=="Vessel")
            {
                item=await Vessel.findOne({_id:allotment.donation_id})
            } 
            donor=await Donor.findOne({_id:item.donor_id})
            datas.push({allotment:allotment,item:item,donor:donor})
        }
        return res.status(200).json(datas)
    }   
    else{
        return res.status(200).json("Not found")
    }
})


module.exports={Router,Task}