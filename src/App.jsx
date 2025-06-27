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
import Register from "./pages/Register";
import CompanyBuild from "./pages/CompanyBuild";
import GeographicCoverage from "./pages/GeographicCoverage";
import HelpOurAi from "./pages/HelpOurAi";
import IndustryCategories from "./pages/IndustryCategories";
import ExtraData from "./pages/ExtraData";
import EmailVerification from "./components/EmailVerification";
import Verification from "./pages/Verification";

function AppLayout() {
  const location = useLocation();

  // List of routes where header/footer should be hidden
  const hiddenRoutes = ["/login", "/signup", "/register", "/company-build", "/geographic-coverage", "/help-our-ai", "/industry-categories","/extra-data", "/verification"];
  const isHidden = hiddenRoutes.includes(location.pathname);

  return (
    <>
      {!isHidden && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/company-build" element={<CompanyBuild />} />
        <Route path="/geographic-coverage" element={<GeographicCoverage />} />
        <Route path="/help-our-ai" element={<HelpOurAi />} />
        <Route path="/industry-categories" element={<IndustryCategories />} />
        <Route path="/extra-data" element={<ExtraData />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/verification" element={<Verification />} />
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
