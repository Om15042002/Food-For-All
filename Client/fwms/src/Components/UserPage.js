import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UserPage=()=>{ 
    
    const navigate=useNavigate();
    const checkAccess=async ()=>{
        try {
            const res=await fetch('/checkuser',{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            })
            const data=await res.json()
            // console.log(data);
            // console.log(data.dataset);
            if(data.msg==="Login")
            {
                navigate('/');
            }
            else if(data.msg==="admin")
            {
                navigate('/adminpage')
            }
            else if(data.msg==="volunteer")
            {
                navigate('/volunteerpage')
            }
            else if(data.msg==="donor")
            {
                navigate('/donorpage')
            }
            else if(data.msg==="requester")
            {
                navigate('/requesterpage')
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        checkAccess();
    },[])

    return (
    <>
    </>
  )
}


export default UserPage