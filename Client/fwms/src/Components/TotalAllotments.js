import React,{useEffect,useState} from 'react'
import allotmentstyles from './TotalAllotments.module.css'

var allotments
const TotalAllotments=()=> {
    const [flag,setFlag]=useState(false)
  
    useEffect(async ()=>{
      try{
          const res=await fetch('/getassignedtasks',{
          method:"GET",
          headers:{
              "Content-Type":"application/json"
          }
        });
        allotments=await res.json();
        // console.log(allotments);
    }
    catch(error){
      // console.log(error);
    }
      setFlag(true) 
  },[])

  if(!flag){return <><h3 className='m-3'>Loading...</h3></>}
  else{
      console.log(allotments);
      var allotmentsList;
      if(!allotments[0]){
        return <><h3 className='m-3'>No Data Found !!</h3></>
      }
      allotmentsList=allotments.map(allotment=>
      {
        // console.log(allotment);
        return(
          <div className={`row shadow my-5  ${allotmentstyles.border}`}>
                  <div className={`col-6 ${allotmentstyles.responsive}`}>
                  <table className="table table-borderless text-capitalize m-0">
                  <tbody className="text-nowrap special"> 
                  <tr className={allotmentstyles.tr}>
                    <th className="col-6">Donor Name :</th>
                    <td className="col-6">{allotment.donor.name}</td>
                  </tr>
                  <tr className={allotmentstyles.tr}>
                    <th className="col-6"> Donation Type :</th>
                    <td className="col-6">{allotment.allotment.donation_type}</td>
                  </tr>
                  <tr className={allotmentstyles.tr}>
                    <th className="col-6"> Donation Date :</th>
                    <td className="col-6 text-uppercase">{allotment.item.donation_date}</td>
                  </tr>
                  
                  <tr className={allotmentstyles.tr}>
                    <th className="col-6">Requested Date :</th>
                    <td className="col-6">{allotment.allotment.requested_date}</td>
                  </tr>
                  
                  </tbody>
                  </table>
                  </div>
                  <div className="col-6 responsive">
                      <table className="table table-borderless text-capitalize m-0">
                  <tbody className="text-nowrap">
                  <tr className={allotmentstyles.tr}>
                    <th className="col-6">Source Address :</th>
                    <td className="col-6">{allotment.allotment.source_address}</td>
                  </tr>
                  <tr className={allotmentstyles.tr}>
                    <th className="col-6"> Destination Address :</th>
                    <td className="col-6">{allotment.allotment.dest_address}</td>
                  </tr>
                  <tr className={allotmentstyles.tr}>
                    <th className="col-6"> Status :</th>
                     <td className="col-6">{allotment.allotment.accept_status}</td>
                  </tr>
                  <tr className={allotmentstyles.tr}>
                    <th className="col-6"> Donated Date :</th>
                    <td className="col-6">{allotment.item.donated_date}</td>
                  </tr>
                  </tbody>
                  </table>
                </div>
            </div> 
      )})

      return(
        <>
        {allotmentsList}
        </>
      )

    }   
       
}

export default TotalAllotments