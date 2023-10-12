import React from 'react';
import Layout from "../components/Layout/Layout.js"
import {useAuth} from "../context/auth.js";
const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={"Home - Ecommerce App"} description={"All Products"} keywords={"T Shirts"} author={"Shubham Halade"} >
      <h1>homepage</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
}

export default HomePage;
