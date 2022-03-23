import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import GraphScreen from './screens/GraphScreen';
import HomeScreen from './screens/HomeScreen';
import NewVacationsScreen from './screens/NewVacationsScreen'
import Header from './components/Header';
import FollowedVacations from './screens/FollowedVacations';
import AddVacation from './screens/AddVacation';
import AdminEditVacation from './screens/AdminEditVacation';
import io from "socket.io-client";

let socket;

socket = io();
socket.on('connection')

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path='/' element={<HomeScreen socket={socket} />} />
          <Route path='/explore' element={<NewVacationsScreen socket={socket} />} />
          <Route path='/follow' element={<FollowedVacations socket={socket} />} />
          <Route path='/sign-in' element={<LoginScreen />} />
          <Route path='/sign-up' element={<RegisterScreen />} />
          <Route path='/admin/addvacation' element={<AddVacation socket={socket} />} />
          <Route path='/admin/editvacation/:id' element={<AdminEditVacation socket={socket} />} />
          <Route path='/admin/reports' element={<GraphScreen socket={socket} />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
