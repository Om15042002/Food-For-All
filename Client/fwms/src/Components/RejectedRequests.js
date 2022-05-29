import React,{useEffect,useState} from 'react'
import rejectedstyles from './RejectedRequests.module.css'

var rejections
const RejectedRequests=()=> {
    const [flag,setFlag]=useState(false)
  
    useEffect(async ()=>{
      try{
          const res=await fetch('/getrejectedrequests',{ 
          method:"GET",
          headers:{
              "Content-Type":"application/json" 
          }
        });
        rejections=await res.json();
        // console.log(rejections);
    }
    catch(error){
      // console.log(error);
    }
      setFlag(true)
  },[])

  const taskCompleted=(e)=>{

  }
 
  if(!flag){return <><h3 className='m-3'>Loading...</h3></>}
  else{
      // console.log(rejections);
      var rejectionsList;
      if(!rejections[0]){
        return <><h3 className='m-3'>No Data Found !!</h3></>
      }
      else
      {
        rejectionsList=rejections.map(rejection=> 
          {
            // console.log(rejection);
            return(
              <div className={`row shadow my-5  ${rejectedstyles.border}`}>
                      <div className={`col-6 ${rejectedstyles.responsive}`}>
                      <table className="table table-borderless text-capitalize m-0">
                      <tbody className="text-nowrap special">
                      <tr className={rejectedstyles.tr}>
                        <th className="col-6"> Donor Name :</th>
                        <td className="col-6">{rejection.donor.name}</td>
                      </tr>
                      <tr className={rejectedstyles.tr}>
                        <th className="col-6">Donation Type :</th>
                         <td className="col-6">{rejection.allotment.donation_type}</td>
                      </tr>
                      {/* <tr className={rejectedstyles.tr}>
                        <th className="col-6">Donation Id :</th>
                        <td className="col-6">{rejection.donation_id}</td>
                      </tr> */}
                      <tr className={rejectedstyles.tr}>
                        <th className="col-6"> Requested Date :</th>
                        <td className="col-6 text-uppercase">{rejection.allotment.requested_date}</td>
                      </tr>
                      
                      </tbody>
                      </table>
                      </div>
                      <div className="col-6 responsive">
                          <table className="table table-borderless text-capitalize m-0">
                      <tbody className="text-nowrap">
                      <tr className={rejectedstyles.tr}>
                        <th className="col-6"> Source Address :</th>
                        <td className="col-6">{rejection.allotment.source_address}</td>
                      </tr>
                      <tr className={rejectedstyles.tr}>
                        <th className="col-6"> Destination Address :</th>
                        <td className="col-6">{rejection.allotment.dest_address}</td>
                      </tr>
                      
                      {/* <tr className={rejectedstyles.tr}>
                        <th className="col-6">donated_status :</th>
                        <td className="col-6">{rejection.donated_status}</td>
                      </tr> */}
                      <tr className={rejectedstyles.tr}>
                        <th className="col-6"> Reason :</th>
                        <td className="col-6">{rejection.allotment.reason}</td>
                      </tr>
                      </tbody>
                      </table>
                    </div>
                </div> 
          )})
      }

      return(
        <>
        {rejectionsList}
        </>
      )

    }   
       
}

export default RejectedRequests