import React from 'react';
import Header from "./Header.js";
import Footer from "./Footer.js"
import Helmet from "react-helmet";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import {Toaster} from "react-hot-toast";
const Layout = ({children, title, description, keywords, author}) => {
  return (
    <>
    <Helmet>
    <meta charset="UTF-8"/>
    <title>{title}</title>
    <meta name="description" content={description}/>
    <meta name="keywords" content={keywords}/>
    <meta name="author" content={author}/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </Helmet>
        <Header/>
        <main style={{minHeight: "80vh"}}>
            <Toaster/>
            {/* <ToastContainer/> */}
            {children}
        </main>
        <Footer/>
    </>
  );
}

Layout.defaultProps = {
  title: "Ecommerce App",
  description: "All",
  keywords: "T Shirts",
  author: "Shubham Halade"
}
export default Layout;
