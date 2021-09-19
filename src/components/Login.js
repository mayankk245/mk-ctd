import  React , {useRef, useState,useEffect} from 'react';   
import {Form, Card, Button,Alert} from 'react-bootstrap'; 
import { useAuth } from '../context/AuthContext';
import {Link, useHistory} from 'react-router-dom'
import loginImg from '../login.jpg'


export default function Register() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {login, currentUser}  = useAuth();
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
        await login(emailRef.current.value, passwordRef.current.value);  
        history.push('/');

        }
        catch(e){
            setError(e.code || 'Some error occured');
            

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
              <h2 className="text-center mb-4">Log In </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                  </Form.Group>
                  <diV className="w-100 mt-2 text-center">
                  <Button type="submit" disabled={loading}  className="w-50 mt-2" style={{background: "#00A6B8",borderColor:"#00A6B8"}}>Log In</Button>
                  </diV>
              </Form>
              <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
              </Card.Body>
          </Card> 
          
          <div className="w-100 text-center mt-2">
            Need an Account? <Link to="/signup" >Sign Up</Link>
              </div>
              </div>
        </div>
    );
}
