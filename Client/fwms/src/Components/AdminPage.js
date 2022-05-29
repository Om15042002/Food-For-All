import React,{useState,useEffect} from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import AdminDashboard from './AdminDashboard';
import AdminFoodRequest from './AdminFoodRequest';
import AdminClothRequest from './AdminClothRequest';
import AdminVesselRequest from './AdminVesselRequest';
import PendingRequests from './PendingRequests';
import AdminRejectedRequests from './AdminRejectedRequests';
import DistributionArea from './DistributionArea';
import AllVolunteers from './AllVolunteers';
import AllDonors from './AllDonors';
import AllRequesters from './AllRequesters';
import ShowQueries from './ShowQueries';
import AdminRequestedFood from './AdminRequestedFood';
import AdminRequestedCloth from './AdminRequestedCloth';
import AdminRequestedVessel from './AdminRequestedVessel';
import adminstyles from './AdminPage.module.css'


function AdminPage() {
    // useEffect(async () => {
    //     const res=await fetch('/getassignedtasks',{
    //         method:"GET",
    //         headers:{
    //             "Content-Type":"application/json"
    //         }
    //     });
    //   }, [])
    const [choice,setChoice]=useState({Ad:true,Fr:'',Cr:'',Vr:'',Rf:'',Rc:'',Rv:'',Pf:'',Rr:'',Da:'',Ds:'',Vs:'',Rs:'',Sq:''})
    const changeChoice=(e)=>
    {
        choice.Ad=''
        choice.Fr='' 
        choice.Cr=''
        choice.Vr=''
        choice.Rf=''
        choice.Rc=''
        choice.Rv=''
        choice.Pf=''
        choice.Rr=''
        choice.Da=''
        choice.Ds=''
        choice.Vs=''
        choice.Rs=''
        choice.Sq=''
        // console.log(choice);
        // setChoice({...choice,[Md=false,Nf=false,Nc=false,Nv=false,Df=false,Dc=false,Dv=false]})
        // console.log();
        setChoice({...choice,[e.target.id]:true})
        // console.log([e.target.id]);
        // console.log("I am executed");
        // setChoice({...choice,:})
    }
    return (
    <> 
    {/* <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <button class="navbar-toggler " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
    <span class="navbar-toggler-icon" data-bs-target="#offcanvasExample"></span>
    Dashboard
</button>
    </nav> */
    // <section className={`${adminstyles.section}`}>
  
    // </section>

    }
    <div className={`offcanvas offcanvas-start ${adminstyles.dashboard} fixed-top`} tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-body p-0">   
            <nav className="nav-dark">
                <ul className="navbar-nav">
                    <li>
                        <div className={`small fm-bold text-uppercase px-3 mt-3 ${adminstyles.muted}`}>Core</div>
                    </li>
                    <li>
                        <a className={`nav-link px-3 ${adminstyles.bg}`}>
                            <span className="me-2"><i className="fa fa-tachometer" aria-hidden="true"></i></span>
                            <span onClick={changeChoice} id="Ad" >Dashboard</span>
                        </a>
                    </li>
                    <li className="my-2"><hr className="dropdown-divider"/></li>
                    <li>
                    <a  className={`nav-link px-3 ${adminstyles.dashboardlink} ${adminstyles.bg}`}>
                            <span className="me-2"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={changeChoice} id="Fr">New Food Donation</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                    </li>
                <li> 
                <a  className={`nav-link px-3 ${adminstyles.dashboardlink} ${adminstyles.bg}`} data-bs-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false" aria-controls="collapseExample">
                    <span className="me-2 my-3"><i className="fa fa-columns" aria-hidden="true"></i></span>
                    <span>New Other Donation</span>
                    <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                </a>
                <div  className="collapse" id="collapseExample1">
                    <div className={`card card-body ${adminstyles.card}`}>
                        <a  className={`nav-link px-3 ${adminstyles.dashboardlink} ${adminstyles.bg}`}>
                            <span className="me-2"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={changeChoice} id="Cr">New Cloth Donation</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                        <a  className={`nav-link px-3 ${adminstyles.dashboardlink} ${adminstyles.bg}`} >
                            <span className="me-2"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={changeChoice} id="Vr">New Vessel Donation</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                    </div>
                </div>
                </li>
                <li>
                    <a  className={`nav-link px-3 ${adminstyles.dashboardlink} ${adminstyles.bg}`}>
                            <span className="me-2"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={changeChoice} id="Rf">New Food Request</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                    </li>
                <li> 
                <a  className={`nav-link px-3 ${adminstyles.dashboardlink} ${adminstyles.bg}`} data-bs-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample">
                    <span className="me-2 my-3"><i className="fa fa-columns" aria-hidden="true"></i></span>
                    <span>New Other Request</span>
                    <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                </a>
                <div  className="collapse" id="collapseExample2">
                    <div className={`card card-body ${adminstyles.card}`}>
                        <a  className={`nav-link px-3 ${adminstyles.dashboardlink} ${adminstyles.bg}`}>
                            <span className="me-2"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={changeChoice} id="Rc">New Cloth Request</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                        <a  className={`nav-link px-3 ${adminstyles.dashboardlink} ${adminstyles.bg}`} >
                            <span className="me-2"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={changeChoice} id="Rv">New Vessel Request</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                    </div>
                </div>
                </li>
                <li>
                        <a  className={`nav-link px-3 ${adminstyles.dashboardlink} ${adminstyles.bg}`}>
                            <span className="me-2 my-3"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={changeChoice} id="Pf">Pending Requests</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                    </li>
                    <li>
                        <a  className={`nav-link px-3 ${adminstyles.dashboardlink} ${adminstyles.bg}`}>
                            <span className="me-2 my-3"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={changeChoice} id="Rr">Rejected Requests</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                    </li>
                <li>
                        <a  className={`nav-link px-3 ${adminstyles.dashboardlink} ${adminstyles.bg}`}>
                            <span className="me-2 my-3"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={changeChoice} id="Da">Distribution Areas</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                    </li>
                    <li>
                        <a  className={`nav-link px-3 ${adminstyles.dashboardlink} ${adminstyles.bg}`}>
                            <span className="me-2 my-3"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={changeChoice} id="Ds">Donors</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                    </li>
                    <li>
                        <a  className={`nav-link px-3 ${adminstyles.dashboardlink} ${adminstyles.bg}`}>
                            <span className="me-2 my-3"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={changeChoice} id="Vs">Volunteers</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                    </li>
                    <li>
                        <a  className={`nav-link px-3 ${adminstyles.dashboardlink} ${adminstyles.bg}`}>
                            <span className="me-2 my-3"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={changeChoice} id="Rs">Requesters</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                    </li>
                    <li>
                        <a  className={`nav-link px-3 ${adminstyles.dashboardlink} ${adminstyles.bg}`}>
                            <span className="me-2 my-3"><i className="fa fa-columns" aria-hidden="true"></i></span>
                            <span onClick={changeChoice} id="Sq">Queries</span>
                            <span className="right-icon ms-auto"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </a>
                    </li>
                </ul> 
            </nav>
        </div>
    </div>
    <main>
        {choice.Ad?<AdminDashboard PassMethod={changeChoice}/>:""}
        {choice.Fr?<AdminFoodRequest/>:""}   
        {choice.Cr?<AdminClothRequest/>:""} 
        {choice.Vr?<AdminVesselRequest/>:""}
        {choice.Rf?<AdminRequestedFood/>:""}
        {choice.Rc?<AdminRequestedCloth/>:""} 
        {choice.Rv?<AdminRequestedVessel/>:""}
        {choice.Pf?<PendingRequests/>:""} 
        {choice.Rr?<AdminRejectedRequests/>:""}
        {choice.Da?<DistributionArea/>:""}
        {choice.Ds?<AllDonors/>:""}
        {choice.Vs?<AllVolunteers/>:""}
        {choice.Rs?<AllRequesters/>:""}
        {choice.Sq?<ShowQueries/>:""}
    </main>
</>
  )
}

export default AdminPage