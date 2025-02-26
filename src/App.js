import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SignupForm from './components/auth/Register';
import Login from './components/auth/Login';
import ForgetPassword from './components/auth/ForgetPassword';
import Profilepage from './pages/profile/Profilepage';
import Home from './pages/home/Home';
import Cart from './components/cart/Cart';
import Productpage from './pages/Productpage/Productpage';
import ProductDetailpage from './pages/ProductDetailpage/ProductDetailpage';
import Checkout from './pages/Checkout/Checkout';
import { CartProvider } from './context/CartContext';
import EnquiryForm from './components/EnquiryForm/EnquiryForm';
import Form from './components/Form/Form';
import Leader from './components/Leaders/Leader';
import Testimonials from './components/Testimonials/Testimonials';
import About from './components/About/About';
import StudentProfile from './components/StudentProfile/StudentProfile';
import SchoolProfile from './components/SchoolProfile/SchoolProfile';
import SeProfile from './components/seProfile/SeProfile';


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
       <Route path="/student-profile" element={<StudentProfile/>}/>
       <Route path="/school-profile" element={<SchoolProfile/>}/>
       <Route path="/se-profile" element={<SeProfile/>}/>
       <Route path='/cart' element={<Cart/>}/>
       <Route path='/product' element={<Productpage/>}/>
       <Route path='/productdetail' element={<ProductDetailpage/>}/>
       <Route path='/checkout' element={<Checkout/>}/>
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
