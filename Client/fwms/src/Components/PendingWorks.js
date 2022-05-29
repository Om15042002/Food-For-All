import React,{useEffect,useState,useCallback} from 'react'
import pendingstyles from './PendingWorks.module.css'
// import { useNavigate } from 'react-router-dom';

var pendings
const PendingWorks=()=> {
    
    // const navigate=useNavigate();
    const [flag,setFlag]=useState(false) 
    const [update,updateState]=useState()
    const forceUpdate=useCallback(()=>updateState({}),[])  
    useEffect(async ()=>{
      try{
          const res=await fetch('/getpendingworks',{ 
          method:"GET",
          headers:{
              "Content-Type":"application/json"
          }
        });
        pendings=await res.json();
        // if(!pendings[0])
        //   console.log(pendings);
    }
    catch(error){
      // console.log(error);
    }
      setFlag(true)
  },[update])

  const taskCompleted=async (e)=>{
      e.preventDefault()
      console.log("Completed successfully");
      console.log(e.target.value);
      try{
        const res=await fetch('/taskcompleted',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({allotment_id:e.target.value})
      });
      const data=await res.json();
      console.log(data);
    }
    catch(error){
    // console.log(error);
    }
    // navigate('/volunteerpage');
    forceUpdate()
  }

  if(!flag){return <><h3 className='m-3'>Loading...</h3></>}
  else{
      // console.log(pendings);
      var pendingsList;
      if(!pendings[0]){
        return <><h3 className='m-3'>No Data Found !!</h3></>
      }
      else
      {
      pendingsList=pendings.map(pending=>
      {
        // console.log(pending);
        return(
          <div className={`row shadow my-5  ${pendingstyles.border}`}>
                  <div className={`col-6 ${pendingstyles.responsive}`}>
                  <table className="table table-borderless text-capitalize m-0">
                  <tbody className="text-nowrap special">
                  <tr className={pendingstyles.tr}>
                    <th className="col-6"> Donor Name :</th>
                    <td className="col-6">{pending.donor.name}</td>
                  </tr>
                  <tr className={pendingstyles.tr}>
                    <th className="col-6">Donation Type :</th>
                     <td className="col-6">{pending.allotment.donation_type}</td>
                  </tr>
                  <tr className={pendingstyles.tr}>
                    <th className="col-6">Donation Date :</th>
                    <td className="col-6">{pending.item.donation_date}</td>
                  </tr>
                  </tbody>
                  </table>
                  </div>
                  <div className="col-6 responsive">
                      <table className="table table-borderless text-capitalize m-0">
                  <tbody className="text-nowrap">
                  <tr className={pendingstyles.tr}>
                    <th className="col-6"> Source Address :</th>
                    <td className="col-6">{pending.allotment.source_address}</td>
                  </tr>
                  <tr className={pendingstyles.tr}>
                    <th className="col-6"> Destination Address :</th>
                    <td className="col-6">{pending.allotment.dest_address}</td>
                  </tr>
                   <tr className={pendingstyles.tr}>
                    <th className="col-6">Contact Info :</th>
                    <td className="col-6 text-uppercase">{pending.item.contact_no}</td>
                  </tr>
                  {/*<tr className={pendingstyles.tr}>
                    <th className="col-6">donated_status :</th>
                    <td className="col-6">{pending.donated_status}</td>
                  </tr>
                  <tr className={pendingstyles.tr}>
                    <th className="col-6">reason :</th>
                    <td className="col-6">{pending.reason}</td>
                  </tr> */}
                  </tbody>
                  </table>
                </div>
                  <div className="row g-0 my-3 mx-1">
                    <div className="col-2">
                      <button type="button" className={`btn btn-red m-2 mx-3 ${pendingstyles.btnred}`} value={pending.allotment._id} onClick={taskCompleted}>Completed</button>
                    </div>
                  </div>
            </div>
       
      )})
                }
      return(
        <>
        {pendingsList}
        </>
      )

    }   
       
}

export default PendingWorks