import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Explore from './Pages/Explore/Explore';
import Cart from './Pages/Cart/Cart';
import Appointment from './Pages/Appointment/Appointment';


const App = () => {

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <> </>}
    <ToastContainer />
    <div>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='explore' element={<Explore />} />
        <Route path='cart' element={<Cart />} />
        <Route path='appointments' element={<Appointment />} />
      </Routes>
    </div>
    </>
  )
}

export default App