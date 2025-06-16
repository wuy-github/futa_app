// src/pages/LoginPage.jsx
import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaKey,
  FaArrowLeft,
} from "react-icons/fa";

import TVC from "../../assets/TVC.png";

function LoginPage() {
  const [currentView, setCurrentView] = useState("login");

  // State cho form Đăng Nhập
  const [loginPhoneNumber, setLoginPhoneNumber] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // State cho form Đăng Ký
  const [regFullName, setRegFullName] = useState("");
  const [regPhoneNumber, setRegPhoneNumber] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);

  // State cho Quên Mật Khẩu
  const [forgotPasswordInput, setForgotPasswordInput] = useState(""); // Có thể là email hoặc SĐT
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");

  const handleLoginSubmit = (e) => {
    /* ... (giữ nguyên) ... */
    e.preventDefault();
    console.log("Login attempt:", { loginPhoneNumber, loginPassword });
  };
  const handleSendOtp = () => {
    /* ... (giữ nguyên) ... */
    if (!regEmail) {
      alert("Vui lòng nhập email để nhận OTP.");
      return;
    }
    console.log(`OTP request for email: ${regEmail}`);
    setIsOtpSent(true);
    alert(
      `Mã OTP (giả lập) gồm 6 chữ số đã được gửi đến ${regEmail}. Vui lòng kiểm tra và nhập vào ô OTP.`
    );
  };
  const handleRegisterSubmit = (e) => {
    /* ... (giữ nguyên) ... */
    e.preventDefault();
    if (
      !regFullName ||
      !regPhoneNumber ||
      !regEmail ||
      !regPassword ||
      !regConfirmPassword
    ) {
      alert("Vui lòng điền đầy đủ các trường bắt buộc.");
      return;
    }
    if (isOtpSent && !otp) {
      alert("Vui lòng nhập mã OTP đã được gửi đến email của bạn.");
      return;
    }
    if (regPassword !== regConfirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }
    if (!agreedToTerms) {
      alert("Bạn cần đồng ý với Điều khoản sử dụng và Chính sách bảo mật.");
      return;
    }
    console.log("Register attempt:", {
      regFullName,
      regPhoneNumber,
      regEmail,
      otp: isOtpSent ? otp : null,
      regPassword,
      agreedToTerms,
    });
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (!forgotPasswordInput) {
      alert("Vui lòng nhập Email hoặc Số điện thoại đã đăng ký.");
      return;
    }
    console.log("Forgot password request for:", forgotPasswordInput);
    setForgotPasswordMessage(
      `Nếu ${forgotPasswordInput} tồn tại trong hệ thống, hướng dẫn đặt lại mật khẩu đã được gửi.`
    );
  };

  const inputClasses =
    "w-full pl-10 pr-3 py-3 h-12 sm:h-14 text-sm bg-slate-100 border border-gray-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none";
  const iconClasses =
    "absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none";
  const eyeIconClasses =
    "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none";
  const primaryButtonClasses =
    "w-full bg-orange-500 hover:bg-gray-500 text-white font-semibold py-3.5 rounded-4xl shadow-md hover:shadow-lg transition duration-300 text-base";

  return (
    <div className="bg-slate-100 min-h-screen py-10  lg:py-16 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12 max-w-4xl lg:max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Cột trái: Thông tin quảng bá */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-orange-500 mb-2">
                PHƯƠNG TRANG
              </h1>
              <p className="text-gray-700 mb-6 sm:mb-8 text-base sm:text-lg">
                Cùng bạn trên mọi nẻo đường
              </p>
              <div className="w-full h-48 sm:h-56 rounded-md flex items-center justify-center mb-6 md:mb-0 overflow-hidden">
                <img
                  src={TVC}
                  alt="Minh họa xe Phương Trang"
                  className="max-h-full w-auto object-contain"
                />
              </div>
            </div>

            {/* Cột phải: Form */}
            <div>
              {currentView !== "forgotPassword" && (
                <>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
                    {currentView === "login"
                      ? "Đăng nhập tài khoản"
                      : "Tạo tài khoản mới"}
                  </h2>
                  <div className="flex mb-6 border-b border-gray-200">
                    <button
                      onClick={() => {
                        setCurrentView("login");
                        setForgotPasswordMessage("");
                      }}
                      className={`flex-1 py-3 text-sm font-medium transition-colors duration-300 focus:outline-none ${
                        currentView === "login"
                          ? "text-orange-500 border-b-2 border-orange-500"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      ĐĂNG NHẬP
                    </button>
                    <button
                      onClick={() => {
                        setCurrentView("register");
                        setForgotPasswordMessage("");
                      }}
                      className={`flex-1 py-3 text-sm font-medium transition-colors duration-300 focus:outline-none ${
                        currentView === "register"
                          ? "text-orange-500 border-b-2 border-orange-500"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      ĐĂNG KÝ
                    </button>
                  </div>
                </>
              )}

              {currentView === "login" && (
                <form onSubmit={handleLoginSubmit}>
                  <div className="mb-5 relative">
                    <FaPhoneAlt className={iconClasses} />
                    <input
                      type="tel"
                      value={loginPhoneNumber}
                      onChange={(e) => setLoginPhoneNumber(e.target.value)}
                      placeholder="Nhập số điện thoại"
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div className="mb-5 relative">
                    <FaLock className={iconClasses} />
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Nhập mật khẩu"
                      className={`${inputClasses} pr-10`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className={eyeIconClasses}
                      aria-label={
                        showLoginPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                      }
                    >
                      {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <button type="submit" className={primaryButtonClasses}>
                    Đăng nhập
                  </button>
                  <div className="text-right mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentView("forgotPassword");
                        setForgotPasswordMessage("");
                      }}
                      className="text-xs text-orange-500 hover:underline focus:outline-none"
                    >
                      Quên mật khẩu?
                    </button>
                  </div>
                </form>
              )}

              {currentView === "register" && (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  {/* ... Form đăng ký giữ nguyên các trường đã thêm ... */}
                  <div className="relative">
                    <FaUser className={iconClasses} />
                    <input
                      type="text"
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      placeholder="Họ và tên"
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div className="relative">
                    <FaPhoneAlt className={iconClasses} />
                    <input
                      type="tel"
                      value={regPhoneNumber}
                      onChange={(e) => setRegPhoneNumber(e.target.value)}
                      placeholder="Số điện thoại"
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div className="relative">
                    <FaEnvelope className={iconClasses} />
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="Địa chỉ email"
                      className={inputClasses}
                      required
                    />
                  </div>
                  {!isOtpSent ? (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={!regEmail}
                      className="w-full text-sm text-orange-600 hover:text-orange-700 py-2 underline focus:outline-none disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      Gửi mã OTP
                    </button>
                  ) : (
                    <div className="relative">
                      <FaKey className={iconClasses} />
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Nhập mã OTP"
                        className={`${inputClasses} pr-10`}
                        required
                        maxLength={6}
                      />
                    </div>
                  )}
                  <div className="relative">
                    <FaLock className={iconClasses} />
                    <input
                      type={showRegPassword ? "text" : "password"}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Mật khẩu mới"
                      className={`${inputClasses} pr-10`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className={eyeIconClasses}
                    >
                      {showRegPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <div className="relative">
                    <FaLock className={iconClasses} />
                    <input
                      type={showRegConfirmPassword ? "text" : "password"}
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Xác nhận mật khẩu mới"
                      className={`${inputClasses} pr-10`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowRegConfirmPassword(!showRegConfirmPassword)
                      }
                      className={eyeIconClasses}
                    >
                      {showRegConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <div className="mt-5 mb-3">
                    <label className="flex items-center text-xs text-gray-600">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mr-2 h-4 w-4 accent-orange-500 rounded border-gray-300 focus:ring-1 focus:ring-orange-400 focus:ring-offset-1"
                      />
                      Tôi đồng ý với{" "}
                      <a
                        href="#"
                        className="ml-1 text-orange-500 hover:underline"
                      >
                        Điều khoản sử dụng
                      </a>
                      &nbsp;và&nbsp;
                      <a href="#" className="text-orange-500 hover:underline">
                        Chính sách bảo mật
                      </a>
                      .
                    </label>
                  </div>
                  <button type="submit" className={primaryButtonClasses}>
                    Đăng ký
                  </button>
                </form>
              )}
              {/* quên mật khẩu  */}
              {currentView === "forgotPassword" && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
                    Quên mật khẩu
                  </h2>
                  {forgotPasswordMessage ? (
                    <div className="mb-4 p-3 bg-green-50 border border-green-300 text-green-700 text-sm rounded-md">
                      {forgotPasswordMessage}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 mb-6 text-center">
                      Vui lòng nhập địa chỉ email hoặc số điện thoại đã đăng ký
                      để nhận lại mật khẩu mới.
                    </p>
                  )}
                  <form
                    onSubmit={handleForgotPasswordSubmit}
                    className="space-y-5"
                  >
                    {!forgotPasswordMessage && ( // Chỉ hiển thị input nếu chưa có thông báo thành công
                      <div className="relative">
                        {/* Giả sử người dùng có thể nhập email hoặc SĐT */}
                        <FaEnvelope className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        {/* Hoặc <FaPhoneAlt /> nếu bạn muốn chỉ SĐT */}
                        <input
                          type="text"
                          value={forgotPasswordInput}
                          onChange={(e) =>
                            setForgotPasswordInput(e.target.value)
                          }
                          placeholder="Email hoặc Số điện thoại"
                          className={inputClasses}
                          required
                        />
                      </div>
                    )}
                    {!forgotPasswordMessage && (
                      <button type="submit" className={primaryButtonClasses}>
                        Nhận lại mật khẩu mới
                      </button>
                    )}
                  </form>
                  <div className="mt-6 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentView("login");
                        setForgotPasswordMessage("");
                        setForgotPasswordInput("");
                      }}
                      className="text-sm text-orange-600 hover:underline flex items-center justify-center mx-auto"
                    >
                      <FaArrowLeft className="mr-1.5" /> Quay lại Đăng nhập
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
