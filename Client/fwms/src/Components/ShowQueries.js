import React,{useEffect,useState,useCallback} from 'react'
import queriestyles from './ShowQueries.module.css'

var queries
const ShowQueries=()=> {
    const [flag,setFlag]=useState(false) 
    const [update,updateState]=useState("")
    const forceUpdate=useCallback(()=>updateState(""),[])  
    const [reply,setReply]=useState("")
    const [queryId,setQueryId]=useState("")
    useEffect(async ()=>{
      try{
          const res=await fetch('/getqueries',{ 
          method:"GET",
          headers:{
              "Content-Type":"application/json"
          }
        });
        queries=await res.json();
        // console.log(queries);
    } 
    catch(error){
      // console.log(error); 
    }
      setFlag(true)
  },[update])

  const Reply=async (e)=>{
      e.preventDefault()
    //   console.log("Completed successfully");
    //   console.log(e.target.value);
      try{
        const res=await fetch('/replyquery',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({query_id:queryId,reply:reply})
      });
      const data=await res.json();
      console.log(data);
    }
    catch(error){
    // console.log(error);
    }
    setFlag(false)
    forceUpdate()
  }

  if(!flag){return <><h3 className='m-3'>Loading...</h3></>}
  else{
      // console.log(queries); 
      var queriesList; 
      if(!queries[0]){
        return <><h3 className='m-3'>No Data Found !!</h3></>
      }
      queriesList=queries.map(query=>
      {
        // console.log(query);
        return(
          <div className={`row shadow my-5  ${queriestyles.border}`}>
                  <div className={`col-6 ${queriestyles.responsive}`}>
                  <table className="table table-borderless text-capitalize m-0">
                  <tbody className="text-nowrap special">
                  <tr className={queriestyles.tr}>
                    <th className="col-6"> Name :</th>
                    <td className="col-6">{query.name}</td>
                  </tr>
                  <tr className={queriestyles.tr}>
                    <th className="col-6"> Email :</th>
                     <td className="col-6">{query.email_id}</td>
                  </tr>
                  {/* <tr className={queriestyles.tr}>
                    <th className="col-6">Donation Date :</th>
                    <td className="col-6">{query.item.donation_date}</td>
                  </tr>
                  <tr className={queriestyles.tr}>
                    <th className="col-6"> Source Address :</th>
                    <td className="col-6">{query.allotment.source_address}</td>
                  </tr> */}
                  </tbody>
                  </table>
                  </div>
                  <div className="col-6 responsive">
                      <table className="table table-borderless text-capitalize m-0">
                  <tbody className="text-nowrap">
                  <tr className={queriestyles.tr}>
                    <th className="col-6"> Description :</th>
                    <td className="col-6">{query.description}</td>
                  </tr>
                   {/* <tr className={queriestyles.tr}>
                    <th className="col-6">Contact Info :</th>
                    <td className="col-6 text-uppercase">{query.item.contact_no}</td>
                  </tr> */}
                  {/*<tr className={queriestyles.tr}>
                    <th className="col-6">donated_status :</th>
                    <td className="col-6">{query.donated_status}</td>
                  </tr>
                  <tr className={queriestyles.tr}>
                    <th className="col-6">reason :</th>
                    <td className="col-6">{query.reason}</td>
                  </tr> */}
                  {/* <button type="button" className={`btn btn-red m-2 mt-3 ${queriestyles.btnred}`} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={e=>setQueryId(query._id)}>Reply</button> */}
                  </tbody>
                  </table>
                </div>
                  <div className="row g-0 my-3 mx-1">
                    <div className="col-2">
                      <button type="button" className={`btn btn-red m-3 mt-2 ${queriestyles.btnred}`} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={e=>setQueryId(query._id)}>Reply</button>
                    </div>
                  </div>
            </div> 
      )})

      return(
        <>
        {queriesList}
        <div className="modal fade mt-5" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Resolve Query</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form method="POST">
                <div className="modal-body">
                      <div className="mb-3">
                          <label for="reply" className="form-label">Give Your Reason</label>
                          <textarea type="text" className="form-control" id="reply" name="reply" onChange={e=>setReply(e.target.value)}/>
                      </div>
                  </div>
                <div className="modal-footer">
                  <button type="button" className={`btn btn-red book ${queriestyles.btnred}`} data-bs-dismiss="modal">Close</button>
                  <button type="button" className={`btn btn-red book ${queriestyles.btnred}`} data-bs-dismiss="modal"  onClick={Reply} >Reply</button>
                </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )

    }   
       
}

export default ShowQueries