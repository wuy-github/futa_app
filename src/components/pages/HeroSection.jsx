// src/components/pages/HeroSection.jsx
import React, { useState, useEffect, useRef } from "react";
import heroBannerImage from "../../assets/baner-header.png"; // Đảm bảo đường dẫn này đúng
import { FaExchangeAlt, FaChevronDown, FaCheckCircle } from "react-icons/fa";

import DatePicker, { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("vi", vi);

// Hàm trợ giúp định dạng ngày tháng
const getDateDisplayInfo = (dateSource) => {
  if (!dateSource) return { dateDisplay: "", dayName: "" };
  let dateObj;
  if (typeof dateSource === "string") {
    const parts = dateSource.split("-"); // Mong đợi YYYY-MM-DD
    dateObj = new Date(
      Date.UTC(parts[0], parseInt(parts[1], 10) - 1, parts[2])
    );
  } else if (dateSource instanceof Date) {
    dateObj = dateSource;
  } else {
    return { dateDisplay: "", dayName: "" };
  }

  const day = String(dateObj.getUTCDate()).padStart(2, "0");
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
  const year = dateObj.getUTCFullYear();
  const daysOfWeek = [
    "Chủ nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];
  const dayName = daysOfWeek[dateObj.getUTCDay()];
  return { dateDisplay: `${day}/${month}/${year}`, dayName };
};

const locationsData = [
  { id: "AG", name: "An Giang" },
  { id: "BV", name: "Bà Rịa - Vũng Tàu" },
  { id: "BL", name: "Bạc Liêu" },
  { id: "BK", name: "Bắc Kạn" },
  { id: "BG", name: "Bắc Giang" },
  { id: "BN", name: "Bắc Ninh" },
  { id: "BT", name: "Bến Tre" },
  { id: "BD", name: "Bình Dương" },
  { id: "BH", name: "Bình Định" },
  { id: "BP", name: "Bình Phước" },
  { id: "BTH", name: "Bình Thuận" },
  { id: "CM", name: "Cà Mau" },
  { id: "CB", name: "Cao Bằng" },
  { id: "CT", name: "Cần Thơ" },
  { id: "DN", name: "Đà Nẵng" },
  { id: "DL", name: "Đắk Lắk" },
  { id: "DG", name: "Đắk Nông" },
  { id: "DB", name: "Điện Biên" },
  { id: "DNH", name: "Đồng Nai" },
  { id: "DT", name: "Đồng Tháp" },
  { id: "GL", name: "Gia Lai" },
  { id: "HG", name: "Hà Giang" },
  { id: "HN", name: "Hà Nội" },
  { id: "HT", name: "Hà Tĩnh" },
  { id: "HD", name: "Hải Dương" },
  { id: "HP", name: "Hải Phòng" },
  { id: "HM", name: "Hậu Giang" },
  { id: "HB", name: "Hòa Bình" },
  { id: "HY", name: "Hưng Yên" },
  { id: "KH", name: "Khánh Hòa" },
  { id: "KG", name: "Kiên Giang" },
  { id: "KT", name: "Kon Tum" },
  { id: "LC", name: "Lai Châu" },
  { id: "LD", name: "Lâm Đồng" },
  { id: "LS", name: "Lạng Sơn" },
  { id: "LCI", name: "Lào Cai" },
  { id: "LA", name: "Long An" },
  { id: "ND", name: "Nam Định" },
  { id: "NA", name: "Nghệ An" },
  { id: "NB", name: "Ninh Bình" },
  { id: "NT", name: "Ninh Thuận" },
  { id: "PT", name: "Phú Thọ" },
  { id: "PY", name: "Phú Yên" },
  { id: "QB", name: "Quảng Bình" },
  { id: "QNa", name: "Quảng Nam" },
  { id: "QNg", name: "Quảng Ngãi" },
  { id: "QN", name: "Quảng Ninh" },
  { id: "QT", name: "Quảng Trị" },
  { id: "ST", name: "Sóc Trăng" },
  { id: "SL", name: "Sơn La" },
  { id: "TN", name: "Tây Ninh" },
  { id: "TB", name: "Thái Bình" },
  { id: "TNg", name: "Thái Nguyên" },
  { id: "TH", name: "Thanh Hóa" },
  { id: "TTH", name: "Thừa Thiên Huế" },
  { id: "TG", name: "Tiền Giang" },
  { id: "TV", name: "Trà Vinh" },
  { id: "TQ", name: "Tuyên Quang" },
  { id: "HCM", name: "TP. Hồ Chí Minh" },
  { id: "VL", name: "Vĩnh Long" },
  { id: "VP", name: "Vĩnh Phúc" },
  { id: "YB", name: "Yên Bái" },
];

// Component input ngày tùy chỉnh cho DatePicker
const CustomDateInput = React.forwardRef(
  ({ value, onClick, placeholder, dayOfWeekInfo }, ref) => (
    <div
      className="w-full p-3 h-16 bg-white border border-gray-300 rounded-lg shadow-sm flex flex-col justify-center text-left cursor-pointer hover:border-orange-400 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500"
      onClick={onClick}
      ref={ref}
    >
      <span
        className={`text-sm md:text-base leading-tight ${
          value ? "text-gray-700" : "text-gray-400"
        }`}
      >
        {value || placeholder}
      </span>
      {value && dayOfWeekInfo && (
        <span className="text-gray-500 text-xs leading-tight">
          {dayOfWeekInfo}
        </span>
      )}
    </div>
  )
);

function HeroSection() {
  const [tripType, setTripType] = useState("one-way");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const initialDateObj = new Date(2025, 5, 1);
  const [departureDate, setDepartureDate] = useState(initialDateObj);
  const [returnDate, setReturnDate] = useState(null);
  const [numTickets, setNumTickets] = useState(1);

  const [isOriginDropdownOpen, setIsOriginDropdownOpen] = useState(false);
  const originDropdownRef = useRef(null);
  const [isDestinationDropdownOpen, setIsDestinationDropdownOpen] =
    useState(false);
  const destinationDropdownRef = useRef(null);
  const [isNumTicketsDropdownOpen, setIsNumTicketsDropdownOpen] =
    useState(false);
  const numTicketsDropdownRef = useRef(null);

  const ticketOptions = [1, 2, 3, 4, 5];

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        originDropdownRef.current &&
        !originDropdownRef.current.contains(event.target)
      )
        setIsOriginDropdownOpen(false);
      if (
        destinationDropdownRef.current &&
        !destinationDropdownRef.current.contains(event.target)
      )
        setIsDestinationDropdownOpen(false);
      if (
        numTicketsDropdownRef.current &&
        !numTicketsDropdownRef.current.contains(event.target)
      )
        setIsNumTicketsDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      tripType,
      origin,
      destination,
      departureDate: departureDate
        ? departureDate.toISOString().split("T")[0]
        : null,
      returnDate:
        tripType === "round-trip" && returnDate
          ? returnDate.toISOString().split("T")[0]
          : null,
      numTickets,
    });
  };

  const departureInfo = getDateDisplayInfo(departureDate);
  const returnInfo = getDateDisplayInfo(returnDate);

  const handleOriginSelect = (locationName) => {
    setOrigin(locationName);
    setIsOriginDropdownOpen(false);
  };
  const handleDestinationSelect = (locationName) => {
    setDestination(locationName);
    setIsDestinationDropdownOpen(false);
  };
  const handleNumTicketsSelect = (ticketCount) => {
    setNumTickets(ticketCount);
    setIsNumTicketsDropdownOpen(false);
  };

  const toggleOriginDropdown = () => {
    setIsOriginDropdownOpen((prev) => !prev);
    setIsDestinationDropdownOpen(false);
    setIsNumTicketsDropdownOpen(false);
  };
  const toggleDestinationDropdown = () => {
    setIsDestinationDropdownOpen((prev) => !prev);
    setIsOriginDropdownOpen(false);
    setIsNumTicketsDropdownOpen(false);
  };
  const toggleNumTicketsDropdown = () => {
    setIsNumTicketsDropdownOpen((prev) => !prev);
    setIsOriginDropdownOpen(false);
    setIsDestinationDropdownOpen(false);
  };

  return (
    <section className="bg-slate-100 py-10 md:py-12">
      <div className="container mx-auto  px-4">
        <img
          src={heroBannerImage}
          alt="FUTA Group 24 Năm Vững Tin & Phát Triển"
          className="mx-auto mb-6 md:mb-8 max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl -mt-12 md:-mt-16 lg:-mt-20 xl:-mt-24 rounded-2xl"
        />
        <div className="bg-white rounded-xl shadow-2xl p-5 sm:p-6 md:p-8 max-w-4xl mx-auto border border-orange-300 relative pb-6 md:pb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div className="flex justify-center gap-x-6 sm:gap-x-8 mb-4 sm:mb-0">
              <label
                className={`flex items-center cursor-pointer text-sm font-medium ${
                  tripType === "one-way"
                    ? "text-orange-600"
                    : "text-gray-500 hover:text-orange-500"
                }`}
              >
                <input
                  type="radio"
                  name="tripType"
                  value="one-way"
                  checked={tripType === "one-way"}
                  onChange={(e) => {
                    setTripType(e.target.value);
                    setReturnDate(null);
                  }}
                  className="mr-2 h-4 w-4 accent-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-1"
                />
                Một chiều
              </label>
              <label
                className={`flex items-center cursor-pointer text-sm font-medium ${
                  tripType === "round-trip"
                    ? "text-orange-600"
                    : "text-gray-500 hover:text-orange-500"
                }`}
              >
                <input
                  type="radio"
                  name="tripType"
                  value="round-trip"
                  checked={tripType === "round-trip"}
                  onChange={(e) => setTripType(e.target.value)}
                  className="mr-2 h-4 w-4 accent-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-1"
                />
                Khứ hồi
              </label>
            </div>
            <a
              href="#"
              className="text-sm text-orange-600 hover:underline font-medium"
            >
              Hướng dẫn mua vé
            </a>
          </div>

          <form onSubmit={handleSubmit} id="bookingForm">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 items-start mb-10 text-gray-700">
              {/* Điểm đi */}
              <div
                className={`relative ${
                  tripType === "round-trip" ? "md:col-span-2" : "md:col-span-3"
                }`}
                ref={originDropdownRef}
              >
                <label className="block text-left text-xs font-semibold text-gray-500 mb-1">
                  Điểm đi
                </label>
                <div
                  onClick={toggleOriginDropdown}
                  className="w-full p-3 h-16 flex items-center justify-between text-left bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
                >
                  <span
                    className={
                      origin ? "text-gray-700 text-sm" : "text-gray-400 text-sm"
                    }
                  >
                    {origin || "Chọn điểm đi"}
                  </span>
                  <FaChevronDown
                    className={`text-gray-400 transition-transform duration-200 ${
                      isOriginDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {isOriginDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-20 max-h-60 overflow-y-auto">
                    <div className="p-2 text-xs font-semibold text-gray-500 border-b">
                      TỈNH/THÀNH PHỐ
                    </div>
                    <ul>
                      {locationsData.map((loc) => (
                        <li
                          key={loc.id}
                          className="px-3 py-2.5 text-sm text-gray-700 hover:bg-orange-100 hover:text-orange-600 cursor-pointer"
                          onClick={() => handleOriginSelect(loc.name)}
                        >
                          {loc.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* nút xoay */}
              <div className="flex md:col-span-1 items-center justify-center self-center mt-3 md:mt-6">
                <button
                  type="button"
                  className="group p-2 text-orange-500 rounded-full bg-white-500  focus:outline-none focus:ring-2 focus:ring-orange-300 shadow"
                >
                  <FaExchangeAlt
                    size={18}
                    className="transition-transform duration-300 ease-in-out group-hover:rotate-180"
                  />
                </button>
              </div>

              <div
                className={`relative ${
                  tripType === "round-trip" ? "md:col-span-2" : "md:col-span-3"
                }`}
                ref={destinationDropdownRef}
              >
                <label className="block text-left text-xs font-semibold text-gray-500 mb-1">
                  Điểm đến
                </label>
                <div
                  onClick={toggleDestinationDropdown}
                  className="w-full p-3 h-16 flex items-center justify-between text-left bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
                >
                  <span
                    className={
                      destination
                        ? "text-gray-700 text-sm"
                        : "text-gray-400 text-sm"
                    }
                  >
                    {destination || "Chọn điểm đến"}
                  </span>
                  <FaChevronDown
                    className={`text-gray-400 transition-transform duration-200 ${
                      isDestinationDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {isDestinationDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-20 max-h-60 overflow-y-auto">
                    <div className="p-2 text-xs font-semibold text-gray-500 border-b">
                      TỈNH/THÀNH PHỐ
                    </div>
                    <ul>
                      {locationsData.map((loc) => (
                        <li
                          key={loc.id}
                          className="px-3 py-2.5 text-sm text-gray-700 hover:bg-orange-100 hover:text-orange-600 cursor-pointer"
                          onClick={() => handleDestinationSelect(loc.name)}
                        >
                          {loc.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div
                className={`${
                  tripType === "round-trip" ? "md:col-span-2" : "md:col-span-3"
                }`}
              >
                <label
                  htmlFor="departureDatePicker"
                  className="block text-left text-xs font-semibold text-gray-500 mb-1"
                >
                  Ngày đi
                </label>
                <DatePicker
                  selected={departureDate}
                  onChange={(date) => setDepartureDate(date)}
                  locale="vi"
                  dateFormat="dd/MM/yyyy"
                  customInput={
                    <CustomDateInput
                      placeholder="Chọn ngày đi"
                      dayOfWeekInfo={departureDate ? departureInfo.dayName : ""}
                    />
                  }
                  minDate={new Date()}
                  popperPlacement="bottom-start"
                  calendarClassName="font-sans text-sm shadow-lg"
                  wrapperClassName="w-full"
                />
              </div>

              {tripType === "round-trip" && (
                <div className="md:col-span-2">
                  <label
                    htmlFor="returnDatePicker"
                    className="block text-left text-xs font-semibold text-gray-500 mb-1"
                  >
                    Ngày về
                  </label>
                  <DatePicker
                    selected={returnDate}
                    onChange={(date) => setReturnDate(date)}
                    locale="vi"
                    dateFormat="dd/MM/yyyy"
                    customInput={
                      <CustomDateInput
                        placeholder="Chọn ngày về"
                        dayOfWeekInfo={returnDate ? returnInfo.dayName : ""}
                      />
                    }
                    minDate={departureDate || new Date()}
                    popperPlacement="bottom-start"
                    calendarClassName="font-sans text-sm shadow-lg"
                    wrapperClassName="w-full"
                  />
                </div>
              )}

              <div
                className={`relative ${
                  tripType === "round-trip" ? "md:col-span-3" : "md:col-span-2"
                }`}
                ref={numTicketsDropdownRef}
              >
                <label className="block text-left text-xs font-semibold text-gray-500 mb-1">
                  Số vé
                </label>
                <div
                  onClick={toggleNumTicketsDropdown}
                  className="w-full p-3 h-16 flex items-center justify-between text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
                >
                  <span className="flex-grow text-center text-sm">
                    {numTickets}
                  </span>
                  <FaChevronDown
                    className={`text-gray-400 transition-transform duration-200 ${
                      isNumTicketsDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {isNumTicketsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-20 max-h-48 overflow-y-auto">
                    <ul>
                      {ticketOptions.map((option) => (
                        <li
                          key={option}
                          className="px-3 py-2.5 text-sm text-gray-700 hover:bg-orange-100 hover:text-orange-600 cursor-pointer flex justify-between items-center"
                          onClick={() => handleNumTicketsSelect(option)}
                        >
                          {option}{" "}
                          {numTickets === option && (
                            <FaCheckCircle className="text-orange-500" />
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </form>

          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-6 sm:-bottom-7">
            <button
              type="submit"
              form="bookingForm"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 px-12 sm:px-16 rounded-full shadow-lg hover:shadow-xl transition duration-300 text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75"
            >
              Tìm chuyến xe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
