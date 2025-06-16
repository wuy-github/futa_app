// src/components/pages/NewsSection.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import newsImage1 from "../../assets/newimg/new1.jpg";
import newsImage2 from "../../assets/newimg/new2.jpg";
import newsImage3 from "../../assets/newimg/new3.png";
import newsImage4 from "../../assets/newimg/new4.jpg";
// import newsImage5 from "../../assets/newimg/new5.jpg";
// import newsImage6 from "../../assets/newimg/new6.png";
// import newsImage7 from "../../assets/newimg/new7.jpg";
// import newsImage8 from "../../assets/newimg/new8.png";
// import newsImage9 from "../../assets/newimg/new9.png";
// import newsImage10 from "../../assets/newimg/new10.png";
// import newsImage11 from "../../assets/newimg/new11.png";
// import newsImage12 from "../../assets/newimg/new12.jpg";

const newsData = [
  {
    id: 1,
    imageUrl: newsImage1,
    title: "FUTA ĐỒNG HÀNH CÙNG SHB - X3 QUÀ TẶNG HẤP DẪN CHO CHỦ THẺ",
    date: "08/12/2025",
    link: "#",
  },
  {
    id: 2,
    imageUrl: newsImage2,
    title: "THÔNG BÁO THAY ĐỔI LỘ TRÌNH HOẠT ĐỘNG TUYẾN XE BUÝT SỐ 109...",
    date: "28/05/2025",
    link: "#",
  },
  {
    id: 3,
    imageUrl: newsImage3,
    title:
      "HÀNH TRÌNH VỀ MIỀN TÂY YÊU THƯƠNG TRÊN TUYẾN BX MIỀN ĐÔNG MỚI (TP.HCM) - BX...",
    date: "23/05/2025",
    link: "#",
  },
  {
    id: 4,
    imageUrl: newsImage4,
    title: "TIN TỨC MỚI THỨ TƯ CẬP NHẬT NHANH CHÓNG VÀ KỊP THỜI CHO BẠN",
    date: "20/05/2025",
    link: "#",
  },
];

function NewsSection() {
  return (
    <section className="py-12 bg-slate-50 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex justify-center items-center mb-8 md:mb-10 relative">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-600">
              TIN TỨC MỚI
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Được khách hàng tin tưởng và lựa chọn
            </p>
          </div>
          <a
            href="#"
            className="absolute right-0 top-1/2 -translate-y-1/2 text-sm text-orange-600 hover:text-orange-700 hover:underline font-medium flex items-center whitespace-nowrap"
          >
            Xem tất cả
          </a>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          loop={newsData.length > 2} // Chỉ loop khi có đủ item
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="pb-12 md:pb-14"
        >
          {newsData.map((newsItem) => (
            <SwiperSlide key={newsItem.id} className="h-full pb-1">
              <div className="bg-white rounded-lg shadow-amber-500 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full overflow-hidden">
                <a
                  href={newsItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-[16/9] overflow-hidden rounded-t-lg"
                >
                  {" "}
                  <img
                    src={newsItem.imageUrl}
                    alt={newsItem.title}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                </a>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-base font-semibold text-gray-800 mb-2 leading-tight">
                    <a
                      href={newsItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-orange-600 line-clamp-2"
                    >
                      {" "}
                      {newsItem.title}
                    </a>
                  </h3>
                  <div className="mt-auto flex justify-between items-center text-xs text-gray-500 pt-2">
                    <span>{newsItem.date}</span>
                    <a
                      href={newsItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:text-orange-600 font-medium flex items-center"
                    >
                      Chi tiết
                      <FaArrowRight className="ml-1 w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default NewsSection;
