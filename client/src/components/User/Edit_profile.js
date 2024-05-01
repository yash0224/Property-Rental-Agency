import React, { useEffect, useState } from 'react'
import Axios from 'axios'


const Editprof = () => {

    const [temp, setDo] = useState(false); 
    const [userDetails, setUserDetails] = useState([]); 
    const [Opno, setOpno] = useState(0); 
    const [Ppno, setPpno] = useState(0);
    const [phone, setPhone] = useState([]); 
    const Aid = localStorage.getItem('aadhar')

    useEffect(() => {
        Axios.get(`http://localhost:3001/getuserdetails/${Aid}`).then(response => setUserDetails(response.data) ).then(() => {
            setName(userDetails[0].NAME);
            setPass(userDetails[0].PASSWORD); 
            setAge(userDetails[0].AGE); 
            setPin(userDetails[0].PIN_CODE);
            setDno(userDetails[0].DOOR_NO); 
            setCity(userDetails[0].CITY); 
            setState(userDetails[0].STATE); 
            setStno(userDetails[0].STREET); 
        }).then(() => {
            Axios.get(`http://localhost:3001/getphone/${Aid}`).then(response => setPhone(response.data)).then(() => {
                setOpno(phone[0].phone_number)
                setPpno(phone[1].phone_number)
                
            })
        })
    }, [temp])

    const update = () => {
        if(name == "") window.alert("name cannot be empty")
        else if(pass == "") window.alert("password cannot be empty")
        else if(age == 0) window.alert("age is inappropriate")
        else if(pin == 0) window.alert("pin is not correct")
        else if(dno == 0) window.alert("door number is not correct")
        else if (city == "") window.alert("city cannot be empty")
        else if(state == "") window.alert("state cannot be empty")
        else {
            Axios.post("http://localhost:3001/updateuserdetails", {
            Name: name, 
            Pass: pass, 
            Adid: Aid, 
            Age: age, 
            Pin: pin, 
            Dno: dno, 
            Stno: stno, 
            City: city,
            State: state
            }).then( Axios.post("http://localhost:3001/updatephone1", {
                Opno: Opno, 
                Aid: Aid
            })
            
            ).then( Axios.post("http://localhost:3001/updatephone2", {
                Ppno: Ppno,
                Aid: Aid
            })

            ) .then(window.alert("details updated"))
        }
    }

    const [name, setName] = useState(""); 
    const [pass, setPass] = useState(""); 
    const [age, setAge] = useState(0); 
    const [pin, setPin] = useState(0); 
    const [dno, setDno] = useState(0); 
    const [stno, setStno] = useState(""); 
    const [city, setCity] = useState(""); 
    const [state, setState] = useState(""); 



    return (
        <div style = {{ textAlign: 'center'}}> <br/><br/>
        <button className = 'button-9' onClick={() => setDo(!temp)}> Reload</button> <br/><br/>

        <label>Name: </label> <br/>
        <input type='text' placeholder = "enter your name" required value = {name} onChange = {e => setName(e.target.value)}  /> <br/>
        <label>Password: </label> <br/>
        <input type='text' placeholder = "enter your password" onChange = {e => setPass(e.target.value)} value = {pass} required/> <br/>
        <label>Pincode: </label> <br/>
        <input type='number' placeholder = "enter your pincode" onChange = {e => setPin(e.target.value)}  value = {pin} required/> <br/>
        <label>Age: </label> <br/>
        <input type='number' placeholder = "enter your age" onChange = {e => setAge(e.target.value)} value = {age} required/> <br/>
        <label>Door Number: </label> <br/>
        <input type='number' placeholder = "enter your door number" value = {dno} onChange = {e => setDno(e.target.value)} required/> <br/>
        <label>Street name: </label> <br/>
        <input type='text' placeholder = "enter your street name" value = {stno} onChange = {e => setStno(e.target.value)} required/> <br/>
        <label>City: </label> <br/>
        <input type='text' placeholder = "enter your city name" value = {city} onChange = {e => setCity(e.target.value)}required/> <br/>
        <label>State: </label> <br/>
        <input type='text' placeholder = "enter your  state name" value = {state} onChange = {e => setState(e.target.value)} required/> <br/>
        <label> Personal Phone : </label> <br/> 
        <input type = "tel" value = {Ppno} onChange={e => setPpno(e.target.value)} /> <br/>
        <label> Official Phone :</label>  <br/>
        <input type = "tel" value = {Opno} onChange={e => setOpno(e.target.value)} /> <br/>
        


        <button className = 'button-9' onClick={update}>Update</button>
       
        </div>
    )
}

export default Editprof; 