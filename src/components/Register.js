import  React , {useRef, useState,useEffect} from 'react';   
import {Form, Card, Button,Alert,Dropdown,DropdownButton} from 'react-bootstrap'; 
import { useAuth } from '../context/AuthContext';
import {Link, useHistory} from 'react-router-dom'  
import loginImg from '../login.jpg' 

export default function Register() {
    const emailRef = useRef();
    const nameRef = useRef();
    const ageRef = useRef();
    const genderRef = useRef();
    const contactRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {signup, currentUser}  = useAuth();
    const history = useHistory();
    useEffect(()=>{
        if(  currentUser && currentUser.email){
          history.push('/')
        }
   },[]);

   async function handleSubmit(e){
        e.preventDefault();
        try{
            setError('');
            setLoading(true);
        await signup(emailRef.current.value, passwordRef.current.value);  
        history.push('/');
        }
        catch(e){
            setError( e.code || 'Some Error occured')
        }
        setLoading(false);
    }

    return (
        <div className="d-flex" style={{height:"100vh" , width: "100vw"}}>
        <div >
        <img style={{height:"100vh" , width: "50vw"}} src={loginImg}/>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center" style={{height:"100vh" , width: "50vw"}}>
          <Card style={{ width: "30vw"}}>
              <Card.Body>
              <h2 className="text-center mb-4">Sign Up </h2>
              {currentUser && currentUser.email}
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                  </Form.Group>
                  <Form.Group id="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" ref={nameRef} required />
                  </Form.Group>
                  <Form.Group id="age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control minlength="2" maxlength="2" type="text" onChange={() => isNaN(ageRef.current.value) ? ageRef.current.value = '': ageRef.current.value = ageRef.current.value } ref={ageRef} required />
                  </Form.Group>
                  <Form.Group id="gender">
                  <Form.Label>Gender</Form.Label>
                                <Form.Control as="select" className="input" ref={genderRef} onChange={(e) => genderRef.current.value = e.target.value}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Form.Control>
                  </Form.Group>
                  <Form.Group id="contact">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control minLength="10" maxLength="10" type="phone" onChange={() => isNaN(contactRef.current.value) ? contactRef.current.value = '': contactRef.current.value = contactRef.current.value } ref={contactRef} required />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                  </Form.Group>
                  <diV className="w-100 mt-2 text-center">
                  <Button type="submit" disabled={loading}  className="w-50 mt-2" style={{background: "#00A6B8",borderColor:"#00A6B8"}}>Sign Up</Button>
                  </diV>
              </Form>
              </Card.Body>
          </Card> 
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login" >Log In</Link>
              </div>
              </div>
        </div>
    );
}
