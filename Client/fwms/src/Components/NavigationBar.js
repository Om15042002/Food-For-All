import React, { Component, useState , useContext, useEffect} from 'react'
import navstyles from '../Components/NavigationBar.module.css';
// import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../App';

const NavigationBar = () => {
    const [home,setHome]=useState({page:"Home",to:"/"})
    const [signup,setSignup]=useState({page:"Sign up",to:'/signup'})
    const context = useContext(UserContext)
    // console.log(context.state);
    useEffect(()=>{
        
    if(context.state.logged) 
    {
        console.log("hiii");
        setHome({page:"Home",to:`/${context.state.type}page`})
       setSignup({page:"Logout",to:'/logout'}) 
    }
    else
    {
        setHome({page:"Home",to:"/"})
        setSignup({page:"Sign up",to:'/signup'}) 
    }
    },[context.state])
    
    return (
        <nav className={`${navstyles.navigation} navbar navbar-expand-lg navbar-dark`}>
        <div className="container-fluid">
            <div className="navbar-brand">
                <i className="rounded-circle" alt="" width="30" height="24">Logo</i>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className={`nav-link ${navstyles.navlink}`} to={home.to} name="homepage">{home.page}</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={`nav-link ${navstyles.navlink}`} to="/services" name="servicepage">Services</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={`nav-link ${navstyles.navlink}`} aria-current="page" to="/aboutus" name="aboutuspage">About Us</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={`nav-link ${navstyles.navlink}`} to="/contactus" name="contactpage">Contact Us</NavLink>
                    </li>
                </ul>
                <div className="d-flex mx-2">
                    <NavLink className={`text-light mx-4 group-a ${navstyles.groupa}`} to={signup.to}>{signup.page}</NavLink>
                </div>
            </div>
        </div>
    </nav>
    )
}

export default NavigationBar