
import './App.css';
import Navbar from  "./Components/Navbar";
import Footer from './Components/Footer';
import Signup from './Components/Signup';
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import AddProduct from './Components/AddProduct'
import Product from './Components/Product';
import UpdateProduct from './Components/Update';
import { BrowserRouter , Routes , Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
       <Navbar/>
       <Routes>

        <Route element ={<PrivateComponent />}/>

        <Route path="/" element={<Product/>}/>
        <Route path="/add" element={<AddProduct></AddProduct>}/>
        <Route path="/update/:id" element={<h1> {<UpdateProduct></UpdateProduct>}  </h1>}/>
        <Route path="/log-out" element={<h1> Log-out  </h1>}/>
        <Route path="/Profile" element={<h1> Profile  </h1>}/>
        

        <Route path="/signup" element={<Signup></Signup>}/>
        <Route path="/login" element={<Login></Login>}/>

       </Routes>

      </BrowserRouter>

      <Footer/>

     
    </div>
  );
}

export default App;
