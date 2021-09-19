import React, { useState ,useRef ,useEffect } from "react"
import { db } from "../firebase"
import { useAuth } from "../context/AuthContext"
import {  useHistory } from "react-router-dom"
import {Form, Button, Card,Table,Navbar,Container,Nav,Spinner} from 'react-bootstrap'; 
import editImg from '../edit.png'

export default function Dashboard() {
    const empIdRef = useRef();
    const nameRef = useRef();
    const refFirst = useRef();  
    const [first,setFirst] = useState(false);
    const [second,setSecond] = useState(false);
    const [fullyVaccinated,setFullyVaccinted] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [editClick, setEditClick] = useState(false);
    const [dalaList, setDataList] = useState([]);
    const [showAdd , setShowAdd] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [uid , setUid] = useState('');
    const fisrtDate =useRef();
    const secondDate =useRef();
    const vaccineRef = useRef();
   const [editempIdRef, setId] = useState("")
   const [editnameRef, setName]= useState("")
   const [editfisrtDate , setFirstDate]= useState("")
   const [editsecondDate , setSecondDate]= useState("")
   const [editvaccineRef, setVaccine]= useState("")
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  useEffect(()=>{
       getData();
  },[]);

    function handleSubmit(e){
        e.preventDefault();
        const ref = db.collection('info').doc(currentUser.uid);
        ref.set({
            id:empIdRef.current.value,
            name: nameRef.current.value,
            vaccineName: vaccineRef.current.value,
            isFirstTaken: first,
            isSecondTaken: second,
            fisrtDate: fisrtDate.current.value,
            secondDate: secondDate.current.value,
            fullyVaccinated: fullyVaccinated,
            uid: currentUser.uid
        }).then(() => {console.log('sucess')
        console.log(first)
        getData();
    })
    }

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  async function getData(){
      setLoaded(false);
      let cEmail = currentUser.email;
    if(cEmail.includes('admin')){

        let resps= await db.collection('info').get();
        let tempArr =[];
         await resps.forEach((j) => {
             tempArr.push(j.data());
          });
          console.log(tempArr)
          setDataList([...tempArr]);
          setLoaded(true);
            console.log(dalaList[0])
    }
    else{
        let resps= await db.collection('info').get();
            resps.docs.forEach((i) => {
                  if(currentUser.uid == i.data().uid){
                  setUserInfo(i.data());
                  //setLoaded(true);
                  console.log(userInfo);
                  setLoaded(true);
              }
          });
    }
    setLoaded(true);
     
  }


function onEditClick(i){
    if(dalaList && dalaList[0]){
        setEditClick(true);
        setFirst(dalaList[i].isFirstTaken);
        setSecond(dalaList[i].isSecondTaken);
        setFullyVaccinted(dalaList[i].fullyVaccinated);
         setId(dalaList[i].id);
         setName (dalaList[i].name);
         setFirstDate(dalaList[i].fisrtDate);
         setSecondDate(dalaList[i].secondDate);
         setVaccine( dalaList[i].vaccineName)
         setUid(dalaList[i].uid);
    }
    else{
        setEditClick(true);
        setFirst(userInfo.isFirstTaken);
        setSecond(userInfo.isSecondTaken);
        setFullyVaccinted(userInfo.fullyVaccinated);
         setId(userInfo.id);
         setName (userInfo.name);
         setFirstDate(userInfo.fisrtDate);
         setSecondDate(userInfo.secondDate);
         setVaccine( userInfo.vaccineName)
         setUid(userInfo.uid);
        
    }


}
function navBar(){
    return(
        <>

  </>
    )
}

  function noDetails(){
      return (
   
       <>
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand>CTD</Navbar.Brand>
    <Nav className="left">
      <Nav.Link onClick={handleLogout}>LOGOUT</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
        <div className="d-flex flex-column justify-content-center align-items-center" style={{height:"90vh" , width:"100vw"}}>
            <h5>You have not added your vaccination details please add the details</h5>
      <Button className="mt-3" style={{ background: "#00A6B8", borderColor: "#00A6B8" }} onClick={() => { setShowAdd(true)}}>Add Details</Button>
        </div>
      </>
      )

      
  }

  function details(){
    return (
        
        dalaList && dalaList[0] ? 
    (
    <>
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand>CTD</Navbar.Brand>
    <Nav className="left">
      <Nav.Link onClick={handleLogout}>LOGOUT</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
    <div className="d-flex flex-column align-items-center " style={{width:"100vw", marginTop:"20vh"}}>
<h3 style={{textAlign:"center"}}>Employees Vaccination Details</h3>
        <Table style={{width:"80vw", }} striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Employee ID</th>
      <th>Employee Name</th>
      <th>Vaccine Name</th>
      <th>First Dose Taken</th>
      <th>First Dose Date</th>
      <th>Second Dose Taken</th>
      <th>Second Dose Date</th>
      <th>Fully Vaccinated</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  {dalaList.map((d ,i ) => {

      return( <tr>
       <td>{i+1}</td>
       <td>{d.id}</td>
       <td>{d.name}</td>
       <td>{d.vaccineName}</td>
       <td>{d.isFirstTaken.toString()}</td>
       <td>{d.fisrtDate}</td>
       <td>{d.isSecondTaken.toString() || "-"}</td>
       <td>{d.secondDate || "-"}</td>
       <td>{d.fullyVaccinated.toString() || "-"}</td>
       <td ><img style={{height:"20px", width:"20px" , cursor:"pointer"}} src={editImg} onClick={() => onEditClick(i)}/></td>
   </tr>
      );
  })}
     
    
  </tbody>
</Table>

    </div>
    </> ) :
    (
    <>
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand>CTD</Navbar.Brand>
    <Nav className="left">
      <Nav.Link onClick={handleLogout}>LOGOUT</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
    <div className="d-flex flex-column align-items-center " style={{width:"100vw", marginTop:"20vh"}}>
        <h3 style={{textAlign:"center"}}>Your Vaccination Details</h3>
        <Table style={{width:"80vw", }} striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Employee ID</th>
      <th>Employee Name</th>
      <th>Vaccine Name</th>
      <th>First Dose Taken</th>
      <th>First Dose Date</th>
      <th>Second Dose Taken</th>
      <th>Second Dose Date</th>
      <th>Fully Vaccinated</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  <tr >
      <td>1</td>
      <td>{userInfo.id}</td>
      <td>{userInfo.name}</td>
      <td>{userInfo.vaccineName}</td>
      <td>{userInfo.isFirstTaken.toString()}</td>
      <td>{userInfo.fisrtDate}</td>
      <td>{userInfo.isSecondTaken.toString() || "-"}</td>
      <td>{userInfo.secondDate || "-" }</td>
      <td>{userInfo.fullyVaccinated.toString() || "-"}</td>
      <td ><img style={{height:"20px", width:"20px" , cursor:"pointer"}} src={editImg} onClick={() => onEditClick()}/></td>
    </tr>
   
  </tbody>
</Table>

    </div>) </> )
    )
  }

function addDetails(){
    return (
        <>
        <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand>CTD</Navbar.Brand>
    <Nav className="left">
      <Nav.Link onClick={handleLogout}>LOGOUT</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
        <div className="d-flex justify-content-center align-items-center" style={{height:"90vh" , width:"100vw"}}>
        <Card>
            <Card.Body>
        <div style={{minWidth:"28vw"}}>

        <h3 className="text-center mb-4">Add Vaccination Details</h3><Form onSubmit={handleSubmit}>
            
            <div className="d-flex justify-content-between">
            <Form.Group className=" mt-3" style={{width: "200px"}} id="emp_id">
                <Form.Label>Employee ID</Form.Label>
                <Form.Control type="text" ref={empIdRef} required />
            </Form.Group>
            <Form.Group className=" mt-3 " style={{width: "200px"}} id="emp_name">
                <Form.Label>Employee Name</Form.Label>
                <Form.Control type="text" ref={nameRef} required />
            </Form.Group>
            </div>

            <div className="d-flex justify-content-between">
            <Form.Group className=" mt-3" style={{width: "200px"}} id="is_first_Dose_take">
                <Form.Check value={first} onChange={() => setFirst(!first)} type="checkbox" label="First Dose Taken" />
            </Form.Group>
            
            <Form.Group className=" mt-3" style={{width: "200px" ,marginLeft:"10px"}} id="is_second_Dose_take">
                <Form.Check disabled={!first} value={second} onChange={() => setSecond(!second)} type="checkbox" label="Second Dose Taken" />
            </Form.Group>
            </div>
            <div className="d-flex justify-content-between">
            <Form.Group className=" mt-3" style={{width: "200px", marginLeft: "0px"}} id="first_Dose_date">
                <Form.Label>First Dose Date</Form.Label>
                <Form.Control disabled={!first} type="date" name='date_of_birth' ref={fisrtDate} required />
            </Form.Group>
            <Form.Group className="mt-3" style={{width: "200px"}} id="second_Dose_date">
                <Form.Label>Second Dose Date</Form.Label>
                <Form.Control disabled={!second} type="date" name='date_of_birth' ref={secondDate} required />
            </Form.Group>   
            </div>
            <div className="d-flex justify-content-between ">
            <Form.Group className="mt-3" style={{width: "200px"}} id="vaccine_name" style={{width:""}}>
                <Form.Label>Vaccine Name</Form.Label>
                <Form.Control disabled={!first} type="text" ref={vaccineRef} required />  
            </Form.Group>
            <Form.Group  className=" mt-4" style={{width: "200px"}} id="is_fully_vaccinated">
            <Form.Label></Form.Label>
                <Form.Check disabled={!first || !second} value={fullyVaccinated} onChange={() => setFullyVaccinted(!fullyVaccinated)} type="checkbox" label="Fully Vaccinated" />
            </Form.Group>
            </div>
           
            <diV className="w-100 mt-2 text-center">
                <Button type="submit" className="mt-3" style={{ background: "#00A6B8", borderColor: "#00A6B8", marginRight:"30px" }}>Submit Details</Button>
                <Button type="cancle" className="mt-3" style={{ background: "white", borderColor: "#00A6B8", color:"black" , width:"130px"}} onClick={() => setShowAdd(false)}>Cancle</Button>
            </diV>
        </Form>
        
        </div> 
        </Card.Body>    
        </Card>
        </div>
        </>
    );
}

async function updateData(e){
    e.preventDefault();
        const ref = db.collection('info').doc(uid);
        await ref.update({
            id: editempIdRef,
            name: editnameRef,
            vaccineName: editvaccineRef,
            isFirstTaken: first,
            isSecondTaken: second,
            fisrtDate: editfisrtDate,
            secondDate: editsecondDate,
            fullyVaccinated: fullyVaccinated,
        }).then(() => {console.log('updated')
        console.log(first)
        getData();
        setEditClick(false);    
    })
}

function editDetails(){
    return (
        <>
        <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand>CTD</Navbar.Brand>
    <Nav className="left">
      <Nav.Link onClick={handleLogout}>LOGOUT</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
        <div className="d-flex justify-content-center align-items-center" style={{height:"90vh" , width:"100vw"}}>
        <Card>
            <Card.Body>
        <div style={{minWidth:"28vw"}}>

        <h3 className="text-center mb-4">Edit Vaccination Details</h3>
        <Form onSubmit={updateData}>
            
            <div className="d-flex justify-content-between">
            <Form.Group className=" mt-3" style={{width: "200px"}} id="emp_id">
                <Form.Label>Employee ID</Form.Label>
                <Form.Control  value ={editempIdRef} onChange={(e) => {setId(e.target.value)}} type="text"  required />
            </Form.Group>
            <Form.Group className=" mt-3 " style={{width: "200px"}} id="emp_name">
                <Form.Label>Employee Name</Form.Label>
                <Form.Control   value={editnameRef} onChange={(e) => {setName(e.target.value)}} type="text"  required />
            </Form.Group>
            </div>

            <div className="d-flex justify-content-between">
            <Form.Group className=" mt-3" style={{width: "200px"}} id="is_first_Dose_take">
                <Form.Check ref ={refFirst} value={first} checked={first} onChange={() => {setFirst(!first); userInfo.isFirstTaken= !first}} type="checkbox" label="First Dose Taken" />
            </Form.Group>
            
            <Form.Group className=" mt-3" style={{width: "200px" ,marginLeft:"10px"}} id="is_second_Dose_take">
                <Form.Check disabled={!first} value={second} checked={second} onChange={() => {setSecond(!second); userInfo.isSecondTaken = !second}} type="checkbox" label="Second Dose Taken" />
            </Form.Group>
            </div>
            <div className="d-flex justify-content-between">
            <Form.Group className=" mt-3" style={{width: "200px", marginLeft: "0px"}} id="first_Dose_date">
                <Form.Label>First Dose Date</Form.Label>
                <Form.Control disabled={!first}  onChange={(e) => {setFirstDate(e.target.value)}} value={editfisrtDate} type="date"   required />
            </Form.Group>
            <Form.Group className="mt-3" style={{width: "200px"}} id="second_Dose_date">
                <Form.Label>Second Dose Date</Form.Label>
                <Form.Control disabled={!second} onChange={(e) => {setSecondDate(e.target.value)}} value={editsecondDate} type="date"  required />
            </Form.Group>   
            </div>
            <div className="d-flex justify-content-between ">
            <Form.Group className="mt-3" style={{width: "200px"}} id="vaccine_name" style={{width:""}}>
                <Form.Label>Vaccine Name</Form.Label>
                <Form.Control disabled={!first} type="text" onChange={(e) => {setVaccine(e.target.value)}} value={editvaccineRef} required />  
            </Form.Group>
            <Form.Group  className=" mt-4" style={{width: "200px"}} id="is_fully_vaccinated">
            <Form.Label></Form.Label>
                <Form.Check checked={userInfo.fullyVaccinated} disabled={!first || !second} value={fullyVaccinated} onChange={() => {setFullyVaccinted(!fullyVaccinated); userInfo.fullyVaccinated = !fullyVaccinated}} type="checkbox" label="Fully Vaccinated" />
            </Form.Group>
            </div>
           
            <diV className="w-100 mt-2 text-center ">
                <Button type="submit" className="mt-3" style={{ background: "#00A6B8", borderColor: "#00A6B8", marginRight:"30px" }}>Update Details</Button>
                <Button type="cancle" className="mt-3" style={{ background: "white", borderColor: "#00A6B8", color:"black" , width:"130px"}} onClick={() => setEditClick(false)}>Cancle</Button>
            </diV>

        </Form>
        
        </div> 
        </Card.Body>    
        </Card>
        </div>
        </>
    );
}
return (
    !loaded ? <div className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}><Spinner animation="grow" variant="dark" /> </div>  : editClick ? editDetails() : ((userInfo && userInfo.uid) || (dalaList && dalaList[0])) ? details() : showAdd ? addDetails(): noDetails()
    );  
}
