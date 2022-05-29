import React from 'react'
import logo from '../Images/bus.png';
import liststyle from '../Components/ListDisplay.module.css';
const images=require.context('../Images',true)
function DonatedVessels(props) {
  const obj=props.vdata;
  const flag=props.choice;
  let vesseldonationlist;
  
  if(flag==1){
    if(obj.length!=0){
      vesseldonationlist=obj.map(vessel=>{
        let source=images(`./${vessel.photo_path}`)
        return <>
          <div className={`card mb-4 shadow my-5 p-3  ${liststyle.border} `} >
            <div className="row no-gutters"> 
              <div className="col-md-4">
                <img src={source} className={`card-img ${liststyle.img1}`} alt="bus" />
              </div>
              <div className={`col-md-8 `}>
                <div className={`card-body}`}>
                  {/* <h5 className="card-title">Card title</h5> */}
                <p className="card-text " ><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">No of vessels:</label><label className={liststyle.lm1}>{vessel.quantity}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Source:</label><label className={liststyle.lm1}>{vessel.source_address}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Contact No:</label><label className={liststyle.lm1}>{vessel.contact_no}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Donation Date:</label><label className={liststyle.lm1}>{vessel.donation_date}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Description:</label><label className={liststyle.lm1}>{vessel.desc}</label></p>
                </div>
              </div>
            </div>
          </div>
        </>
      })
    }
    else{
        return <><h1>No data found!</h1></>
    }
  }
  else{
    if(obj.length!=0){
      vesseldonationlist=obj.map(vessel=>{
        let source=images(`./${vessel.photo_path}`)
        return <>
          <div className={`card mb-4 shadow my-5 p-3 ${liststyle.border}  `} >
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={source} width="500vw" height="300vh" className={`card-img ${liststyle.img2}`} alt="bus" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  {/* <h5 className="card-title">Card title</h5> */}
                  <p className="card-text " ><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">No of vessels:</label><label className={liststyle.lm1}>{vessel.quantity}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Source:</label><label className={liststyle.lm1}>{vessel.source_address}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Contact No:</label><label className={liststyle.lm1}>{vessel.contact_no}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Donation Date:</label><label className={liststyle.lm1}>{vessel.donation_date}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Donated Date:</label><label className={liststyle.lm1}>{vessel.donated_date}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Description:</label><label className={liststyle.lm1}>{vessel.desc}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Status:  
                  <button type="button" class={`btn btn-primary btn-sm ${liststyle.lm1}`} disabled>{vessel.status}</button>
                  </label></p>
                </div>
              </div>
            </div>
          </div>
        </>
      })
    }
    else{
        return <><h1>No data found!</h1></>
    }
    
  }
  return (
    <>
      {vesseldonationlist}
    </>
  )
}

export default DonatedVessels