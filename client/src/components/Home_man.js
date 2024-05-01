import React, {useState} from 'react'
import Axios from 'axios'
import ViewPM from './Manager/View_pros'
import AddProp from './Manager/Add_pros'
import { useNavigate } from 'react-router'
import Home from './Home'
import im from './images/orngbg.jpeg'
import './land.css'

const Home1 = () => {

    const navigate = useNavigate(); 
    const [viewProp, setViewProp] = useState(false); 
    const [viewAddProp, setViewAddProp] = useState(false); 
    var aid = localStorage.getItem("aadhar")

    const logout = () => {
        localStorage.removeItem("aadhar")
        navigate("/");
    }
    return (

        <>
       <div style = {{textAlign: "center" }}><br/><br/>
        {/* <p> User properties: </p>
        <Home/>  */}  <div style = {{position: "relative", right: "-40%"}}> <button className = "button-9" onClick = {logout}> Logout </button> </div><br/>
        <h5 > Welcome manager, {aid}</h5><br/><br/>

        <button className = "button-9" style = {{width: '200px', height: '50px', borderRadius: '5px'}} onClick = {e => {setViewAddProp(!viewAddProp)}}> Add Property</button> <br/><br/>
        <br/> {viewAddProp && <AddProp/>} <br/><br/> <br/>

        <button className = "button-9" style = {{width: '200px', height: '50px', borderRadius: '5px'}} onClick = {e => {setViewProp(!viewProp)}}> View Properties</button> <br/><br/>
        <br/> {viewProp && <ViewPM/>} <br/><br/>

        </div>
        </>
    )
}

export default Home1; 
