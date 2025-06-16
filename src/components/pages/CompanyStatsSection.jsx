// src/components/pages/CompanyStatsSection.jsx
import React from "react";

// Import các icon PNG từ thư mục src/assets/
import iconStat1 from "../../assets/content-3-1.png";
import iconStat2 from "../../assets/content-3-2.png";
import iconStat3 from "../../assets/content-3-3.png";

// Import ảnh minh họa lớn
import companyIllustrationImage from "../../assets/content-3.png";

const statsData = [
  {
    id: 1,
    iconSrc: iconStat1,
    altText: "Biểu tượng lượt khách",
    mainText: "Hơn 40 Triệu",
    subText: "Lượt khách",
    description:
      "Phương Trang phục vụ hơn 40 triệu lượt khách bình quân 1 năm trên toàn quốc",
  },
  {
    id: 2,
    iconSrc: iconStat2,
    altText: "Biểu tượng phòng vé",
    mainText: "Hơn 350",
    subText: "Phòng vé - Bưu cục",
    description:
      "Phương Trang có hơn 350 phòng vé, trạm trung chuyển, bến xe,... trên toàn hệ thống",
  },
  {
    id: 3,
    iconSrc: iconStat3,
    altText: "Biểu tượng chuyến xe",
    mainText: "Hơn 6,500",
    subText: "Chuyến xe",
    description:
      "Phương Trang phục vụ hơn 6,500 chuyến xe đường dài và liên tỉnh mỗi ngày",
  },
];

function CompanyStatsSection() {
  return (
    <section className="py-8 bg-white sm:py-8 lg:py-12">
      <div className="container mx-auto px-4 max-w-6xl lg:max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600">
            FUTA BUS LINES - CHẤT LƯỢNG LÀ DANH DỰ
          </h2>
          <p className="text-sm text-gray-500 mt-3 max-w-xl mx-auto">
            Được khách hàng tin tưởng và lựa chọn
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-5xl mx-auto">
          <div className="space-y-8 md:space-y-10">
            {statsData.map((stat) => (
              <div key={stat.id} className="flex items-start">
                <div className="flex-shrink-0 mr-5 mt-1">
                  <img
                    src={stat.iconSrc}
                    alt={stat.altText}
                    className="w-12 h-12 md:w-14 md:h-14 object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-baseline">
                    <p className="text-xl md:text-2xl font-bold text-gray-900">
                      {stat.mainText}
                    </p>
                    {stat.subText && (
                      <span className="ml-2 text-sm text-gray-600 font-medium">
                        {stat.subText}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 lg:mt-0">
            <img
              src={companyIllustrationImage}
              alt="Minh họa chất lượng dịch vụ FUTA Bus Lines"
              className="w-full h-auto object-contain max-h-[400px] sm:max-h-[450px] mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompanyStatsSection;
