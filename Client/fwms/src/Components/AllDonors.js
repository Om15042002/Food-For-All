import React,{useEffect,useState} from 'react'
import alldonorstyles from './AllDonors.module.css'

var donors
const AllDonors=()=> {
    const [flag,setFlag]=useState(false) 
  
    useEffect(async ()=>{
      try{
          const res=await fetch('/getalldonor',{
          method:"GET",
          headers:{
              "Content-Type":"application/json"
          }
        });
        donors=await res.json();
        // console.log(donors);
    }
    catch(error){
      // console.log(error);
    }
      setFlag(true)
  },[])

  if(!flag){return <><h3 className='m-3'>Loading...</h3></>}
  else{
    //   console.log(donors);
      var donorsList; 
      if(!donors[0]){
        return <><h3 className='m-3'>No Data Found !!</h3></>
      }
      donorsList=donors.map(donor=>
      {
        // console.log(donor);
        return(
          <div className={`row shadow my-5  ${alldonorstyles.border}`}>
                  <div className={`col-6 ${alldonorstyles.responsive}`}>
                  <table className="table table-borderless text-capitalize m-0">
                  <tbody className="text-nowrap special">
                  <tr className={alldonorstyles.tr}>
                    <th className="col-6">Donor Name :</th>
                    <td className="col-6">{donor.name}</td>
                  </tr>
                  <tr className={alldonorstyles.tr}>
                    <th className="col-6"> Gender :</th>
                    <td className="col-6">{donor.gender}</td>
                  </tr>
                  <tr className={alldonorstyles.tr}>
                    <th className="col-6"> Age :</th>
                     <td className="col-6">{donor.age}</td>
                  </tr>
                  
                  </tbody>
                  </table>
                  </div>
                  <div className="col-6 responsive">
                      <table className="table table-borderless text-capitalize m-0">
                  <tbody className="text-nowrap">
                  <tr className={alldonorstyles.tr}>
                    <th className="col-6"> Mobile :</th>
                    <td className="col-6">{donor.mob_no}</td>
                  </tr>
                  <tr className={alldonorstyles.tr}>
                    <th className="col-6">Email :</th>
                    <td className="col-6">{donor.email_id}</td>
                  </tr>
                  {/* <tr className={alldonorstyles.tr}>
                    <th className="col-6">Join Date :</th>
                    <td className="col-6">{donor.date}</td>
                  </tr> */}
                  </tbody>
                  </table>
                </div>
            </div> 
      )})

      return(
        <>
        {donorsList}
        </>
      )

    }   
       
}

export default AllDonors