import React, { Component } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import servicestyles from '../Components/ServicePage.module.css';
// import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import anytime from "../Images/anytime.jpg";
import logo1 from "../Images/cancellation.jpg";
import logo2 from "../Images/showbooking.png";
import logo3 from "../Images/secure.jpg";
const ServicePage = () => {
    return (
     <React.Fragment>
       <div className="container">
        <div className={`row ${servicestyles.row}`}>
            <div className="col-md-6">
                <img src={anytime} alt=""/>
                <h3 className={servicestyles.h3}>Volunteering</h3>
                <div className={`text-center ${servicestyles.mb5}`}>Anyone can join to work as volunteer provided accepted reason to join</div>
            </div>
            <div className="col-md-6">
                <img src={logo1} alt=""/>
                <h3 className={servicestyles.h3}>Donations</h3>
                <div className={`text-center ${servicestyles.mb5}`}>Anyone can donate food,cloth and vessel provided valid and accepted information</div>
            </div>
        </div>
        <div className={`row ${servicestyles.row}`}>
            <div className="col-md-6">
                <img src={logo2}alt=""/>
                <h3 className={servicestyles.h3}>Need Donations</h3>
                <div className={`text-center ${servicestyles.mb5}`}>Anyone can request for food,cloth and vessel provided valid and accepted information</div>
            </div>
            <div className="col-md-6">
                <img src={logo3} alt=""/>
                <h3 className={servicestyles.h3}>Delivery Of Donations</h3>
                <div className={`text-center ${servicestyles.mb5}`}>Volunteer will try to make the delivery of assigned donations by admin in time</div>
            </div>
        </div> 
    </div>
     </React.Fragment> 
    )
}

export default ServicePage