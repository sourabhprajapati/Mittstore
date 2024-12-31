import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './pages/Home';
function App() {
  return (
   <>
     <BrowserRouter>
     <Routes>
       <Route path='/user/register' element={<Register/>}/>
       <Route path='/user/login' element={<Login/>}/>
       <Route path='/' element={<Home/>}/>
       
     </Routes>
         
     </BrowserRouter>
   </>
  );
}

export default App;
