import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router'

const EditP = () => {

    const {id} = useParams(); 
    console.log(id); 
    const rel = 0 ;
    const [propslist, setPropsList] = useState([]); 

     


    const [stdt, setStdt] = useState(null); 
    const [endt, setEndt] = useState(null); 
    const [city, setCity] = useState(null); 
    const [tarea, setTarea] = useState(null); 
    const [parea, setParea] = useState(null); 
    const [nof, setNof] = useState(null); 
    const [rent, setRent] = useState(null); 
    const [agecom, setAgecom] = useState(null); 
    const [address, setAddress] = useState(null); 
    const [locality, setLocality] = useState(null); 
    const [yoc, setYoc] = useState(null); 
    const [aid, setAid] = useState(localStorage.getItem('aadhar')); 

    var load = 0; 
    const navigate = useNavigate(); 

    // const [stdt1, setStdt1] = useState(null); 
    // const [endt1, setEndt1] = useState(null); 
    // const [city1, setCity1] = useState(null); 
    // const [tarea1, setTarea1] = useState(null); 
    // const [parea1, setParea1] = useState(null); 
    // const [nof1, setNof1] = useState(null); 
    // const [rent1, setRent1] = useState(null); 
    // const [agecom1, setAgecom1] = useState(null); 
    // const [address1, setAddress1] = useState(null); 
    // const [locality1, setLocality1] = useState(null); 
    // const [yoc1, setYoc1] = useState(null); 
    // const [aid1, setAid1] = useState(null); 

useEffect(()=> {
    Axios.get(`http://localhost:3001/details/${id}`).then(response => {
    setPropsList(response.data)
}).then(
    () => {
        setStdt(propslist[0].START_DATE); 
         setEndt(propslist[0].END_DATE);
         setCity(propslist[0].CITY); 
         setTarea(propslist[0].TOTAL_AREA); 
         setParea(propslist[0].PLINTH_AREA);  
         setNof(propslist[0].NO_OF_FLOORS); 
        setRent(propslist[0].RENT_PER_MONTH); 
         setAgecom(propslist[0].AGENCY_COMMISSION); 
         setAddress(propslist[0].ADDRESS); 
         setLocality(propslist[0].LOCALITY);
         setYoc(propslist[0].YEAR_OF_CONSTRUCTION); 
    }
)} , [])

const again = () => {
    
        Axios.get(`http://localhost:3001/details/${id}`).then(response => {
        setPropsList(response.data)
    }).then(
        () => {
            setStdt(propslist[0].START_DATE); 
             setEndt(propslist[0].END_DATE);
             setCity(propslist[0].CITY); 
             setTarea(propslist[0].TOTAL_AREA); 
             setParea(propslist[0].PLINTH_AREA); 
             setNof(propslist[0].NO_OF_FLOORS); 
            setRent(propslist[0].RENT_PER_MONTH); 
             setAgecom(propslist[0].AGENCY_COMMISSION); 
             setAddress(propslist[0].ADDRESS); 
             setLocality(propslist[0].LOCALITY);
             setYoc(propslist[0].YEAR_OF_CONSTRUCTION); 
        }
    )
}

    
    const edit = () => {
      Axios.post("http://localhost:3001/edittheproperty", {
        Stdt: stdt, 
        Endt: endt,
        City: city, 
        Address: address, 
        Tarea: tarea, 
        Parea: parea, 
        Nof: nof,  
        Rent: rent,
        Agecom: agecom, 
        Locality: locality, 
        Yoc: yoc, 
        Aid: aid,
        Id: id
      }).then(window.alert("it is updated"))

   
    }
   


    

    return (
            <div>  <br/> <button onClick = {again}>load </button>
        <div style = {{ textAlign: "center",position: "relative",right: "-40%", width:"300px", border: "2px solid black" , borderRadius: "10px", background: "green" }}><br/><br/>
        <label>Enter your start date</label> <br/>
        <input type = "date"  onChange  = {e => {setStdt(e.target.value)}}  value = {stdt && stdt.slice(0,10)}  /> <br/>
        <label>Enter your end date</label> <br/>
        <input type = "date" onChange  = {e => {setEndt(e.target.value)}} value = {endt && endt.slice(0,10)} /> <br/>
        <input type = "text" placeholder = "enter your city name" onChange={e => {setCity(e.target.value)}}
        value = {city}/> <br/>
        <input type = "number" placeholder = "enter total area of your property" onChange={e => {setTarea(e.target.value)}} value = {tarea} /> <br/>
        <input type = "number" placeholder = "enter total plinth area of your property" onChange={e => {setParea(e.target.value)}} value = {parea} /> <br/>
        <input type = "number" min = "1" placeholder = "enter total no of floors of your property" value = {nof} onChange={e => {if(e.target.value > 1) setNof(e.target.value)}}/> <br/>
        <input type = "number" min = "500" placeholder = "enter rent per month of your property" value = {rent} onChange={e => {  if(e.target.value>500) setRent(e.target.value)}}/> <br/>
        <input type = "number" min = "500" placeholder = "enter agency commission of your property" value = {agecom} onChange={e => {setAgecom(e.target.value)}}/> <br/>
        
        <input type = "textarea" placeholder='enter the address of your property' value = {address}  onChange={e => {setAddress(e.target.value)}}/> <br/>
        <input type = "textarea" placeholder='enter the locality of your property' value = {locality} onChange={e => {setLocality(e.target.value)}}/> <br/> 
        <label>Enter the year of con: </label><br/>
        <input type = "number" placeholder = "YYYY" value = {yoc}  onChange={e => {setYoc(e.target.value)}}/> <br/>
        {/* <label> Type: </label> <br/>
        <button onClick = { () => {setRes(!res)}} style = {{width: "99px"}}>{res && <>Residential</>} {!res && <>Commercial</>} </button> <br/>
        {res && <div>
            <button onClick = {() => setFlat(!flat)} style = {{width: "95px"}}> {flat && <>Flat</>} {!flat && <>Individual</>}</button> <br/>
            <input type = "number" placeholder = "Enter the number of bedrooms" style = {{width: "95px"}} onChange={e => { if(e.target.value > 1) setBeds(e.target.value)  }} min = "1"/>
        </div>}

        {!res && <div>
            <button onClick = {() => {setShop(!shop)}}> {shop && <>Shop</>} {!shop && <>Warehouse</>}</button>
            </div>} <br/> */}
        
        <button style = {{width: "150px", height: "30px", borderRadius: "5px"}}  onClick = {edit} > Save </button> <br/>
        <br/>
        </div>
        </div>
        
    )
}

export default EditP; 