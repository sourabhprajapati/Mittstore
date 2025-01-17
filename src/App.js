import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profilepage from './pages/profile/Profilepage';
import Home from './pages/home/Home';
import Cart from './components/cart/Cart';
import Productpage from './pages/Productpage/Productpage';
function App() {
  return (
   <>
     <BrowserRouter>
     <Routes>
       <Route path='/user/register' element={<Register/>}/>
       <Route path='/user/login' element={<Login/>}/>
       <Route path='/' element={<Home/>}/>
       <Route path='/profilepage' element={<Profilepage/>}/>
       <Route path='/cart' element={<Cart/>}/>
       <Route path='/product' element={<Productpage/>}/>
     </Routes>
         
     </BrowserRouter>
   </>
  );
}

export default App;
