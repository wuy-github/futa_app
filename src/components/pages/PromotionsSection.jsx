import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../../App.css";

import { Pagination, Autoplay } from "swiper/modules";

// Import các ảnh banner
import banner1 from "../../assets/baner/baner1.png";
import banner2 from "../../assets/baner/baner2.png";
import banner3 from "../../assets/baner/baner3.png";
import banner4 from "../../assets/baner/baner4.png";
import banner6 from "../../assets/baner/baner6.png";
import banner7 from "../../assets/baner/baner7.jpg";
import banner8 from "../../assets/baner/baner8.png";
import banner9 from "../../assets/baner/baner9.png";

const promotionsData = [
  { id: 1, imageUrl: banner1, altText: "Khuyến mãi FUTA hè rực rỡ", link: "#" },
  { id: 2, imageUrl: banner2, altText: "Ưu đãi đặt vé VNPAY", link: "#" },
  { id: 3, imageUrl: banner3, altText: "Vé xe siêu tiện lợi MoMo", link: "#" },
  {
    id: 4,
    imageUrl: banner4,
    altText: "Khuyến mãi thanh toán ZaloPay",
    link: "#",
  },
  { id: 5, imageUrl: banner6, altText: "Ưu đãi độc quyền app FUTA", link: "#" },
  {
    id: 6,
    imageUrl: banner7,
    altText: "Tri ân khách hàng thân thiết",
    link: "#",
  },
  { id: 7, imageUrl: banner8, altText: "Giảm giá vé khứ hồi", link: "#" },
  { id: 8, imageUrl: banner9, altText: "Combo du lịch tiết kiệm", link: "#" },
];

function PromotionsSection() {
  return (
    <section className="py-10 bg-white sm:py-12 lg:py-16 pb-6 sm:pb-8 lg:pb-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-600 mb-6 md:mb-10">
          KHUYẾN MÃI NỔI BẬT
        </h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="pb-10 "
        >
          {promotionsData.map((promo) => (
            <SwiperSlide key={promo.id} className="h-full">
              <div className="rounded-lg overflow-hidden shadow-amber-500 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 h-full flex flex-col">
                <a
                  href={promo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-[16/9] overflow-hidden"
                >
                  <img
                    src={promo.imageUrl}
                    alt={promo.altText}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
export default PromotionsSection;
