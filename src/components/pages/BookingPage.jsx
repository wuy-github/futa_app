// src/components/pages/BookingPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaInfoCircle, FaRegClock } from "react-icons/fa";

function SeatSelection({ seats, selectedSeats, onSeatSelect }) {
  const getSeatClass = (status, id) => {
    if (status === "sold")
      return "bg-gray-200 text-gray-400 cursor-not-allowed";
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

  return (
    <>
      <div className="flex justify-around">
        <div>
          <h4 className="font-semibold text-center mb-3 text-gray-700">
            Tầng dưới
          </h4>
          {renderDeck(seats.lowerDeck)}
        </div>
        <div>
          <h4 className="font-semibold text-center mb-3 text-gray-700">
            Tầng trên
          </h4>
          {renderDeck(seats.upperDeck)}
        </div>
      </div>
      <div className="flex justify-center items-center gap-6 mt-6 pt-4 border-t text-sm">
        <div className="flex items-center">
          <div className="w-5 h-4 rounded-sm bg-gray-200 mr-2 border border-gray-300"></div>
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
    </>
  );
}

const mockPickupPoints = [
  {
    id: "pk1",
    time: "07:00",
    name: "VP BX Miền Tây",
    address: "395 Kinh Dương Vương, P.An Lạc, Q.Bình Tân, TP.HCM",
  },
  {
    id: "pk2",
    time: "07:15",
    name: "VP Hàng Xanh",
    address: "486H Điện Biên Phủ, P. 21, Q. Bình Thạnh",
  },
];
const mockDropoffPoints = [
  {
    id: "dp1",
    name: "Tân Châu - An Giang",
    address: "QL91, TT. Tân Châu, An Giang",
  },
  {
    id: "dp2",
    name: "Bến xe Long Xuyên",
    address: "QL91, P. Mỹ Quý, TP. Long Xuyên, An Giang",
  },
];

function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    tripDetails,
    selectedSeats: initialSelectedSeats,
    departureDate,
  } = location.state || {};

  // State của trang này
  const [currentSelectedSeats, setCurrentSelectedSeats] = useState(
    initialSelectedSeats || []
  );
  const [selectedPickupPoint, setSelectedPickupPoint] = useState(null);
  const [selectedDropoffPoint, setSelectedDropoffPoint] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    if (!tripDetails || !initialSelectedSeats) {
      navigate("/");
    }
  }, [tripDetails, initialSelectedSeats, navigate]);

  const handleSeatSelectOnBookingPage = (seatId) => {
    setCurrentSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const handlePayment = () => {
    if (currentSelectedSeats.length === 0) {
      alert("Vui lòng chọn ít nhất một ghế.");
      return;
    }
    if (!customerName || !phoneNumber || !email) {
      alert("Vui lòng nhập đầy đủ thông tin khách hàng.");
      return;
    }
    if (!selectedPickupPoint || !selectedDropoffPoint) {
      alert("Vui lòng chọn đầy đủ điểm đón và trả.");
      return;
    }
    if (!agreedToTerms) {
      alert("Vui lòng đồng ý với điều khoản đặt vé.");
      return;
    }
    alert("Thanh toán thành công (giả lập)!");
    navigate("/");
  };

  if (!tripDetails) return null;

  const pricePerTicket = parseFloat(tripDetails.price.replace(/\./g, ""));
  const totalAmount = (
    pricePerTicket * currentSelectedSeats.length
  ).toLocaleString("vi-VN");
  const formattedDate = new Date(departureDate).toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-6">
          <button className="text-sm font-semibold text-gray-900 hover:text-orange-600">
            &larr; Quay lại
          </button>
          <div className="text-center -mt-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {tripDetails.origin} - {tripDetails.destination}
            </h1>
            <p className="text-base font-normal text-gray-500 mt-1">
              {formattedDate}
            </p>
          </div>
        </div>

        {/* Grid chính */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cột trái */}
          <div className="lg:col-span-2 space-y-6">
            {/* PHẦN CHỌN GHẾ */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="font-bold text-lg mb-4 text-gray-800">Chọn ghế</h2>
              <SeatSelection
                seats={tripDetails.seats}
                selectedSeats={currentSelectedSeats}
                onSeatSelect={handleSeatSelectOnBookingPage}
              />
            </div>

            {/* PHẦN THÔNG TIN KHÁCH HÀNG */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="font-bold text-lg mb-4">Thông tin khách hàng</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-md text-sm text-gray-600">
                  <h4 className="font-bold mb-2 flex items-center">
                    <FaInfoCircle className="mr-2 text-orange-500" /> ĐIỀU KHOẢN
                    & LƯU Ý
                  </h4>
                  <p className="mb-2 font-medium">
                    (*) Quý khách vui lòng có mặt tại bến xuất phát của xe trước
                    ít nhất 30 phút giờ xe khởi hành, mang theo thông báo đã
                    thanh toán vé thành công có chứa mã vé được gửi từ hệ thống
                    FUTA BUS LINES. Vui lòng liên hệ Trung tâm tổng đài{" "}
                    <span className="text-orange-600"> 1900 6067</span> để được
                    hỗ trợ.
                  </p>
                  <p className="mb-2 font-medium">
                    {" "}
                    (*) Nếu quý khách có nhu cầu trung chuyển, vui lòng liên hệ
                    Tổng đài trung chuyển{" "}
                    <span className="text-orange-600">1900 6918</span> trước khi
                    đặt vé. Chúng tôi không đón/trung chuyển tại những điểm xe
                    trung chuyển không thể tới được.
                  </p>
                </div>
              </div>
            </div>

            {/* PHẦN THÔNG TIN ĐÓN TRẢ */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="font-bold text-lg mb-4">Thông tin đón trả</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-md mb-3">Điểm đón</h3>
                  <div className="space-y-3">
                    {mockPickupPoints.map((point) => (
                      <label
                        key={point.id}
                        className={`flex items-center p-3 border rounded-md cursor-pointer transition-all ${
                          selectedPickupPoint?.id === point.id
                            ? "border-orange-500 bg-orange-50 shadow-md"
                            : "hover:border-orange-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="pickup"
                          checked={selectedPickupPoint?.id === point.id}
                          onChange={() => setSelectedPickupPoint(point)}
                          className="h-4 w-4 accent-orange-500 hidden"
                        />
                        <div className="ml-4 text-sm flex-grow">
                          <p className="font-bold flex items-center">
                            <FaRegClock className="mr-2 text-gray-400" />{" "}
                            {point.time}
                          </p>
                          <p className="font-semibold mt-1">{point.name}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-md mb-3">Điểm trả</h3>
                  <div className="space-y-3">
                    {mockDropoffPoints.map((point) => (
                      <label
                        key={point.id}
                        className={`flex items-center p-3 border rounded-md cursor-pointer transition-all ${
                          selectedDropoffPoint?.id === point.id
                            ? "border-orange-500 bg-orange-50"
                            : "hover:border-orange-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="dropoff"
                          checked={selectedDropoffPoint?.id === point.id}
                          onChange={() => setSelectedDropoffPoint(point)}
                          className="h-4 w-4 accent-orange-500"
                        />
                        <div className="ml-4 text-sm flex-grow">
                          <p className="font-semibold">{point.name}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start bg-white p-6 rounded-lg shadow-sm">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="h-4 w-4 mt-1 accent-orange-500"
              />
              <label
                htmlFor="terms"
                className="ml-2 text-sm font-semibold text-amber-600"
              >
                Chấp nhận điều khoản đặt vé
              </label>
            </div>
          </div>

          {/* Cột phải - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-8">
              <h2 className="font-bold text-lg mb-4 border-b pb-3">
                Thông tin lượt đi
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Tuyến xe</span>
                  <span className="font-bold text-right ">
                    {tripDetails.origin} - {tripDetails.destination}
                  </span>
                </div>
                <div className="flex justify-between ">
                  <span>Thời gian xuất bến</span>
                  <span className="font-semibold text-green-600">
                    {tripDetails.departureTime}{" "}
                    {new Date(departureDate).toLocaleDateString("vi-VN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Số lượng ghế</span>
                  <span className="font-semibold ">
                    {currentSelectedSeats.length} ghế
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Số ghế</span>
                  <span className="font-semibold text-green-600">
                    {currentSelectedSeats.join(", ")}
                  </span>
                </div>
                <div className="pt-2 border-t mt-2 space-y-3">
                  <div className="flex justify-between">
                    <span>Điểm đón</span>
                    <span className="font-semibold text-right">
                      {selectedPickupPoint
                        ? selectedPickupPoint.name
                        : "Chưa chọn"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Điểm trả</span>
                    <span className="font-semibold text-right">
                      {selectedDropoffPoint
                        ? selectedDropoffPoint.name
                        : "Chưa chọn"}
                    </span>
                  </div>
                </div>
              </div>

              <h2 className="font-bold text-lg mt-6 mb-4 border-b pb-3">
                Chi tiết giá
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Giá vé lượt đi</span>
                  <span>{totalAmount}đ</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí thanh toán</span>
                  <span>0đ</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-3">
                  <span>Tổng tiền</span>
                  <span className="text-red-500">{totalAmount}đ</span>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-4">
                <button
                  onClick={handlePayment}
                  className="w-full text-center py-3 bg-gray-600 text-white rounded-3xl font-semibold hover:bg-orange-600  transition-all"
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
