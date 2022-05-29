const jwt=require('jsonwebtoken')
const Volunteer=require('./VolunteerSchema')
const Donor=require('./DonorSchema')
const Requester=require('./RequesterSchema')
// const Volunteer=require('./VolunteerSchema')

const Authenticate =async (req,res,next)=>{
    try
    {
        if(!req.cookies)
        {
            res.status(400).json({msg:"Login"});
        }
        else
        {
            // console.log(JSON.stringify(req.headers.cookie));
            // if(req.cookies.donorcookie)
            // {
            //     console.log(req.cookies.donorcookie);
            // }
            const volunteertoken=req.cookies.volunteercookie;
            const donortoken=req.cookies.donorcookie;
            const requestertoken=req.cookies.requestercookie;
            if(volunteertoken)
            {
                let Key="Mynameiskushayandiamgoingtousethisasakey"
                const verifytoken=jwt.verify(volunteertoken,Key) 
                // res.clearCookie("volunteercookie")
                // console.log(verifytoken);
                const volunteer=await Volunteer.findOne({_id:verifytoken._id,"tokens.token":volunteertoken})
                console.log(volunteer);
                res.status(200).json({msg:"volunteer",dataset:volunteer});
            }
            else if(donortoken)
            {
                let Key="Mynameiskushayandiamgoingtousethisasakey"
                const verifytoken=jwt.verify(donortoken,Key)
                res.status(200).json({msg:"donor"});
            }
            else if(requestertoken)
            {
                let Key="Mynameiskushayandiamgoingtousethisasakey"
                const verifytoken=jwt.verify(requestertoken,Key)
                res.status(200).json({msg:"requester"});
            }
            
            else{
                res.status(400).json({msg:"Login"});
            }
            next();
        }
    }
    catch(err)
    {
        console.log(err);
        // res.status(400).json({msg:err});
    }
}


module.exports=Authenticate