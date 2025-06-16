// src/components/pages/TicketLookupPage.jsx

import React, { useState } from "react";

const TicketLookupPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ticketCode, setTicketCode] = useState("");

  const handleLookup = (e) => {
    e.preventDefault();
    console.log("Đang tra cứu với SĐT:", phoneNumber);
    console.log("Và Mã vé:", ticketCode);
    alert(`Tra cứu cho SĐT: ${phoneNumber}\nMã vé: ${ticketCode}`);
  };

  return (
    <div className="flex-grow bg-white flex items-center justify-center p-4 ">
      <div className="w-full  max-w-xl mx-auto ">
        <h1
          className="text-center text-xs md:text-2xl font-semibold uppercase mt-8 mb-8"
          style={{ color: "#00613D" }}
        >
          Tra cứu thông tin đặt vé
        </h1>

        <form onSubmit={handleLookup} className="space-y-4">
          {/* Ô nhập số điện thoại */}
          <div>
            <input
              required
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Vui lòng nhập số điện thoại"
              className=" w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                         transition duration-200 hover:border-amber-500 mb-4 cursor-pointer"
            />
          </div>

          <div>
            <input
              required
              type="text"
              value={ticketCode}
              onChange={(e) => setTicketCode(e.target.value)}
              placeholder="Vui lòng nhập mã vé"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                         transition duration-200 hover:border-amber-500 mb-4 hover:cursor-pointer"
            />
          </div>

          {/* Nút bấm tra cứu */}
          <div className="mt-6 flex justify-center items-center">
            <button
              type="submit"
              className="w-50 bg-amber-100 text-orange-500 font-bold py-2 px-6 rounded-4xl shadow-md
                         hover:bg-orange-600 hover:text-white hover:cursor-pointer
                         transition-colors duration-300 ease-in-out
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 mb-20"
            >
              Tra cứu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketLookupPage;
