import React, { useRef,useState,useEffect } from 'react'
import donorstyles from './DonorPage.module.css';
import admindashboardstyles from './AdminDashboard.module.css'

var data;   
function DonorDashboard(props) {
    
    const [flag, setFlag] = useState(false)
    useEffect(async () => {
          const res=await fetch('/getallstatisticsfordonor',{
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
                                <h2>{data.df}</h2>
                            </div>
                            <a onClick={props.PassMethod} id="Df">Pending Food</a>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div className={`card card_three text-center ${admindashboardstyles.card}`}>
                            <div className={`title ${admindashboardstyles.title}`}>
                                <i className={`fa fa-rocket ${admindashboardstyles.fa}`} aria-hidden="true"></i>
                                <h2>{data.dc}</h2>
                            </div>
                            <a onClick={props.PassMethod} id="Dc">Pending Cloth</a>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div className={`card card_three text-center ${admindashboardstyles.card}`}>
                            <div className={`title ${admindashboardstyles.title}`}>
                                <i className={`fa fa-rocket ${admindashboardstyles.fa}`} aria-hidden="true"></i>
                                <h2>{data.dv}</h2>
                            </div>
                            <a onClick={props.PassMethod} id="Dv">Pending Vessel</a>
                        </div>
                    </div>
                </div>
                <div class="row my-2">
                    <div class="col-md-4">
                        <div className={`card card_three text-center ${admindashboardstyles.card}`}>
                            <div className={`title ${admindashboardstyles.title}`}>
                                <i className={`fa fa-rocket ${admindashboardstyles.fa}`} aria-hidden="true"></i>
                                <h2>{data.adf}</h2>
                            </div>
                            <a onClick={props.PassMethod} id="ADf">Total Donated Food</a>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div className={`card card_three text-center ${admindashboardstyles.card}`}>
                            <div className={`title ${admindashboardstyles.title}`}>
                                <i className={`fa fa-rocket ${admindashboardstyles.fa}`} aria-hidden="true"></i>
                                <h2>{data.adc}</h2>
                            </div>
                            <a onClick={props.PassMethod} id="ADc">Total Donated Cloth</a>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div className={`card card_three text-center ${admindashboardstyles.card}`}>
                            <div className={`title ${admindashboardstyles.title}`}>
                                <i className={`fa fa-rocket ${admindashboardstyles.fa}`} aria-hidden="true"></i>
                                <h2>{data.adv}</h2>
                            </div>
                            <a onClick={props.PassMethod} id="ADv">Total Donated Vessel</a>
                        </div>
                    </div>
                </div>
        </div>
        </>

    )
}

export default DonorDashboard