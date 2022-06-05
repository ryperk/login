import * as React from "react";
import { Routes, Route } from "react-router-dom"
import Layout from "./components/layout";
import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>
      </Routes>
    </div>
  );
}



export default App;
