// src/components/pages/NewsPage.jsx

import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

// --- IMPORT HÌNH ẢNH TỪ THƯ MỤC ASSETS (Theo đúng đường dẫn bạn cung cấp) ---
import img1 from "../../assets/Newspage/1.png";
import img2 from "../../assets/Newspage/2.png";
import img3 from "../../assets/Newspage/3.jpg"; // Sửa thành .jpg
import img4 from "../../assets/Newspage/4.jpg"; // Sửa thành .jpg
import img5 from "../../assets/Newspage/5.png";
import img7 from "../../assets/Newspage/7.png";
import img8 from "../../assets/Newspage/8.png";
import img9 from "../../assets/Newspage/9.png";

// --- DỮ LIỆU ẢO ---
const newsData = [
  {
    id: 1,
    type: "large-featured",
    category: "GIẢM THỜI GIAN TRUNG CHUYỂN",
    title:
      "TRẢI NGHIỆM DỊCH VỤ TRUNG CHUYỂN ĐÓN TRẢ ĐIỂM TẠI TP.HCM TỪ NGÀY 26/03",
    description:
      "Không còn những chuyến xe trung chuyển vòng vèo làm mất thời gian của Quý khách. Nay Công ty Phương Trang chính thức thay đổi dịch vụ trung chuyển Đón Trả...",
    date: "15:47 06/06/2025",
    imageUrl: img1,
  },
  {
    id: 2,
    title: "TRUNG CHUYỂN MIỄN PHÍ TỪ BẾN XE MIỀN ĐÔNG MỚI",
    date: "18:28 08/06/2025",
    imageUrl: img2,
  },
  {
    id: 3,
    title: "FUTA ĐỒNG HÀNH CÙNG SHB - X3 QUÀ TẶNG",
    date: "14:35 28/07/2023",
    imageUrl: img3,
  },
  {
    id: 4,
    title:
      "TỪ TÂY SƠN ĐI THĂM KHÁM TẠI TP.HCM DỄ DÀNG - CÔNG TY PHƯƠNG TRANG...",
    date: "20:47 19/06/2025",
    imageUrl: img4,
  },
  {
    id: 5,
    title: "CÔNG TY PHƯƠNG TRANG TƯNG BỪNG KHAI TRƯƠNG VĂN PHÒNG BẾ...",
    date: "20:28 19/06/2025",
    imageUrl: img5,
  },
  {
    id: 6,
    type: "spotlight", // Giữ lại để filter, nhưng sẽ không hiển thị
    title: "Tiêu điểm",
    subtitle: "FUTA City Bus",
    date: "17:34 01/10/2024",
  },
  {
    id: 7,
    title:
      "THÔNG BÁO THAY ĐỔI LỘ TRÌNH TUYẾN XE BUÝT VỊ THANH - BX TRUNG TÂM...",
    date: "10:45 28/05/2024",
    imageUrl: img7,
  },
  {
    id: 8,
    title: "CÔNG TY PHƯƠNG TRANG THÔNG BÁO HOẠT ĐỘNG 2 TUYẾN XE BUÝT T...",
    date: "11:19 02/05/2024",
    imageUrl: img8,
  },
  {
    id: 9,
    title: "CÔNG TY PHƯƠNG TRANG ĐƯA VÀO VẬN HÀNH 5 TUYẾN XE BUÝT TẠI HÀ...",
    date: "11:19 02/05/2024",
    imageUrl: img9,
  },
];

// --- LOGIC LỌC DỮ LIỆU ĐÃ CẬP NHẬT ---
const largeFeatured = newsData.find((item) => item.type === "large-featured");
const topSideNews = newsData.slice(1, 3); // Lấy 2 tin bên cạnh tin nổi bật (id: 2, 3)

// Lấy 5 tin cho hàng dưới bằng cách loại trừ các tin đã hiển thị và tin 'spotlight'
const bottomRowNews = newsData.filter(
  (item) => ![1, 2, 3, 6].includes(item.id)
);

const allNews = newsData.filter((item) => item.type !== "spotlight");

// --- COMPONENT CHÍNH ---
const NewsPage = () => {
  const [activeTab, setActiveTab] = useState("Tin tức tổng hợp");
  const tabs = [
    "Tin tức tổng hợp",
    "FUTA Bus Lines",
    "FUTA City Bus",
    "Khuyến mãi",
    "Giải thưởng",
    "Trạm Dừng",
  ];

  return (
    <div className="bg-gray-100">
      {" "}
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}{" "}
        <div className="mb-6 text-sm text-gray-500">
          TRANG CHỦ /{" "}
          <span className="text-gray-800 font-semibold">TIN TỨC</span>{" "}
        </div>
        {/* Tab Navigation */}{" "}
        <div className="flex flex-col md:flex-row items-center border-b border-gray-300 mb-8">
          {" "}
          <div className="flex items-center overflow-x-auto pb-2 md:pb-0">
            {" "}
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm md:text-base font-semibold whitespace-nowrap transition-colors duration-300 ${
                  activeTab === tab
                    ? "border-b-2 border-orange-500 text-orange-500"
                    : "text-gray-600 hover:text-orange-500"
                }`}
              >
                {tab}{" "}
              </button>
            ))}{" "}
          </div>{" "}
          <div className="relative mt-4 md:mt-0 md:ml-auto w-full md:w-auto">
            {" "}
            <input
              type="text"
              placeholder="Tìm kiếm tin tức"
              className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
            />{" "}
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />{" "}
          </div>{" "}
        </div>
        {/* --- TIN TỨC NỔI BẬT --- */}{" "}
        <section>
          {" "}
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-orange-500 pl-4">
            Tin tức nổi bật{" "}
          </h2>
          {/* Grid Layout chính cho phần trên */}{" "}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Cột trái: Bài viết lớn */}{" "}
            {largeFeatured && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl">
                {" "}
                <div className="relative">
                  {" "}
                  <img
                    src={largeFeatured.imageUrl}
                    alt={largeFeatured.title}
                    className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  />{" "}
                  <div className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded">
                    {largeFeatured.category}{" "}
                  </div>{" "}
                </div>{" "}
                <div className="p-6">
                  {" "}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight hover:text-orange-500 transition-colors">
                    {largeFeatured.title}{" "}
                  </h3>{" "}
                  <p className="text-gray-600 text-sm mb-4">
                    {largeFeatured.description}{" "}
                  </p>{" "}
                  <p className="text-sm text-gray-400">{largeFeatured.date}</p>{" "}
                </div>{" "}
              </div>
            )}
            {/* Cột phải: 2 bài viết nhỏ */}{" "}
            <div className="grid grid-rows-2 gap-8">
              {" "}
              {topSideNews.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden group flex transition-all duration-300 hover:shadow-2xl"
                >
                  {" "}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-1/3 h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />{" "}
                  <div className="p-4 flex flex-col w-2/3">
                    {" "}
                    <h3 className="font-bold text-gray-800 leading-tight mb-2 hover:text-orange-500 transition-colors">
                      {item.title}{" "}
                    </h3>{" "}
                    <p className="text-sm text-gray-400 mt-auto">{item.date}</p>{" "}
                  </div>{" "}
                </div>
              ))}{" "}
            </div>{" "}
          </div>
          {/* Hàng dưới: 5 bài viết nhỏ */}{" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {" "}
            {bottomRowNews.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl"
              >
                {" "}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                />{" "}
                <div className="p-4">
                  {" "}
                  <h3 className="font-bold text-gray-800 leading-tight mb-2 hover:text-orange-500 transition-colors">
                    {item.title}{" "}
                  </h3>{" "}
                  <p className="text-sm text-gray-400">{item.date}</p>{" "}
                </div>{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </section>
        {/* --- TẤT CẢ TIN TỨC --- */}{" "}
        <section className="mt-16">
          {" "}
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-orange-500 pl-4">
            Tất cả tin tức{" "}
          </h2>{" "}
          <div className="space-y-8">
            {" "}
            {allNews.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden group flex flex-col md:flex-row transition-all duration-300 hover:shadow-2xl"
              >
                {" "}
                <div className="md:w-1/3">
                  {" "}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-48 md:h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />{" "}
                </div>{" "}
                <div className="p-6 md:w-2/3">
                  {" "}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight hover:text-orange-500 transition-colors">
                    {item.title}{" "}
                  </h3>{" "}
                  <p className="text-gray-600 text-sm mb-4">
                    {" "}
                    {item.description ||
                      "Đặt vé dễ dàng - Di chuyển nhanh - Lộ trình rõ ràng"}{" "}
                  </p>{" "}
                  <p className="text-sm text-gray-400">{item.date}</p>{" "}
                </div>{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </section>{" "}
      </div>{" "}
    </div>
  );
};

export default NewsPage;
