import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar.js';
import Home from './Pages/Home';
import AddUser from './Pages/AddUser';
import UpdateUser from './Pages/UpdateUser';
import {Routes,Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/add' element={<AddUser/>}/>
        <Route path='/edit/:id' element={<UpdateUser/>}/>
      </Routes>
    </div>
  );
}

export default App;
