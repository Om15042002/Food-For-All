import React,{useState,useCallback,useEffect} from 'react'
import adminfoodrequeststyles from './AdminFoodRequest.module.css'
import image from "../Images/Food3.jpg";

const images=require.context('../Images',true)
var requests
function AdminFoodRequest() {
  const [flag,setFlag]=useState(false)
    const [update,updateState]=useState() 
    const forceUpdate=useCallback(()=>updateState({}),[])   
    const [Volunteer,setVolunteer]=useState("")
    const [Area,setArea]=useState("")
    const [ItemId,setItemId]=useState("")
    const assignTask=async (e)=>{ 
      try{
        const res=await fetch('/newtask',{
        method:"POST",  
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({volunteer:Volunteer,area:Area,itemId:ItemId,type:"Food"})
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
          const res=await fetch('/getfoodrequests',{
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
      setArea(requests.areas[0].address)
      setFlag(true)
  },[update])
  
  if(!flag){return <><h3 className='m-3'>Loading...</h3></>} 
  else{
      console.log(requests);
      var requestsList; 
      if(!requests.datas[0]){
        return <><h3 className='m-3'>No Data Found !!</h3></>
      }
      const areaList=requests.areas.map(area=>{ return ( <option value={area.address}>{area.name}</option>) } )
      const volunteerList=requests.volunteers.map(volunteer=>{ return ( <option value={volunteer._id}>{volunteer.name}</option>) })
      requestsList=requests.datas.map(request=>
      { 
        // console.log(pending);
        let source=images(`./${request.item.photo_path}`)
        return(
          <>
        <div className={`row shadow my-5  ${adminfoodrequeststyles.border}`}>
                  <div className={`col-6 mt-3 ${adminfoodrequeststyles.img1}`}>
                    <img src={source}  width="500vw" height="300vh"/>
                  </div>
                  <div className={`col-6 p-3 ${adminfoodrequeststyles.responsive}`}>
                    <table className="table table-borderless text-capitalize m-2">
                  <tbody className="text-nowrap">
                  <tr className={adminfoodrequeststyles.tr}>
                    <th className="col-6"> Donor Name :</th>
                    <td className="col-6">{request.donor.name}</td>
                  </tr>
                  <tr className={adminfoodrequeststyles.tr}>
                    <th className="col-6">Donation Date :</th>
                    <td className="col-6">{request.item.donation_date}</td>
                  </tr>
                  <tr className={adminfoodrequeststyles.tr}>
                    <th className="col-6"> Source Address :</th>
                    <td className="col-6">{request.item.source_address}</td>
                  </tr>
                   <tr className={adminfoodrequeststyles.tr}>
                    <th className="col-6">Contact Info :</th>
                    <td className="col-6 text-uppercase">{request.item.contact_no}</td>
                  </tr>
                    <button type="button" className={`btn btn-red m-2 mt-4 ${adminfoodrequeststyles.btnred}`}  data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={e=>setItemId(request.item._id)}>Assign</button>
                  
                  </tbody>
                  </table>
                </div>
                  {/* <div className="row g-0 my-3 mx-1">
                    <div className="col-2">
                      <button type="button" className={`btn btn-red ${adminfoodrequeststyles.btnred}`}  data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={e=>setItemId(request.item._id)}>Assign</button>
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
                  <h5 className="modal-title" id="exampleModalLabel">Assign Request</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form method="POST">
                <div className="modal-body"> 
                <form method="POST" className={`form-group m-lg-5 ${adminfoodrequeststyles.adminformgroup}`}>
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
                  <button type="button" className={`btn btn-red book ${adminfoodrequeststyles.btnred}`} data-bs-dismiss="modal">Close</button>
                  <button type="button" className={`btn btn-red book ${adminfoodrequeststyles.btnred}`} data-bs-dismiss="modal" onClick={assignTask}>Assign</button>
                </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )

      }
}

export default AdminFoodRequest