const express = require('express')
const mongoose = require("mongoose")
const bcrypt = require('bcryptJs')
const jwt = require('jsonwebtoken')
const Router = express.Router()
const Sequelize = require('sequelize')

const distributionAreaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    population:{type:Number,required:true}, 
    date: { type: Date, required: true },
    lastdate: { type: Date, required: false },
    status:{ type: String, required: false }
    // lasttime: { type: String, required: false },
})
 

const Area = mongoose.model('DistributionAreas', distributionAreaSchema)

Router.get('/getareas', async (req, res) => { 
    console.log("Hiiii1");
    try{
        console.log("Hiiii2");
        let areas=await Area.find();
        console.log(areas);
        return res.status(200).json(areas)
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})

Router.post('/addarea', async (req, res) => {
    const {name,address,population}=req.body
    const date=Date.now()
    const lastdate="";
    const status="";
    try{ 
            const area=new Area({name:name,address:address,population:population,date:date,lastdate:lastdate,status:status})
            // console.log(area); 
            const flag=await area.save()
            // console.log(flag);
            return res.status(200).json({msg:"Success"})
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})

module.exports={Router,Area}