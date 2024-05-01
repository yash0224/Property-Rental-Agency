import React, {useState, useRef} from 'react'
import Axios from 'axios'
import {useReactToPrint} from 'react-to-print';

const Report = () => {

    const component = useRef();

    const [pid, setPid] = useState(0); 
    const [details, setDetails] = useState([]);
    const [valid, setValid] = useState(false);

    const generatePDF = useReactToPrint({
        content: () => component.current, 
        documentTitle: `Rent records of Property ${pid}`
    });

    const getreport  = () =>{
        if(pid <= 0){ window.alert("please enter valid property id"); setValid(false)}
        else {
            setValid(true)
            Axios.get(`http://localhost:3001/getreport/${pid}`).then(
                response => setDetails(response.data)
            )
        }
    }


    return (
        <div style = {{textAlign: "center"}}>
            <br/><br/><br/>
            
            <input type = "number" onChange={e => setPid(e.target.value)} />  <br/><button className = 'button-9' onClick={getreport}> Get </button> <br/><br/>
        { valid && 
        <div ref = {component}><br/><br/><br/> <br/><br/>
        <table   className='table table-striped table-bordered'  style = {{width: "90%", position: 'relative', right: "-5%"}}>
        <thead> 
         <td> <p> Tenant Id</p></td>
         <td> <p> Start Date</p></td>
         <td> <p> End Date </p></td>
         <td> <p> Agency commission </p></td>
         <td> <p> Percent in hike</p></td>
        </thead>
        <tbody>
            {details.map(member => 
            <tr key = {member.E_DATE}>
                <td>{member.TID}</td>
                <td>{member.ST_DATE.slice(0,10)}</td>
                <td>{member.E_DATE.slice(0,10)}</td>
                <td>{member.A_COMMISSION}</td>
                <td>{member.PERCENT_IN_HIKE}</td>
            </tr>
            )}
        </tbody>
        </table>
        </div>
}
 {valid &&   <button onClick = {generatePDF} className='button-9'> Print</button>}
    
        </div>
    )
}

export default Report; 