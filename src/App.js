import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SignupForm from './components/auth/Register';
import Login from './components/auth/Login';
import ForgetPassword from './components/auth/ForgetPassword';
import Profilepage from './pages/profile/Profilepage';
import Profile from './components/Profile/Profile';
import SeProfile from './components/SchoolProfile/SeProfile';
import SchoolProfile from './components/seProfile/SchoolProfile';
import Home from './pages/home/Home';
import Cart from './components/cart/Cart';
import Productpage from './pages/Productpage/Productpage';
import ProductDetailpage from './pages/ProductDetailpage/ProductDetailpage';
import Checkout from './pages/Checkout/Checkout';
import { CartProvider } from './components/context/CartContext';
import EnquiryForm from './components/EnquiryForm/EnquiryForm';
import Form from './components/Form/Form';
import Leader from './components/Leaders/Leader';
import Testimonials from './components/Testimonials/Testimonials';
import About from './components/About/About';
import TopTranding from './components/TopTranding/TopTranding';


function App() {
  return (
   <CartProvider>
     <BrowserRouter>
     <Routes>
     <Route path='/register' element={<SignupForm />}/>
     <Route path='/about' element={<About/>}/>

       <Route path='/user/login' element={<Login/>}/>
       <Route path='/forgetpass' element={<ForgetPassword/>}/>
       <Route path='/' element={<Home />}/>
       <Route path='/profilepage' element={<Profilepage/>}/>
       <Route path="/student-profile" element={<Profile/>}/>
       <Route path="/school-profile" element={<SeProfile/>}/>
       <Route path="/se-profile" element={<SchoolProfile/>}/>
       <Route path='/cart' element={<Cart/>}/>
       <Route path='/checkout' element={<Checkout/>}/>
       <Route path='/product' element={<Productpage/>}/>
       <Route path='/productdetail' element={<ProductDetailpage/>}/>
       
       <Route path='/enquiryform' element={<EnquiryForm/>}/>
       <Route path='/form' element={<Form/>}/>
       <Route path='/leader' element={<Leader/>}/>
       <Route path='/testinomials' element={<Testimonials/>}/>

     </Routes>
         
     </BrowserRouter>
   </CartProvider>
  );
}

export default App;
