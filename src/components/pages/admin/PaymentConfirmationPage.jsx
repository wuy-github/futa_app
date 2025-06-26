import React, { useState } from "react";

const initialPendingBookings = [
  {
    bookingId: "HD052",
    customerName: "Phạm Thị D",
    paymentMethod: "Chuyển khoản",
    total: "190.000đ",
    date: "26/06/2025 10:30",
  },
  {
    bookingId: "HD053",
    customerName: "Đặng Văn E",
    paymentMethod: "Chuyển khoản",
    total: "450.000đ",
    date: "26/06/2025 11:15",
  },
];

const PaymentConfirmationPage = () => {
  const [pendingBookings, setPendingBookings] = useState(
    initialPendingBookings
  );

  const handleConfirm = (bookingId) => {
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xác nhận thanh toán cho đơn hàng ${bookingId}?`
      )
    ) {
      console.log(`Đã xác nhận thanh toán cho đơn: ${bookingId}`);
      // Trong thực tế: gọi API POST /api/bookings/${bookingId}/confirm

      // Giả lập cập nhật UI: loại bỏ đơn hàng đã xác nhận khỏi danh sách
      setPendingBookings((currentBookings) =>
        currentBookings.filter((b) => b.bookingId !== bookingId)
      );
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Xác nhận Thanh toán
      </h1>
      <div className="bg-white p-4 rounded-lg shadow">
        {pendingBookings.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-600">
              <tr>
                <th className="p-3">Mã đơn</th>
                <th className="p-3">Tên khách hàng</th>
                <th className="p-3">Ngày đặt</th>
                <th className="p-3">Hình thức</th>
                <th className="p-3">Tổng tiền</th>
                <th className="p-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {pendingBookings.map((booking) => (
                <tr key={booking.bookingId} className="border-b">
                  <td className="p-3 font-mono text-sm">{booking.bookingId}</td>
                  <td className="p-3">{booking.customerName}</td>
                  <td className="p-3">{booking.date}</td>
                  <td className="p-3">{booking.paymentMethod}</td>
                  <td className="p-3 font-semibold">{booking.total}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleConfirm(booking.bookingId)}
                      className="bg-green-500 text-white font-semibold px-4 py-1.5 rounded-md hover:bg-green-600"
                    >
                      Xác nhận
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 py-8">
            Không có đơn hàng nào chờ xác nhận.
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;
