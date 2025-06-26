import React, { useState, useEffect, useRef } from "react";
import { FaMobileAlt, FaUserCircle, FaCaretDown } from "react-icons/fa";
import futaLogo from "../../assets/futa-logo.png";
import vietnameseFlag from "../../assets/flags/vn.png";
import englishFlag from "../../assets/flags/my.png";
import { Link } from "react-router-dom";
// Trong file: src/components/pages/Header.jsx

function Header() {
  const navItems = [
    "TRANG CHỦ",
    "LỊCH TRÌNH",
    "TRA CỨU VÉ",
    "TIN TỨC",
    "HÓA ĐƠN",
    "LIÊN HỆ",
    "VỀ CHÚNG TÔI",
  ];

  const languages = [
    { code: "VI", name: "VI", flagImg: vietnameseFlag },
    { code: "EN", name: "EN", flagImg: englishFlag },
  ];
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef(null);

  const appPlatforms = [
    { name: "ANDROID", url: "#" },
    { name: "IOS", url: "#" },
  ];
  const [isAppDropdownOpen, setIsAppDropdownOpen] = useState(false);
  const appDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target)
      ) {
        setIsLangDropdownOpen(false);
      }
      if (
        appDropdownRef.current &&
        !appDropdownRef.current.contains(event.target)
      ) {
        setIsAppDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectLang = (lang) => {
    setSelectedLang(lang);
    setIsLangDropdownOpen(false);
  };

  const toggleLangDropdown = () => {
    setIsLangDropdownOpen(!isLangDropdownOpen);
    if (!isLangDropdownOpen) setIsAppDropdownOpen(false);
  };

  const toggleAppDropdown = () => {
    setIsAppDropdownOpen(!isAppDropdownOpen);
    if (!isAppDropdownOpen) setIsLangDropdownOpen(false);
  };

  return (
    <header className="font-sans shadow-md">
      {/* PHẦN 1: THANH TRÊN CÙNG */}
      <div className=" text-white" style={{ backgroundColor: "#FEA526" }}>
        <div className="container mx-auto px-4 flex justify-center items-center gap-x-8 h-20 ">
          <div className="flex justify-start">
            <div className="flex items-center gap-2 text-sm">
              {/* Nút chọn ngôn ngữ với Dropdown */}
              <div className="relative" ref={langDropdownRef}>
                <button
                  onClick={toggleLangDropdown}
                  className="flex items-center cursor-pointer gap-2 "
                >
                  <img
                    src={selectedLang.flagImg}
                    alt={selectedLang.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span>{selectedLang.name}</span>
                  <FaCaretDown
                    size={12}
                    className={`transition-transform duration-200 ${
                      isLangDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isLangDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-max bg-white text-black rounded-md shadow-lg py-1 z-20">
                    <ul>
                      {languages.map((lang) => (
                        <li
                          key={lang.code}
                          className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSelectLang(lang)}
                        >
                          <img
                            src={lang.flagImg}
                            alt={lang.name}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span>{lang.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <span className="opacity-60">|</span>

              {/* Nút Tải ứng dụng với Dropdown */}
              <div className="relative" ref={appDropdownRef}>
                <button
                  onClick={toggleAppDropdown}
                  className="flex items-center cursor-pointer gap-1 "
                >
                  <FaMobileAlt />
                  <span>Tải ứng dụng</span>
                  <FaCaretDown
                    size={12}
                    className={`transition-transform duration-200 ${
                      isAppDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isAppDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg py-1 z-20">
                    <ul>
                      {appPlatforms.map((platform) => (
                        <li key={platform.name}>
                          <a
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 text-sm hover:bg-gray-100 uppercase"
                            onClick={() => setIsAppDropdownOpen(false)}
                          >
                            {platform.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cột giữa: Logo */}
          <div className="flex justify-center pl-50 pr-50  ">
            <img
              src={futaLogo}
              alt="FUTA Bus Lines Logo"
              className="h-20 cursor-pointer rounded-b-full "
              onClick={() => (window.location.href = "/")}
            />
          </div>

          {/* Cột phải: Nút Đăng nhập */}
          <div className="flex justify-end">
            <Link
              to="/dang-nhap"
              className="bg-white text-black font-semibold rounded-full px-4 py-2 flex items-center gap-2 hover:text-orange-500 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50" // Bước 3: Áp dụng class styling
            >
              <FaUserCircle size={18} />
              <span>Đăng nhập/Đăng ký</span>
            </Link>
          </div>
        </div>
      </div>

      {/* PHẦN 2: THANH ĐIỀU HƯỚNG CHÍNH */}
      <nav className="bg-gradient-to-b from-[#FFA726] to-[#F4511E] pb-8 text-white">
        <div className="container mx-auto -mt-10 px-4 py-10">
          <ul className="flex justify-center items-center gap-8 font-bold text-sm">
            {navItems.map((item) => (
              <li key={item}>
                {item === "TRANG CHỦ" ? (
                  <Link
                    to="/"
                    className="py-3 block border-b-2 border-transparent hover:border-b-2 hover:border-white"
                  >
                    {item}
                  </Link>
                ) : item === "LIÊN HỆ" ? (
                  <Link
                    to="/lien-he"
                    className="py-3 block border-b-2 border-transparent hover:border-b-2 hover:border-white"
                  >
                    {item}
                  </Link>
                ) : item === "VỀ CHÚNG TÔI" ? (
                  <Link
                    to="/ve-chung-toi"
                    className="py-3 block border-b-2 border-transparent hover:border-b-2 hover:border-white"
                  >
                    {item}
                  </Link>
                ) : item === "TRA CỨU VÉ" ? (
                  <Link
                    to="/tra-cuu-ve"
                    className="py-3 block border-b-2 border-transparent hover:border-b-2 hover:border-white"
                  >
                    {item}
                  </Link>
                ) : item === "LỊCH TRÌNH" ? (
                  <Link
                    to="/lich-trinh"
                    className="py-3 block border-b-2 border-transparent hover:border-b-2 hover:border-white"
                  >
                    {item}
                  </Link>
                ) : item === "TIN TỨC" ? (
                  <Link
                    to="/tin-tuc"
                    className="py-3 block border-b-2 border-transparent hover:border-b-2 hover:border-white"
                  >
                    {item}
                  </Link>
                ) : (
                  <a
                    href="#"
                    className="py-3 bloc  k border-b-2 border-transparent hover:border-b-2 hover:border-white"
                  >
                    {item}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
export default Header;
