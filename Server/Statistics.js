const express=require('express')
const Router=express.Router()
const Donor=require('./DonorSchema')
const {Food}=require('./DonatedFoods')
const {Cloth}=require('./DonatedClothes')
const {Vessel}=require('./DonatedVessels') 
const Volunteer=require('./VolunteerSchema')
const Requester=require('./RequesterSchema')
const {Area}=require('./DistributionAreas')
const {Item}=require('./RequestedItems')
const {Task}=require('./AssignedTasks')
const {Query}=require('./Query')
const { log } = require('async')



Router.get('/getallstatisticsforadmin',async (req,res)=>{
    var td,tv,tr,nfd,ncd,nvd,nrf,nrc,nrv,pr,rr,da,qs;
    td=await Donor.count()
    tv=await Volunteer.count()
    tr=await Requester.count()
    nfd=await Food.count({status:"Pending"})
    ncd=await Cloth.count({status:"Pending"})
    nvd=await Vessel.count({status:"Pending"})
    nrf=await Item.count({status:"Pending",requesttype:"food"})
    nrc=await Item.count({status:"Pending",requesttype:"cloth"})
    nrv=await Item.count({status:"Pending",requesttype:"vessel"})
    pr=await Task.count({accept_status:"Pending"})
    rr=await Task.count({accept_status:"Rejected"})
    da=await Area.count()
    qs=await Query.count({status:"Pending",requesttype:"food"})
    res.status(200).json({td:td,tv:tv,tr:tr,nfd:nfd,ncd:ncd,nvd:nvd,nrf:nrf,nrc:nrc,nrv:nrv,pr:pr,rr:rr,da:da,qs:qs})
})

Router.get('/getallstatisticsforvolunteer',async (req,res)=>{
    var pw,cr,rr,ta;
    pw=await Task.count({$and:[{volunteer_id:req.session.volunteer_id},{accept_status:"Accepted"},{donated_status:"Pending"}]})
    cr=await Task.count({$and:[{volunteer_id:req.session.volunteer_id},{accept_status:"Pending"}]})
    rr=await Task.count({$and:[{volunteer_id:req.session.volunteer_id},{accept_status:"Rejected"}]})
    ta=await Task.count({volunteer_id:req.session.volunteer_id})
    res.status(200).json({pw:pw,cr:cr,rr:rr,ta:ta})
})

Router.get('/getallstatisticsfordonor',async (req,res)=>{
    var df,dc,dv,adf,adc,adv;
    df=await Food.count({$and:[{donor_id:req.session.donor_id},{status:"Pending"}]})
    dc=await Cloth.count({$and:[{donor_id:req.session.donor_id},{status:"Pending"}]})
    dv=await Vessel.count({$and:[{donor_id:req.session.donor_id},{status:"Pending"}]})
    adf=await Food.count({donor_id:req.session.donor_id})
    adc=await Cloth.count({donor_id:req.session.donor_id})
    adv=await Vessel.count({donor_id:req.session.donor_id})
    res.status(200).json({df:df,dc:dc,dv:dv,adf:adf,adc:adc,adv:adv})
})

Router.get('/getallstatisticsforrequester',async (req,res)=>{
    var rf,rc,rv,arf,arc,arv;
    rf=await Item.count({$and:[{requester_id:req.session.requester_id},{status:"Pending"},{requesttype:"food"}]})
    rc=await Item.count({$and:[{requester_id:req.session.requester_id},{status:"Pending"},{requesttype:"cloth"}]})
    rv=await Item.count({$and:[{requester_id:req.session.requester_id},{status:"Pending"},{requesttype:"vessel"}]})
    arf=await Item.count({$and:[{requester_id:req.session.requester_id},{requesttype:"food"}]})
    arc=await Item.count({$and:[{requester_id:req.session.requester_id},{requesttype:"cloth"}]})
    arv=await Item.count({$and:[{requester_id:req.session.requester_id},{requesttype:"vessel"}]})
    res.status(200).json({rf:rf,rc:rc,rv:rv,arf:arf,arc:arc,arv:arv})
})
module.exports=Router 