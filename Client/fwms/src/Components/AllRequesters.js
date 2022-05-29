import React,{useEffect,useState} from 'react'
import allrequesterstyles from './AllRequesters.module.css'

var requesters
const AllRequesters=()=> {
    const [flag,setFlag]=useState(false)
  
    useEffect(async ()=>{
      try{
          const res=await fetch('/getallrequester',{
          method:"GET",
          headers:{
              "Content-Type":"application/json"
          }
        });
        requesters=await res.json();
        // console.log(requesters);
    }
    catch(error){
      // console.log(error);
    }
      setFlag(true)
  },[])

  if(!flag){return <><h3 className='m-3'>Loading...</h3></>}
  else{
    //   console.log(requesters);
    var requestersList; 
      if(!requesters[0]){
        return <><h3 className='m-3'>No Data Found !!</h3></>
      }
      requestersList=requesters.map(requester=>
      {
        // console.log(requester);
        return(
          <div className={`row shadow my-5  ${allrequesterstyles.border}`}>
                  <div className={`col-6 ${allrequesterstyles.responsive}`}>
                  <table className="table table-borderless text-capitalize m-0">
                  <tbody className="text-nowrap special">
                  <tr className={allrequesterstyles.tr}>
                    <th className="col-6">requester Name :</th>
                    <td className="col-6">{requester.name}</td>
                  </tr>
                  <tr className={allrequesterstyles.tr}>
                    <th className="col-6"> Gender :</th>
                    <td className="col-6">{requester.gender}</td>
                  </tr>
                  <tr className={allrequesterstyles.tr}>
                    <th className="col-6"> Age :</th>
                     <td className="col-6">{requester.age}</td>
                  </tr>
                  </tbody>
                  </table>
                  </div>
                  <div className="col-6 responsive">
                      <table className="table table-borderless text-capitalize m-0">
                  <tbody className="text-nowrap">
                  <tr className={allrequesterstyles.tr}>
                    <th className="col-6"> Mobile :</th>
                    <td className="col-6">{requester.mob_no}</td>
                  </tr>
                  <tr className={allrequesterstyles.tr}>
                    <th className="col-6">Email :</th>
                    <td className="col-6">{requester.email_id}</td>
                  </tr>
                  </tbody>
                  </table>
                </div>
            </div> 
      )})

      return(
        <>
        {requestersList}
        </>
      )

    }   
       
}

export default AllRequesters