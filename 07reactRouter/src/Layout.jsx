import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';

const Layout = () => {
  return(
    <>
    <Header />
    <Outlet />
    <Footer />
    </>    
  )
}

export default Layout;