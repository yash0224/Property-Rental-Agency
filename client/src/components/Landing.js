import React from 'react'
import './land.css'
import { useNavigate } from 'react-router-dom';
import imgg from './images/home1.jpeg'

const Landing = () => {
    const navigate = useNavigate(); 

    return (
        <div style={{textAlign: "center",height: '745px',backgroundImage: `url(${imgg})`, textDecoration: 'none', textColor: 'white',   backgroundSize: 'cover',  backgroundPosition: 'center', width: '100%', backgroundRepeat: 'no-repeat' }}><br/><br/>
        <br/><br/><br/>
        <button className = "button-9" onClick={() => navigate('/register')} style = {{textDecoration: 'none', color: "white"}}>Click here to Register</button><br/><br/><br/>
        <button className = "button-9" onClick={() => navigate('/login')} style = {{textDecoration: 'none', color: "white"}}>Click here to Login</button><br/><br/><br/>
        </div>
    ) 
}

export default Landing; 