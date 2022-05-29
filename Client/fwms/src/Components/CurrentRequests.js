import React,{useCallback, useEffect,useState} from 'react'
import currentstyles from './CurrentRequests.module.css'

var currentrequests
const CurrentRequests=()=> {
    
    const [flag,setFlag]=useState(false)
    const [reason,setReason]=useState("")
    const [update,updateState]=useState()
    const forceUpdate=useCallback(()=>updateState({}),[])
    useEffect(async ()=>{
      try{
          const res=await fetch('/getassignedrequests',{
          method:"GET",
          headers:{
              "Content-Type":"application/json"
          }
        });
        currentrequests=await res.json();
        // console.log(currentrequests);
    }
    catch(error){
      // console.log(error);
    }
      setFlag(true)
  },[update])

  const requestConfirmed=async (e)=>{
    console.log("Confirmed successfully");
    console.log(e.target.value);
      try{
        const res=await fetch('/requestresponse',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({allotment_id:e.target.value,reason:null})
      });
      const data=await res.json();
      console.log(data);
    }
    catch(error){
      
    }
    setFlag(false)
    forceUpdate()
  }

  const requestRejected=async (e)=>{
      console.log("Rejected successfully");
      console.log(reason);
      console.log(e.target.value);
      try{
        const res=await fetch('/requestresponse',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({allotment_id:e.target.value,reason:reason})
      });
      const data=await res.json();
      console.log(data);
    }
    catch(error){
      
    }
    setFlag(false)
    forceUpdate()
  }
  
  if(!flag){return <><h3 className='m-3'>Loading...</h3></>}
  else{
      console.log(currentrequests);
      var currentrequestsList;  
      if(!currentrequests[0]){
        return <><h3 className='m-3'>No Data Found !!</h3></> 
      }
      else
      {
        currentrequestsList=currentrequests.map(currentrequest=>
      {
        // console.log(currentrequest);
        return(
          <>
        <div className={`row shadow my-5  ${currentstyles.border}`}>
                  <div className={`col-6 ${currentstyles.responsive}`}>
                  <table className="table table-borderless text-capitalize m-0">
                  <tbody className="text-nowrap special"> 
                  <tr className={currentstyles.tr}>
                    <th className="col-6"> Donor Name :</th>
                    <td className="col-6">{currentrequest.donor.name}</td>
                  </tr>
                  <tr className={currentstyles.tr}>
                    <th className="col-6">Donation Type :</th>
                     <td className="col-6">{currentrequest.allotment.donation_type}</td>
                  </tr>
                  <tr className={currentstyles.tr}>
                    <th className="col-6">Donation Date :</th>
                    <td className="col-6">{currentrequest.item.donation_date}</td>
                  </tr>
                  {/* <tr className={currentstyles.tr}>
                    <th className="col-6"> Source Address :</th>
                    <td className="col-6">{currentrequest.allotment.source_address}</td>
                  </tr> */}
                  </tbody>
                  </table>
                  </div>
                  <div className="col-6 responsive">
                      <table className="table table-borderless text-capitalize m-0">
                  <tbody className="text-nowrap">
                  <tr className={currentstyles.tr}>
                    <th className="col-6"> Source Address :</th>
                    <td className="col-6">{currentrequest.allotment.source_address}</td>
                  </tr>
                  <tr className={currentstyles.tr}>
                    <th className="col-6"> Destination Address :</th>
                    <td className="col-6">{currentrequest.allotment.dest_address}</td>
                  </tr>
                  <tr className={currentstyles.tr}>
                    <th className="col-6"> Requested Date :</th>
                    <td className="col-6 text-uppercase">{currentrequest.allotment.requested_date}</td>
                  </tr>
                  {/*<tr className={currentstyles.tr}>
                    <th className="col-6">donated_status :</th>
                    <td className="col-6">{currentrequest.donated_status}</td>
                  </tr>
                  <tr className={currentstyles.tr}>
                    <th className="col-6">reason :</th>
                    <td className="col-6">{currentrequest.reason}</td>
                  </tr> */} 
                  </tbody>
                  </table>
                </div>
                  <div className="row g-0 my-3 mx-1">
                    <div className="col-1 mx-2">
                      <button className={`btn btn-red book m-2 ${currentstyles.btnred}`} value={currentrequest.allotment._id} onClick={requestConfirmed}>Confirm</button>
                    </div>
                    <div className="col-1 mx-2">
                      <button className={`btn btn-red book m-2 ${currentstyles.btnred}`} data-bs-toggle="modal" data-bs-target="#exampleModal" value={currentrequest.allotment._id}>Reject</button>
                    </div>
                  </div>
            </div> 
            <div className="modal fade mt-5" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Reject Request</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form method="POST">
                <div className="modal-body">
                      <div className="mb-3">
                          <label for="reason" className="form-label">Give Your Reason</label>
                          <textarea type="text" className="form-control" id="reason" name="reason" onChange={e=>setReason(e.target.value)}/>
                      </div>
                  </div> 
                <div className="modal-footer">
                  <button type="button" className={`btn btn-red book ${currentstyles.btnred}`} data-bs-dismiss="modal">Close</button>
                  <button type="button" className={`btn btn-red book ${currentstyles.btnred}`} data-bs-dismiss="modal" value={currentrequest.allotment._id} onClick={requestRejected}>Reject</button>
                </div>
                </form>
              </div>
            </div>
          </div>
          </>
      )})
                }
      return(
        <>
        {currentrequestsList}
        </>
      )

    }   
       
}

export default CurrentRequests