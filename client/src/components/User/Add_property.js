import React, {useState} from 'react'
import Axios from 'axios'

const AddP = () => {

    const [stdt, setStdt] = useState(null); 
    const [endt, setEndt] = useState(null); 
    const [city, setCity] = useState(""); 
    const [tarea, setTarea] = useState(100); 
    const [parea, setParea] = useState(100); 
    const [nof, setNof] = useState(1); 
    const [rent, setRent] = useState(1000); 
    const [agecom, setAgecom] = useState(500); 
    const [address, setAddress] = useState(""); 
    const [locality, setLocality] = useState(""); 
    const [yoc, setYoc] = useState(1800); 
    const aid = localStorage.getItem('aadhar'); 
    const [res, setRes] = useState(false); 
    const [flat, setFlat] = useState(false); 
    const [beds, setBeds] = useState(1); 
    const [shop, setShop] = useState(false); 
    const [wait, setWait] = useState(true); 
    var id; var i = 0, j=0; 

    const add =  () => {
      
        while(i<10000) i = i+1; 
         
          Axios.post("http://localhost:3001/addproperty", {
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
            Beds: beds,
            Flat: flat,
            Res: res
            
        })
     
    }





    return (
        <div style = {{ textAlign: "center",position: "relative",right: "-40%", width:"300px", border: "2px solid black" , borderRadius: "10px", background: "red" }}><br/>
        <label>Enter your start date</label> <br/>
        <input type = "date" onChange  = {e => {setStdt(e.target.value)}}/> <br/>
        <label>Enter your end date</label> <br/>
        <input type = "date" onChange  = {e => {setEndt(e.target.value)}}/> <br/>
        <input type = "text" placeholder = "enter your city name" onChange={e => {setCity(e.target.value)}}/> <br/>
        <input type = "number" placeholder = "enter total area of your property" onChange={e => {setTarea(e.target.value)}}/> <br/>
        <input type = "number" placeholder = "enter total plinth area of your property" onChange={e => {setParea(e.target.value)}}/> <br/>
        <input type = "number" min = "1" placeholder = "enter total no of floors of your property" onChange={e => {if(e.target.value > 1) setNof(e.target.value)}}/> <br/>
        <input type = "number" min = "500" placeholder = "enter rent per month of your property" onChange={e => {  if(e.target.value>500) setRent(e.target.value)}}/> <br/>
        <input type = "number" min = "500" placeholder = "enter agency commission of your property"  onChange={e => {setAgecom(e.target.value)}}/> <br/>
        
        <input type = "textarea" placeholder='enter the address of your property' onChange={e => {setAddress(e.target.value)}}/> <br/>
        <input type = "textarea" placeholder='enter the locality of your property' onChange={e => {setLocality(e.target.value)}}/> <br/>
        <label>Enter the year of con: </label><br/>
        <input type = "number" placeholder = "YYYY"  onChange={e => {setYoc(e.target.value)}}/> <br/>
        <label> Type: </label> <br/>
        <button onClick = { () => {setRes(!res)}} style = {{width: "99px"}}>{res && <>Residential</>} {!res && <>Commercial</>} </button> <br/>
        {res && <div>
            <button onClick = {() => setFlat(!flat)} style = {{width: "95px"}}> {flat && <>Flat</>} {!flat && <>Individual</>}</button> <br/>
            <input type = "number" placeholder = "Enter the number of bedrooms" style = {{width: "95px"}} onChange={e => { if(e.target.value > 1) setBeds(e.target.value)  }} min = "1"/>
        </div>}

        {!res && <div>
            <button onClick = {() => {setShop(!shop)}}> {shop && <>Shop</>} {!shop && <>Warehouse</>}</button>
            </div>} <br/>
        
        <button style = {{width: "150px", height: "30px", borderRadius: "5px"}} onClick = {add} > Add </button> <br/>
        <br/>
        </div>
    )
}

export default AddP; 