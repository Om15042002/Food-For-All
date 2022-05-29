import React, { Component } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import aboutstyles from '../Components/AboutusPage.module.css';
// import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import logo1 from '../Images/safety.jpg'
import logo2 from '../Images/clock.png'
import logo3 from '../Images/customercare.jfif'
const AboutusPage = () =>{
    return (
      <React.Fragment>
      <h1 className={aboutstyles.first}>About Us</h1>
        <div className="container">
            <h2 className={aboutstyles.title}>Our Services...</h2>
            <ul>
                <li>
                    <p>
                        From this website, you can search the buses according to your convenient.
                        Additionally, you will be able to register a bus ticket according to your choice !!!
                        Our buses are full with grand facilities with AC, very comfortable seats, extra space for your
                        important luggage and also TV in our buses to make your journey with full of entertainment !
                        Under any unexpected circumstances, you can also cancel your tickets and get full refund !
                    </p>
                </li> 
                <li>
                    <p>
                        We are providing helpfull and disiplined members at each busport they are ready to guide you any
                        time.
                    </p>
                </li>
                <li>
                    <p>
                        In case of any query,
                        Please feel free to contact us even you can talk with us on our Toll-free no...
                    </p>
                </li>
            </ul>
      </div>
      <div className="container">
        <h2 className={aboutstyles.title}>What makes us different...</h2>
        <div className="row">
            <div className="col-md-4">
            <figure className={aboutstyles.figure , aboutstyles.fig1}>
                <img src={logo1} className="figure-img img-fluid rounded" alt="..."/>
                <figcaption className={aboutstyles.figurecaption}>Quick Collection</figcaption>
            </figure>
            </div>
            <div className="col-md-4">
            <figure className={aboutstyles.figure , aboutstyles.fig2}>
                <img src={logo2} className="figure-img img-fluid rounded" alt="..."/>
                <figcaption className={aboutstyles.figurecaption}>Quick Delivery</figcaption>
              </figure>
            </div>
            <div className="col-md-4">
            <figure className={aboutstyles.figure , aboutstyles.fig3}>
                <img src={logo3} className="figure-img img-fluid rounded" alt="..."/>
                <figcaption className={aboutstyles.figurecaption}>Requesting Donations</figcaption>
            </figure>
            </div>
        </div>
    </div>
    </React.Fragment>
    )
}


export default AboutusPage