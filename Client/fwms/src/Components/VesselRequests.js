import React from 'react'
import logo from '../Images/bus.png';
import liststyle from '../Components/ListDisplay.module.css';

const images=require.context('../Images',true)
function VesselRequests(props) {
  const obj=props.vdata;
  const flag=props.choice;
  let vesselrequestslist;
  if(obj.length!=0){
    vesselrequestslist=obj.map(vessel=>{
      let source=images(`./${vessel.photo_path}`)
      return <>
      {flag==1 ?<><div  className={`card mb-4 shadow my-5 p-3  ${liststyle.border} `} >
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={source}  className={`card-img ${liststyle.img1}`}  alt="bus" />
            </div> 
            <div className="col-md-8">
              <div className="card-body">
                {/* <h5 className="card-title">Card title</h5> */}
                <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Source:</label ><label className={liststyle.lm1}>{vessel.source_address}</label></p>
                <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Contact No:</label><label className={liststyle.lm1}>{vessel.contact_no}</label></p>
                {/* <p className="card-text"><label htmlFor="username">Total time from it's made:{food.timeofmade} hours</label></p> */}
                <p className="card-text " ><label className={`${liststyle.lm2} ${liststyle.text}`}htmlFor="username">Quantity:</label><label className={liststyle.lm1}>{vessel.quantity}</label></p>
                <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Requested Date:</label><label className={liststyle.lm1}>{vessel.request_date}</label></p>
                <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Description:</label><label className={liststyle.lm1}> {vessel.desc}</label></p>
              </div>
            </div>
          </div>
        </div></> : <><div className={`card mb-4 shadow my-5 p-3  ${liststyle.border} `} >
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={source}  className={`card-img ${liststyle.img2}`}  alt="bus" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  {/* <h5 className="card-title">Card title</h5> */}
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Source:</label><label className={liststyle.lm1}>{vessel.source_address}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Contact No:</label><label className={liststyle.lm1}>{vessel.contact_no}</label></p>
                  {/* <p className="card-text"><label htmlFor="username">Total time from it's made:{food.timeofmade} hours</label></p> */}
                  <p className="card-text " ><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Quantity:</label><label className={liststyle.lm1}>{vessel.quantity}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Request Date:</label><label className={liststyle.lm1}>{vessel.request_date}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Request fullfilled Date:</label><label className={liststyle.lm1}>{vessel.requestfullfilled_date}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Description:</label><label className={liststyle.lm1}>{vessel.desc}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Status:  
                  <button type="button" class={`btn btn-primary btn-sm ${liststyle.lm1}`} disabled>{vessel.status}</button>
                  </label></p>
                </div>
              </div>
            </div>
          </div></>}
        </>
      })
  }
  else{
    return <><h1>No data found!</h1></>
  }
  
  return (
    <>
      {vesselrequestslist}
    </>
    
  )
}

export default VesselRequests