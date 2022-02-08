import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AdminScreen from './screens/AdminScreen';
import GraphScreen from './screens/GraphScreen';
import HomeScreen from './screens/HomeScreen';
import NewVacationsScreen from './screens/NewVacationsScreen'
import Header from './components/Header';
import FollowedVacations from './screens/FollowedVacations';
import AddVacation from './screens/AddVacation';

function App() {

  return (
    <Router>
      <Header />
      <Container>
        <Route path='/' component={HomeScreen} exact />
        <Route path='/explore' component={NewVacationsScreen} />
        <Route path='/follow' component={FollowedVacations} />
        <Route path='/sign-in' component={LoginScreen} />
        <Route path='/sign-up' component={RegisterScreen} />
        <Route path='/admin/addvacation' component={AddVacation} />
        {/* <Route path='/admin' component={AdminScreen} />
        <Route path='/admin/graph' component={GraphScreen} /> */}
      </Container>
    </Router>
  );
}

export default App;
