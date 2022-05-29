import React, { useRef,useState,useEffect } from 'react'
import donorstyles from './DonorPage.module.css';
import admindashboardstyles from './AdminDashboard.module.css'

var data;   
function RequesterDashboard(props) {
  const [flag, setFlag] = useState(false)
  useEffect(async () => {
        const res=await fetch('/getallstatisticsforrequester',{
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
    <div className={`container mt-4 ${admindashboardstyles.container}`}>
                <div class="row my-2">
                    <div class="col-md-4">
                        <div className={`card card_three text-center ${admindashboardstyles.card}`}>
                            <div className={`title ${admindashboardstyles.title}`}>
                                <i className={`fa fa-rocket ${admindashboardstyles.fa}`} aria-hidden="true"></i>
                                <h2>{data.rf}</h2>
                            </div>
                            <a onClick={props.PassMethod} id="Rf">Pending Food Request</a>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div className={`card card_three text-center ${admindashboardstyles.card}`}>
                            <div className={`title ${admindashboardstyles.title}`}>
                                <i className={`fa fa-rocket ${admindashboardstyles.fa}`} aria-hidden="true"></i>
                                <h2>{data.rc}</h2>
                            </div>
                            <a onClick={props.PassMethod} id="Rc">Pending Cloth Request</a>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div className={`card card_three text-center ${admindashboardstyles.card}`}>
                            <div className={`title ${admindashboardstyles.title}`}>
                                <i className={`fa fa-rocket ${admindashboardstyles.fa}`} aria-hidden="true"></i>
                                <h2>{data.rv}</h2>
                            </div>
                            <a onClick={props.PassMethod} id="Rv">Pending Vessel Request</a>
                        </div>
                    </div>
                </div>
                <div class="row my-2">
                    <div class="col-md-4">
                        <div className={`card card_three text-center ${admindashboardstyles.card}`}>
                            <div className={`title ${admindashboardstyles.title}`}>
                                <i className={`fa fa-rocket ${admindashboardstyles.fa}`} aria-hidden="true"></i>
                                <h2>{data.arf}</h2>
                            </div>
                            <a onClick={props.PassMethod} id="ARf">Total  Food</a>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div className={`card card_three text-center ${admindashboardstyles.card}`}>
                            <div className={`title ${admindashboardstyles.title}`}>
                                <i className={`fa fa-rocket ${admindashboardstyles.fa}`} aria-hidden="true"></i>
                                <h2>{data.arc}</h2>
                            </div>
                            <a onClick={props.PassMethod} id="ARc">Total Cloth</a>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div className={`card card_three text-center ${admindashboardstyles.card}`}>
                            <div className={`title ${admindashboardstyles.title}`}>
                                <i className={`fa fa-rocket ${admindashboardstyles.fa}`} aria-hidden="true"></i>
                                <h2>{data.arv}</h2>
                            </div>
                            <a onClick={props.PassMethod} id="ARv">Total Vessel</a>
                        </div>
                    </div>
                </div>
        </div></>
  )
}

export default RequesterDashboard