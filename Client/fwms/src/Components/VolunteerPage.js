import React,{useState,useEffect} from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import CurrentRequests from './CurrentRequests';
import PendingWorks from './PendingWorks';
import RejectedRequests from './RejectedRequests';
import TotalAllotments from './TotalAllotments';
import VolunteerDashboard from './VolunteerDashboard';
import volunteerstyles from './VolunteerPage.module.css';

function VolunteerPage() { 
    // useEffect(async () => {
    //     const res=await fetch('/getassignedtasks',{
    //         method:"GET", 
    //         headers:{
    //             "Content-Type":"application/json"
    //         }
    //     });
    //   }, [])
    const [choice,setChoice]=useState({Vd:true,Cr:'',Pw:'',Rr:'',Ta:''})
    const changeChoice=(e)=>
    {
        choice.Vd=''
        choice.Cr='' 
        choice.Pw=''
        choice.Rr=''
        choice.Ta=''
        // console.log(choice);
        // setChoice({...choice,[Md=false,Nf=false,Nc=false,Nv=false,Df=false,Dc=false,Dv=false]})
        // console.log();
        setChoice({...choice,[e.target.id]:true})
        // console.log(choice);
        // setChoice({...choice,:})
    }
    return (
    <> 
    {/* <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <button class="navbar-toggler " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
    <span class="navbar-toggler-icon" data-bs-target="#offcanvasExample"></span>
    Dashboard
</button>
    </nav> */}
    <div className={`offcanvas offcanvas-start ${volunteerstyles.dashboard} fixed-top`} tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-body p-0">   
            <nav className="nav-dark">
                <ul className="navbar-nav">
                    <li>
                        <div className={`small fm-bold text-uppercase px-3 mt-3 ${volunteerstyles.muted}`}>Core</div>
                    </li>
                    <li>
                        <a className={`nav-link px-3 ${volunteerstyles.bg}`}>
                            <span className="me-2"><i className="fa fa-tachometer" aria-hidden="true"></i></span>
                            <span onClick={changeChoice} id="Vd" >Dashboard</span>
                        </a>
                    </li>
                    <li className="my-2"><hr className="dropdown-divider"/></li>
                    <li>
                        <div className={`small fm-bold text-uppercase px-3 ${volunteerstyles.muted}`}>Interface</div>
                    </li>
                    <li>
                        <a  className={`nav-link px-3 ${volunteerstyles.dashboardlink} ${volunteerstyles.bg}`}>
                        <span className="me-2 my-3"><i className="fa fa-columns" aria-hidden="true"></i></span>
                        <span onClick={changeChoice} id="Pw">Pending Works</span>
                        <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                    </li>
                    <li>
                        <a  className={`nav-link px-3 ${volunteerstyles.dashboardlink} ${volunteerstyles.bg}`}>
                            <span className="me-2 my-3"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={changeChoice} id="Cr">Current Requests</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                    </li>
                    <li>
                        <a  className={`nav-link px-3 ${volunteerstyles.dashboardlink} ${volunteerstyles.bg}`}>
                            <span className="me-2 my-3"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={changeChoice} id="Rr">Rejected Requests</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                    </li>
                    <li>
                        <a  className={`nav-link px-3 ${volunteerstyles.dashboardlink} ${volunteerstyles.bg}`}>
                            <span className="me-2 my-3"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={changeChoice} id="Ta">Total Allotments</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
    <main>
        {choice.Vd?<VolunteerDashboard PassMethod={changeChoice}/>:""}
        {choice.Pw?<PendingWorks/>:""}   
        {choice.Cr?<CurrentRequests/>:""}
        {choice.Rr? <RejectedRequests/>:""}
        {choice.Ta? <TotalAllotments/>:""}
    </main>
</>
  )
}

export default VolunteerPage