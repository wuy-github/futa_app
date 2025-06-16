import React, { useState } from "react";
import { FaEnvelope, FaChevronDown, FaChevronRight } from "react-icons/fa";

function ContactPage() {
  const [formData, setFormData] = useState({
    department: "FUTA BUS LINES",
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // State để quản lý việc đóng/mở thông tin
  const [isInfoOpen, setIsInfoOpen] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //   Cai này là để cho m xem xem nó gửi được chauw
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    alert(
      "Cảm ơn bạn đã gửi thông tin liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể!"
    );
    setFormData({
      department: "FUTA BUS LINES",
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const inputClasses =
    "w-full h-12 bg-gray-100 border border-gray-200 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-300 focus:outline-none px-4 text-sm transition-colors duration-300";
  const selectClasses = `${inputClasses} appearance-none pr-8`;

  return (
    <div className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-6xl lg:max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {/* Cột Trái: Thông tin - ĐÃ CẬP NHẬT */}
          <div className="text-sm">
            <h1 className="text-xl font-bold text-gray-800 mb-4">
              LIÊN HỆ VỚI CHÚNG TÔI
            </h1>

            {/* Khối thông tin có thể đóng/mở */}
            <div>
              <button
                onClick={() => setIsInfoOpen(!isInfoOpen)}
                className="w-full flex items-center justify-between text-left py-2"
                aria-expanded={isInfoOpen}
              >
                <div className="flex items-center">
                  <FaChevronRight
                    className={`w-3 h-3 mr-3 text-orange-500 transition-transform duration-300 ${
                      isInfoOpen ? "rotate-90" : ""
                    }`}
                  />
                  <span className="font-semibold text-gray-700">
                    FUTA BUS LINES
                  </span>
                </div>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isInfoOpen ? "max-h-[1000px] mt-4" : "max-h-0"
                }`}
              >
                <div className="space-y-3 text-gray-600 pl-6 border-l-2 border-orange-200 ml-1.5">
                  <h2 className="text-base font-bold text-orange-500">
                    CÔNG TY CỔ PHẦN XE KHÁCH PHƯƠNG TRANG - FUTA BUS LINES
                  </h2>
                  <p>
                    <strong>Địa chỉ:</strong> Số 01 Tô Hiến Thành, Phường 3,
                    Thành phố Đà Lạt, Tỉnh Lâm Đồng, Việt Nam.
                  </p>
                  <p>
                    <strong>Website:</strong>{" "}
                    <a
                      href="https://futabus.vn/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      https://futabus.vn/
                    </a>
                  </p>
                  <p>
                    <strong>Điện thoại:</strong>{" "}
                    <a href="tel:02838386852" className="hover:text-orange-600">
                      02838386852
                    </a>
                  </p>
                  <p>
                    <strong>Fax:</strong> 02838386853
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:hotro@futa.vn"
                      className="hover:text-orange-600"
                    >
                      hotro@futa.vn
                    </a>
                  </p>
                  <p>
                    <strong>Hotline:</strong>{" "}
                    <a
                      href="tel:19006067"
                      className="hover:text-orange-600 font-semibold"
                    >
                      19006067
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 md:p-8 rounded-xl shadow-lg">
            {" "}
            <div className="flex items-center gap-3 mb-6">
              <FaEnvelope className="w-6 h-6 " style={{ color: "#00613D" }} />
              <h2 className="text-xl font-bold " style={{ color: "#00613D" }}>
                Gửi thông tin liên hệ đến chúng tôi
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="relative">
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className={selectClasses}
                  >
                    <option>FUTA BUS LINES</option>
                    <option>FUTA Express</option>
                    <option>Hợp tác</option>
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Họ và tên"
                  required
                  className={inputClasses}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  className={inputClasses}
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Điện thoại"
                  required
                  className={inputClasses}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Nhập Tiêu đề"
                  required
                  className={inputClasses}
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Nhập ghi chú"
                  required
                  rows="5"
                  className={`${inputClasses} h-auto resize-none`}
                ></textarea>{" "}
              </div>
              <div className="pt-2">
                {" "}
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-10 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
                >
                  Gửi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
