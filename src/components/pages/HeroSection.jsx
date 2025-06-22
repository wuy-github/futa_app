// src/components/pages/HeroSection.jsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import heroBannerImage from "../../assets/baner-header.png";
import ChinhSach from "../search/ChinhSach";
import TrungChuyen from "../search/TrungChuyen";
import LichTrinh from "../search/LichTrinh";
import result from "../../assets/result.jpg";
import {
  FaExchangeAlt,
  FaChevronDown,
  FaCheckCircle,
  FaRegClock,
  FaChair,
  FaTag,
  FaArrowRight,
} from "react-icons/fa";
import { IoBusOutline } from "react-icons/io5";

import DatePicker, { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("vi", vi);

// --- DỮ LIỆU ---
const createSeatLayout = () => {
  const layout = { lowerDeck: [], upperDeck: [] };
  const rows = ["A", "B"];

  rows.forEach((row) => {
    const deck = row === "A" ? "lowerDeck" : "upperDeck";
    for (let i = 1; i <= 17; i++) {
      layout[deck].push({
        id: `${row}${String(i).padStart(2, "0")}`,
        status: Math.random() > 0.6 ? "sold" : "available",
      });
    }
  });
  return layout;
};

const mockTripData = [
  {
    id: 1,
    origin: "TP. Hồ Chí Minh",
    destination: "An Giang",
    departureTime: "07:00",
    arrivalTime: "11:00",
    duration: "4 giờ",
    busType: "Limousine",
    pickupPoint: "Bến Xe Miền Tây",
    dropoffPoint: "Tân Châu - An Giang",
    price: "190.000",
    seatsLeft: 28,
    seatClass: "Hàng giữa",
    deck: "Tầng trên",
    itinerary: [
      {
        time: "07:00",
        name: "BX Miền Tây",
        address:
          "VP BX Miền Tây: 395 Kinh Dương Vương, P.An Lạc, Q.Bình Tân, TP.HCM",
      },
      {
        time: "05:30",
        name: "Bệnh Viện Ung Bướu",
        address: "68 Nơ Trang Long, Phường 14, Quận Bình Thạnh, TP.HCM",
      },
      {
        time: "06:00",
        name: "205 Phạm Ngũ Lão",
        address:
          "VP Phạm Ngũ Lão: 205 Phạm Ngũ Lão, P.Phạm Ngũ Lão, Q.1, TP.HCM",
      },
    ],
    seats: createSeatLayout(),
  },
  {
    id: 2,
    origin: "TP. Hồ Chí Minh",
    destination: "An Giang",
    departureTime: "05:45",
    arrivalTime: "10:45",
    duration: "5 giờ",
    busType: "Giường",
    pickupPoint: "Bx Miền Tây",
    dropoffPoint: "Long Xuyên",
    price: "170.000",
    seatsLeft: 25,
    seatClass: "Hàng giữa",
    deck: "Tầng dưới",
    itinerary: [],
    seats: createSeatLayout(),
  },
  {
    id: 13,
    origin: "Đà Nẵng",
    destination: "Cần Thơ",
    departureTime: "08:00",
    arrivalTime: "18:00",
    duration: "10 giờ",
    busType: "Giường",
    pickupPoint: "BX Trung Tâm ĐN",
    dropoffPoint: "BX Trung Tâm CT",
    price: "450.000",
    seatsLeft: 20,
    seatClass: "Hàng giữa",
    deck: "Tầng dưới",
    itinerary: [],
    seats: createSeatLayout(),
  },
];

const locationsData = [
  { id: "AG", name: "An Giang" },
  { id: "HCM", name: "TP. Hồ Chí Minh" },
  { id: "DN", name: "Đà Nẵng" },
  { id: "CT", name: "Cần Thơ" },
];
const timeOptions = [
  { id: "sang_som", label: "Sáng sớm 00:00 - 06:00", range: [0, 6] },
  { id: "buoi_sang", label: "Buổi sáng 06:00 - 12:00", range: [6, 12] },
  { id: "buoi_chieu", label: "Buổi chiều 12:00 - 18:00", range: [12, 18] },
  { id: "buoi_toi", label: "Buổi tối 18:00 - 24:00", range: [18, 24] },
];
const busTypeOptions = ["Ghế", "Giường", "Limousine"];
const seatClassOptions = ["Hàng đầu", "Hàng giữa", "Hàng cuối"];
const deckOptions = ["Tầng trên", "Tầng dưới"];

function NoResultsFound() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm text-center flex flex-col items-center justify-center h-full min-h-[400px]">
      <img
        src={result}
        alt="Không tìm thấy kết quả"
        className="w-40 h-40 mb-4"
      />
      <p className="font-semibold text-black-700">
        Không có kết quả được tìm thấy
      </p>
      <p className="text-sm text-black-500 mt-1">
        Vui lòng thử lại hoặc thay đổi bộ lọc của bạn.
      </p>
    </div>
  );
}

function SeatSelection({ seats, selectedSeats, onSeatSelect, price }) {
  const getSeatClass = (status, id) => {
    if (status === "sold")
      return "bg-black-200 text-black-400 cursor-not-allowed";
    if (selectedSeats.includes(id))
      return "bg-pink-200 border-pink-500 text-pink-600";
    return "bg-blue-100 border-blue-300 hover:bg-blue-200 cursor-pointer";
  };

  const renderDeck = (deckSeats) => {
    const seatCols = { col1: [], col2: [], col3: [] };
    deckSeats.forEach((seat) => {
      const seatNum = parseInt(seat.id.substring(1));
      if ([1, 3, 6, 9, 12, 15].includes(seatNum)) seatCols.col1.push(seat);
      else if ([2, 5, 8, 11, 14, 17].includes(seatNum))
        seatCols.col3.push(seat);
      else seatCols.col2.push(seat);
    });
    return (
      <div className="flex justify-center gap-4">
        <div className="flex flex-col gap-2">
          {seatCols.col1.map((seat) => (
            <button
              key={seat.id}
              onClick={() => seat.status !== "sold" && onSeatSelect(seat.id)}
              disabled={seat.status === "sold"}
              className={`w-14 h-8 text-xs font-semibold border rounded-md flex items-center justify-center ${getSeatClass(
                seat.status,
                seat.id
              )}`}
            >
              {seat.id}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {seatCols.col2.map((seat) => (
            <button
              key={seat.id}
              onClick={() => seat.status !== "sold" && onSeatSelect(seat.id)}
              disabled={seat.status === "sold"}
              className={`w-14 h-8 text-xs font-semibold border rounded-md flex items-center justify-center ${getSeatClass(
                seat.status,
                seat.id
              )}`}
            >
              {seat.id}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {seatCols.col3.map((seat) => (
            <button
              key={seat.id}
              onClick={() => seat.status !== "sold" && onSeatSelect(seat.id)}
              disabled={seat.status === "sold"}
              className={`w-14 h-8 text-xs font-semibold border rounded-md flex items-center justify-center ${getSeatClass(
                seat.status,
                seat.id
              )}`}
            >
              {seat.id}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const calculateTotalPrice = () => {
    const priceValue = parseFloat(price.replace(/\./g, ""));
    return (priceValue * selectedSeats.length).toLocaleString("vi-VN");
  };

  return (
    <div className="bg-slate-50 p-6 mt-4 rounded-lg border">
      <div className="flex justify-center items-center gap-6 mb-6 text-sm">
        <div className="flex items-center">
          <div className="w-5 h-4 rounded-sm bg-black-200 mr-2 border border-black-300"></div>
          <span>Đã bán</span>
        </div>
        <div className="flex items-center">
          <div className="w-5 h-4 rounded-sm bg-blue-100 mr-2 border border-blue-300"></div>
          <span>Còn trống</span>
        </div>
        <div className="flex items-center">
          <div className="w-5 h-4 rounded-sm bg-pink-200 mr-2 border border-pink-400"></div>
          <span>Đang chọn</span>
        </div>
      </div>
      <div className="flex justify-around">
        <div>
          <h4 className="font-semibold text-center mb-3 text-black-700">
            Tầng dưới
          </h4>
          {renderDeck(seats.lowerDeck)}
        </div>
        <div>
          <h4 className="font-semibold text-center mb-3 text-black-700">
            Tầng trên
          </h4>
          {renderDeck(seats.upperDeck)}
        </div>
      </div>
      {selectedSeats.length > 0 && (
        <div className="mt-6 pt-4 border-t flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold">{selectedSeats.length} Vé</p>
            <p className="text-red-500 font-bold text-lg">
              {selectedSeats.join(", ")}
            </p>
          </div>
          <div className="text-left">
            <p className="text-sm text-black font-bold">Tổng tiền</p>
            <p className="font-bold text-xl text-red-500">
              {calculateTotalPrice()}đ
            </p>
          </div>
          <button className="bg-orange-500 text-white font-semibold text-sm px-10 py-2.5 rounded-md hover:bg-orange-600 transition-colors">
            Chọn
          </button>
        </div>
      )}
    </div>
  );
}

function TripCard({ trip }) {
  const [activeTab, setActiveTab] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const handleTabClick = (tabName) => {
    setActiveTab((prev) => (prev === tabName ? null : tabName));
  };
  const handleSeatSelect = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };
  const linkBaseStyle =
    "hover:text-orange-500 transition-colors pb-1 cursor-pointer";
  const activeLinkStyle =
    "text-orange-500 border-b-2 border-orange-500 font-semibold";
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 mb-4 border border-black-100 hover:shadow-md transition-shadow duration-200">
      <div className="grid grid-cols-12 gap-x-2 items-center">
        <div className="col-span-2">
          <p className="font-bold text-xl text-black-800">
            {trip.departureTime}
          </p>
        </div>
        <div className="col-span-3 text-center">
          <div className="relative w-full h-px bg-black-200">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black-400 border-2 border-white"></div>
            <FaArrowRight className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-black-400 text-xs bg-white px-1" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-500 border-2 border-white"></div>
          </div>
          <p className="text-xs text-black-500 mt-1.5">{trip.duration}</p>
        </div>
        <div className="col-span-2">
          <p className="font-bold text-xl text-black-800 text-left">
            {trip.arrivalTime}
          </p>
        </div>
        <div className="col-span-3 text-black-600 text-sm">
          <p>• {trip.busType}</p>
        </div>
        <div className="col-span-2 text-right">
          <p className="font-bold text-xl text-red-500">{trip.price}đ</p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-2 items-center -mt-2">
        <div className="col-span-2">
          <p className="text-sm text-black-600 font-medium">
            {trip.pickupPoint}
          </p>
        </div>
        <div className="col-span-3"></div>
        <div className="col-span-2">
          <p className="text-sm text-black-600 font-medium text-left">
            {trip.dropoffPoint}
          </p>
        </div>
        <div className="col-span-3 text-black-600 text-sm">
          <p>• {trip.seatsLeft} chỗ trống</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-dashed">
        <div className="flex gap-x-5 text-sm font-medium text-black-700">
          <a
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("chon_ghe");
            }}
            className={`${linkBaseStyle} ${
              activeTab === "chon_ghe" ? activeLinkStyle : ""
            }`}
          >
            Chọn ghế
          </a>
          <a
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("lich_trinh");
            }}
            className={`${linkBaseStyle} ${
              activeTab === "lich_trinh" ? activeLinkStyle : ""
            }`}
          >
            Lịch trình
          </a>
          <a
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("trung_chuyen");
            }}
            className={`${linkBaseStyle} ${
              activeTab === "trung_chuyen" ? activeLinkStyle : ""
            }`}
          >
            Trung chuyển
          </a>
          <a
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("chinh_sach");
            }}
            className={`${linkBaseStyle} ${
              activeTab === "chinh_sach" ? activeLinkStyle : ""
            }`}
          >
            Chính sách
          </a>
        </div>
        <button className="bg-orange-100 text-orange-600 border border-orange-500 font-semibold text-sm px-8 py-2 rounded-4xl hover:bg-orange-500 hover:text-white transition-all">
          Chọn chuyến
        </button>
      </div>
      {activeTab === "chon_ghe" && (
        <SeatSelection
          seats={trip.seats}
          selectedSeats={selectedSeats}
          onSeatSelect={handleSeatSelect}
          price={trip.price}
        />
      )}
      {activeTab === "lich_trinh" && <LichTrinh itinerary={trip.itinerary} />}
      {activeTab === "trung_chuyen" && <TrungChuyen />}
      {activeTab === "chinh_sach" && <ChinhSach />}
    </div>
  );
}

function FiltersSidebar({ activeFilters, onFilterChange }) {
  const filterButtonStyle =
    "w-full text-center px-2 py-2 border rounded-2xl text-sm  hover:border-orange-500 hover:bg-orange-500 hover:text-white transition-colors cursor-pointer";
  const activeFilterButtonStyle =
    "bg-orange-100 text-orange-600 border-orange-500";
  const handleFilterClick = (filterType, value) => {
    const currentValues = activeFilters[filterType];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    onFilterChange(filterType, newValues);
  };
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-black-200 h-fit">
      <div className="flex justify-between items-center mb-4 pb-3 border-b">
        <h3 className="font-bold text-black-800 uppercase">Bộ lọc tìm kiếm</h3>
        <button className="text-sm text-red-500 hover:underline">Bỏ lọc</button>
      </div>
      <div className="mb-6">
        <h4 className="font-semibold text-sm mb-3 text-black-700">Giờ đi</h4>
        <ul className="space-y-3">
          {timeOptions.map((option) => (
            <li key={option.id} className="flex items-center">
              <input
                type="checkbox"
                id={option.id}
                checked={activeFilters.times.includes(option.id)}
                onChange={() => handleFilterClick("times", option.id)}
                className="h-4 w-4 rounded-xl border-black-300 accent-orange-500 cursor-pointer"
              />
              <label
                htmlFor={option.id}
                className="ml-2.5 text-sm text-black-600 cursor-pointer"
              >
                {option.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h4 className="font-semibold text-sm mb-3 text-black-700">Loại xe</h4>
        <div className="grid grid-cols-3 gap-2">
          {busTypeOptions.map((type) => (
            <button
              key={type}
              onClick={() => handleFilterClick("busTypes", type)}
              className={`${filterButtonStyle} ${
                activeFilters.busTypes.includes(type)
                  ? activeFilterButtonStyle
                  : ""
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h4 className="font-semibold text-sm mb-3 text-black-700">Hạng ghế</h4>
        <div className="grid grid-cols-3 gap-2">
          {seatClassOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => handleFilterClick("seatClasses", opt)}
              className={`${filterButtonStyle} ${
                activeFilters.seatClasses.includes(opt)
                  ? activeFilterButtonStyle
                  : ""
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-3 text-black-700">Tầng</h4>
        <div className="grid grid-cols-2 gap-2">
          {deckOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => handleFilterClick("decks", opt)}
              className={`${filterButtonStyle} ${
                activeFilters.decks.includes(opt) ? activeFilterButtonStyle : ""
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchResultsSection({
  results,
  origin,
  destination,
  activeFilters,
  onFilterChange,
}) {
  const sortButtonStyle =
    "flex items-center gap-2 px-4 py-2 border rounded-full text-sm text-black-700 hover:border-orange-500 hover:text-orange-500 transition-colors cursor-pointer";
  return (
    <section className="container mx-auto max-w-7xl px-4 py-8 bg-black-50">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-black-800">
          {origin} - {destination}{" "}
          <span className="text-black-500 font-medium">
            ({results.length} chuyến)
          </span>
        </h2>
        <div className="flex items-center gap-3 mt-3">
          <button className={sortButtonStyle}>
            <FaTag className="text-orange-500" /> Giá vé bất ngờ
          </button>
          <button className={sortButtonStyle}>
            <FaRegClock /> Giờ khởi hành
          </button>
          <button className={sortButtonStyle}>
            <FaChair /> Ghế trống
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <FiltersSidebar
            activeFilters={activeFilters}
            onFilterChange={onFilterChange}
          />
        </div>
        <div className="lg:col-span-3">
          {results.length > 0 ? (
            results.map((trip) => <TripCard key={trip.id} trip={trip} />)
          ) : (
            <NoResultsFound />
          )}
        </div>
      </div>
    </section>
  );
}

const CustomDateInput = React.forwardRef(
  ({ value, onClick, placeholder, dayOfWeekInfo }, ref) => (
    <div
      className="w-full p-3 h-16 bg-white border border-black-300 rounded-lg shadow-sm flex flex-col justify-center text-left cursor-pointer hover:border-orange-400 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500"
      onClick={onClick}
      ref={ref}
    >
      <span
        className={`text-sm md:text-base leading-tight ${
          value ? "text-black-700" : "text-black-400"
        }`}
      >
        {value || placeholder}
      </span>
      {value && dayOfWeekInfo && (
        <span className="text-black-500 text-xs leading-tight">
          {dayOfWeekInfo}
        </span>
      )}
    </div>
  )
);
const getDateDisplayInfo = (dateSource) => {
  if (!dateSource) return { dateDisplay: "", dayName: "" };
  let dateObj = dateSource instanceof Date ? dateSource : new Date(dateSource);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  const daysOfWeek = [
    "Chủ nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];
  const dayName = daysOfWeek[dateObj.getDay()];
  return { dateDisplay: `${day}/${month}/${year}`, dayName };
};

// --- COMPONENT CHÍNH ---
function HeroSection() {
  const [tripType, setTripType] = useState("one-way");
  const [origin, setOrigin] = useState("TP. Hồ Chí Minh");
  const [destination, setDestination] = useState("An Giang");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);
  const [numTickets, setNumTickets] = useState(1);
  const [searchResults, setSearchResults] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    times: [],
    busTypes: [],
    seatClasses: [],
    decks: [],
  });
  const [isOriginDropdownOpen, setIsOriginDropdownOpen] = useState(false);
  const originDropdownRef = useRef(null);
  const [isDestinationDropdownOpen, setIsDestinationDropdownOpen] =
    useState(false);
  const destinationDropdownRef = useRef(null);
  const [isNumTicketsDropdownOpen, setIsNumTicketsDropdownOpen] =
    useState(false);
  const numTicketsDropdownRef = useRef(null);
  const ticketOptions = [1, 2, 3, 4, 5];

  const handleFilterChange = (filterType, values) => {
    setActiveFilters((prev) => ({ ...prev, [filterType]: values }));
  };

  const filteredResults = useMemo(() => {
    if (!searchResults) return [];
    return searchResults.filter((trip) => {
      const departureHour = parseInt(trip.departureTime.split(":")[0], 10);
      const timeMatch =
        activeFilters.times.length === 0 ||
        activeFilters.times.some((timeKey) => {
          const timeOption = timeOptions.find((opt) => opt.id === timeKey);
          return (
            departureHour >= timeOption.range[0] &&
            departureHour < timeOption.range[1]
          );
        });
      const busTypeMatch =
        activeFilters.busTypes.length === 0 ||
        activeFilters.busTypes.includes(trip.busType);
      const seatClassMatch =
        activeFilters.seatClasses.length === 0 ||
        activeFilters.seatClasses.includes(trip.seatClass);
      const deckMatch =
        activeFilters.decks.length === 0 ||
        activeFilters.decks.includes(trip.deck);
      return timeMatch && busTypeMatch && seatClassMatch && deckMatch;
    });
  }, [searchResults, activeFilters]);

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
    if (!origin || !destination) {
      alert("Vui lòng chọn điểm đi và điểm đến.");
      return;
    }
    const resultsForRoute = mockTripData.filter(
      (trip) => trip.origin === origin && trip.destination === destination
    );
    setSearchResults(resultsForRoute);
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
  const toggleOriginDropdown = () => setIsOriginDropdownOpen((prev) => !prev);
  const toggleDestinationDropdown = () =>
    setIsDestinationDropdownOpen((prev) => !prev);
  const toggleNumTicketsDropdown = () =>
    setIsNumTicketsDropdownOpen((prev) => !prev);
  const swapLocations = () => {
    const tempOrigin = origin;
    setOrigin(destination);
    setDestination(tempOrigin);
  };

  return (
    <>
      <section className="bg-slate-100 py-10 md:py-12">
        <div className="container mx-auto px-4">
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
                      : "text-black-500 hover:text-orange-500"
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
                      : "text-black-500 hover:text-orange-500"
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
                href="/#"
                onClick={(e) => e.preventDefault()}
                className="text-sm text-orange-600 hover:underline font-medium"
              >
                Hướng dẫn mua vé
              </a>
            </div>
            <form onSubmit={handleSubmit} id="bookingForm">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 items-start mb-10 text-black-700">
                <div
                  className={`relative ${
                    tripType === "round-trip"
                      ? "md:col-span-2"
                      : "md:col-span-3"
                  }`}
                  ref={originDropdownRef}
                >
                  <label className="block text-left text-xs font-semibold text-black-500 mb-1">
                    Điểm đi
                  </label>
                  <div
                    onClick={toggleOriginDropdown}
                    className="w-full p-3 h-16 flex items-center justify-between text-left bg-white border border-black-300 rounded-lg shadow-sm cursor-pointer hover:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    <span
                      className={
                        origin
                          ? "text-black-700 text-sm"
                          : "text-black-400 text-sm"
                      }
                    >
                      {origin || "Chọn điểm đi"}
                    </span>
                    <FaChevronDown
                      className={`text-black-400 transition-transform duration-200 ${
                        isOriginDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {isOriginDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-black-300 rounded-md shadow-lg z-20 max-h-60 overflow-y-auto">
                      <div className="p-2 text-xs font-semibold text-black-500 border-b">
                        TỈNH/THÀNH PHỐ
                      </div>
                      <ul>
                        {locationsData.map((loc) => (
                          <li
                            key={loc.id}
                            className="px-3 py-2.5 text-sm text-black-700 hover:bg-orange-100 hover:text-orange-600 cursor-pointer"
                            onClick={() => handleOriginSelect(loc.name)}
                          >
                            {loc.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="flex md:col-span-1 items-center justify-center self-center mt-3 md:mt-6">
                  <button
                    type="button"
                    onClick={swapLocations}
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
                    tripType === "round-trip"
                      ? "md:col-span-2"
                      : "md:col-span-3"
                  }`}
                  ref={destinationDropdownRef}
                >
                  <label className="block text-left text-xs font-semibold text-black-500 mb-1">
                    Điểm đến
                  </label>
                  <div
                    onClick={toggleDestinationDropdown}
                    className="w-full p-3 h-16 flex items-center justify-between text-left bg-white border border-black-300 rounded-lg shadow-sm cursor-pointer hover:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    <span
                      className={
                        destination
                          ? "text-black-700 text-sm"
                          : "text-black-400 text-sm"
                      }
                    >
                      {destination || "Chọn điểm đến"}
                    </span>
                    <FaChevronDown
                      className={`text-black-400 transition-transform duration-200 ${
                        isDestinationDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {isDestinationDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-black-300 rounded-md shadow-lg z-20 max-h-60 overflow-y-auto">
                      <div className="p-2 text-xs font-semibold text-black-500 border-b">
                        TỈNH/THÀNH PHỐ
                      </div>
                      <ul>
                        {locationsData.map((loc) => (
                          <li
                            key={loc.id}
                            className="px-3 py-2.5 text-sm text-black-700 hover:bg-orange-100 hover:text-orange-600 cursor-pointer"
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
                    tripType === "round-trip"
                      ? "md:col-span-2"
                      : "md:col-span-3"
                  }`}
                >
                  <label
                    htmlFor="departureDatePicker"
                    className="block text-left text-xs font-semibold text-black-500 mb-1"
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
                        dayOfWeekInfo={
                          departureDate ? departureInfo.dayName : ""
                        }
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
                      className="block text-left text-xs font-semibold text-black-500 mb-1"
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
                    tripType === "round-trip"
                      ? "md:col-span-3"
                      : "md:col-span-2"
                  }`}
                  ref={numTicketsDropdownRef}
                >
                  <label className="block text-left text-xs font-semibold text-black-500 mb-1">
                    Số vé
                  </label>
                  <div
                    onClick={toggleNumTicketsDropdown}
                    className="w-full p-3 h-16 flex items-center justify-between text-black-700 bg-white border border-black-300 rounded-lg shadow-sm cursor-pointer hover:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    <span className="flex-grow text-center text-sm">
                      {numTickets}
                    </span>
                    <FaChevronDown
                      className={`text-black-400 transition-transform duration-200 ${
                        isNumTicketsDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {isNumTicketsDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-black-300 rounded-md shadow-lg z-20 max-h-48 overflow-y-auto">
                      <ul>
                        {ticketOptions.map((option) => (
                          <li
                            key={option}
                            className="px-3 py-2.5 text-sm text-black-700 hover:bg-orange-100 hover:text-orange-600 cursor-pointer flex justify-between items-center"
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

      {searchResults !== null && (
        <SearchResultsSection
          results={filteredResults}
          origin={origin}
          destination={destination}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          timeOptions={timeOptions}
          busTypeOptions={busTypeOptions}
          seatClassOptions={seatClassOptions}
          deckOptions={deckOptions}
        />
      )}
    </>
  );
}

export default HeroSection;
