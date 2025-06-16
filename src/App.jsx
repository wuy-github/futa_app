// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/pages/Header";
import Homepage from "./components/pages/Homepage";
import LoginPage from "./components/pages/LoginPage";
import ContactPage from "./components/pages/ContactPage";
import Footer from "./components/pages/Footer";
import AboutUsPage from "./components/pages/AboutUsPage";
import TimeLinePage from "./components/pages/TimeLinePage";
import TicketLookupPage from "./components/pages/TicketLookupPage";
function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {" "}
        <Header />
        <main className="flex-grow">
          {" "}
          {/* routes điều hướng */}
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/dang-nhap" element={<LoginPage />} />
            <Route path="/lien-he" element={<ContactPage />} />
            <Route path="/ve-chung-toi" element={<AboutUsPage />} />
            <Route path="/tra-cuu-ve" element={<TicketLookupPage />} />
            <Route path="/lich-trinh" element={<TimeLinePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
