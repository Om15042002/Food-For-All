import React, { Component, useEffect, useReducer, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import NavigationBar from './Components/NavigationBar';
import HomePage from './Components/HomePage';
import AboutusPage from './Components/AboutusPage';
import ContactusPage from './Components/ContactusPage';
import ServicePage from './Components/ServicePage';
import SignupPage from './Components/SignupPage';
import UserPage from './Components/UserPage';
import AdminPage from './Components/AdminPage';
import VolunteerPage from './Components/VolunteerPage';
import DonorPage from './Components/DonorPage';
import RequesterPage from './Components/RequesterPage';
import LogoutPage from './Components/LogoutPage';
import PendingWorks from './Components/PendingWorks';
// import { initialstate,reducer } from './UseReducer';

export const UserContext = React.createContext()



const App = (props) => {
  const [state, dispatch] = useReducer(props.context.reducer,props.context.initialstate)
  
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>

        <NavigationBar />

        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/aboutus' element={<AboutusPage />} />
          <Route exact path='/contactus' element={<ContactusPage />} />
          <Route exact path='/services' element={<ServicePage />} />
          <Route exact path='/signup' element={<SignupPage />} />
          <Route exact path='/userpage' element={<UserPage />} />
          <Route exact path='/adminpage' element={<AdminPage />} />
          <Route exact path='/volunteerpage' element={<VolunteerPage />} />
          <Route exact path='/donorpage' element={<DonorPage />} />
          <Route exact path='/requesterpage' element={<RequesterPage />} />
          <Route exact path='/logout' element={<LogoutPage />} />
          <Route exact path='/pendingworks' element={<PendingWorks />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
