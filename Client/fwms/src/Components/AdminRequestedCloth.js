import React,{useState,useCallback,useEffect} from 'react'
import adminrequestedclothstyles from './AdminRequestedCloth.module.css'
import image from "../Images/anytime.jpg";

const images=require.context('../Images',true)
var requests,clothList
function AdminRequestedCloth() {
    const [flag,setFlag]=useState(false)
    const [update,updateState]=useState()
    const forceUpdate=useCallback(()=>updateState({}),[])  
    const [Volunteer,setVolunteer]=useState("")
    const [Cloth,setCloth]=useState("")
    const [ItemId,setItemId]=useState("")
    const [Area,setArea]=useState("")
    const assignTask=async (e)=>{
    try{
        // console.log(ItemId);
        const res=await fetch('/newtaskforrequest',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({volunteer:Volunteer,item:Cloth,itemId:ItemId,area:Area,type:"Cloth"})
      });
      const data=await res.json();
      console.log(data);
    }
    catch(error){
      
    }
    setFlag(false)
    forceUpdate()
  }
  useEffect(async ()=>{
    try{
      const res=await fetch('/getrequestedcloths',{
        method:"GET",
        headers:{ 
          "Content-Type":"application/json"
        }
      });
      requests=await res.json();
      // console.log(pendings);
    }
    catch(error){
      // console.log(error);
    }
    setVolunteer(requests.volunteers[0]._id)
    // setCloth(requests.cloths[0]._id)
    setFlag(true)
  },[update])
   
  const doThis=async (quantity)=>
  {
    // setFlag2(true)
    // areaList=rejectedrequests.areas.map(area=>{ return ( <option value={area.address}>{area.name}</option>) } )
    clothList=await requests.cloths.map(cloth=>
        { if(cloth.quantity!=quantity){return ( <option value={cloth._id}>{cloth.desc}</option>)} })
    // console.log("completed");
    // console.log(volunteerList); 
    // setFlag2(false)
  }
  
  if(!flag){return <><h3 className='m-3'>Loading...</h3></>}
  else{
      console.log(requests);
      var requestsList; 
      if(!requests.datas[0]){
        return <><h3 className='m-3'>No Data Found !!</h3></>
      }
      // const clothList=requests.cloths.map(cloth=>{ return ( <option value={cloth._id}>{cloth.desc}</option>) } )
      const volunteerList=requests.volunteers.map(volunteer=>{ return ( <option value={volunteer._id}>{volunteer.name}</option>) })
      requestsList=requests.datas.map(request=>
      {
        // console.log(pending);
        let source=images(`./${request.request.photo_path}`)
        return(
          <>
        <div className={`row shadow my-5  ${adminrequestedclothstyles.border}`}>
                  <div className={`col-6 mt-3 ${adminrequestedclothstyles.img1}`}>
                    <img src={source} width="500vw" height="300vh"/>
                  </div>
                  <div className={`col-6 p-3 ${adminrequestedclothstyles.responsive}`}>
                  <table className="table table-borderless text-capitalize m-0">
                  <tbody className="text-nowrap special"> 
                  <tr className={adminrequestedclothstyles.tr}>
                    <th className="col-6"> Requester Name :</th>
                    <td className="col-6">{request.requester.name}</td>
                  </tr>
                  <tr className={adminrequestedclothstyles.tr}>
                    <th className="col-6">Request Date :</th>
                    <td className="col-6">{request.request.request_date}</td>
                  </tr>
                  <tr className={adminrequestedclothstyles.tr}>
                    <th className="col-6"> Description :</th>
                    <td className="col-6">{request.request.desc}</td>
                  </tr>
                   <tr className={adminrequestedclothstyles.tr}>
                    <th className="col-6">Quantity :</th>
                    <td className="col-6 text-uppercase">{request.request.quantity}</td>
                  </tr>
                  <tr className={adminrequestedclothstyles.tr}>
                    <th className="col-6"> Destination Address :</th>
                    <td className="col-6">{request.request.source_address}</td>
                  </tr>
                   <tr className={adminrequestedclothstyles.tr}>
                    <th className="col-6">Contact Info :</th>
                    <td className="col-6 text-uppercase">{request.request.contact_no}</td>
                  </tr>
                    <button type="button" className={`btn btn-red m-2 mt-2 ${adminrequestedclothstyles.btnred}`}  data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={e=>{setArea(request.request.source_address);setItemId(request.request._id)}} value={request.request.quantity} onMouseMove={async e=>{await doThis(e.target.value)}}>Assign</button>
                  </tbody>
                  </table>
                  </div>
                  {/* <div className="row g-0 my-3 mx-1">
                    <div className="col-2">
                      <button type="button" className={`btn btn-red ${adminrequestedclothstyles.btnred}`}  data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={e=>{setArea(request.request.source_address);setItemId(request.request._id)}} value={request.request.quantity} onMouseMove={async e=>{await doThis(e.target.value)}}>Assign</button>
                    </div>
                  </div> */}
            </div> 
            
          </>
      )})

      return( 
        <>
        {requestsList}
        <div className="modal fade mt-5" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">FullFill Request</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form method="POST">
                <div className="modal-body"> 
                <form method="POST" className={`form-group m-lg-5 ${adminrequestedclothstyles.adminformgroup}`}>
                <label htmlFor="source">Available Cloth</label>
                        <select className="form-select mb-3" aria-label="Default select example" onChange={e=>setCloth(e.target.value)} required>
                          {clothList}
                        </select> 
                      <label htmlFor="source">Volunteer</label>
                        <select className="form-select mb-3" aria-label="Default select example" onChange={e=>setVolunteer(e.target.value)} required>
                        {volunteerList}
                        </select>
                    </form>
                  </div>
                <div className="modal-footer">
                  <button type="button" className={`btn btn-red book ${adminrequestedclothstyles.btnred}`} data-bs-dismiss="modal">Close</button>
                  <button type="button" className={`btn btn-red book ${adminrequestedclothstyles.btnred}`} data-bs-dismiss="modal" onClick={assignTask}>Assign</button>
                </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )

      }
}

export default AdminRequestedCloth