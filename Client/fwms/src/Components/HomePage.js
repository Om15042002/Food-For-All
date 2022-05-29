import React, { Component, useEffect, useState ,useContext} from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import homestyles from '../Components/HomePage.module.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import {useNavigate} from "react-router-dom";
import { UserContext } from '../App';

const HomePage = () => {

    const context = useContext(UserContext)
    const [type,setType]=useState("admin")
    const [user,setUser]=useState({username:"",password:""})
    const [error,setError]=useState("d-none")

    const navigate=useNavigate();
    const PostData=async (e)=>{
      e.preventDefault();
      const {username,password}=user
      const res=await fetch(`/${type}login`,{
          method:"POST",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({username,password})
      });
      
      const data=await res.json();
      console.log(data,error);
      if(data.msg==="Success")
      {
          // props.giveType(data.Id)
          console.log("Successfull");
          setError("d-none")
          setUser({username:"",password:""})
          context.dispatch({act:"loggedin",type:type})
          navigate(`/${type}page`);
      }
      else
      {
          setError("d-block")
      }
  }


    return (
      <>
      <svg xmlns="http://www.w3.org/2000/svg" className='d-none'>
        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </symbol>
    </svg>
      <div className={homestyles.image}></div>
        <div className="container-fluid margin-top">
            <div className="row">
                <div className={`col-md-6 mt-5 min ${homestyles.colmd6}`}>
                    {/* <pre className={homestyles.quotes}>Want To Help Someon?
                            You Are At The Right Place !!
                    </pre> */}
                </div>
                <div className={`col-md-6 ${homestyles.colmd6} ${homestyles.fm}`}>
                  <div className={`${homestyles.warn} warn alert alert-warning col-md-11 fade show align-items-center d-flex ${error}`} role="alert">
                    <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlinkHref="#exclamation-triangle-fill"/></svg>
                    <div>
                      Check username or password !!
                    </div>
                    <button type="button" className={`btn-close ${homestyles.btnclose}`} onClick={e=>setError("d-none")}></button>
                  </div>
                    <form method="POST" className={`form-group m-lg-5 ${homestyles.homeformgroup}`}>
                      <label htmlFor="source">Type</label>
                        <select className="form-select mb-3" aria-label="Default select example" onChange={e=>setType(e.target.value)} required>
                            <option value="admin">Admin</option>
                            <option value="volunteer">Volunteer</option>
                            <option value="donor">Donor</option>
                            <option value="requester">Requester</option>
                        </select> 
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control mb-3" name="username" value={user.username} required onChange={e=>setUser({...user,username:e.target.value})}/>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control mb-3" name="password" value={user.password} required onChange={e=>setUser({...user,password:e.target.value})}/>
                        <input type="submit" className={`form-control mt-3 mb-3 btn btn-red ${homestyles.btnred}`} value="Login" onClick={PostData}/>
                    </form>
                </div>
            </div>
        </div>
      </>
    )
}

export default HomePage