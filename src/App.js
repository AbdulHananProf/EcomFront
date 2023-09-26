import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import 'boxicons/css/boxicons.min.css';
import Login from "./components/auth/Login";
import DashBoard from "./components/dashBoard/DashBoard";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Category from "./components/category/Category";
import Products from "./components/products/Products";
import Orders from "./components/orders/Orders";
import Sizes from "./components/sizes/Sizes"
import Fabric from "./components/fabrics/Fabric";
import {Helmet} from "react-helmet";

const App = () => {

  return (
      <>
          <Routes>
              <Route  path="/*" element={<ProtectedRoutes Component={Login} />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/Dashboard" element={<ProtectedRoutes Component={DashBoard} />} />
              <Route exact path="/category" element={<ProtectedRoutes Component={Category} />} />
              <Route exact path="/sizes" element={<ProtectedRoutes Component={Sizes} />} />
              <Route exact path="/fabrics" element={<ProtectedRoutes Component={Fabric} />} />
              <Route exact path="/products" element={<ProtectedRoutes Component={Products} />} />
              <Route exact path="/orders" element={<ProtectedRoutes Component={Orders} />} />
          </Routes>
      </>
  );
}
export default App
