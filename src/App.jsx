import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

 

function App() {
  

  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
      <ToastContainer position="top-center" />
 
    </>
  )
}

export default App
