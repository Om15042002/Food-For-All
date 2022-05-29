import React from 'react'
import logo from '../Images/bus.png';
import liststyle from '../Components/ListDisplay.module.css';
const images=require.context('../Images',true)
function DonatedFoods(props) {
  const obj=props.fdata;
  const flag=props.choice;
  let fooddonationlist;
  if(flag==1)
  {
    if(obj.length!=0){
      fooddonationlist=obj.map(food=>{
        let source=images(`./${food.photo_path}`)
        return <>
        <div className={`card mb-4 shadow my-5 p-3  ${liststyle.border} `} >
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={source}  className={`card-img ${liststyle.img1}` } alt="bus" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  {/* <h5 className="card-title">Card title</h5> */}
                  <p className="card-text " ><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Foodname:</label><label className={liststyle.lm1}>{food.foodname}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Source:{food.source_address}</label><label className={liststyle.lm1}>{food.source_address}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Contact No:</label><label className={liststyle.lm1}>{food.contact_no}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Total time from it's made:</label><label className={liststyle.lm1}>{food.timeofmade} hours</label></p>
                  <p className="card-text " ><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">No of Persons can be feed:</label><label className={liststyle.lm1}>{food.no_person}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Donation Date:</label><label className={liststyle.lm1}>{food.donation_date}</label></p>
                  <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Description:</label><label className={liststyle.lm1}>{food.desc}</label></p>
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
      fooddonationlist=obj.map(food=>{
        let source=images(`./${food.photo_path}`)
        return <>
        <div className={`card mb-4 shadow my-5 p-3  ${liststyle.border}`} >
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={source} className={`card-img ${liststyle.img2}`} alt="bus" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              {/* <h5 className="card-title">Card title</h5> */}
              <p className="card-text " ><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Foodname:</label><label className={liststyle.lm1}>{food.foodname}</label></p>
              <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Source:</label><label className={liststyle.lm1}>{food.source_address}</label></p>
              <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Contact No:</label><label className={liststyle.lm1}>{food.contact_no}</label></p>
              <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Total time from it's made:</label><label className={liststyle.lm1}>{food.timeofmade} hours</label></p>
              <p className="card-text " ><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">No of Persons can be feed:</label><label className={liststyle.lm1}>{food.no_person}</label></p>
              <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Donation Date:</label><label className={liststyle.lm1}>{food.donation_date}</label></p>
              <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Donated Date:</label><label className={liststyle.lm1}>{food.donated_date}</label></p>
              <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Description:</label><label className={liststyle.lm1}  >{food.desc}</label></p>
              <p className="card-text"><label className={`${liststyle.lm2} ${liststyle.text}`} htmlFor="username">Status:  
              <button type="button" class={`btn btn-primary btn-sm ${liststyle.lm1}`} disabled>{food.status}</button>
              </label></p>
            </div>
          </div>
        </div>
      </div></>
      })  
    }
    else{
      return <><h1>No data found!</h1></>
    }
  }
  return (
    <>
      {fooddonationlist}
    </>
  )
}

export default DonatedFoods