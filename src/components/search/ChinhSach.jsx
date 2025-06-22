// src/components/search/ChinhSach.jsx
import React from "react";

function ChinhSach() {
  return (
    <div className="bg-slate-50 p-6 mt-4 rounded-lg text-sm text-gray-800 space-y-5 border">
      <div>
        <h4 className="font-bold text-base mb-2">Chính sách huỷ vé</h4>
        <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-700">
          <li>Chỉ được chuyển đổi vé 1 lần duy nhất</li>
          <li>
            Chi phí hủy vé từ 10% – 30% giá vé tùy thuộc thời gian hủy vé so với
            giờ khởi hành ghi trên vé và số lượng vé cá nhân/tập thể áp dụng
            theo các quy định hiện hành.
          </li>
          <li>
            Quý khách khi có nhu cầu muốn thay đổi hoặc hủy vé đã thanh toán,
            cần liên hệ với Trung tâm tổng đài 1900 6067 hoặc quầy vé chậm nhất
            trước 24h so với giờ xe khởi hành được ghi trên vé, trên email hoặc
            tin nhắn để được hướng dẫn thêm.
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-base mb-2">Yêu cầu khi lên xe</h4>
        <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-700">
          <li>
            Có mặt tại Văn phòng/Bến xe (Địa điểm xe đón trực tiếp) trước 30
            phút để làm thủ tục lên xe (đối với ngày lễ tết cần ra trước 60
            phút).
          </li>
          <li>
            Xuất trình thông tin vé được gửi qua SMS/Email/Futa App hoặc liên hệ
            quầy vé để nhận thông tin vé trước khi lên xe.
          </li>
          <li>Không mang thức ăn/đồ uống có mùi lên xe.</li>
          <li>
            Không hút thuốc, không sử dụng đồ uống có cồn hoặc sử dụng chất kích
            thích trên xe.
          </li>
          <li>Không mang các vật dễ cháy nổ lên xe.</li>
          <li>Không vứt rác trên xe.</li>
          <li>Không mang động vật lên xe.</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-base mb-2">Hành lý xách tay</h4>
        <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-700">
          <li>Tổng trọng lượng hành lý không vượt quá 20kg</li>
          <li>Không vận chuyển hàng hoá cồng kềnh</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-base mb-2">
          Trẻ em dưới 6 tuổi và phụ nữ có thai
        </h4>
        <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-700">
          <li>
            Trẻ em dưới 6 tuổi, cao từ 1.3m trở xuống, cân nặng dưới 30kg thì
            không phải mua vé.
          </li>
          <li>
            Trong trường hợp trẻ em không thoả 1 trong 3 tiêu chí trên sẽ mua 01
            vé tương đương với người lớn.
          </li>
          <li>Mỗi người lớn sẽ đi kèm tối đa một trẻ em.</li>
          <li>
            Phụ nữ có thai cần đảm bảo sức khoẻ trong suốt quá trình di chuyển.
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-base mb-2">Vé đón đường</h4>
        <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-700">
          <li>
            Trường hợp có nhu cầu lên xe dọc đường, Quý khách vui lòng liên hệ
            tổng đài 19006067 để đăng kí trước ít nhất 2 tiếng so với giờ xe
            khởi hành và vui lòng chuẩn bị hành lý nhỏ gọn (tối đa 20kg).
          </li>
          <li>
            Lưu ý, chúng tôi chỉ hỗ trợ đón ở một số địa điểm thuận tiện nằm
            trên lộ trình
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ChinhSach;
