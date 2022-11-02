import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import 'boxicons/css/boxicons.min.css';
import Login from "./components/auth/Login";
import DashBoard from "./components/dashBoard/DashBoard";
import ProtectedRoutes from "./routes/ProtectedRoutes"
import Category from "./components/category/Category"
import Products from "./components/products/Products"
import {Helmet} from "react-helmet";

const App = () => {

  return (
      <>
          <Routes>
              <Route  path="/*" element={<ProtectedRoutes Component={Login} />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/Dashboard" element={<ProtectedRoutes Component={DashBoard} />} />
              <Route exact path="/category" element={<ProtectedRoutes Component={Category} />} />
              <Route exact path="/products" element={<ProtectedRoutes Component={Products} />} />
          </Routes>
      </>
  );
}
export default App
