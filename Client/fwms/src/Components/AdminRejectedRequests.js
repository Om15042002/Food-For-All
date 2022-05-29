import React,{useEffect,useState,useCallback} from 'react'
import Trial from './Trial'
import adminrejectedrequeststyles from './AdminRejectedRequests.module.css'

var rejectedrequests
var volunteerList
const AdminRejectedRequests=()=> {
    const [flag,setFlag]=useState(false)
    const [flag2,setFlag2]=useState(false)
    const [update,updateState]=useState()
    const forceUpdate=useCallback(()=>updateState({}),[])    
    const [Volunteer,setVolunteer]=useState("")
    const [type,setType]=useState("")
    const [Area,setArea]=useState("")
    const [ItemId,setItemId]=useState("")
    useEffect(async ()=>{
      try{
          const res=await fetch('/getadminrejectedrequests',{ 
          method:"GET",
          headers:{
              "Content-Type":"application/json" 
          }
        });
        rejectedrequests=await res.json();
        // console.log(rejectedrequests);
    }
    catch(error){
      // console.log(error);
    }
    setVolunteer(rejectedrequests.volunteers[0]._id)
    setArea(rejectedrequests.areas[0].address)
    setFlag(true)
  },[update])

  const assignTask=async (e)=>{
      e.preventDefault()
      try{
        const res=await fetch('/newtask',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({volunteer:Volunteer,area:Area,itemId:ItemId,type:type})
      });
      const data=await res.json();
      console.log(data);
    }
    catch(error){
      
    }
    setFlag(false) 
    forceUpdate()
  }

  const doThis=async (volunteer_id)=>
  {
    // setFlag2(true)
    // areaList=rejectedrequests.areas.map(area=>{ return ( <option value={area.address}>{area.name}</option>) } )
    volunteerList=await rejectedrequests.volunteers.map(volunteer=>
        { if(volunteer._id!=volunteer_id){return ( <option value={volunteer._id}>{volunteer.name}</option>)} })
    // console.log("completed");
    // console.log(volunteerList);
    // setFlag2(false)
  }

  if(!flag){return <><h3 className='m-3'>Loading...</h3></>}
  else{
      // console.log(rejectedrequests);
      var rejectedrequestsList; 
      if(!rejectedrequests.datas[0]){
        return <><h3 className='m-3'>No Data Found !!</h3></>
      }
      const areaList=rejectedrequests.areas.map(area=>{ return ( <option value={area.address}>{area.name}</option>) } )
    //   const volunteerList=rejectedrequests.volunteers.map(volunteer=>{ return ( <option value={volunteer._id}>{volunteer.name}</option>) })
      rejectedrequestsList=rejectedrequests.datas.map(rejectedrequest=>
      {
        // console.log(rejectedrequest); 
        return(
          <div className={`row shadow my-5  ${adminrejectedrequeststyles.border}`}>
                  <div className={`col-6 ${adminrejectedrequeststyles.responsive}`}>
                  <table className="table table-borderless text-capitalize m-0">
                  <tbody className="text-nowrap special">
                  <tr className={adminrejectedrequeststyles.tr}>
                    <th className="col-6"> Volunteer Name :</th>
                    <td className="col-6">{rejectedrequest.volunteer.name}</td>
                  </tr>
                  <tr className={adminrejectedrequeststyles.tr}>
                    <th className="col-6">Donation Type :</th>
                     <td className="col-6">{rejectedrequest.task.donation_type}</td>
                  </tr>
                  <tr className={adminrejectedrequeststyles.tr}>
                    <th className="col-6">Donation Date :</th>
                    <td className="col-6">{rejectedrequest.item.donation_date}</td>
                  </tr>
                  <tr className={adminrejectedrequeststyles.tr}>
                    <th className="col-6">Requested Date :</th>
                    <td className="col-6 text-uppercase">{rejectedrequest.task.requested_date}</td>
                  </tr>
                  </tbody>
                  </table>
                  </div>
                  <div className="col-6 responsive">
                      <table className="table table-borderless text-capitalize m-0">
                  <tbody className="text-nowrap">
                  <tr className={adminrejectedrequeststyles.tr}>
                    <th className="col-6"> Source Address :</th>
                    <td className="col-6">{rejectedrequest.task.source_address}</td>
                  </tr>
                  <tr className={adminrejectedrequeststyles.tr}>
                    <th className="col-6"> Destination Address :</th>
                    <td className="col-6">{rejectedrequest.task.dest_address}</td>
                  </tr>
                   <tr className={adminrejectedrequeststyles.tr}>
                    <th className="col-6">Contact Info :</th> 
                    <td className="col-6 text-uppercase">{rejectedrequest.item.contact_no}</td>
                  </tr>
                  <tr className={adminrejectedrequeststyles.tr}>
                    <th className="col-6">Reason :</th>
                    <td className="col-6 text-uppercase">{rejectedrequest.task.reason}</td>
                  </tr>
                  </tbody>
                  </table>
                </div>
                <div className="row g-0 my-3 mx-1">
                    {/* <div className="col-2"></div>
                    <div className="col-2"></div>
                    <div className="col-1"></div> */}
                    <div className="col-2">
                      <button type="button" className={`btn btn-red mx-3 ${adminrejectedrequeststyles.btnred}`}  data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={async e=>{setItemId(rejectedrequest.item._id);setType(rejectedrequest.task.donation_type);}} value={rejectedrequest.task.volunteer_id} onMouseMove={async e=>{await doThis(e.target.value)}}>Assign</button>
                    </div>
                  </div>
            </div> 
      )})
    //   if(flag2){return (<>{rejectedrequestsList}</>)}  
    //   else
      {
          console.log("Trial rendering");
          console.log(areaList);
          console.log(volunteerList);
          return(
        <>
        {rejectedrequestsList}
        {/* <Trial areaList={areaList} volunteerList={volunteerList}/> */}
        <div className="modal fade mt-5" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Assign Request</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form method="POST">
                <div className="modal-body">
                <form method="POST" className={`form-group m-lg-5 ${adminrejectedrequeststyles.adminformgroup}`}>
                <label htmlFor="source">Donation Area</label>
                        <select className="form-select mb-3" aria-label="Default select example" onChange={e=>setArea(e.target.value)} required>
                          {areaList}
                        </select> 
                      <label htmlFor="source">Volunteer</label>
                        <select className="form-select mb-3" aria-label="Default select example" onChange={e=>setVolunteer(e.target.value)} required>
                        {volunteerList}
                        </select>
                    </form>
                  </div>
                <div className="modal-footer">
                  <button type="button" className={`btn btn-red book ${adminrejectedrequeststyles.btnred}`} data-bs-dismiss="modal">Close</button>
                  <button type="button" className={`btn btn-red book ${adminrejectedrequeststyles.btnred}`} data-bs-dismiss="modal" onClick={assignTask}>Assign</button>
                </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )
          }
    }   
       
}

export default AdminRejectedRequests