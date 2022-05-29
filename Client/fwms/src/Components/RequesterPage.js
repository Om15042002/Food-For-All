import React, { useRef, useState } from 'react'
import requesterstyles from './RequesterPage.module.css';
import donorstyles from './DonorPage.module.css';
import RequesterDashboard from './RequesterDashboard'
import NewFoodRequest from './NewFoodRequest'
import NewClothRequest from './NewClothRequest'
import NewVesselRequest from './NewVesselRequest'
import FoodRequests from './FoodRequests'
import ClothRequests from './ClothRequests'
import VesselRequests from './VesselRequests'
function RequesterPage() {
    const imageref=useRef();
    const [foodinfo,setfInfo]=useState([{}]);
    const [vesselinfo,setvInfo]=useState([{}]);
    const [clothinfo,setcInfo]=useState([{}]);
    const [flag,setFlag]=useState(); 
    const [type,setType]=useState();
    const [choice,setChoice]=useState({Md:true,Nfr:'',Ncr:'',Nvr:'',Rf:'',Rc:'',Rv:''})
    const onImageChange=(e)=>{
        console.log(e.target.files[0]);
        let url=URL.createObjectURL(e.target.files[0])
        console.log(url);
    }
    const GetData=async (e)=>{
        // changeChoice(e)
        console.log()
        let option
        if([e.target.id]=='Rf'||[e.target.id]=='Rv'||[e.target.id]=='Rc')
        {   setFlag(1);} 
        if([e.target.id]=='ARf'||[e.target.id]=='ARv'||[e.target.id]=='ARc')
        {   setFlag(2);}
        if([e.target.id]=='Rf') option="foodrequest"
        if([e.target.id]=='Rv') option="vesselrequest"
        if([e.target.id]=='Rc') option="clothrequest"
        if([e.target.id]=='ARf') option="allfoodrequest"
        if([e.target.id]=='ARv') option="allvesselrequest"
        if([e.target.id]=='ARc') option="allclothrequest"
        console.log(option);
        const res=await fetch(`/get${option}`,{
            method:"GET",
            headers:{
                // Accept:"application/json",
                "Content-Type":"application/json"
            }
            // credentials:"include"
        });
        const data=await res.json();
        console.log(data);
        if([e.target.id]=='Rf'||[e.target.id]=='ARf')
            setfInfo(data)
        if([e.target.id]=='Rc'||[e.target.id]=='ARc')
            setcInfo(data)
        if([e.target.id]=='Rv'||[e.target.id]=='ARv')
            setvInfo(data)
        changeChoice(e)
    }

    const seePhoto=(e)=>
    {
        e.preventDefault();
    }
    const changeChoice=(e)=>
    {
        choice.Md=''
        choice.Nfr=''
        choice.Ncr=''
        choice.Nvr=''
        choice.Rf=''
        choice.Rc=''
        choice.Rv=''

        if([e.target.id]=="Rf"||[e.target.id]=="ARf")
            setChoice({...choice,Rf:true})
        if([e.target.id]=="Rc"||[e.target.id]=="ARc")
            setChoice({...choice,Rc:true})
        if([e.target.id]=="Rv"||[e.target.id]=="ARv")
            setChoice({...choice,Rv:true})
        if([e.target.id]=="Md"||[e.target.id]=="Nfr"||[e.target.id]=="Ncr"||[e.target.id]=="Nvr")
            setChoice({...choice,[e.target.id]:true})
            console.log(flag);
    }
  return (
    <>
    {/* <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <button class="navbar-toggler " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
    <span class="navbar-toggler-icon" data-bs-target="#offcanvasExample"></span>
    Dashboard
</button>
    </nav> */}
<div className={`offcanvas offcanvas-start ${donorstyles.dashboard} fixed-top`} tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <div className="offcanvas-body p-0">   
        <nav className="nav-dark"> 
            <ul className="navbar-nav">
                <li>
                    <div className={`small fm-bold text-uppercase px-3 mt-3 ${donorstyles.muted}`}>Core</div>
                </li>
                <li>
                    <a className={`nav-link px-3 ${donorstyles.bg}`}>
                        <span className="me-2"><i className="fa fa-tachometer" aria-hidden="true"></i></span>
                        <span onClick={changeChoice} id="Md" >Dashboard</span>
                    </a>
                </li>
                <li className="my-2"><hr className="dropdown-divider"/></li>
                <li>
                    <div className={`small fm-bold text-uppercase px-3 ${donorstyles.muted}`}>Interface</div>
                </li>
                <li>
                <a  className={`nav-link px-3 ${donorstyles.dashboardlink} ${donorstyles.bg}`}>
                    <span className="me-2 my-3"><i className="fa fa-columns" aria-hidden="true"></i></span>
                    <span onClick={changeChoice} id="Nfr">New Food Request</span>
                    <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                </a>
                </li>
                <li>
                <a  className={`nav-link px-3 ${donorstyles.dashboardlink} ${donorstyles.bg}`} data-bs-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false" aria-controls="collapseExample">
                    <span className="me-2 my-3"><i className="fa fa-columns" aria-hidden="true"></i></span>
                    <span>Other Requests</span>
                    <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                </a>
                <div  className="collapse" id="collapseExample1">
                    <div className={`card card-body ${donorstyles.card}`}>
                        <a  className={`nav-link px-3 ${donorstyles.dashboardlink} ${donorstyles.bg}`}>
                            <span className="me-2"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={changeChoice} id="Ncr">New Cloth Request</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                        <a  className={`nav-link px-3 ${donorstyles.dashboardlink} ${donorstyles.bg}`} >
                            <span className="me-2"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={changeChoice} id="Nvr">New Vessel Request</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                    </div>
                </div>
                </li>
                <li>
                <a className={`nav-link px-3 ${donorstyles.dashboardlink} ${donorstyles.bg}`} data-bs-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample">
                    <span className="me-2 my-3"><i className="fa fa-columns" aria-hidden="true"></i></span>
                    <span >Pending Requests</span>
                    <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                </a>
                <div  className="collapse" id="collapseExample2">
                    <div className={`card card-body ${donorstyles.card}`}>
                        <a  className={`nav-link px-3 ${donorstyles.dashboardlink} ${donorstyles.bg}`}>
                            <span className="me-2"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span  onClick={GetData} id="Rf">Food Requests</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                        <a  className={`nav-link px-3 ${donorstyles.dashboardlink} ${donorstyles.bg}`}>
                            <span className="me-2"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={GetData} id="Rc">Cloth Requests</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                        <a  className={`nav-link px-3 ${donorstyles.dashboardlink} ${donorstyles.bg}`}>
                            <span className="me-2"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={GetData} id="Rv">Vesel Requests</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                    </div>  
                </div>
                </li>
                <li>
                <a  className={`nav-link px-3 ${donorstyles.dashboardlink} ${donorstyles.bg}`} data-bs-toggle="collapse" href="#collapseExample3" role="button" aria-expanded="false" aria-controls="collapseExample">
                    <span className="me-2 my-3"><i className="fa fa-columns" aria-hidden="true"></i></span>
                    <span>All Requests</span>
                    <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                </a>
                <div className="collapse" id="collapseExample3">
                    <div className={`card card-body ${donorstyles.card}`}>
                        <a  className={`nav-link px-3 ${donorstyles.dashboardlink} ${donorstyles.bg}`}>
                            <span className="me-2"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={GetData} id="ARf">Food Requests</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                        <a  className={`nav-link px-3 ${donorstyles.dashboardlink} ${donorstyles.bg}`}>
                            <span className="me-2"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={GetData} id="ARc">Cloth Requests</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                        <a  className={`nav-link px-3 ${donorstyles.dashboardlink} ${donorstyles.bg}`}>
                            <span className="me-2"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={GetData} id="ARv">Vessel Requests</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                    </div>
                </div>
                </li>
            </ul> 
        </nav>
    </div>
</div>
<main>
    {choice.Md? <RequesterDashboard PassMethod={GetData}/>:""}
    {choice.Nfr?<NewFoodRequest/>:""}
    {choice.Ncr?<NewClothRequest/>:""}
    {choice.Nvr? <NewVesselRequest/>:""}
    {choice.Rf? <FoodRequests fdata={foodinfo} choice={flag}/>:""}
    {choice.Rc? <ClothRequests cdata={clothinfo} choice={flag}/>:""}
    {choice.Rv? <VesselRequests vdata={vesselinfo} choice={flag}/>:""}
</main>
</>
  )
}

export default RequesterPage