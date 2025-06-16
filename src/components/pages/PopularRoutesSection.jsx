// src/components/pages/PopularRoutesSection.jsx
import React from "react";

import imgHCM from "../../assets/tuyenxehcm.png";
import imgDaLat from "../../assets/tuyenxedalat.png";
import imgDaNang from "../../assets/tuyenxedanang.png";
const popularRoutesData = [
  {
    id: "hcm",
    originName: "Tp. Hồ Chí Minh",
    originImage: imgHCM,
    destinations: [
      {
        id: "hcm-dl",
        name: "Đà Lạt",
        price: "290.000đ",
        details: "305km - 8 giờ - 01/06/2025",
      },
      {
        id: "hcm-ct",
        name: "Cần Thơ",
        price: "185.000đ",
        details: "166km - 5 giờ - 01/06/2025",
      },
      {
        id: "hcm-lx",
        name: "Long Xuyên",
        price: "200.000đ",
        details: "203km - 5 giờ - 01/06/2025",
      },
    ],
  },
  {
    id: "dalat",
    originName: "Đà Lạt",
    originImage: imgDaLat,
    destinations: [
      {
        id: "dl-hcm",
        name: "TP. Hồ Chí Minh",
        price: "290.000đ",
        details: "310km - 8 giờ - 01/06/2025",
      },
      {
        id: "dl-dn",
        name: "Đà Nẵng",
        price: "430.000đ",
        details: "757km - 17 giờ - 01/06/2025",
      },
      {
        id: "dl-ct",
        name: "Cần Thơ",
        price: "445.000đ",
        details: "457km - 11 giờ - 01/06/2025",
      },
    ],
  },
  {
    id: "danang",
    originName: "Đà Nẵng",
    originImage: imgDaNang,
    destinations: [
      {
        id: "dn-dl",
        name: "Đà Lạt",
        price: "430.000đ",
        details: "668km - 17 giờ - 01/06/2025",
      },
      {
        id: "dn-as",
        name: "BX An Sương",
        price: "490.000đ",
        details: "966km - 20 giờ - 01/06/2025",
      },
      {
        id: "dn-nt",
        name: "Nha Trang",
        price: "370.000đ",
        details: "528km - 9 giờ 25 phút - 01/06/2025",
      },
    ],
  },
];

function PopularRoutesSection() {
  return (
    <section className="pt-6 bg-slate-50 sm:pt-8 lg:pt-8 pb-12 sm:pb-16 lg:pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-600">
            TUYẾN PHỔ BIẾN
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Được khách hàng tin tưởng và lựa chọn
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularRoutesData.map((routeGroup) => (
            <div
              key={routeGroup.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
            >
              <div className="relative">
                <img
                  src={routeGroup.originImage}
                  alt={`Tuyến xe từ ${routeGroup.originName}`}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-opacity-30 flex items-end p-4">
                  <h3 className="text-white text-lg font-semibold">
                    Tuyến xe từ {routeGroup.originName}
                  </h3>
                </div>
              </div>

              <ul className="flex-grow">
                {routeGroup.destinations.map((dest, index) => (
                  <li
                    key={dest.id}
                    className={`p-4 ${
                      index < routeGroup.destinations.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }`}
                  >
                    <a href="#" className="group">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="text-base font-medium text-gray-800 group-hover:text-orange-600 transition-colors">
                          {dest.name}
                        </span>
                        <span className="text-base font-semibold text-orange-500">
                          {dest.price}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 group-hover:text-orange-500 transition-colors">
                        {dest.details}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularRoutesSection;
