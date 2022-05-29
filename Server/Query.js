const mongoose=require("mongoose")
const express=require('express');
const Router=express.Router()
const nodemailer = require("nodemailer");
const path=require('path')
// const Query=require('./QuerySchema')


const querySchema=new mongoose.Schema({
    name:{type:String,required:true},
    email_id:{type:String,required:true},
    description:{type:String,required:true},
    status:{type:String,required:true},
    reply:{type:String,required:false}
})

const Query=mongoose.model('Queries',querySchema)
 
Router.get('/getqueries',async (req,res)=>{ 
    let status="Pending"
    try{
        let queries=await Query.find({status:status});
        return res.status(200).json(queries)
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})

Router.post('/replyquery',async (req,res)=>{ 
    const {query_id,reply}=req.body
    try{

        let query=await Query.findOne({_id:query_id})
        await Query.updateOne({_id:query_id},{$set:{status:"Resolved",reply:reply}})
        
        // let testAccount = await nodemailer.createTestAccount();
        // let transporter = nodemailer.createTransport({
        //     // host: "smtp.ethereal.email",
        //     // port: 587,
        //     service:"gmail",
        //     secure: false, // true for 465, false for other ports
        //     auth: {
        //         user: "kushayvhora@gmail.com", // generated ethereal user
        //         pass: "passwordofthisemailid", // generated ethereal password
        //     },
        // });

        // // send mail with defined transport object
        // let info = await transporter.sendMail({
        //     from: '"Kushay Vhora" <kushayvhora@gmail.com>', // sender address
        //     to: `${query.email_id}`, // list of receivers
        //     subject: "Reply to Your query", // Subject line
        //     text: `${reply}`, // plain text body
        //     // html: "<b>Hello world?</b>", // html body
        // });

        // console.log("Message sent: %s", info.messageId);
        // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        
        return res.status(200).json("Success")
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})

Router.post('/newquery',async (req,res)=>{
    // console.log(req.body);
    const {name,email,desc}=req.body
    const status="Pending"
    try{
            const query=new Query({name:name,email_id:email,description:desc,status:status})
            // console.log(query);
            await query.save()
            return res.status(200).json({msg:"Success"})
    }
    catch(error)
    {
        return res.status(400).json({msg:"Something went wrong !!"})
    }
})

module.exports={Router,Query}