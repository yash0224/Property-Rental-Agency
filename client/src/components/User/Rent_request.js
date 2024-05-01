import React from 'react'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import { useParams } from 'react-router';
import {useReactToPrint} from 'react-to-print'

const ViewReqform= () => {

    const {pid} = useParams(); 
        const [ac, setAc] = useState(0); 
        const[pic, setPic] = useState(0); 
        const [stdt, setStdt] = useState(); 
        const [endt, setEndt] = useState(); 
        const Aid = localStorage.getItem("aadhar")

        const request = () => {
            Axios.post("http://localhost:3001/addreq", {
                Ac: ac, 
                Pic: pic, 
                Stdt: stdt, 
                Endt: endt, 
                Pid: pid, 
                Aid: Aid
            }).then(window.alert("requested"))
        }

    return (
        <div style = {{textAlign:"center"}}>
        <br/><br/>
        <label> AGENCY COMMISSION</label> <br/> 
        <input type = 'number' onChange={e => setAc(e.target.value)} /><br/><br/>
        <label> PERCENT IN HIKE</label><br/>
        <input type = "number" onChange={e => setPic(e.target.value)} /><br/><br/>
        <label>START DATE: </label><br/>
        <input type = "date" onChange={e => setStdt(e.target.value)} /><br/><br/>
        <label>END DATE: </label><br/>
        <input type = "date" onChange={e => setEndt(e.target.value)} /><br/><br/>
        <button onClick={request}>Request</button>
        </div> 
    )
}

export default ViewReqform; 