// src/pages/LoginPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";
// import { useAuth } from "../../context/AuthContext";
import { signInWithGoogle, signInWithFacebook } from "../../firebase";
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
  const navigate = useNavigate();
  // const { login } = useAuth();

  // --- THÊM HÀM XỬ LÝ ĐĂNG NHẬP SOCIAL ---
  const handleSocialLogin = async (loginProvider) => {
    try {
      const result = await loginProvider();
      const user = result.user;
      console.log("Đăng nhập thành công với user:", user);
      alert(`Chào mừng ${user.displayName}!`);
      navigate("/"); // Chuyển về trang chủ sau khi đăng nhập thành công
    } catch (error) {
      console.error("Lỗi đăng nhập social:", error);
      alert(`Đã xảy ra lỗi: ${error.message}`);
    }
  };
  // States chung
  const [loginPhoneNumber, setLoginPhoneNumber] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [forgotPasswordInput, setForgotPasswordInput] = useState("");
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");

  // States cho Form Đăng Ký đa bước
  const [registrationStep, setRegistrationStep] = useState(1);
  const [regFullName, setRegFullName] = useState("");
  const [regPhoneNumber, setRegPhoneNumber] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);

  // States cho màn hình xác thực OTP
  const [otp, setOtp] = useState("");
  const [otpArray, setOtpArray] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(120);
  const otpInputRefs = useRef([]);

  // State cho checkbox điều khoản và lỗi của nó
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToTermsError, setAgreedToTermsError] = useState("");

  // Chạy timer khi ở bước nhập OTP
  useEffect(() => {
    let interval;
    if (registrationStep === 2) {
      setTimer(120);
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 1) {
            return prevTimer - 1;
          }
          clearInterval(interval);
          return 0;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [registrationStep]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(loginPhoneNumber)) {
      alert("Số điện thoại đăng nhập không hợp lệ. Vui lòng kiểm tra lại.");
      return;
    }
    // const mockUserData = {
    //   fullName: "Đặng Quốc Huy",
    //   phone: loginPhoneNumber,
    //   email: "quochuyw2610@gmail.com",
    //   avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    // };
    // login(mockUserData);

    alert("Đăng nhập thành công!");
    navigate("/"); // Chuyển hướng về trang chủ
  };

  // Bước 1 -> Bước 2: Yêu cầu OTP
  const handleSendOtp = () => {
    const phoneRegex = /^0\d{9}$/;
    if (!regPhoneNumber) {
      alert("Vui lòng nhập số điện thoại để nhận OTP.");
      return;
    }
    if (!phoneRegex.test(regPhoneNumber)) {
      alert(
        "Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số bắt đầu bằng 0."
      );
      return;
    }
    console.log(`OTP request for phone: ${regPhoneNumber}`);
    setRegistrationStep(2);
  };

  // Gửi lại mã OTP
  const handleResendOtp = () => {
    console.log(`Resending OTP for phone: ${regPhoneNumber}`);
    setOtpArray(new Array(6).fill(""));
    otpInputRefs.current[0]?.focus();
    setTimer(120);
  };

  // Xử lý việc nhập các ô OTP
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtpArray = [...otpArray];
    newOtpArray[index] = value.slice(-1);
    setOtpArray(newOtpArray);
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Bước 2 -> Bước 3: Xác thực OTP
  const handleVerifyOtp = () => {
    const finalOtp = otpArray.join("");
    if (finalOtp.length !== 6) {
      alert("Vui lòng nhập đủ 6 số của mã xác thực.");
      return;
    }
    console.log("Verifying OTP:", finalOtp);
    setOtp(finalOtp);
    setRegistrationStep(3);
  };

  // Bước 3: Hoàn tất và gửi form đăng ký
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (registrationStep !== 3) return;

    if (!regFullName || !regPassword || !regConfirmPassword) {
      alert("Vui lòng điền đầy đủ họ tên và mật khẩu.");
      return;
    }
    if (regPassword !== regConfirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }
    // Sửa lỗi: Chỉ kiểm tra và set lỗi ở đây
    if (!agreedToTerms) {
      setAgreedToTermsError(
        "Bạn cần đồng ý với Điều khoản sử dụng và Chính sách bảo mật."
      );
      return;
    }

    setAgreedToTermsError("");
    console.log("Final Register attempt:", {
      regFullName,
      regPhoneNumber,
      regEmail,
      otp,
      regPassword,
      agreedToTerms,
    });
    alert("Đăng ký tài khoản thành công!");
    navigate("/"); // Chuyển về trang chủ
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
    "w-full pl-10 pr-3 py-3 h-12 sm:h-14 text-sm bg-slate-100 border border-amber-500 font-semibold rounded-md  focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none";
  const iconClasses =
    "absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none";
  const eyeIconClasses =
    "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none";
  const primaryButtonClasses =
    "w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-4xl shadow-md hover:shadow-lg transition duration-300 text-base cursor-pointer";

  return (
    <div className="bg-slate-100 min-h-screen py-10  lg:py-16 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12 max-w-4xl lg:max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Cột trái: Luôn hiển thị */}
            <div className="text-center md:text-left">
              <h1
                className="text-3xl sm:text-4xl font-extrabold drop-shadow-[2px_2px_2px_rgba(0,0,0,0.1)] mb-2"
                style={{ color: "#0D623E" }}
              >
                PHƯƠNG TRANG
              </h1>
              <p className="text-amber-700 mb-6 sm:mb-8 text-base sm:text-lg font-semibold">
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
                  {!(currentView === "register" && registrationStep === 2) && (
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
                      {currentView === "login" && "Đăng nhập tài khoản"}
                      {currentView === "register" &&
                        registrationStep === 1 &&
                        "Tạo tài khoản mới"}
                      {currentView === "register" &&
                        registrationStep === 3 &&
                        "Hoàn tất thông tin"}
                    </h2>
                  )}
                  <div className="flex mb-6 border-b border-gray-200">
                    <button
                      onClick={() => setCurrentView("login")}
                      className={`flex-1 py-3 text-sm font-medium transition-colors duration-300 focus:outline-none ${
                        currentView === "login"
                          ? "text-orange-500 border-b-2 border-orange-500"
                          : "text-black hover:text-amber-800"
                      }`}
                    >
                      ĐĂNG NHẬP
                    </button>

                    <button
                      onClick={() => {
                        setCurrentView("register");
                        setRegistrationStep(1);
                      }}
                      className={`flex-1 py-3 text-sm font-medium transition-colors duration-300 focus:outline-none ${
                        currentView === "register"
                          ? "text-orange-500 border-b-2 border-orange-500"
                          : "text-black hover:text-amber-800"
                      }`}
                    >
                      ĐĂNG KÝ
                    </button>
                  </div>
                </>
              )}

              {currentView === "login" && (
                <form onSubmit={handleLoginSubmit} className="space-y-5">
                  <div className="relative ">
                    <FaPhoneAlt className={iconClasses} />
                    <input
                      type="tel"
                      value={loginPhoneNumber}
                      onChange={(e) =>
                        setLoginPhoneNumber(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="Nhập số điện thoại"
                      className={
                        "w-full pl-10 pr-3 py-3 h-12 sm:h-14 text-sm  border font-semibold border-amber-500 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
                      }
                      style={{ backgroundColor: "#FEF6F4" }}
                      required
                      maxLength="10"
                    />
                  </div>
                  <div className="relative">
                    <FaLock className={iconClasses} />
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Nhập mật khẩu"
                      className={
                        "w-full pl-10 pr-3 py-3 h-12 sm:h-14 text-sm  border font-semibold border-amber-500 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
                      }
                      style={{ backgroundColor: "#FEF6F4" }}
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
                      className="text-xs text-orange-500 hover:underline focus:outline-none cursor-pointer"
                    >
                      Quên mật khẩu?
                    </button>
                    {/* ===== THÊM PHẦN ĐĂNG NHẬP MẠNG XÃ HỘI VÀO ĐÂY ===== */}
                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">
                            Hoặc tiếp tục với
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Nút đăng nhập Google */}
                        <button
                          type="button"
                          onClick={() => handleSocialLogin(signInWithGoogle)}
                          className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          <FaGoogle className="text-red-500 mr-3" size={20} />
                          Google
                        </button>

                        {/* Nút đăng nhập Facebook */}
                        <button
                          type="button"
                          onClick={() => handleSocialLogin(signInWithFacebook)}
                          className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          <FaFacebook
                            className="text-blue-600 mr-3"
                            size={20}
                          />
                          Facebook
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {currentView === "register" && (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  {registrationStep === 1 && (
                    <>
                      <div className="relative">
                        <FaPhoneAlt className={iconClasses} />
                        <input
                          type="tel"
                          value={regPhoneNumber}
                          onChange={(e) =>
                            setRegPhoneNumber(e.target.value.replace(/\D/g, ""))
                          }
                          placeholder="Số điện thoại"
                          className={inputClasses}
                          style={{ backgroundColor: "#FEF6F4" }}
                          required
                          maxLength="10"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={!regPhoneNumber}
                        className={`${primaryButtonClasses} disabled:bg-gray-400 disabled:cursor-not-allowed `}
                      >
                        Gửi mã OTP
                      </button>
                    </>
                  )}

                  {registrationStep === 2 && (
                    <div className="text-center">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                        Nhập mã xác thực
                      </h3>
                      <p className="text-sm text-gray-600 mb-6">
                        Mã xác thực đã được gửi về số{" "}
                        <span className="font-bold text-green-600">
                          {regPhoneNumber}
                        </span>
                      </p>
                      <div
                        className="flex justify-center gap-2 sm:gap-3 mb-6"
                        dir="ltr"
                      >
                        {otpArray.map((digit, index) => (
                          <input
                            key={index}
                            ref={(el) => (otpInputRefs.current[index] = el)}
                            type="tel"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleOtpChange(e, index)}
                            onKeyDown={(e) => handleOtpKeyDown(e, index)}
                            className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-semibold border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition"
                            required
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        className={primaryButtonClasses}
                      >
                        Tiếp tục
                      </button>
                      <div className="mt-4 text-sm text-gray-500">
                        <span>{`Thời gian còn lại ${Math.floor(timer / 60)
                          .toString()
                          .padStart(2, "0")}:${(timer % 60)
                          .toString()
                          .padStart(2, "0")}`}</span>
                        {timer === 0 && (
                          <button
                            type="button"
                            onClick={handleResendOtp}
                            className="ml-4 text-orange-500 font-semibold hover:underline"
                          >
                            Gửi lại mã
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {registrationStep === 3 && (
                    <>
                      <div className="relative">
                        <FaUser className={iconClasses} />
                        <input
                          type="text"
                          value={regFullName}
                          onChange={(e) => setRegFullName(e.target.value)}
                          placeholder="Họ và tên"
                          className={inputClasses}
                          style={{ backgroundColor: "#FEF6F4" }}
                          required
                        />
                      </div>
                      <div className="relative">
                        <FaEnvelope className={iconClasses} />
                        <input
                          type="email"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="Địa chỉ email (không bắt buộc)"
                          className={inputClasses}
                          style={{ backgroundColor: "#FEF6F4" }}
                        />
                      </div>
                      <div className="relative">
                        <FaLock className={iconClasses} />
                        <input
                          type={showRegPassword ? "text" : "password"}
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="Mật khẩu mới"
                          className={`${inputClasses} pr-10`}
                          style={{ backgroundColor: "#FEF6F4" }}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPassword(!showRegPassword)}
                          className={eyeIconClasses}
                          aria-label="Toggle password visibility"
                        >
                          {showRegPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      <div className="relative">
                        <FaLock className={iconClasses} />
                        <input
                          type={showRegConfirmPassword ? "text" : "password"}
                          value={regConfirmPassword}
                          onChange={(e) =>
                            setRegConfirmPassword(e.target.value)
                          }
                          placeholder="Xác nhận mật khẩu mới"
                          className={`${inputClasses} pr-10`}
                          style={{ backgroundColor: "#FEF6F4" }}
                          required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowRegConfirmPassword(!showRegConfirmPassword)
                          }
                          className={eyeIconClasses}
                          aria-label="Toggle confirm password visibility"
                        >
                          {showRegConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      <div className="pt-2 pb-1">
                        <label className="flex items-center text-xs text-black cursor-pointer">
                          <input
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={(e) => {
                              setAgreedToTerms(e.target.checked);
                              if (e.target.checked) {
                                setAgreedToTermsError("");
                              }
                            }}
                            className="mr-2 h-4 w-4 accent-orange-500"
                          />
                          Tôi đồng ý với{" "}
                          <a
                            href="/#"
                            onClick={(e) => e.preventDefault()}
                            className="ml-1 text-orange-500 hover:underline"
                          >
                            Điều khoản sử dụng
                          </a>
                          &nbsp;và&nbsp;
                          <a
                            href="/#"
                            onClick={(e) => e.preventDefault()}
                            className="text-orange-500 hover:underline"
                          >
                            Chính sách bảo mật
                          </a>
                          .
                        </label>
                        {agreedToTermsError && (
                          <p className="text-red-500 text-xs mt-1">
                            {agreedToTermsError}
                          </p>
                        )}
                      </div>
                      <button type="submit" className={primaryButtonClasses}>
                        Đăng ký
                      </button>
                    </>
                  )}
                </form>
              )}

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
                    {!forgotPasswordMessage && (
                      <div className="relative">
                        <FaEnvelope className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
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
