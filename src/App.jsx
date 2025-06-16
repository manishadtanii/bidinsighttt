import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function AppLayout() {
  const location = useLocation();

  // List of routes where header/footer should be hidden
  const hiddenRoutes = ["/login", "/signup"];
  const isHidden = hiddenRoutes.includes(location.pathname);

  return (
    <>
      {!isHidden && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
      {!isHidden && <Footer />}
    </>
  );
}

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
