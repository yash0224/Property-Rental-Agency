import React, { useState } from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './components/Register';
import Login from './components/Login'
import Landing from './components/Landing'
import Home0 from './components/Home_Dba';
import Home1 from './components/Home_man';
import Home from './components/Home'
import EditP from './components/User/Edit_prop'; 
import Report from './components/User/Report_gen';
import ViewReqform from './components/User/Rent_request';
import './App.css'
import EditPM from './components/Manager/Edit_pros';

import Editprof from './components/User/Edit_profile';

function App() {

  
  return (
    <Router>
      <Routes> 
        < Route exact path = '/register'  element={<Register/>}/>
        < Route exact path = '/' element = {<Landing/>} />
        < Route exact path = '/login' element = {<Login/>}/>
        < Route exact path = '/home' element = {<Home/>}/>
        < Route exact path = '/home0' element = {<Home0/>}/>
        < Route exact path = '/home1' element = {<Home1/>}/>
        <Route path = "/editproperty/:id" element = {<EditP/>}/>
        <Route path = "/editpropertyman/:id" element = {<EditPM/>}/>
        <Route path = "/rentrequest/:pid" element = {<ViewReqform/>}/>
        <Route path = "/editprofile" element = {<Editprof/>} />
        <Route path = "/generatereport" element = {<Report/>}/>
      </Routes>
    </Router>
  )
}

export default App; 