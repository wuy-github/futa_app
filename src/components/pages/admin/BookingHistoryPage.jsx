// --- IMPORT CÁC THƯ VIỆN CẦN THIẾT ---
import React from "react"; // Import thư viện React để xây dựng component
import { useParams, useNavigate } from "react-router-dom"; // Import hooks từ React Router

// useParams: Dùng để lấy các tham số trên URL (ví dụ: lấy `id` của khách hàng từ /lich-su/KH001)
// useNavigate: Dùng để điều hướng người dùng sang trang khác một cách programmatic (ví dụ: khi nhấn nút "Quay lại")

// --- DỮ LIỆU MẪU (MOCK DATA) ---
// Thông thường, dữ liệu này sẽ được lấy từ API, nhưng ở đây chúng ta dùng dữ liệu giả để minh họa.

// `mockBookingHistory`: Một đối tượng chứa lịch sử đặt vé của các khách hàng.
// Mỗi key là ID của khách hàng (ví dụ: "KH001").
// Mỗi value là một mảng (array) các đối tượng (object), mỗi object đại diện cho một lần đặt vé.
const mockBookingHistory = {
  KH001: [
    {
      bookingId: "HD050",
      trip: "TP.HCM - An Giang",
      date: "21/06/2025",
      seats: "A02",
      total: "190.000đ",
      status: "Đã thanh toán",
    },
    {
      bookingId: "HD045",
      trip: "TP.HCM - Đà Lạt",
      date: "15/05/2025",
      seats: "B11, B12",
      total: "600.000đ",
      status: "Đã hoàn thành",
    },
  ],
  KH002: [
    {
      bookingId: "HD051",
      trip: "Đà Nẵng - Cần Thơ",
      date: "23/06/2025",
      seats: "A08",
      total: "450.000đ",
      status: "Đã thanh toán",
    },
  ],
  KH003: [], // Khách hàng này chưa có lịch sử đặt vé
};

// `mockCustomers`: Đối tượng chứa thông tin cơ bản của khách hàng.
// Key là ID khách hàng, value là object chứa thông tin (ở đây chỉ có tên).
const mockCustomers = {
  KH001: { name: "Nguyễn Văn A" },
  KH002: { name: "Trần Thị B" },
  KH003: { name: "Lê Văn C" },
};

// --- ĐỊNH NGHĨA COMPONENT `BookingHistoryPage` ---
// Đây là một functional component của React, chịu trách nhiệm hiển thị trang lịch sử đặt vé.
const BookingHistoryPage = () => {
  // --- SỬ DỤNG HOOKS ---

  // Lấy `id` của khách hàng từ URL. Ví dụ: nếu URL là "/history/KH001", `id` sẽ là "KH001".
  const { id } = useParams();

  // Khởi tạo hàm `Maps` để có thể điều hướng trang.
  const navigate = useNavigate();

  // --- TRUY XUẤT VÀ XỬ LÝ DỮ LIỆU ---

  // Lấy tên của khách hàng từ `mockCustomers` dựa trên `id` lấy được từ URL.
  // Nếu không tìm thấy khách hàng (`?.` là optional chaining), giá trị sẽ là "Không tìm thấy".
  const customerName = mockCustomers[id]?.name || "Không tìm thấy";

  // Lấy lịch sử đặt vé của khách hàng từ `mockBookingHistory` dựa trên `id`.
  // Nếu không có lịch sử, gán một mảng rỗng `[]` để tránh lỗi.
  const history = mockBookingHistory[id] || [];

  // --- RENDER GIAO DIỆN (JSX) ---
  return (
    // Thẻ div bao bọc toàn bộ component
    <div>
      {/* Nút "Quay lại" */}
      <button
        // Khi nhấn vào nút, gọi hàm `Maps(-1)` để quay lại trang trước đó trong lịch sử duyệt web.
        onClick={() => navigate(-1)}
        // Các class của Tailwind CSS để tạo kiểu cho nút.
        className="text-sm font-semibold text-gray-700 hover:text-orange-600 mb-4"
      >
        &larr; Quay lại danh sách {/* `&larr;` là mã HTML cho mũi tên trái */}
      </button>

      {/* Tiêu đề chính của trang */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Lịch sử mua hàng: {/* Hiển thị tên khách hàng với màu cam nổi bật */}
        <span className="text-orange-600">{customerName}</span>
      </h1>

      {/* Khối chứa bảng lịch sử */}
      <div className="bg-white p-4 rounded-lg shadow">
        {/* --- HIỂN THỊ CÓ ĐIỀU KIỆN --- */}
        {/* Kiểm tra xem khách hàng có lịch sử đặt vé không (`history.length > 0`) */}
        {history.length > 0 ? (
          // --- 1. NẾU CÓ LỊCH SỬ: Hiển thị bảng ---
          <table className="w-full">
            {/* Phần tiêu đề của bảng */}
            <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-600">
              <tr>
                <th className="p-3">Mã đơn</th>
                <th className="p-3">Chuyến đi</th>
                <th className="p-3">Ngày đi</th>
                <th className="p-3">Số ghế</th>
                <th className="p-3">Tổng tiền</th>
                <th className="p-3">Trạng thái</th>
              </tr>
            </thead>
            {/* Phần thân của bảng */}
            <tbody>
              {/* Dùng hàm `map` để lặp qua mảng `history` */}
              {/* Với mỗi `booking` trong mảng, tạo ra một hàng `<tr>` trong bảng */}
              {history.map((booking) => (
                <tr key={booking.bookingId} className="border-b">
                  {" "}
                  {/* `key` là bắt buộc và phải là duy nhất để React quản lý list hiệu quả */}
                  <td className="p-3 font-mono text-sm">{booking.bookingId}</td>
                  <td className="p-3">{booking.trip}</td>
                  <td className="p-3">{booking.date}</td>
                  <td className="p-3 font-semibold text-orange-600">
                    {booking.seats}
                  </td>
                  <td className="p-3">{booking.total}</td>
                  <td className="p-3">
                    {/* Thẻ `span` để tạo kiểu cho trạng thái */}
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          // --- 2. NẾU KHÔNG CÓ LỊCH SỬ: Hiển thị thông báo ---
          <p className="text-center text-gray-500 py-8">
            Khách hàng này chưa có lịch sử đặt vé.
          </p>
        )}
      </div>
    </div>
  );
};

// --- EXPORT COMPONENT ---
// Export component `BookingHistoryPage` để có thể sử dụng ở các file khác trong dự án.
export default BookingHistoryPage;
