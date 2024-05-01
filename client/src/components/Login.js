import React, {useState} from 'react'
import Axios from 'axios'
import './land.css'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import imggi from './images/login.jpeg'

const Login = () => {

    const [aid, setAid] = useState(0); 
    const [pass, setPass] = useState("");
    const [loginStatus, setLoginStatus] = useState(false); 
    const [dbaStatus, setDbaStatus] = useState(false); 
    const [managerStatus, setManagerStatus] = useState(false); 
    const navigate = useNavigate(); 
    
    localStorage.setItem('loggedin', false)
    
    

    const login = () => {

    console.log(aid);
     console.log(pass)
     
      
    Axios.post("http://localhost:3001/login", {
        Aid: aid, 
        Pass: pass
    }).then((response) => {
        if(response.data.dba){
            setDbaStatus(true); 
           localStorage.setItem('loggedin', true)
           // setLoginStatus(true); 
           localStorage.setItem('aadhar', aid); 
        }
        else if(response.data.manager){
            setManagerStatus(true); 
            localStorage.setItem('loggedin', true)
            
            localStorage.setItem('aadhar', aid); 
        }
        else if(response.data.user){
            setLoginStatus(true); 
            localStorage.setItem('loggedin', true)
            
            localStorage.setItem('aadhar', aid); 
        }
        
        else {
            //window.location.reload(); 
            window.alert("unsuccessful login")
        }
    })

    }

    return (

        <div  style={{textAlign: "center",height: '745px',backgroundImage: `url(${imggi})`,   backgroundSize: 'cover',  backgroundPosition: 'center', width: '100%', backgroundRepeat: 'no-repeat' }}><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        
    <input type = 'number' placeholder = "Enter your aadhar id " style = {{borderRadius: '5px', width: '250px', height: '33px'}} required onChange = {e => setAid(e.target.value)} /><br/><br/>
    <input type = 'text' placeholder = "Enter your password" required style = {{borderRadius: '5px', width: '250px', height: '33px'}} onChange = {e => setPass(e.target.value)} /><br/><br/>
    
    <button className='button-9' style = {{borderRadius: '5px', width: '250px', height: '38px'}} onClick = {login} type='submit' > Login </button> <br/><br/>

        <NavLink to = '/register' style = {{textDecoration: 'none', color: "black"}}>New Here? Click here to Register</NavLink>

        {dbaStatus && navigate('/home0')}
        {managerStatus && navigate('/home1')}
        {loginStatus && navigate('/home')}
    </div>
    
    )
}

export default Login; 