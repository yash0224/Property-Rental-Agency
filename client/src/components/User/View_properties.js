import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';

const ViewP = () => {

    var rel = 0; 
    const navigate = useNavigate(); 
    const [properties, setProperties] = useState([]);
    const [details, setDetails]  = useState()
    var id = localStorage.getItem("aadhar");
    useEffect (() => {
        Axios.get(`http://localhost:3001/getmyprop/${id}`).then((response) => {
            setProperties(response.data);
        })
    }, [])

    const deleteP = (id) => {
        Axios.post(`http://localhost:3001/deleteprop/${id}`).then(window.alert("the property is deleted")).then(rel = rel + 1)        
    }

    const editP = (id) => {
      navigate(`/editproperty/${id}`);
    }
 
    return (
        <>

        <table className='table table-striped table-bordered' style = {{width: "550px", right:"-2%", position: "relative"}}>
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
              <td><p> YEAR_OF_CONS</p></td>
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
              <td><button onClick={() => {deleteP(member.ID)}}>Delete</button></td>
              <td><button onClick={() => {editP(member.ID)}}>Edit</button></td>
                </tr>
                )}
            </tbody>
        </table>
        </>
    )
}

export default ViewP; 