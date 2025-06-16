// src/components/pages/AboutUsPage.jsx

import React from "react";

import visionMissionImage from "../../assets/aboutuspage/about_1.png";
import coreValuesImage from "../../assets/aboutuspage/about_2.png";
import philosophyImage from "../../assets/aboutuspage/about_3.png";

const AboutUsPage = () => {
  return (
    <div className="bg-white">
      {/* ===== SECTION 1: GIỚI THIỆU CHUNG ===== */}
      <section className="bg-gray-50 py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-500 uppercase tracking-wider">
          Phương Trang
        </h1>
        <p className="mt-2 text-2xl md:text-3xl font-semibold text-gray-900">
          “Chất lượng là danh dự”
        </p>
        <div className="mt-8 max-w-6xl mx-auto text-justify text-base md:text-lg space-y-4 leading-relaxed">
          <p>
            Tập đoàn Phương Trang – FUTA Group được thành lập năm 2001. Với hoạt
            động kinh doanh chính trong lĩnh vực mua bán xe ô tô, vận tải hành
            khách, bất động sản và kinh doanh dịch vụ, Phương Trang dần trở
            thành cái tên quen thuộc đồng hành cùng người Việt trên mọi tỉnh
            vực.
          </p>
          <p>
            Trải qua hơn 24 năm hình thành và phát triển, đặt khách hàng là
            trọng tâm, chúng tôi tự hào trở thành doanh nghiệp vận tải tiên
            phong, cốt cán đóng góp tích cực vào sự phát triển chung của ngành
            vận tải nói riêng và nền kinh tế đất nước nói chung. Luôn cải tiến
            mang đến chất lượng dịch vụ ưu việt nhất dành cho khách hàng. Công
            ty Phương Trang được ghi nhận qua nhiều giải thưởng danh giá như
            “Thương hiệu số 1 Việt Nam”, “Top 1 Thương hiệu mạnh ASEAN 2024”,
            “Top 5 Sản phẩm dịch vụ chất lượng ASEAN 2024”, “Top 10 Thương hiệu
            hàng đầu Việt Nam 2024”, “Top 10 Thương hiệu mạnh Quốc gia 2024”,
            “Top 10 Thương hiệu uy tín hàng đầu ASEAN 2024”, “Top 10 Thương hiệu
            Quốc gia hội nhập Châu Á – Thái Bình Dương 2024”.
          </p>
        </div>
        <button className="mt-6 font-semibold text-orange-500 transition-colors hover:text-orange-600">
          Xem thêm
        </button>
      </section>

      {/* ===== SECTION 2: TẦM NHÌN & SỨ MỆNH ===== */}
      <section className="container max-w-7xl mx-auto ">
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <div className="md:w-1/2">
            <img
              src={visionMissionImage}
              alt="Tầm nhìn và Sứ mệnh"
              className="w-full rounded-lg"
            />
          </div>
          <div className="md:w-1/2 ">
            <h2 className="text-3xl font-bold uppercase text-orange-600 md:text-4xl ">
              Tầm nhìn và Sứ mệnh
            </h2>
            <p
              className="mt-2 text-lg font-semibold uppercase "
              style={{ color: "#E64D4D" }}
            >
              BẢO ĐÁP TỔ QUỐC VÌ MỘT VIỆT NAM HÙNG CƯỜNG.
            </p>
            <p className="mt-4 leading-relaxed text-black font-semibold">
              Trở thành Tập đoàn uy tín và chất lượng hàng đầu Việt Nam với cam
              kết:
            </p>
            <ul className="mt-4 list-inside list-disc space-y-2 leading-relaxed text-black font-semibold">
              <li>Tạo môi trường làm việc năng động, thân thiện.</li>
              <li>Phát triển sự tin tưởng của khách hàng.</li>
              <li>Trở thành tập đoàn dẫn đầu chuyên nghiệp.</li>
            </ul>
            <p className="mt-4 leading-relaxed text-black font-semibold">
              Phương Trang luôn phấn đấu làm việc hiệu quả nhất, để luôn cống
              hiến, đóng góp hết sức mình vì một Việt Nam hùng cường.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: GIÁ TRỊ CỐT LÕI ===== */}
      <section className="bg-gray-50">
        <div className="container mx-auto max-w-7xl py-10">
          <div className="flex flex-col items-center gap-12 md:flex-row-reverse">
            <div className="md:w-1/2">
              <img
                src={coreValuesImage}
                alt="Giá trị cốt lõi"
                className="w-full rounded-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-semibold uppercase text-orange-600 md:text-4xl">
                Giá trị cốt lõi
              </h2>
              <p className="mt-2 text-lg text-black font-semibold">
                Giá trị cốt lõi –{" "}
                <strong style={{ color: "#E64D4D" }}>“Phương Trang”</strong>
              </p>
              <ul className="mt-6 space-y-4 leading-relaxed text-black font-semibold text-justify">
                <li>
                  <strong style={{ color: "#E64D4D" }}>Phương:</strong> chữ
                  “Phương” trong tiếng Hán nghĩa là Vuông, vật gì hình thể ngay
                  thẳng đều gọi là phương. Thể hiện sự chính trực, phẩm chất đạo
                  đức tốt đẹp. Với hành khách, Phương Trang luôn mang tới sự
                  minh bạch, công bằng trong phục vụ; với đồng nghiệp, khách
                  hàng, đối tác.
                </li>
                <li>
                  <strong style={{ color: "#E64D4D" }}>Trang:</strong> mang
                  nghĩa To lớn, Tráng lệ. Hướng tới sự thành công vượt bậc, thể
                  hiện ý chí, khát vọng thực hiện những mục tiêu lớn, đem lại
                  giá trị lớn cho cộng đồng, cho xã hội.
                </li>
                <li>
                  <strong style={{ color: "#E64D4D" }}>Phương Trang</strong> với
                  hàm nghĩa càng phát triển, càng to lớn lại càng phải "CHÍNH
                  TRỰC". Luôn là biểu tượng của sự phát triển dựa trên những giá
                  trị đạo đức tốt đẹp nhất.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: TRIẾT LÝ ===== */}
      <section className="container mx-auto max-w-7xl py-10">
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <div className="md:w-1/2">
            <img
              src={philosophyImage}
              alt="Triết lý"
              className="w-full rounded-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold uppercase text-orange-600 md:text-4xl">
              Triết lý
            </h2>
            <p className="mt-4 leading-relaxed text-black font-semibold text-justify">
              Hội nhập và phát triển gắn với sự thành công của Đất nước. Nguồn
              nhân lực chính là nhân tố then chốt, là tài sản lớn nhất của Công
              ty Phương Trang, chú trọng tạo ra môi trường làm việc hiện đại,
              năng động, thân thiện và trao cơ hội phát triển nghề nghiệp cho
              tất cả thành viên. Sự hài lòng của khách hàng là minh chứng cho
              chất lượng dịch vụ. Phương Trang không ngừng đầu tư, nghiên cứu và
              phát triển từng lĩnh vực kinh doanh, Phương Trang thấu hiểu nhu
              cầu khách hàng, mang đến sản phẩm dịch vụ hoàn hảo, đáp ứng tối đa
              mong đợi của khách hàng.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
