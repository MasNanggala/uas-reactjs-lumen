import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Dashboard from "../pages/Dashboard";
import Contact from "../pages/Contact";
import About from "../pages/About";
import BukuList from "../pages/BukuList";
import BukuDetail from "../pages/BukuDetail";

const MainContent = () => {
  return (
        <Routes>
            <Route index path='/dashboard' element={<Dashboard />} />
            <Route path='/buku' Component={BukuList} />
            <Route path='/buku/:mode/:id' Component={BukuDetail} />
            <Route path='/contact' Component={Contact} />
            <Route path='/about' Component={About} />
            <Route path='/' element={<Dashboard />} />
        </Routes>

  )
}

export default MainContent
