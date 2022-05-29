import React,{useEffect,useState} from 'react'
import allvolunteerstyles from './AllVolunteers.module.css'

var volunteers
const AllVolunteers=()=> {
    const [flag,setFlag]=useState(false)
  
    useEffect(async ()=>{
      try{
          const res=await fetch('/getallvolunteer',{
          method:"GET",
          headers:{
              "Content-Type":"application/json"
          }
        });
        volunteers=await res.json();
        // console.log(volunteers);
    }
    catch(error){
      // console.log(error);
    }
      setFlag(true)
  },[])

  if(!flag){return <><h3 className='m-3'>Loading...</h3></>}
  else{
    //   console.log(volunteers);
    var volunteersList; 
      if(!volunteers[0]){
        return <><h3 className='m-3'>No Data Found !!</h3></>
      }
      volunteersList=volunteers.map(volunteer=>
      {
        // console.log(volunteer);
        return(
          <div className={`row shadow my-5  ${allvolunteerstyles.border}`}>
                  <div className={`col-6 ${allvolunteerstyles.responsive}`}>
                  <table className="table table-borderless text-capitalize m-0">
                  <tbody className="text-nowrap special">
                  <tr className={allvolunteerstyles.tr}>
                    <th className="col-6">Volunteer Name :</th>
                    <td className="col-6">{volunteer.name}</td>
                  </tr>
                  <tr className={allvolunteerstyles.tr}>
                    <th className="col-6"> Gender :</th>
                    <td className="col-6">{volunteer.gender}</td>
                  </tr>
                  <tr className={allvolunteerstyles.tr}>
                    <th className="col-6"> Age :</th>
                     <td className="col-6">{volunteer.age}</td>
                  </tr>
                  
                  </tbody>
                  </table>
                  </div>
                  <div className="col-6 responsive">
                      <table className="table table-borderless text-capitalize m-0">
                  <tbody className="text-nowrap">
                  <tr className={allvolunteerstyles.tr}>
                    <th className="col-6"> Mobile :</th>
                    <td className="col-6">{volunteer.mob_no}</td>
                  </tr>
                  <tr className={allvolunteerstyles.tr}>
                    <th className="col-6">Email :</th>
                    <td className="col-6">{volunteer.email_id}</td>
                  </tr>
                  <tr className={allvolunteerstyles.tr}>
                    <th className="col-6"> Reason :</th>
                    <td className="col-6 text-uppercase">{volunteer.reason}</td>
                  </tr>
                  {/* <tr className={allvolunteerstyles.tr}>
                    <th className="col-6">Requested Date :</th>
                    <td className="col-6">{volunteer.volunteer.requested_date}</td>
                  </tr>
                  <tr className={allvolunteerstyles.tr}>
                    <th className="col-6"> Donated Date :</th>
                    <td className="col-6">{volunteer.item.donated_date}</td>
                  </tr> */}
                  </tbody>
                  </table>
                </div>
            </div> 
      )})

      return(
        <>
        {volunteersList}
        </>
      )

    }   
       
}

export default AllVolunteers