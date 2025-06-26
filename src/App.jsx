// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";

import Header from "./components/pages/Header";
import Homepage from "./components/pages/Homepage";
import LoginPage from "./components/pages/LoginPage";
import ContactPage from "./components/pages/ContactPage";
import Footer from "./components/pages/Footer";
import AboutUsPage from "./components/pages/AboutUsPage";
import TimeLinePage from "./components/pages/TimeLinePage";
import TicketLookupPage from "./components/pages/TicketLookupPage";
import NewsPage from "./components/pages/NewsPage";
import BookingPage from "./components/pages/BookingPage";
import UserProfilePage from "./components/pages/UserProfilePage";

// Import các trang quản trị
import AdminLayout from "./components/admin/AdminLayout";
import DashboardPage from "./components/pages/admin/DashboardPage";
import TripManagementPage from "./components/pages/admin/TripManagementPage";
import CustomerListPage from "./components/pages/admin/CustomerListPage";
import BookingHistoryPage from "./components/pages/admin/BookingHistoryPage";
import PaymentConfirmationPage from "./components/pages/admin/PaymentConfirmationPage";
function App() {
  return (
    // <AuthProvider>
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {" "}
        <Header />
        <main className="flex-grow">
          {" "}
          {/* routes điều hướng cho người tiêu dùng */}
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/dang-nhap" element={<LoginPage />} />
            <Route path="/lien-he" element={<ContactPage />} />
            <Route path="/ve-chung-toi" element={<AboutUsPage />} />
            <Route path="/tra-cuu-ve" element={<TicketLookupPage />} />
            <Route path="/lich-trinh" element={<TimeLinePage />} />
            <Route path="/tin-tuc" element={<NewsPage />} />
            <Route path="/dat-ve" element={<BookingPage />} />
            <Route path="/profile" element={<UserProfilePage />} />

            {/* routes điều hướng cho quản trị viên */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="trips" element={<TripManagementPage />} />
              <Route path="customers" element={<CustomerListPage />} />
              <Route
                path="customers/:id/history"
                element={<BookingHistoryPage />}
              />
              <Route
                path="payment-confirm"
                element={<PaymentConfirmationPage />}
              />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;
