const express=require('express');
const app=express();
const cookieParser=require('cookie-parser')
const Authenticate=require('./Authentication')
// const Admin=require('./AdminSchema')

var bodyParser = require('body-parser');

var multer = require('multer');
var upload = multer();
app.use(express.json());
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded
app.use(cookieParser())

const session  = require('express-session');
app.use(session({secret:"Qusai",saveUninitialized:false}))


// for parsing multipart/form-data 
// app.use(upload.array()); 
app.use(express.static('public'));

require('./Conn');
 
app.use(require('./Admin'))
app.use(require('./Volunteer'))
app.use(require('./Donor')) 
app.use(require('./Requester'))
var {Router}=require('./Query')
app.use(Router)
app.use(require('./Statistics'))
var {Router}=require('./DistributionAreas')
app.use(Router)
var {Router}=require('./DonatedFoods')
app.use(Router)
var {Router}=require('./DonatedClothes')
app.use(Router)
var {Router}=require('./DonatedVessels')
app.use(Router)
var {Router}=require('./AssignedTasks')
app.use(Router)
app.use(require('./AdminWorks'))
var {Router}=require('./RequestedItems')
app.use(Router)

const async=require('async')
function httpGet(url)
{
  app.get(url,Authenticate,()=>{})
}
urls=["/checkuser","/volunteerpage","/donorpage","/requesterpage"]
async.map(urls,httpGet,()=>{})

// app.get('/getareas', async (req, res) => { 
//   console.log("Hiiii1");
//   try{
//       console.log("Hiiii2");
//       let areas=await Area.find();
//       console.log(areas);
//       return res.status(200).json(areas)
//   }
//   catch(error)
//   {
//       console.log(error);
//       return res.status(400).json({msg:"Something went wrong !!"})
//   }
// })

// app.get('/checkuser',Authenticate,(req,res)=>{
//   console.log("helloooooooooooooo");
// })

// var ad=new Admin({name:"Qusai",username:"Qusai@52",password:"Qusai@5253",gender:"Male",age:20,email_id:"kushayvhora@gmail.com",mob_no:"8780987359"})
// ad.save();

app.listen(5000,()=>{
  console.log("Server listening on port number 5000");
})