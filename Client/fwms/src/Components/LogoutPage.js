import React,{useContext, useEffect} from 'react'
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

const LogoutPage = ()=> {
    const context = useContext(UserContext)
    const navigate=useNavigate();
    console.log(context.state.type);
    useEffect(async ()=>{
        console.log(context.state.type);

        const res=await fetch(`/${context.state.type}logout`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        });
        
        const data=await res.json();
        console.log(data);
        if(data.msg==="Loggedout")
        {
            context.dispatch({act:"loggedout",type:""})
            navigate('/');
        }

    },[])
    return(<></>)
}

export default LogoutPage