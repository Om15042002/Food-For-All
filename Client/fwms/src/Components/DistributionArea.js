import React,{useEffect,useState,useCallback} from 'react'
import distributionareastyles from './DistributionAreas.module.css'

var areas
const DistributionArea=()=> {
    const [flag,setFlag]=useState(false)
    const [newarea,setNewarea]=useState({name:"",address:"",population:0})
    const [update,updateState]=useState()
    const forceUpdate=useCallback(()=>updateState({}),[])    
    const PostData=async (e)=>{
        e.preventDefault();
        const {name,address,population}=newarea
        const res=await fetch('/addarea',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({name,address,population})
        }); 
        const data=await res.json();
        console.log(data);
        setFlag(false) 
        forceUpdate()
      }
        function changeHandler(e)
        {
            let tname=e.target.name;
            let value=e.target.value;
            setNewarea({...newarea,[tname]:value})
        } 
    useEffect(async ()=>{
      console.log("yes in hook effect");
      try{
          const res=await fetch('/getareas',{ 
          method:"GET",
          headers:{
              "Content-Type":"application/json"
          }
        });
        areas=await res.json();
        console.log(areas);
    }
    catch(error){
      console.log(error);
    }
      setFlag(true)
  },[update])

  if(!flag){return <><h3 className='m-3'>Loading...</h3></>}
  else 
  {
      console.log(areas);
      var areasList; 
      if(!areas[0]){
        return <>
          <h3 className='m-3'>No Data Found !!</h3>
          <div className="row g-0 my-3">
                    <div className="col-2">
                      <button type="button" className={`btn btn-red m-5 mx-5 ${distributionareastyles.btnred}`}  data-bs-toggle="modal" data-bs-target="#exampleModal" >Add</button>
                    </div>
          </div>
        <div className="modal fade mt-5" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Add New Area</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div> 
                <form method="POST">
                <div className="modal-body">
                    <form method="POST" className={`form-group m-lg-5 ${distributionareastyles.adminformgroup}`}>
                    <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" value={newarea.name} className="form-control" name="name" 
                                id="name" placeholder="Enter Area Name" required onChange={e=>changeHandler(e)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" value={newarea.address} className="form-control" name="address"  id="address"     
                                placeholder="Enter Area Address" required onChange={e=>changeHandler(e)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Population" className="form-label">Population</label>
                                <input type="number" value={newarea.population} className="form-control" name="population" id="population" placeholder="Enter Population" required onChange={e=>changeHandler(e)}/>
                            </div>
                    </form>
                  </div>
                <div className="modal-footer">
                  <button type="button" className={`btn btn-red book ${distributionareastyles.btnred}`} data-bs-dismiss="modal">Close</button>
                  <button type="button" className={`btn btn-red book ${distributionareastyles.btnred}`} data-bs-dismiss="modal" onClick={PostData}>Add</button>
                </div>
                </form>
              </div>
            </div>
          </div>
        </> 
      }
      areasList=areas.map(area=>
      {
        console.log(area);
        return(
          <div className={`row shadow my-5  ${distributionareastyles.border}`}>
                  <div className={`col-6 ${distributionareastyles.responsive}`}>
                  <table className="table table-borderless text-capitalize m-0">
                  <tbody className="text-nowrap special">
                  <tr className={distributionareastyles.tr}>
                    <th className="col-6">Area Name :</th>
                    <td className="col-6">{area.name}</td>
                  </tr>
                  <tr className={distributionareastyles.tr}>
                    <th className="col-6"> Area Address :</th>
                    <td className="col-6">{area.address}</td>
                  </tr>
                  <tr className={distributionareastyles.tr}>
                    <th className="col-6"> Population :</th>
                     <td className="col-6">{area.population}</td>
                  </tr> 
                  </tbody>
                  </table>
                  </div>
                  <div className="col-6 responsive">
                      <table className="table table-borderless text-capitalize m-0">
                  <tbody className="text-nowrap">
                  <tr className={distributionareastyles.tr}>
                    <th className="col-6"> Date :</th>
                    <td className="col-6">{area.date}</td>
                  </tr>
                  <tr className={distributionareastyles.tr}>
                    <th className="col-6"> Last Date :</th>
                    <td className="col-6 text-uppercase">{area.lastdate}</td>
                  </tr>
                  <tr className={distributionareastyles.tr}>
                    <th className="col-6">Donation :</th>
                    <td className="col-6">{area.status?area.status:"Not Assigned"}</td>
                  </tr>
                  </tbody>
                  </table>
                </div>
            </div> 
      )})

      return(
        <>
        {areasList}
        <div className="row g-0 my-3">
                    <div className="col-2">
                      <button type="button" className={`btn btn-red mx-5 ${distributionareastyles.btnred}`}  data-bs-toggle="modal" data-bs-target="#exampleModal" >Add</button>
                    </div>
        </div>
        <div className="modal fade mt-5" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Add New Area</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div> 
                <form method="POST">
                <div className="modal-body">
                    <form method="POST" className={`form-group m-lg-5 ${distributionareastyles.adminformgroup}`}>
                    <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" value={newarea.name} className="form-control" name="name" 
                                id="name" placeholder="Enter Area Name" required onChange={e=>changeHandler(e)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" value={newarea.address} className="form-control" name="address"  id="address"     
                                placeholder="Enter Area Address" required onChange={e=>changeHandler(e)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Population" className="form-label">Population</label>
                                <input type="number" value={newarea.population} className="form-control" name="population" id="population" placeholder="Enter Population" required onChange={e=>changeHandler(e)}/>
                            </div>
                    </form>
                  </div>
                <div className="modal-footer">
                  <button type="button" className={`btn btn-red book ${distributionareastyles.btnred}`} data-bs-dismiss="modal">Close</button>
                  <button type="button" className={`btn btn-red book ${distributionareastyles.btnred}`} data-bs-dismiss="modal" onClick={PostData}>Add</button>
                </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )
        
  }

}

export default DistributionArea