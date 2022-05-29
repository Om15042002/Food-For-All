import React from 'react'
import logo from '../Images/bus.png';
import liststyle from '../Components/ListDisplay.module.css';
const images=require.context('../Images',true)
function DonatedCloths(props) {
  const obj=props.cdata;  
  const flag=props.choice;
  let clothdonationlist;
  if(flag==1){
    console.log(obj.length);
    if(obj.length!=0){
      clothdonationlist=obj.map(cloth=>{
        let source=images(`./${cloth.photo_path}`)
        return <>
          <div className={`card mb-4 shadow my-5 p-3  ${liststyle.border} `} >
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={source} className={`card-img ${liststyle.img1}` } alt="bus" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  {/* <h5 className="card-title">Card title</h5> */}
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Pairs of cloths:</label><label className={liststyle.lm1}>{cloth.quantity}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Source:</label><label className={liststyle.lm1}>{cloth.source_address}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Contact No:</label><label className={liststyle.lm1}>{cloth.contact_no}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Donation Date:</label><label className={liststyle.lm1}>{cloth.donation_date}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Description:</label><label className={liststyle.lm1}>{cloth.desc}</label></p>
                </div>
              </div>
            </div>
          </div>
        </>
      }
      )
    }
    else{
      clothdonationlist=<><h1>No data found!!</h1></>
    }
    
  }
  if(flag==2){
    if(obj.length!=0){
      clothdonationlist=obj.map(cloth=>{
        let source=images(`./${cloth.photo_path}`)
        return <>
          <div className={`card mb-4 shadow my-5 p-3  ${liststyle.border} `}>
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={source} height='100%' width='100%' className={`card-img ${liststyle.img2}`} alt="bus" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  {/* <h5 className="card-title">Card title</h5> */}
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Pairs of cloths:</label><label className={liststyle.lm1}>{cloth.quantity}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Source:</label><label className={liststyle.lm1}>{cloth.source_address}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Contact No:</label><label className={liststyle.lm1}>{cloth.contact_no}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Donation Date:</label><label className={liststyle.lm1}>{cloth.donation_date}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Donated Date:</label><label className={liststyle.lm1}>{cloth.donated_date}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Description:</label><label className={liststyle.lm1}>{cloth.desc}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Status:  
                  <button type="button" class={`btn btn-primary btn-sm ${liststyle.lm1}`} disabled>{cloth.status}</button>
                  </label></p>
                </div>
              </div>
            </div>
          </div>
        </>
      }
      )
    }
    else{
        clothdonationlist=<><h1>No data found!</h1></>
    }
  }
  return (
    <>
        { 
            clothdonationlist
        }

    </>
  )
}

export default DonatedCloths