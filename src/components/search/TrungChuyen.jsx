// src/components/search/TrungChuyen.jsx
import React from "react";

function TrungChuyen() {
  return (
    <div className="bg-slate-50 p-6 mt-4 rounded-lg text-sm text-gray-800 space-y-4 border">
      <div>
        <h4 className="font-bold text-base mb-2">Đón/ trả tận nơi:</h4>
        <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-700">
          <li>Thời gian nhận khách : Trước 4 tiếng.</li>
          <li>
            Thời gian xe đón : Chuẩn bị trước 2 -3 tiếng, do mật độ giao thông
            trong thành phố và sẽ kết hợp đón nhiều điểm khác nhau nên thời gian
            đón cụ thể tài xế sẽ liên hệ hẹn giờ.
          </li>
          <li>
            Hẻm nhỏ xe không quay đầu được : Xe trung chuyển sẽ đón Khách đầu
            hẻm/ đầu đường.
          </li>
          <li>
            Khu vực có biển cấm dừng đỗ xe không đón được : Xe trung chuyển sẽ
            đón tại vị trí gần nhất có thể.
          </li>
          <li>
            Hành lý : Hành lý nhỏ gọn dưới 20 kg, không vận chuyển kèm động vật
            , thú cưng, không mang đồ có mùi, đồ chảy nước trên xe.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TrungChuyen;
