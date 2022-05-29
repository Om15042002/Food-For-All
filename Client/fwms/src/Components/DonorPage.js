import React, { useRef, useState } from 'react'
import donorstyles from './DonorPage.module.css';
import DonorDashboard from './DonorDashboard'
import NewFoodDonation from './NewFoodDonation'
import NewClothDonation from './NewClothDonation'
import NewVesselDonation from './NewVesselDonation'
import DonatedFoods from './DonatedFoods'
import DonatedCloths from './DonatedCloths'
import DonatedVessels from './DonatedVessels'

function DonorPage() {
    const imageref=useRef();
    const [foodinfo,setfInfo]=useState([{}]);
    const [vesselinfo,setvInfo]=useState([{}]);
    const [clothinfo,setcInfo]=useState([{}]);
    const [flag,setFlag]=useState();
    const [choice,setChoice]=useState({Md:true,Nf:'',Nc:'',Nv:'',Df:'',Dc:'',Dv:''})
    const onImageChange=(e)=>{
        console.log(e.target.files[0]);
        let url=URL.createObjectURL(e.target.files[0])
        console.log(url);
    }
    const GetData=async (e)=>{
        // changeChoice(e)
        let option
        if([e.target.id]=='Df')
        {    option="food";  setFlag(1);}
        if([e.target.id]=='Dv')
        {   option="vessel"; setFlag(1);}
        if([e.target.id]=='Dc')
        {    option="cloth";  setFlag(1);}
        if([e.target.id]=='ADf')
        {    option="allfood"; setFlag(2);}
        if([e.target.id]=='ADc')
        {    option="allcloth"; setFlag(2);}
        if([e.target.id]=='ADv')
        {    option="allvessel"; setFlag(2);}
        const res=await fetch(`/get${option}`,{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        });
        const data=await res.json();
        console.log(data);
        if(option=="food"||option=="allfood")
            setfInfo(data)
        if(option=="vessel"||option=="allvessel")
            setvInfo(data)
        if(option=="cloth"||option=="allcloth")
            setcInfo(data)
        changeChoice(e)
    }

    const seePhoto=(e)=>
    {
        e.preventDefault();
    }
    const changeChoice=(e)=>
    {
        choice.Md=''
        choice.Nf=''
        choice.Nc=''
        choice.Nv=''
        choice.Df=''
        choice.Dc=''
        choice.Dv=''
        // console.log(choice);
        // setChoice({...choice,[Md=false,Nf=false,Nc=false,Nv=false,Df=false,Dc=false,Dv=false]})
        // console.log();
       
        // console.log(choice);
        // setChoice({...choice,:})
        if([e.target.id]=="Df"||[e.target.id]=="ADf")
            setChoice({...choice,Df:true})
        if([e.target.id]=="Dc"||[e.target.id]=="ADc")
            setChoice({...choice,Dc:true})
        if([e.target.id]=="Dv"||[e.target.id]=="ADv")
            setChoice({...choice,Dv:true})
        if([e.target.id]=="Md"||[e.target.id]=="Nf"||[e.target.id]=="Nc"||[e.target.id]=="Nv")
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
                    <span onClick={changeChoice} id="Nf">New Food donation</span>
                    <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                </a>
                </li>
                <li>
                <a  className={`nav-link px-3 ${donorstyles.dashboardlink} ${donorstyles.bg}`} data-bs-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false" aria-controls="collapseExample">
                    <span className="me-2 my-3"><i className="fa fa-columns" aria-hidden="true"></i></span>
                    <span>Other Donation</span>
                    <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                </a>
                <div  className="collapse" id="collapseExample1">
                    <div className={`card card-body ${donorstyles.card}`}>
                        <a  className={`nav-link px-3 ${donorstyles.dashboardlink} ${donorstyles.bg}`}>
                            <span className="me-2"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={changeChoice} id="Nc">New Cloth Donation</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                        <a  className={`nav-link px-3 ${donorstyles.dashboardlink} ${donorstyles.bg}`} >
                            <span className="me-2"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={changeChoice} id="Nv">New Vesel Donation</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                    </div>
                </div>
                </li>
                <li>
                <a className={`nav-link px-3 ${donorstyles.dashboardlink} ${donorstyles.bg}`} data-bs-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample">
                    <span className="me-2 my-3"><i className="fa fa-columns" aria-hidden="true"></i></span>
                    <span >Pending Donations</span>
                    <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                </a>
                <div  className="collapse" id="collapseExample2">
                    <div className={`card card-body ${donorstyles.card}`}>
                        <a  className={`nav-link px-3 ${donorstyles.dashboardlink} ${donorstyles.bg}`}>
                            <span className="me-2"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span  onClick={GetData } id="Df">Food Donation</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                        <a  className={`nav-link px-3 ${donorstyles.dashboardlink} ${donorstyles.bg}`}>
                            <span className="me-2"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={GetData} id="Dc">Cloth Donation</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                        <a  className={`nav-link px-3 ${donorstyles.dashboardlink} ${donorstyles.bg}`}>
                            <span className="me-2"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={GetData} id="Dv">Vesel Donation</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                    </div>  
                </div>
                </li>
                <li>
                <a  className={`nav-link px-3 ${donorstyles.dashboardlink} ${donorstyles.bg}`} data-bs-toggle="collapse" href="#collapseExample3" role="button" aria-expanded="false" aria-controls="collapseExample">
                    <span className="me-2 my-3"><i className="fa fa-columns" aria-hidden="true"></i></span>
                    <span>All Donations</span>
                    <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                </a>
                <div className="collapse" id="collapseExample3">
                    <div className={`card card-body ${donorstyles.card}`}>
                        <a  className={`nav-link px-3 ${donorstyles.dashboardlink} ${donorstyles.bg}`}>
                            <span className="me-2"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={GetData} id="ADf">Food Donation</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                        <a  className={`nav-link px-3 ${donorstyles.dashboardlink} ${donorstyles.bg}`}>
                            <span className="me-2"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={GetData} id="ADc">Cloth Donation</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                        <a  className={`nav-link px-3 ${donorstyles.dashboardlink} ${donorstyles.bg}`}>
                            <span className="me-2"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={GetData} id="ADv">Vesel Donation</span>
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
    {choice.Md?<DonorDashboard PassMethod={GetData}/>:""}
    {choice.Nf?<NewFoodDonation/>:""}
    {choice.Nc?<NewClothDonation/>:""}
    {choice.Nv? <NewVesselDonation/>:""}
    {choice.Df? <DonatedFoods fdata={foodinfo} choice={flag}/>:""}
    {choice.Dc? <DonatedCloths cdata={clothinfo} choice={flag}/>:""}
    {choice.Dv? <DonatedVessels vdata={vesselinfo} choice={flag}/>:""}
</main>
</>
  )
}

export default DonorPage