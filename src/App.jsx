import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
function App() {
   useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      once: true,     // whether animation should happen only once - while scrolling down
    });
  }, []);
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Error404 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
