import React, { useState, useEffect } from "react";
import { FaExchangeAlt, FaSearch } from "react-icons/fa";

const routesData = [
  {
    from: "An Hữu (Tiền Giang)",
    to: "TP. Hồ Chí Minh",
    type: "Limousine",
    distance: "123km",
    duration: "2 giờ",
    price: "150.000đ",
  },
  {
    from: "An Khê (Gia Lai)",
    to: "TP. Hồ Chí Minh",
    type: "Limousine",
    distance: "640km",
    duration: "13 giờ",
    price: "350.000đ",
  },
  {
    from: "An Khê (Gia Lai)",
    to: "TP. Hồ Chí Minh",
    type: "Limousine",
    distance: "690km",
    duration: "14 giờ",
    price: "380.000đ",
  },
  {
    from: "An Minh (Kiên Giang)",
    to: "TP. Hồ Chí Minh",
    type: "Limousine",
    distance: "295km",
    duration: "7 giờ",
    price: "220.000đ",
  },
  {
    from: "TP. Hồ Chí Minh",
    to: "An Nhơn (Bình Định)",
    type: "Giường nằm",
    distance: "639km",
    duration: "11 giờ 30 phút",
    price: "320.000đ",
  },
  {
    from: "TP. Hồ Chí Minh",
    to: "An Nhơn (Bình Định)",
    type: "Giường nằm",
    distance: "660km",
    duration: "13 giờ 46 phút",
    price: "340.000đ",
  },
  {
    from: "TP. Hồ Chí Minh",
    to: "Cà Mau",
    type: "Giường nằm",
    distance: "282km",
    duration: "7 giờ",
    price: "240.000đ",
  },
  {
    from: "Bảo Lộc (Lâm Đồng)",
    to: "TP. Hồ Chí Minh",
    type: "Limousine",
    distance: "180km",
    duration: "4 giờ",
    price: "180.000đ",
  },
  {
    from: "Bến Tre",
    to: "TP. Hồ Chí Minh",
    type: "Ghế ngồi",
    distance: "85km",
    duration: "1 giờ 45 phút",
    price: "85.000đ",
  },
  {
    from: "Cà Mau",
    to: "TP. Hồ Chí Minh",
    type: "Limousine",
    distance: "300km",
    duration: "6 giờ 30 phút",
    price: "250.000đ",
  },
  {
    from: "Cần Thơ",
    to: "TP. Hồ Chí Minh",
    type: "Giường nằm",
    distance: "170km",
    duration: "3 giờ 15 phút",
    price: "160.000đ",
  },
  {
    from: "Đà Lạt (Lâm Đồng)",
    to: "TP. Hồ Chí Minh",
    type: "Limousine",
    distance: "300km",
    duration: "6 giờ",
    price: "280.000đ",
  },
  {
    from: "Đắk Lắk (Buôn Ma Thuột)",
    to: "TP. Hồ Chí Minh",
    type: "Giường nằm",
    distance: "350km",
    duration: "7 giờ 30 phút",
    price: "300.000đ",
  },
  {
    from: "Đà Nẵng",
    to: "TP. Hồ Chí Minh",
    type: "Giường nằm",
    distance: "900km",
    duration: "17 giờ",
    price: "550.000đ",
  },
  {
    from: "Hà Nội",
    to: "TP. Hồ Chí Minh",
    type: "Giường nằm cao cấp",
    distance: "1700km",
    duration: "34 giờ",
    price: "1.200.000đ",
  },
  {
    from: "Phú Quốc (Kiên Giang)",
    to: "TP. Hồ Chí Minh",
    type: "Limousine (kết hợp phà)",
    distance: "450km",
    duration: "10 giờ",
    price: "600.000đ",
  },
];

const TimelinePage = () => {
  // State cho input "điểm đi" và "điểm đến"
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  // State cho danh sách tuyến xe đã lọc
  const [filteredRoutes, setFilteredRoutes] = useState(routesData);

  // Hàm lọc tuyến xe
  const filterRoutes = () => {
    const fromLower = fromLocation.toLowerCase().trim();
    const toLower = toLocation.toLowerCase().trim();

    const newFilteredRoutes = routesData.filter((route) => {
      const routeFromLower = route.from.toLowerCase();
      const routeToLower = route.to.toLowerCase();

      const matchesFrom =
        fromLower === "" || routeFromLower.includes(fromLower);
      const matchesTo = toLower === "" || routeToLower.includes(toLower);

      return matchesFrom && matchesTo;
    });

    setFilteredRoutes(newFilteredRoutes);
  };

  // Sử dụng useEffect để gọi filterRoutes mỗi khi fromLocation hoặc toLocation thay đổi
  useEffect(() => {
    filterRoutes();
  }, [fromLocation, toLocation]);

  // Hàm xử lý đổi chiều điểm đi/đến
  const handleSwapLocations = () => {
    setFromLocation(toLocation);
    setToLocation(fromLocation);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-8xl mx-auto bg-white rounded-lg shadow-md p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <div className="flex-1 w-full relative">
            {" "}
            <input
              type="text"
              placeholder="Nhập điểm đi"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-orange-500" // pl-10 cho khoảng trống icon
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />{" "}
          </div>
          <div
            className="text-orange-600 text-2xl cursor-pointer transform transition-transform duration-500 hover:rotate-180"
            onClick={handleSwapLocations}
          >
            <FaExchangeAlt />
          </div>
          <div className="flex-1 w-full relative">
            {" "}
            <input
              type="text"
              placeholder="Nhập điểm đến"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-orange-500" // pl-10 cho khoảng trống icon
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />{" "}
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-max">
            <div className="grid grid-cols-[2fr_1fr_1fr_1.5fr_1fr_minmax(120px,1fr)] gap-2 p-4 bg-gray-50 font-semibold text-gray-700 rounded-t-md border-b border-gray-200">
              <div className="col-span-1">Tuyến xe</div>
              <div>Loại xe</div>
              <div>Quãng đường</div>
              <div>Thời gian hành trình</div>
              <div>Giá vé</div>
              <div></div>
            </div>

            {/* Hiển thị danh sách tuyến xe đã lọc */}
            {filteredRoutes.length > 0 ? (
              filteredRoutes.map((route, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[2fr_1fr_1fr_1.5fr_1fr_minmax(120px,1fr)] gap-2 p-4 border-b border-gray-200 hover:bg-gray-50 items-center"
                >
                  <div className="flex items-center gap-1 ">
                    <span className="text-orange-600 font-semibold">
                      {route.from}
                    </span>
                    <FaExchangeAlt className="text-black text-sm" />
                    <span className="font-semibold">{route.to}</span>
                  </div>

                  <div>{route.type}</div>
                  <div>{route.distance}</div>
                  <div>{route.duration}</div>
                  <div>{route.price}</div>

                  <div className="flex justify-end items-center">
                    <button className="bg-orange-200 text-orange-600 hover:bg-orange-600 hover:text-white font-medium py-2 px-4 rounded-4xl text-sm transition-colors duration-200 whitespace-nowrap">
                      Tìm tuyến xe
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-600">
                Không tìm thấy chuyến xe nào phù hợp.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;
