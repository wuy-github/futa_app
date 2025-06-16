// src/components/pages/TicketLookupPage.jsx

import React, { useState } from "react";

const TicketLookupPage = () => {
  // Sử dụng state để lưu giá trị của các ô input
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ticketCode, setTicketCode] = useState("");

  // Hàm xử lý khi người dùng bấm nút "Tra cứu"
  const handleLookup = (e) => {
    e.preventDefault();
    console.log("Đang tra cứu với SĐT:", phoneNumber);
    console.log("Và Mã vé:", ticketCode);
    alert(`Tra cứu cho SĐT: ${phoneNumber}\nMã vé: ${ticketCode}`);
  };

  return (
    <div className="bg-white flex-grow">
      <div className="container mx-auto  px-4 py-12 md:py-20">
        <div className="max-w-md mx-auto">
          {/* Tiêu đề của trang */}
          <h1 className="text-center text-2xl md:text-3xl font-bold uppercase text-orange-600 mb-6">
            Tra cứu thông tin đặt vé
          </h1>

          {/* Form tra cứu */}
          <form
            onSubmit={handleLookup}
            className="space-y-6 flex justify-center"
          >
            {/* Ô nhập số điện thoại */}
            <div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Vui lòng nhập số điện thoại"
                className="w-xl px-4 py-3 border border-gray-300 rounded-md shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                           transition duration-200 hover:border-amber-500"
              />
            </div>

            {/* Ô nhập mã vé */}
            <div>
              <input
                type="text"
                value={ticketCode}
                onChange={(e) => setTicketCode(e.target.value)}
                placeholder="Vui lòng nhập mã vé"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                           transition duration-200"
              />
            </div>

            {/* Nút bấm tra cứu */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-orange-50 text-orange-600 font-bold py-3 px-6 rounded-md
                           border border-orange-500 hover:bg-orange-500 hover:text-white
                           transition-colors duration-300 ease-in-out shadow-sm"
              >
                Tra cứu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketLookupPage;
