import React from "react";
import { FaFacebookSquare, FaYoutubeSquare } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 text-gray-700 py-12 text-sm border-t border-gray-200">
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
        {" "}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Cột 1: Thông tin công ty và liên hệ chính */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-orange-500 text-base mb-2">
              CÔNG TY CỔ PHẦN XE KHÁCH PHƯƠNG TRANG - FUTA BUS LINES
            </h3>
            <p className="text-xs text-gray-500 mb-1">
              Địa chỉ: Số 01 Tô Hiến Thành, Phường 3, TP. Đà Lạt, Lâm Đồng.
            </p>
            <p className="text-sm">
              Tổng đài:
              <a
                href="tel:19006067"
                className="ml-1 text-orange-600 hover:text-orange-700 font-bold"
              >
                1900 6067
              </a>
            </p>
            <p className="text-xs text-gray-500">
              Email:{" "}
              <a href="mailto:hotro@futa.vn" className="hover:text-orange-500">
                hotro@futa.vn
              </a>
            </p>
          </div>

          {/* Cột 2: Một vài liên kết nhanh */}
          <div className="text-center md:text-left md:mx-auto">
            {" "}
            {/* Căn giữa cột này trên desktop */}
            <h3 className="font-semibold text-orange-500 text-base mb-3">
              Liên kết hữu ích
            </h3>
            <nav className="space-y-1.5 text-xs sm:text-sm">
              <p>
                <a href="#" className="hover:text-orange-600 transition-colors">
                  Về chúng tôi
                </a>
              </p>
              <p>
                <a href="#" className="hover:text-orange-600 transition-colors">
                  Lịch trình
                </a>
              </p>
              <p>
                <a href="#" className="hover:text-orange-600 transition-colors">
                  Tuyển dụng
                </a>
              </p>
              <p>
                <a href="#" className="hover:text-orange-600 transition-colors">
                  Điều khoản sử dụng
                </a>
              </p>
            </nav>
          </div>

          {/* Cột 3: Kết nối */}
          <div className="text-center md:text-right">
            <h3 className="font-semibold text-orange-500 text-base mb-3">
              Kết nối với FUTA Bus Lines
            </h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <a
                href="#"
                aria-label="Facebook FUTA Bus Lines"
                className="text-gray-500 hover:text-orange-600 transition-colors"
              >
                <FaFacebookSquare size={28} />
              </a>
              <a
                href="#"
                aria-label="YouTube FUTA Bus Lines"
                className="text-gray-500 hover:text-orange-600 transition-colors"
              >
                <FaYoutubeSquare size={28} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 pt-4  text-center text-xs text-gray-500">
          <p>&copy; {currentYear} FUTA Bus Lines. Bảo lưu mọi quyền.</p>
          <p className="mt-1">
            Website được phát triển bởi Đối tác Lập trình của bạn.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
