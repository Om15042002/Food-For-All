import React, { useEffect, useRef, useState,useContext } from 'react'
import signupstyles from '../Components/SignupPage.module.css';

const SignupPage=()=>{ 
   
    
    const [Volunteer,setVolunteer]=useState("d-block")
    const [user,setUser]=useState({name:"",username:"",password:"",gender:"Male",age:"",email:"",mob_no:""})
    const [validation,setValidation]=useState({vcpassword:"",vage:"",vemail:"",vmob_no:""})
    const [dis,setDis]=useState("disabled")
    const [checked,setChecked]=useState(false)
    const [type,setType]=useState("volunteer")
    const [reason,setReason]=useState("")
    const pref=useRef()
    const [success,setSuccess]=useState("d-none")
    const [exist,setExist]=useState("d-none")
    const cpassref=useRef();

    const PostData=async (e)=>{
        e.preventDefault();
        const {name,username,password,gender,age,email,mob_no}=user
        const res=await fetch(`/${type}signup`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({name,username,password,gender,age,email,mob_no,reason})
        });
        const data=await res.json();
        if(data.msg==="Success")
        {
            setSuccess("d-block")
            setExist("d-none")
            setType("Volunteer")
            cpassref.current.value=""
            setUser({name:"",username:"",password:"",gender:"Male",age:"",email:"",mob_no:""})
            setChecked(false)
        }
        else
        {
            setSuccess("d-none")
            setExist("d-block")
        }
    }

    useEffect(() => {
        if(user.name!==""&&user.username!==""&&user.password!==""&&user.age!==""&&user.email!==""&&user.mob_no!=="")
        {
            if(validation.vcpassword===""&&validation.vage===""&&validation.vemail===""&&validation.vmob_no==""&&checked)
            {
                setDis("")
            }
            else
                setDis("disabled")
        }
        else
            setDis("disabled")
    
    }, [user,validation,checked])
    
    function changeHandler(e){
       

        let tname=e.target.name;
        let value=e.target.value;
        if(tname==="cpassword")
        { 
            if(pref.current.value!==value)
                setValidation({...validation,vcpassword:"d-block"})
            else
                setValidation({...validation,vcpassword:""})
        }
        if(tname==="age")
        {
            if(value<15)
                setValidation({...validation,vage:"d-block"})
            else
                setValidation({...validation,vage:""})
        }
        if(tname==="email")
        {
            let regx=/^[a-zA-Z0-9_]+@[a-zA-z0-9_]+\.[a-z]{2,4}$/;
            if(!value.match(regx))
                setValidation({...validation,vemail:"d-block"})
            else
                setValidation({...validation,vemail:""})
        }
        if(tname==="mob_no")
        {
            let regx=/^[0-9]{10}$/;
            if(!value.match(regx))
                setValidation({...validation,vmob_no:"d-block"})
            else
                setValidation({...validation,vmob_no:""})
        }
        setUser({...user,[tname]:value})
    }

    function changeType(e)
    {
        setType(e.target.value) 
        if(e.target.value==="volunteer")
        {
            setVolunteer("d-block")
        }
        else
        {
            setVolunteer("d-none")
        }
    }
    function getReason(e)
    {
        setReason(e.target.value)
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
                    Registered Successfuly !!
                </div>
                <button type="button" className={`btn-close ${signupstyles.btnclose}`} onClick={e=>setSuccess("d-none")}></button>
               </div>
            
                <div className={`alert alert-warning fade show d-flex align-items-center ${exist}`} role="alert">
                <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlinkHref="#exclamation-triangle-fill"/></svg>
                <div>
                  Username already exist !!
                </div>
                <button type="button" class={`btn-close ${signupstyles.btnclose}`} onClick={e=>setExist("d-none")}></button>
                </div>
            
    </div>
    <div className="container mt-4">
        <div className="row">
            <div className="col-xl-10 m-auto">
                <form method="POST" className={`form-group bg-light p-3 ${signupstyles.signupformgroup}`}>
                    <h2 className={`mb-5 ${signupstyles.h2}`}>Registration</h2>
                    <div className="row">
                        <div className="m-auto col-md-10">
                            <div className="mb-3">
                                <label htmlFor="source" className='form-label'>Type</label>
                                <select className="form-select mb-3" aria-label="Default select example" value={type} onChange={e=>changeType(e)} required>
                                <option value="volunteer">Volunteer</option>
                                <option value="donor">Donor</option>
                                <option value="requester">Requester</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" value={user.name} className="form-control" name="name" 
                                id="name" placeholder="Enter Your Name" required onChange={e=>changeHandler(e)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">User Name</label>
                                <input type="text" value={user.username} className="form-control" name="username"  id="username"     
                                placeholder="Enter Your Username" required onChange={e=>changeHandler(e)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" ref={pref} value={user.password} className="form-control" name="password" id="password" placeholder="Enter Your Password" required onChange={e=>changeHandler(e)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cpassword" className="form-label">Confirm-Password</label>
                                <input type="password" className="form-control" name="cpassword" id="cpassword" placeholder="Re-enter Your Password" required ref={cpassref} onChange={e=>changeHandler(e)}/>
                                <span className={`form-text invalid-feedback ${validation.vcpassword}`}>Passwords are not matching</span>
                            </div>
                            <div className="mb-3">
                                <label className="form-label d-block">Gender</label>
                                <div className="form-check mt-2 d-inline-block">
                                    <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault1" value="Male" checked onChange={e=>changeHandler(e)}/>
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Male
                                    </label>
                                </div>
                                <div className="form-check d-inline-block" >
                                    <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault1" value="Female" onChange={e=>changeHandler(e)}/>
                                    <label className="form-check-label ml-2" htmlFor="flexRadioDefault1">
                                        Female
                                    </label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="age" className="form-label">Age</label>
                                <input type="number" value={user.age} className="form-control" name="age" id="age" placeholder="Enter Your Age" required onChange={e=>changeHandler(e)}/>
                                <span className={`form-text invalid-feedback ${validation.vage}`} id="spanmobile">You are too young to register</span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" value={user.email} className="form-control" name="email" id="email" placeholder="abc@gmail.com" required onChange={e=>changeHandler(e)}/>
                                <span className={`form-text invalid-feedback ${validation.vemail}`}>Please enter valid email</span> 
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mob_no" className="form-label">Mobile Number</label>
                                <input type="text" value={user.mob_no} className="form-control" name="mob_no" id="mob_no" placeholder="Enter Your Mobile Number" required onChange={e=>changeHandler(e)}/>
                                <span className={`form-text invalid-feedback ${validation.vmob_no}`} id="spanmobile">Please enter 10 digits</span>
                            </div>
                            <div className={`mb-3 ${Volunteer}`}>
                                <label htmlFor="reason" className="form-label">Reason to join</label>
                                <textarea value={reason} className="form-control" name="reason" placeholder="Enter Your Reason" id="reason" required onChange={e=>getReason(e)}/>
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


export default SignupPage