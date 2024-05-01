import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router';

const ViewRC = () => {

    const navigate = useNavigate(); 
    const [properties, setProperties] = useState([]); 
    const [rentProperties, setRentProperties] = useState([]); 
    const [filteron, setFilteron] = useState(false); 
    const [reloaded, setReloaded] = useState(false);
    const [city, setCity] = useState("");

    var aid = localStorage.getItem("aadhar");

    const rentP = (id) => {
        navigate(`/rentrequest/${id}`)
     }

    const revokeP = (id) => {
       Axios.get(`http://localhost:3001/revokerequest/${id}&${aid}`).then(set())
    }

    const set = () => {
        Axios.get(`http://localhost:3001/getproperties/${city}&${aid}`).then(response => {
            setProperties(response.data)
        }).then( Axios.get(`http://localhost:3001/getrentproperties/${city}&${aid}`).then(response => {
            setRentProperties(response.data)
        }))
    }

    const change = () => {
        if(city == "") {  setFilteron(false); window.alert("please enter the name of city");}
        else {
           set(); 
           setFilteron(!filteron);
        }
    }

    return ( 
        <>
        <br/>
        <input type = "text" placeholder = "enter the city you want to select" style = {{width: "240px"}} onChange={e => {setCity(e.target.value)}}/> <button onClick = {change}> filter </button>
        <br/> <br/> <br/>

   { filteron && <table className='table table-striped table-bordered' style = {{width: "700px", right:"-1%", position: "relative"}}>
        <thead>
        <td><p> ID </p></td>
            <td><p> START_DATE  </p></td>
            <td><p> END_DATE </p></td>
            <td><p> CITY</p></td>
            <td><p> TOTAL_AREA</p></td>
            <td><p> PLINTH_AREA</p></td>
            <td><p> NO_OF_FLOORS</p></td>
            <td><p> RENT_PER_MONTH</p></td>
            <td><p> AGENCY_COMMISSION</p></td>
            <td><p> ADDRESS</p></td>
            <td><p> LOCALITY</p></td>
            <td><p> YEAR_OF_CONSTRUCTION</p></td>
            <td><p> OPTION</p></td>
        </thead>
        <tbody>
        {properties.map(member =>
            <tr key={member.ID}>
            <td><p> {member.ID}</p></td>
            <td><p> {member.START_DATE.slice(0,10)} </p></td>
            <td><p> {member.END_DATE.slice(0,10)}</p></td>
            <td><p> {member.CITY}</p></td>
            <td><p> {member.TOTAL_AREA}</p></td>
            <td><p> {member.PLINTH_AREA}</p></td>
            <td><p> {member.NO_OF_FLOORS}</p></td>
            <td><p> {member.RENT_PER_MONTH}</p></td>
            <td><p> {member.AGENCY_COMMISSION}</p></td>
            <td><p> {member.ADDRESS}</p></td>
            <td><p> {member.LOCALITY}</p></td>
            <td><p> {member.YEAR_OF_CONSTRUCTION}</p></td>
            <td><button onClick={() => {rentP(member.ID)}}>Rent</button></td>
            </tr>
            )}
        {rentProperties.map(member =>
            <tr key={member.ID}>
            <td><p> {member.ID}</p></td>
            <td><p> {member.START_DATE.slice(0,10)} </p></td>
            <td><p> {member.END_DATE.slice(0,10)}</p></td>
            <td><p> {member.CITY}</p></td>
            <td><p> {member.TOTAL_AREA}</p></td>
            <td><p> {member.PLINTH_AREA}</p></td>
            <td><p> {member.NO_OF_FLOORS}</p></td>
            <td><p> {member.RENT_PER_MONTH}</p></td>
            <td><p> {member.AGENCY_COMMISSION}</p></td>
            <td><p> {member.ADDRESS}</p></td>
            <td><p> {member.LOCALITY}</p></td>
            <td><p> {member.YEAR_OF_CONSTRUCTION}</p></td>
            <td><button onClick={() => {revokeP(member.ID)}}>Revoke</button></td>
            </tr>
            )}
        </tbody>
    </table>}
        </>
    )
}

export default ViewRC; 