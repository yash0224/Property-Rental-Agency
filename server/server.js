const express = require("express"); 
const app = express(); 
const mysql = require('mysql');
const cors = require('cors')
const bodyParser = require('body-parser')
var date = new Date();

const db = mysql.createPool({
    host: 'localhost',
    user: 'sherlock',
    password: 'sherlock',
    database: 'dbms'
})
 
app.use(cors()) 
app.use(express.json())

app.use(bodyParser.urlencoded({extended: true}))

app.listen(3001, () => {  
    console.log("server is up and running")
}) 
 
// app.get('/', (req,res) => {
//     // res.send("hello its working")
//     const sqlst = "INSERT INTO `dbms`.`user` (NAME, PASSWORD) VALUES('SHERLOCK', 'PASSWORD')"; 
//     db.query(sqlst, (err,res) => {
//         if(err) console.log(err); 
//         else console.log("inserted");
//     })
 
/

app.post('/register', (req, res) => {
    const st = "INSERT INTO `dbms`.`user` (AADHAR_ID, NAME, AGE, PASSWORD, PIN_CODE, DOOR_NO, STATE, STREET, CITY) VALUES (?,?,?,?,?,?,?,?,?)"; 
    const check = "SELECT * FROM `dbms`.`user`  WHERE AADHAR_ID = ?"; 
    const PHCk = "SELECT * FROM phone_numbers WHERE AADHAR_ID = ? GROUP BY AADHAR_ID;";
    const stp1 = "INSERT INTO phone_numbers VALUES (?,?,?); ";  
    const stp2 = "INSERT INTO phone_numbers VALUES (?,?,?); "; 


    const Name = req.body.Name; 
    const Pass = req.body.Pass; 
    const Adid = req.body.Adid; 
    const Age = req.body.Age; 
    const Pin = req.body.Pin; 
    const Dno = req.body.Dno; 
    const Stno = req.body.Stno; 
    const City =  req.body.City; 
    const State = req.body.State; 
    const Pno1 = req.body.Pno1;
    const Pno2 = req.body.Pno2; 

    db.query(check, [Adid], (err, result) => {
        if(err) console.log(err)
        if(result.length == 0){
            db.query(st,[Adid, Name, Age, Pass, Pin, Dno, State, Stno, City], (err,res) => {
                if(err) console.log(err)
                else {
                    db.query(PHCk, [Adid], (err1, resp2) => {
                        if(err1) console.log(err1)
                        if(resp2.length == 0){
                            db.query(stp1, [Pno1, Adid, 0], (err, res) => {
                                if(err)  console.log(err)
                            })
                            db.query(stp2, [Pno2, Adid, 1], (err, res) => {
                                if(err) console.log(err)
                            } )
                        }
          
                    })
                }
            }) 
                 
            

        }
        else {
            res.send("duplicate entry")
            console.log("duplicate entry"); 
        }
    })



   
})
export const checkAuth = async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res
          .status(401)
          .json({ message: "Invalid token", error: "Invalid token" });
      }
      const [scheme, token] = authHeader.split(' ');
      if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Invalid token', error: 'Invalid token' });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
      const { id, username, hashedPassword, role, iat, exp } = decoded
      const currentTime = Math.floor(Date.now() / 1000);
      if (exp < currentTime) {
        return res.status(401).json({ message: 'Token expired', error: 'Token expired' });
      }
      const { data: user, error} = await supabase
        .from("users")
        .select("*")
        .eq("id", id);
      if (error) { 
        console.error("Error checking auth:", error);
        return res.status(400).json({ error: error.message });
      }
      if (user && user.length > 0) {
        if (user[0].username === username && user[0].password === hashedPassword && user[0].role === role) {
          return res.status(200).json({ message: "Authenticated" });
        } else {
          return res.status(401).json({ message: "Invalid token", error: "Invalid token" });
        }
      } else {
        return res.status(404).json({ message: "User not found", error: "User not found" });
      }
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Invalid token", error: "Invalid token" });
    }
  };
  
app.post('/login', (req,res) => {
    const Aid = req.body.Aid; 
    const Pass = req.body.Pass; 
    

    const check_dba = "SELECT * FROM `dbms`.`dba` AS A INNER JOIN `dbms`.`user` AS B ON A.AADHAR_ID = B.AADHAR_ID  WHERE A.AADHAR_ID = ? AND B.PASSWORD = ?;"; 
    const check_manger = "SELECT * FROM `dbms`.`manager` AS A INNER JOIN `dbms`.`user` AS B ON A.AADHAR_ID = B.AADHAR_ID WHERE A.AADHAR_ID = ? AND B.PASSWORD = ?;"; 
    const check_user = "SELECT * FROM `dbms`.`user` WHERE AADHAR_ID = ? AND PASSWORD = ?; "; 

    db.query(check_dba, [Aid, Pass], (err,resP) => {
            if(err) console.log(err); 
            if(resP.length > 0){
                res.json({dba:true, user: false,manager: true, message: 'dba login successful'})
                console.log("dba")
            }
            else {
                db.query(check_manger, [Aid, Pass], (err1, resp2) => {
                    if(err1) console.log(err1)


                    if(resp2.length > 0){
                        res.json({dba:false,user:false, manager: true, message: 'manager login successful'})
                        console.log("manager")
                    }
                    else {
                        db.query(check_user,[Aid, Pass], (error, response) => {
                            if(error) console.log(error)
                            else {
                                if(response.length == 0) { res.json({dba: false, user: false, message:"login failed" })
                                console.log("failed");  }
                                else {
                                    res.json({dba: false, user: true, message: "user login successful"})
                                    console.log("user")
                                }
                            }
                        })
                    }
                })


              
            }
    })

    // db.query(check_dba, [Aid, Pass], (err2, resp) =>{
    //     if(err2) console.log(err2)
    //     res.send(resp);
    // })
})

app.post('/addproperty', (req,res) => {
    const stdt = req.body.Stdt; 
    const endt = req.body.Endt; 
    const city = req.body.City; 
    const tarea = req.body.Tarea; 
    const parea = req.body.Parea; 
    const nof = req.body.Nof; 
    const rent = req.body.Rent; 
    const agecom = req.body.Agecom; 
    const address = req.body.Address; 
    const locality = req.body.Locality; 
    const yoc = req.body.Yoc; 
    const oid = req.body.Aid;  
    var type; 
    const beds = req.body.Beds;
    var subtype;
    
    if(req.body.Res) {type = 'res'; if(req.body.Flat) subtype = 'flat'; else subtype = 'indi'  }
    else {type = 'com'; if(req.body.Shop) subtype = 'shop'; else subtype = 'warehouse'}


    const st = "INSERT INTO `dbms`.`property` (START_DATE, END_DATE, CITY, TOTAL_AREA, PLINTH_AREA, NO_OF_FLOORS, RENT_PER_MONTH, AGENCY_COMMISSION, ADDRESS, LOCALITY, YEAR_OF_CONSTRUCTION, OWNER_ID, type, sub_type, no_of_bedrooms) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"; 
    
 
    const idst = "SELECT MAX(ID) AS RECENT FROM `dbms`.`property`;";
    

    db.query(st, [stdt, endt, city, tarea, parea, nof, rent, agecom, address, locality, yoc, oid, type, subtype, beds], (err, res) =>{
        if(err) console.log(err)
        else console.log("added to properties")
    })  

    
        
})

app.get('/getid', (req, res) => {
    const st = "SELECT MAX(ID) AS REC FROM `dbms`.`property` ;"; 

    db.query(st, (err, resp) =>{
        if(err) console.log(err)
        else {
            res.send(resp[0])
           // res.json({value: resp[0].REC})
            console.log(resp[0].REC)
        }
    }) 
})

 

app.post('/addres', (req,res) => {

    const id = req.body.Id;  
    const flat = req.body.Flat; 
    const beds = req.body.Beds; 
    var type;    

    if(flat) {type = 0; } 
    else type = 1; 


    const st = "INSERT INTO `dbms`.`residential` (TYPE, ID, NO_OF_BEDROOMS) VALUES (?,?,?); "; 

    db.query(st, [type, id, beds], (err, resp) => {
        if(err) console.log(err)

        else {
            console.log("inserted in residential"); 
        }
    })
})

app.post("/addcom", (req,res) => { 

    const id = req.body.Id; 
    const shop = req.body.Shop; 
    var type; 

    if(shop) type = 0;
    else type =1 ;

    const st = "INSERT INTO `dbms`.`commercial` (TYPE, ID) VALUES (?,?);"; 

    db.query(st, [type, id], (err,resp) => {
        if(err) console.log(err)
        else {
            console.log("inserted in commercial"); 
        }
})

})
 
app.get("/getmyprop/:aadharid", (req,res) => {
    const st = "SELECT * FROM  `dbms`.`property` WHERE OWNER_ID = ?;"; 
    const Id = req.params.aadharid;
    
    db.query(st, [Id], (err, resp) => {
        if(err) console.log(err)
        else {
            res.send(resp);
        }
    })
})


app.post("/deleteprop/:aadharid", (req,res) => {
    const st = "DELETE FROM `dbms`.`property` WHERE ID = ?;";
    const id = req.params.aadharid; 

    db.query(st, [id], (err, resp) => {
        if(err) console.log(err)
        console.log(`deleted property with id ${id}`)

    })
})

app.get("/getusers", (req, res) => {

    const st = "SELECT * FROM dbms.user AS A WHERE NOT EXISTS (SELECT * FROM dbms.manager AS B WHERE B.AADHAR_ID = A.AADHAR_ID) AND NOT EXISTS (SELECT * FROM dbms.dba AS C WHERE C.AADHAR_ID = A.AADHAR_ID)"
    

    db.query(st,  (err,resp) => {
        if(err) console.log(err)
        res.send(resp)
    })
})

app.get("/getmanagers", (req, res) => {

    const st = "SELECT * FROM dbms.manager AS A , dbms.user AS B WHERE A.AADHAR_ID = B.AADHAR_ID  ";
   

    db.query(st, (err,resp) => {
        if(err) console.log(err)    
        res.send(resp)
    })
})

app.post("/deleteuser/:id", (req,res) => {
    const st = 'DELETE FROM `dbms`.`user` WHERE AADHAR_ID = ?;'
    const st2 = 'DELETE FROM phone_numbers WHERE AADHAR_ID = ?;'
    const id = req.params.id;

    db.query(st2, [id], (err,res) => {
        if(err) console.log(err)
        else {
            db.query(st, [id], (err2, res2) => {
                if(err2) console.log(err2)
                else console.log("user deleted")
            })
        } 
    })  

})

app.get("/details/:id", (req, res) => {
    const id = req.params.id; 
    const st = "SELECT * FROM `dbms`.`property` WHERE ID = ?;";

    db.query(st, [id], (err,resp) => {
        if(err) console.log(err)
        res.send(resp);
    })

})

app.get("/getallprops", (req, res)=>{
    const st = "SELECT * FROM `dbms`.`property` ORDER BY ID DESC; "; 

    db.query(st, (err,resp)=>{
        console.log(err)
        res.send(resp);
    })
})

app.get("/makemanager/:aid", (req,res) => {
    const st = "INSERT INTO `dbms`.`manager` (AADHAR_ID) VALUES (?);"; 
    // const check = "SELECT FORM `dbms`.`manager` WHERE AADHAR_ID = ?; "
    const id = req.params.aid; 

    db.query(st, [id], (err, resp) => {
        if(err) console.log(err)
        res.send("done")
    })
})

app.get("/makeuser/:aid", (req,res) => {
    const st = "DELETE FROM `dbms`.`manager` WHERE AADHAR_ID = ?; "; 
    const id = req.params.aid; 

    db.query(st, [id], (err,resp)=>{
        if(err) console.log(err)
        res.send("made user"); 
    })
})



app.post("/edittheproperty", (req,res)=>{
    var stdt = req.body.Stdt; 
    var endt = req.body.Endt; 
    const city = req.body.City; 
    const tarea = req.body.Tarea; 
    const parea = req.body.Parea; 
    const nof = req.body.Nof; 
    const rent = req.body.Rent; 
    const agecom = req.body.Agecom; 
    const address = req.body.Address; 
    const locality = req.body.Locality; 
    const yoc = req.body.Yoc; 
    const oid = req.body.Aid;    
    const id = req.body.Id; 

    stdt = stdt.slice(0,10)
    endt = endt.slice(0,10) 

    const st = 'UPDATE `dbms`.`property` SET START_DATE = ? , END_DATE = ?, CITY = ?, TOTAL_AREA = ?, PLINTH_AREA = ?, NO_OF_FLOORS = ?, RENT_PER_MONTH = ?, AGENCY_COMMISSION = ?, ADDRESS = ?, LOCALITY = ?, YEAR_OF_CONSTRUCTION =? , OWNER_ID = ? WHERE ID = ?;'; 

    db.query(st, [stdt, endt, city, tarea, parea, nof, rent, agecom, address, locality,yoc, oid, id], (err, res) => {
        if(err) console.log(err)
        else console.log("updated")
    })
 
})

app.post("/addreq" , (req, res) => {
   const Ac = req.body.Ac; 
   const Pic = req.body.Pic; 
   const Stdt = req.body.Stdt;
   const Endt = req.body.Endt;
   const Pid = req.body.Pid; 
   const Aid = req.body.Aid;   

    const st = 'INSERT INTO `dbms`.`pen_requests` (PID, RID, ENDDATE,STARTDATE, COMMISSION_AGENCY, PERCENT_IN_HIKE) VALUES (?,?,?,?,?,?); ' ;

    db.query(st, [Pid, Aid, Endt, Stdt, Ac, Pic], (err, resp) => {
        if(err) console.log(err)
        else  console.log("property requested")
    })

})

app.get("/getprops/:aadharid", (req,res) => {
    const st = "SELECT * FROM property AS A WHERE OWNER_ID != ? AND NOT EXISTS (SELECT * FROM pen_requests AS B WHERE A.ID = B.PID ) AND NOT EXISTS (SELECT * FROM records AS R WHERE R.ID = A.ID AND R.E_DATE > ?); " ; 
    const Id = req.params.aadharid;
    
    db.query(st, [Id, date], (err, resp) => {
        if(err) console.log(err)
        else {
            res.send(resp);
        }
    })
})

app.get('/getrentprops/:aadharid', (req, res) => {
    const st = "SELECT * FROM property AS A WHERE OWNER_ID != ? AND EXISTS (SELECT * FROM pen_requests AS B WHERE A.ID = B.PID) AND NOT EXISTS (SELECT * FROM records AS R WHERE R.ID = A.ID AND R.E_DATE > ?); "; 

    const id = req.params.aadharid; 
  
    db.query(st, [id,date], (err, resp) => {
        if(err) console.log(err)
        else {
            res.send(resp); 
        }
    })
})

app.get("/revokerequest/:pid&:rid", (req, res)=>{  
    const pid = req.params.pid;  
    const rid = req.params.rid; 

    const st = "DELETE FROM pen_requests WHERE RID = ? AND PID = ?;"; 

    db.query(st, [rid, pid], (err, resp) => {
        if(err) console.log(err)
        else console.log("deleted request")
    })
})

app.get("/getproperties/:city&:aid", (req,res) => {
    const st = "SELECT * FROM property AS A WHERE CITY = ? AND OWNER_ID != ? AND NOT EXISTS (SELECT * FROM pen_requests AS B WHERE A.ID = B.PID ) AND NOT EXISTS (SELECT * FROM records AS R WHERE R.ID = A.ID AND R.E_DATE > ?) ;  ";
    const city = req.params.city; 
    const aid = req.params.aid; 

    db.query(st, [city, aid,date], (err, resp) => {
        if(err) console.log(err)
        res.send(resp)
    })
})

app.get("/getrentproperties/:city&:aid", (req,res) => {
    const st = "SELECT * FROM property AS A WHERE CITY = ? AND OWNER_ID != ? AND  EXISTS (SELECT * FROM pen_requests AS B WHERE A.ID = B.PID ) AND NOT EXISTS (SELECT * FROM records AS R WHERE R.ID = A.ID AND R.E_DATE > ?) ;";
    const city = req.params.city; 
    const aid = req.params.aid; 

    db.query(st, [city, aid, date], (err, resp) => {
        if(err) console.log(err) 
        res.send(resp)
    })
})

app.get("/getpropertiesl/:locality&:aid", (req,res) => {
    const st = "SELECT * FROM `dbms`.`property`AS A WHERE LOCALITY =  ? AND OWNER_ID != ? AND NOT EXISTS (SELECT * FROM pen_requests AS B WHERE A.ID = B.PID ) AND NOT EXISTS (SELECT * FROM records AS R WHERE R.ID = A.ID AND R.E_DATE > ?);";
    const locality = req.params.locality; 
    const aid = req.params.aid; 
 
    db.query(st, [locality, aid, date], (err, resp) =>  {
        if(err) console.log(err)
        res.send(resp)
    })
})
 
app.get("/getrentpropertiesl/:locality&:aid", (req,res) => {
    const st = "SELECT * FROM `dbms`.`property`AS A WHERE LOCALITY =  ? AND OWNER_ID != ? AND  EXISTS (SELECT * FROM pen_requests AS B WHERE A.ID = B.PID ) AND NOT EXISTS (SELECT * FROM records AS R WHERE R.ID = A.ID AND R.E_DATE > ?);";
    const locality = req.params.locality; 
    const aid = req.params.aid; 
 
    db.query(st, [locality, aid, date], (err, resp) =>  {
        if(err) console.log(err)
        res.send(resp)
    })
})
 
app.get("/getpropertiess/:minprice&:maxprice&:aid", (req,res)=>{
    const st = "SELECT * FROM `dbms`.`property` AS A WHERE RENT_PER_MONTH > ? AND RENT_PER_MONTH < ? AND OWNER_ID != ? AND NOT EXISTS (SELECT * FROM pen_requests AS B WHERE A.ID = B.PID ) AND NOT EXISTS (SELECT * FROM records AS R WHERE R.ID = A.ID AND R.E_DATE > ?); "; 

    const minprice = req.params.minprice; 
    const maxprice = req.params.maxprice; 
    const aid = req.params.aid; 

    db.query(st, [minprice, maxprice, aid, date] ,(err, resp) => {
        if(err) console.log(err)
        res.send(resp)
    })
})

app.get("/getrentpropertiess/:minprice&:maxprice&:aid", (req,res)=>{
    const st = "SELECT * FROM `dbms`.`property` AS A WHERE RENT_PER_MONTH > ? AND RENT_PER_MONTH < ? AND OWNER_ID != ? AND  EXISTS (SELECT * FROM pen_requests AS B WHERE A.ID = B.PID ) AND NOT EXISTS (SELECT * FROM records AS R WHERE R.ID = A.ID AND R.E_DATE > ?); "; 

    const minprice = req.params.minprice; 
    const maxprice = req.params.maxprice; 
    const aid = req.params.aid; 

    db.query(st, [minprice, maxprice, aid, date] ,(err, resp) => {
        if(err) console.log(err)
        res.send(resp)
    })
})


app.get("/viewpendingreq/:aid", (req,res) => {
    const aid = req.params.aid; 

    const st = "SELECT * FROM (property AS A INNER JOIN pen_requests AS B ON A.ID = B.PID) WHERE A.OWNER_ID = ?; "; 

    db.query(st, [aid], (err, resp) => {
        if(err) console.log(err)
        else res.send(resp)
    })
})



app.get("/getuserdetails/:aid", (req,res) => {
    Aid = req.params.aid; 
    st = "SELECT * FROM user WHERE AADHAR_ID = ?;"; 
    db.query(st,[Aid],  (err, resp) => {
        if(err) console.log(err)
        else {
            res.send(resp); 
        }
    })
})

app.post("/updateuserdetails", (req, res) => {
    const Name = req.body.Name; 
    const Pass = req.body.Pass; 
    const Adid = req.body.Adid; 
    const Age = req.body.Age; 
    const Pin = req.body.Pin; 
    const Dno = req.body.Dno; 
    const Stno = req.body.Stno; 
    const City =  req.body.City; 
    const State = req.body.State; 

    const st = 'UPDATE user SET NAME = ?, PASSWORD = ?, AGE = ?, PIN_CODE = ?, DOOR_NO = ?, STREET = ?, CITY = ?, STATE = ? WHERE AADHAR_ID = ?;'; 

    db.query(st, [Name, Pass, Age, Pin, Dno, Stno, City, State, Adid], (err, resp) => {
        if(err) console.log(err)
        else console.log("user details updated")
    })
})

app.get('/getphone/:aid', (req, res) => {
    st = "SELECT * FROM phone_numbers WHERE AADHAR_ID = 6666 ORDER BY TYPE ;"; 
    Aid = req.params.aid; 
   
        db.query(st, [Aid], (error, resp) => {
            if(error) console.log(error)
            else {  
                res.send(resp)
            }
        })
    
})

app.post('/updatephone1', (req, res) => {
    Opno = req.body.Opno; 
    Aid = req.body.Aid; 
    
    st1 = 'UPDATE phone_numbers SET phone_number = ? WHERE AADHAR_ID = ? AND type = 0; '; 
    
    db.query(st1, [Opno,Aid], (err, resp) => {
        if(err) console.log(err)
        else console.log("official phone updated")
    })
    
})

app.post('/updatephone2', (req, res) => {
    Ppno = req.body.Ppno; 
    Aid = req.body.Aid; 
    
    st2 = 'UPDATE phone_numbers SET phone_number = ? WHERE AADHAR_ID = ? AND type = 1; ';
    db.query(st2, [Ppno,Aid], (err, resp2) => {
        if(err) console.log(err)
        else console.log("personal phone updated")
    })

})


app.post("/acceptrequest1", (req, res) => {
    const tid = req.body.rid;  
    const endt = req.body.endt.slice(0,10); 
    const pid = req.body.pid; 

    const del = "DELETE FROM pen_requests WHERE PID = ?;"; 
    const ins = "INSERT INTO tenant_records (PID, TID, END_DATE) VALUES(?,?,?,?,?);";

    db.query(ins,[pid,tid, endt], (err, resp) => {
        if(err) console.log(err)
        else {
            db.query(del, [pid],(err2, resp2) => {
                if(err2) console.log(err2)
                else console.log("deleted and inserted")
            })
        } 
    })
})

app.post("/acceptrequest2", (req,res) => {
   const Id = req.body.Pid; 
   const Stdt = req.body.Stdt;
    const Endt = req.body.Endt;
    const Ac= req.body.Ac; 
    const Pih = req.body.Pih;

    const st = 'INSERT INTO records(ID, START_DATE, END_DATE, COMMISSION_AGENCY, PERCENT_IN_HIKE) VALUES (?,?,?,?,?);';

    db.query(st, [Id, Stdt, Endt, Ac, Pih], (err, resp) => {
        if(err) console.log(err)
        else {
            console.log("property approved")
        }
    })

})

app.post("/approverequest", (req,res) => {
    const Pid = req.body.Pid; 
    const Stdt = req.body.Stdt.slice(0,10); 
    const Endt = req.body.Endt.slice(0,10); 
    const Agecom = req.body.Ac; 
    const Pih = req.body.Pih;    
    const Tid = req.body.Rid;

    const st1 = 'INSERT INTO records (ID, ST_DATE, E_DATE, A_COMMISSION, PERCENT_IN_HIKE) VALUES (?,?,?,?,?);';
    const st2 = 'INSERT INTO tenant_records (PID, TID, E_DATE) VALUES (?,?,?);';  
    const st3 = 'DELETE FROM pen_requests WHERE PID = ?;'; 

    db.query(st1, [Pid, Stdt, Endt, Agecom, Pih], (err, resp) => {
        if(err) console.log(err)
        else {
            db.query(st2, [Pid, Tid, Endt], (err1, resp1) => {
                if(err1) console.log(err1)
                else {
                    db.query(st3, [Pid], (err2, resp2) => {
                        if(err2) console.log(err2)
                        else console.log("request approved")
                    })
                }
            })
        }
    })

})

 

app.get('/enquireproperty/:pid', (req,res) => {
    Pid = req.params.pid; 

    const st = "select * FROM records WHERE E_DATE > ? AND ID = ?;"; 

    db.query(st, [date,Pid], (err, resp) => {
        if(err) console.log(err)
        if(resp.length == 0) {res.json({available: true})}
        else {res.json({available: false})}
    })   
})

app.get('/getreport/:pid', (req,res) => {
    const pid = req.params.pid; 

    const st = 'SELECT * FROM (records R INNER JOIN tenant_records T ON R.ID = T.PID AND R.E_DATE = T.E_DATE) WHERE T.PID = ?;'

    db.query(st, [pid], (err, resp) => {
        if(err) console.log(err)
        else res.send(resp)
    })
})


app.get('/gethome/:tid', (req, res) =>{
    const Tid = req.params.tid; 

    const st = 'SELECT * FROM (tenant_records T inner join property P on T.PID = P.ID inner join phone_numbers H on P.OWNER_ID = H.AADHAR_ID AND H.type = 0 inner join user U on P.OWNER_ID = U.aadhar_id  ) WHERE TID = ? AND E_DATE > ?;'; 

    db.query(st, [Tid, date], (err, resp) =>{
        res.send(resp )
    })
})


app.get('/validprop/:id', (req,res) => {
    id = req.params.id; 

    const st = 'SELECT * FROM property WHERE ID = ?;';
     
    db.query(st, [id], (err, response) => {
        if(err) console.log(err)
        else 
            if(response.length == 0) res.json({valid: false})
            else res.json({valid: true})
        
    })
    
})
