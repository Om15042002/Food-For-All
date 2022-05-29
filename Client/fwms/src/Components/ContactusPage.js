import React, { Component ,useRef,useState,useEffect} from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import contactstyles from '../Components/ContactusPage.module.css';
// import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import address from "../Images/address.png";
import phone from "../Images/phone.png";
import email from "../Images/email.png";

const ContactusPage = () => { 

    const [query,setQuery]=useState({name:"",email:"",desc:""})
    const [error,setError]=useState("d-none")
    const [success,setSuccess]=useState("d-none")
    const form=useRef()
    const imgRef=useRef()
    // useEffect(() => {
      
    //     imgRef.current.width=1
    
    // }, [])
    
    const PostData=async (e)=>{
      e.preventDefault();
      const {name,email,desc}=query
      const res=await fetch("/newquery",{
          method:"POST",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({name,email,desc})
      });
      
      const data=await res.json();
      console.log(data,error);
      if(data.msg==="Success")
      {
            setSuccess("d-block")
          setError("d-none")
          setQuery({name:"",email:"",desc:""})
        //   console.log(form.current);
        //   console.log(document.getElementById('form'));
        //   form.current.reset()
        //   document.getElementById('form').reset();
      }
      else
      {
            setSuccess("d-none")
          setError("d-block")
      }
  }
    return (
      <React.Fragment>
            <div className={`container mt-5 ${contactstyles.container}`}>
                <div className={`alert alert-success d-flex fade show ${success}`} role="alert">
                    <strong>Submitted!</strong>&nbsp;We will try to resolve it soon.
                    <button type="button" className={`btn-close ${contactstyles.btnclose}`} onClick={e=>setSuccess("d-none")}></button>
                </div>
            
                <div className={`alert alert-success d-flex fade show ${error}`} role="alert">
                    <strong>Oops!</strong>&nbsp;Something went wrong.
                    <button type="button" className={`btn-close ${contactstyles.btnclose}`} onClick={e=>setError("d-none")}></button>
                </div>   
             
            </div>
        <div className={`container ${contactstyles.container}`}>
        <h1 align="center" className={contactstyles.touch}> GET IN TOUCH </h1>
        <div className={`row ${contactstyles.mt6}`}>
            <div className={`col-md-6 ${contactstyles.colmd6}`}>
                <div className={contactstyles.cont}>
                <div className="ico fa fa-bullhorn highlight"><img src={address} width="10%" ref={imgRef} /></div>
                    <div>
                            <div className={contactstyles.text}>
                                Vadodara , Near Central Bus Depot , Aurobindo Ghosh Rd
                            </div>
                    </div>
                </div>
                <div className={contactstyles.cont}>
                <div className="ico fa fa-bullhorn highlight"><img src={phone} width="10%"/></div>
                    <div>
                            <div className={contactstyles.text}>
                                +91-8780987359
                            </div>
                    </div>
                </div>
                <div className={contactstyles.cont}>
                <div className="ico fa fa-bullhorn highlight"><img src={email} width="10%"/></div>
                    <div>
                            <div className={contactstyles.text}>
                                kushayvhora@gmail.com
                            </div>
                    </div>
                </div> 
            </div>
            <div className={`col-md-6 ${contactstyles.colmd6}`}>
                <form method="POST" className={`form-group ${contactstyles.contactformgroup}`} ref={form} id="form">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Your Name</label>
                        <input type="text" value={query.name} onChange={e=>setQuery({...query,name:e.target.value})} className="form-control" name="name" id="name" placeholder="Enter Your Name" required/>
                    </div>
                    <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" value={query.email} onChange={e=>setQuery({...query,email:e.target.value})} className="form-control" name="email" id="email" placeholder="abc@gmail.com" required />
                                <span className="form-text invalid-feedback">Please enter valid email</span> 
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea name="query" value={query.desc} onChange={e=>setQuery({...query,desc:e.target.value})} id="message" className="form-control" placeholder="Write your query here..." rows="3" required></textarea>
                    </div>
                    <div className="col-12">
                        <button className={`btn btn-red ${contactstyles.btnred}`} id="check" type="submit" onClick={PostData}>Send</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
      </React.Fragment>
    )
}

export default ContactusPage