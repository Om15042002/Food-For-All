import React, { useEffect, useRef, useState,useContext } from 'react'
import signupstyles from '../Components/SignupPage.module.css';

function NewVesselDonation() {
  const [donation,setDonation]=useState({quantity:"",desc:"",source:"",mob_no:""})
  const [validation,setValidation]=useState({vquantity:"",vmob_no:""})
  const [dis,setDis]=useState("disabled")
  const [checked,setChecked]=useState(false)
  const [success,setSuccess]=useState("d-none")
  const [error,setError]=useState("d-none")
  const vesselimg=useRef()
  
  const PostData=async (e)=>{
      e.preventDefault();
      const {quantity,desc,source,mob_no}=donation

      const imgdata=vesselimg.current.files[0].name
      const res=await fetch('/donatevessel',{
          method:"POST",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({quantity,desc,source,mob_no,imgdata})
      });
      const data=await res.json();
      if(data.msg==="Success")
      {
          setSuccess("d-block")
          setDonation({quantity:"",desc:"",source:"",mob_no:""})
          setChecked(false)
      }
      else
      {
          setSuccess("d-none")
          setError("d-block")
      }
  }

  useEffect(() => {
      if(donation.quantity!==""&&donation.desc!==""&&donation.hours!==""&&donation.source!==""&&donation.mob_no!=="")
      {
          if(validation.vquantity===""&&validation.vmob_no==""&&checked)
          {
              setDis("")
          }
          else
              setDis("disabled")
      }
      else
          setDis("disabled")
  
  }, [donation,validation,checked])
  
  function changeHandler(e){
      let tname=e.target.name;
      let value=e.target.value;
      if(tname==="quantity")
      {
          if(value<=10)
              setValidation({...validation,vquantity:"d-block"})
          else
              setValidation({...validation,vquantity:""})
      }
      if(tname==="mob_no")
      {
          let regx=/^[0-9]{10}$/;
          if(!value.match(regx))
              setValidation({...validation,vmob_no:"d-block"})
          else
              setValidation({...validation,vmob_no:""})
      }
      setDonation({...donation,[tname]:value})
  }

  function checkChecked(e)
  {
      if(e.target.checked)
          setChecked(true)
      else
          setChecked(false)
  }
  return (
    <>
    <svg xmlns="http://www.w3.org/2000/svg" className='d-none'>
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </symbol>
        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </symbol>
    </svg>
    <div className={`container ${signupstyles.mt}`}>
            <div className={`alert alert-success d-flex fade show align-items-center ${success}`} role="alert">
                <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlinkHref="#check-circle-fill"/></svg>
                <div>
                    Donated Successfuly !!
                </div>
                <button type="button" className={`btn-close ${signupstyles.btnclose}`} onClick={e=>setSuccess("d-none")}></button>
               </div>
            
                <div className={`alert alert-warning fade show d-flex align-items-center ${error}`} role="alert">
                <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlinkHref="#exclamation-triangle-fill"/></svg>
                <div>
                  Something is wrong Bhai !!
                </div>
                <button type="button" class={`btn-close ${signupstyles.btnclose}`} onClick={e=>setError("d-none")}></button>
                </div>
            
    </div>
    <div className="container mt-4">
    <div className="row">
        <div className="col-xl-10 m-auto">
            <form method="POST" className={`form-group bg-light p-3 ${signupstyles.signupformgroup}`}>
                <h2 className={`mb-5 ${signupstyles.h2}`}>Donate</h2>
                <div className="row"> 
                    <div className="m-auto col-md-10">
                  
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">How Many vessels you want to donate?</label>
                            <input type="number" value={donation.quantity} className="form-control" name="quantity" id="quantity"  required onChange={e=>changeHandler(e)}/>
                            <span className={`form-text invalid-feedback ${validation.vquantity}`} id="quantity">Have atleast 10 vessels!</span>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="desc" className="form-label">Vesssel Description</label>
                            <textarea type="text" value={donation.desc} className="form-control" name="desc"  id="desc"     
                            placeholder="Enter vessel Description" required onChange={e=>changeHandler(e)}/>
                        </div>
                        <div className0="mb-3">
                            <label htmlFor="source" className="form-label">Source Address</label>
                            <textarea value={donation.source} className="form-control" name="source" placeholder="Enter Source Address" id="source" required onChange={e=>changeHandler(e)}/>
                        </div>
                        <div className="mb-3 my-2">
                            <label htmlFor="file" className="form-label">Enter image: </label>
                            <input className='mx-2' type="file" ref={vesselimg} name="foodimage" id="foodimage" required onChange={e => changeHandler(e)} />
                            <span className={`form-text invalid-feedback `} id="spanmobile">Please enter image</span>
                        </div>
                        <div className="mb-3">
                                <label htmlFor="mob_no" className="form-label">Mobile Number</label>
                                <input type="text" value={donation.mob_no} className="form-control" name="mob_no" id="mob_no" placeholder="Enter Your Mobile Number" required onChange={e=>changeHandler(e)}/>
                                <span className={`form-text invalid-feedback ${validation.vmob_no}`} id="spanmobile">Please enter 10 digits</span>
                            </div>
                    </div>
                    <div className="m-auto col-10 mt-4 mb-3">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required onChange={e=>checkChecked(e)}/>
                            <label className="m-auto form-check-label" htmlFor="invalidCheck">
                            I hereby declare the above filled information is right.
                            </label>
                        </div>
                    </div>
                    <div className="m-auto col-10">
                        <button className={`btn btn-red ${signupstyles.btnred}`} type="reset">Reset</button>
                        <button className= {`btn btn-red ${signupstyles.btnred} ${dis}`} id="register" type="submit" onClick={PostData}>Register</button>
                    </div>
                </div>
            </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default NewVesselDonation