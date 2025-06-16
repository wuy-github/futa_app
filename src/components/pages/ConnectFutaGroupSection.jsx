import React from "react";
import { FaCarAlt, FaBusAlt, FaShippingFast, FaBus } from "react-icons/fa";

const servicesData = [
  {
    id: 1,
    IconComponent: FaCarAlt,
    label: "Xe Hợp Đồng",
    altText: "Dịch vụ xe hợp đồng FUTA",
    isHighlighted: false,
  },
  {
    id: 2,
    IconComponent: FaBusAlt,
    label: "Mua vé Phương Trang",
    altText: "Dịch vụ mua vé xe Phương Trang",
    isHighlighted: true,
  },
  {
    id: 3,
    IconComponent: FaShippingFast, // Component icon cho Giao Hàng
    label: "Giao Hàng",
    altText: "Dịch vụ giao hàng FUTA",
    isHighlighted: false,
  },
  {
    id: 4,
    IconComponent: FaBus, // Component icon cho Xe Buýt (chung)
    label: "Xe Buýt",
    altText: "Dịch vụ xe buýt FUTA",
    isHighlighted: false,
  },
];

function ConnectFutaGroupSection() {
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 max-w-4xl md:max-w-4xl">
        {/* Tiêu đề Section */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-600">
            KẾT NỐI FUTA GROUP
          </h2>
          <p className="text-sm text-gray-500 mt-2 max-w-xl mx-auto">
            Kết nối đa dạng hệ sinh thái FUTA Group qua App FUTA: mua vé Xe
            Phương Trang, Xe Buýt, Xe Hợp Đồng, Giao Hàng,...
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 md:gap-6 lg:gap-10">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="flex flex-col items-center text-center group cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-1"
            >
              <div className="w-16 h-16 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-orange-100 rounded-full flex items-center justify-center mb-3 md:mb-4 transform transition-transform duration-300 group-hover:scale-105 shadow">
                <service.IconComponent
                  className="text-orange-500 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" // Kích thước và màu của icon
                />
              </div>
              <p
                className={`text-sm md:text-base font-semibold 
              
                transition-colors duration-300`}
              >
                {service.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ConnectFutaGroupSection;
