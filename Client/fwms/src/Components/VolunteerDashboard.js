import React,{useEffect,useState} from 'react'
import volunteerdashboardstyles from './VolunteerDashboard.module.css'

var data;
function VolunteerDashboard(props) {
  // console.log(props); 
  const [flag, setFlag] = useState(false)
  useEffect(async () => {
        const res=await fetch('/getallstatisticsforvolunteer',{
            method:"GET", 
            headers:{
                "Content-Type":"application/json" 
            }
        });
        data=await res.json(); 
        console.log(data);
        setFlag(true);
      }, []) 
      if(!flag){
        return <><h3 className='m-3'>Loading...</h3></>
      }
  return (
    <>
    {/* <div>AdminDashboard</div> */}
    {/* <section className={`${admindashboardstyles.section}`}> */}
    <div className={`container mt-4 ${volunteerdashboardstyles.container}`}>
      <div class="row my-2">
            <div class="col-md-4">
              <div className={`card card_three text-center ${volunteerdashboardstyles.card}`}>
                <div className={`title ${volunteerdashboardstyles.title}`}>
                  <i className={`fa fa-rocket ${volunteerdashboardstyles.fa}`} aria-hidden="true"></i>
                  <h2>{data.pw}</h2>
                </div>
                  <a onClick={props.PassMethod} id="Pw">Pending Works</a>
                </div>
              </div>
              <div class="col-md-4">
              <div className={`card card_three text-center ${volunteerdashboardstyles.card}`}>
                <div className={`title ${volunteerdashboardstyles.title}`}>
                  <i className={`fa fa-rocket ${volunteerdashboardstyles.fa}`} aria-hidden="true"></i>
                  <h2>{data.cr}</h2>
                </div>
                  <a onClick={props.PassMethod} id="Cr">Current Requests</a>
                </div>
              </div>
              <div class="col-md-4">
              <div className={`card card_three text-center ${volunteerdashboardstyles.card}`}>
                <div className={`title ${volunteerdashboardstyles.title}`}>
                  <i className={`fa fa-rocket ${volunteerdashboardstyles.fa}`} aria-hidden="true"></i>
                  <h2>{data.rr}</h2>
                </div>
                  <a onClick={props.PassMethod} id="Rr">Rejected Requests</a>
                </div>
              </div>
            </div>
            <div class="row my-2">
            <div class="col-md-4">
              <div className={`card card_three text-center ${volunteerdashboardstyles.card}`}>
                <div className={`title ${volunteerdashboardstyles.title}`}>
                  <i className={`fa fa-rocket ${volunteerdashboardstyles.fa}`} aria-hidden="true"></i>
                  <h2>{data.ta}</h2>
                </div>
                  <a onClick={props.PassMethod} id="Ta">Total Allotments</a>
                </div>
              </div>
              {/* <div class="col-md-4">
              <div className={`card card_three text-center ${volunteerdashboardstyles.card}`}>
                <div className={`title ${volunteerdashboardstyles.title}`}>
                  <i className={`fa fa-rocket ${volunteerdashboardstyles.fa}`} aria-hidden="true"></i>
                  <h2>{data.nrc}</h2>
                </div>
                  <a onClick={props.PassMethod} id="Rc">New Cloth Request</a>
                </div>
              </div>
              <div class="col-md-4">
              <div className={`card card_three text-center ${volunteerdashboardstyles.card}`}>
                <div className={`title ${volunteerdashboardstyles.title}`}>
                  <i className={`fa fa-rocket ${volunteerdashboardstyles.fa}`} aria-hidden="true"></i>
                  <h2>{data.nrv}</h2>
                </div>
                  <a onClick={props.PassMethod} id="Rv">New Vessel Request</a>
                </div>
              </div> */}
            </div>
            {/* <div class="row my-2">
            <div class="col-md-4">
              <div className={`card card_three text-center ${volunteerdashboardstyles.card}`}>
                <div className={`title ${volunteerdashboardstyles.title}`}>
                  <i className={`fa fa-rocket ${volunteerdashboardstyles.fa}`} aria-hidden="true"></i>
                  <h2>{data.pr}</h2>
                </div>
                  <a onClick={props.PassMethod} id="Pf">Pending Requests</a>
                </div>
              </div>
              <div class="col-md-4">
              <div className={`card card_three text-center ${volunteerdashboardstyles.card}`}>
                <div className={`title ${volunteerdashboardstyles.title}`}>
                  <i className={`fa fa-rocket ${volunteerdashboardstyles.fa}`} aria-hidden="true"></i>
                  <h2>{data.rr}</h2>
                </div>
                  <a onClick={props.PassMethod} id="Rr">Rejected Requests</a>
                </div>
              </div>
              <div class="col-md-4">
              <div className={`card card_three text-center ${volunteerdashboardstyles.card}`}>
                <div className={`title ${volunteerdashboardstyles.title}`}>
                  <i className={`fa fa-rocket ${volunteerdashboardstyles.fa}`} aria-hidden="true"></i>
                  <h2>{data.qs}</h2>
                </div>
                  <a onClick={props.PassMethod} id="Sq">Queries</a>
                </div>
              </div>
            </div> */}
            <div class="row my-1">
            {/* <div class="col-md-4">
              <div className={`card card_three text-center ${admindashboardstyles.card}`}>
                <div className={`title ${admindashboardstyles.title}`}>
                  <i className={`fa fa-rocket ${admindashboardstyles.fa}`} aria-hidden="true"></i>
                  <h2>10</h2>
                </div>
                  <a href="#">Queries</a>
                </div>
              </div> */}
              {/* <div class="col-md-4">
              <div className={`card card_three text-center ${admindashboardstyles.card}`}>
                <div className={`title ${admindashboardstyles.title}`}>
                  <i className={`fa fa-rocket ${admindashboardstyles.fa}`} aria-hidden="true"></i>
                  <h2>10</h2>
                </div>
                  <a href="#">Volunteers</a>
                </div>
              </div>
              <div class="col-md-4">
              <div className={`card card_three text-center ${admindashboardstyles.card}`}>
                <div className={`title ${admindashboardstyles.title}`}>
                  <i className={`fa fa-rocket ${admindashboardstyles.fa}`} aria-hidden="true"></i>
                  <h2>10</h2>
                </div>
                  <a href="#">Requesters</a>
                </div>
              </div> */}
            </div>
        </div>
    {/* </section> */}
    </>
  )
}

export default VolunteerDashboard