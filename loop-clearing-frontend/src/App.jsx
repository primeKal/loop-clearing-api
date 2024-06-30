import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Testimonials } from "./components/testimonials";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import Heros from './pages/Heros/Heros'
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/PreAuth/Login";
import SignUp from "./pages/PreAuth/Signup";
import Stories from "./pages/Stories/Stories";
import Testimonies from "./pages/Testimonies//Testimonies"

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);


  return (
    <BrowserRouter>
    <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/traders" element={<Heros />} />
        <Route path="/transactions" element={<Testimonies />} />
        <Route path="/clearings" element={<Stories />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
