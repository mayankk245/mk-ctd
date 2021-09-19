import React, { useRef, useState,useEffect } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import { Link,useHistory } from "react-router-dom"
import loginImg from '../login.jpg'


export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const {login, currentUser}  = useAuth();
  const history = useHistory();

  useEffect(()=>{
    if(  currentUser && currentUser.email){
      history.push('/')
    }
},[]);
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch(e) {
      setError( e.code || "Failed to reset password")
    }

    setLoading(false)
  }

  return (
<div className="d-flex" style={{height:"100vh" , width: "100vw"}}>
        <div >
        <img style={{height:"100vh" , width: "50vw"}} src={loginImg}/>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center" style={{height:"100vh" , width: "50vw"}}>
      <Card style={{ width: "30vw" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <diV className="w-100 mt-2 text-center">
                  <Button type="submit" disabled={loading}  className="w-50 mt-2" style={{background: "#00A6B8",borderColor:"#00A6B8"}}>Reset Password</Button>
            </diV>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
      </div>
    </div>
  )
}