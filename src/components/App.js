import { Container } from 'react-bootstrap';
import { AuthProvider } from '../context/AuthContext';
import Register from './Register';
import Dashboard from './Dashboard'
import Login from './Login'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';

function App() {
  return (
    <AuthProvider>
    <Container className="d-flex align-item-center justify-content-center" style={{maxHeight: "100vh" , maxWidth:"100vw"}}>
      <div >
        <Router>
          <AuthProvider>
            <Switch>
            <PrivateRoute exact path="/" component={Dashboard}/>
              <Route path="/signup" component={Register}/>
              <Route path="/login" component={Login}/>
              <Route path="/forgot-password" component={ForgotPassword}/>
            <PrivateRoute exact path="**" component={Dashboard}/>
            </Switch>
          </AuthProvider>
          </Router>
     
      </div>
    </Container>
    </AuthProvider>
   
  );
}

export default App;
