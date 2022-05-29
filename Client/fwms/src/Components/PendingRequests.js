import React,{useEffect,useState,useCallback} from 'react'
import pendingrequeststyles from './PendingRequests.module.css'

var pendings
const PendingRequests=()=> {
    const [flag,setFlag]=useState(false)
    const [update,updateState]=useState()
    const forceUpdate=useCallback(()=>updateState({}),[])  
    useEffect(async ()=>{
      try{
          const res=await fetch('/getpendingrequests',{ 
          method:"GET",
          headers:{
              "Content-Type":"application/json"
          }
        });
        pendings=await res.json();
        console.log(pendings);
    }
    catch(error){
      // console.log(error);
    }
      setFlag(true)
  },[update])

//   const taskCompleted=async (e)=>{
//       e.preventDefault()
//       console.log("Completed successfully");
//       console.log(e.target.value);
//       try{
//         const res=await fetch('/taskcompleted',{
//         method:"POST",
//         headers:{
//             "Content-Type":"application/json"
//         },
//         body:JSON.stringify({allotment_id:e.target.value})
//       });
//       const data=await res.json();
//       console.log(data);
//     }
//     catch(error){
//     // console.log(error); 
//     }
//     forceUpdate()
//   }

  if(!flag){return <><h3 className='m-3'>Loading...</h3></>}
  else{
      // console.log(pendings);
      var pendingsList; 
      if(!pendings[0]){
        return <><h3 className='m-3'>No Data Found !!</h3></>
      } 
      pendingsList=pendings.map(pending=>
      { 
        // console.log(pending);
        return(
        <div className={`row shadow my-5  ${pendingrequeststyles.border}`}>
                  <div className={`col-6 ${pendingrequeststyles.responsive}`}>
                  <table className="table table-borderless text-capitalize m-0">
                  <tbody className="text-nowrap special"> 
                  <tr className={pendingrequeststyles.tr}>
                    <th className="col-6"> Volunteer Name :</th>
                    <td className="col-6">{pending.volunteer.name}</td>
                  </tr>
                  <tr className={pendingrequeststyles.tr}> 
                    <th className="col-6">Donation Type :</th>
                     <td className="col-6">{pending.task.donation_type}</td>
                  </tr>
                  <tr className={pendingrequeststyles.tr}>
                    <th className="col-6">Donation Date :</th>
                    <td className="col-6">{pending.item.donation_date}</td>
                  </tr>
                  <tr className={pendingrequeststyles.tr}>
                    <th className="col-6">Requested Date :</th>
                    <td className="col-6 text-uppercase">{pending.task.requested_date}</td>
                  </tr>
                  </tbody> 
                  </table>
                  </div>
                  <div className="col-6 responsive">
                      <table className="table table-borderless text-capitalize m-0">
                  <tbody className="text-nowrap">
                  <tr className={pendingrequeststyles.tr}>
                    <th className="col-6"> Source Address :</th>
                    <td className="col-6">{pending.task.source_address}</td>
                  </tr>
                  <tr className={pendingrequeststyles.tr}>
                    <th className="col-6"> Destination Address :</th>
                    <td className="col-6">{pending.task.dest_address}</td>
                  </tr>
                   <tr className={pendingrequeststyles.tr}>
                    <th className="col-6">Contact Info :</th>
                    <td className="col-6 text-uppercase">{pending.item.contact_no}</td>
                  </tr>
                  </tbody>
                  </table>
                </div>
            </div> 
      )})

      return(
        <>
        {pendingsList}
        </>
      )

    }   
       
}

export default PendingRequests