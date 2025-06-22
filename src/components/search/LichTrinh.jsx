// src/components/search/LichTrinh.jsx
import React from "react";

function LichTrinh({ itinerary }) {
  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="bg-slate-50 p-6 mt-4 rounded-lg text-sm text-gray-800 border">
        <p className="text-gray-500">
          Không có thông tin lịch trình chi tiết cho tuyến này.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 p-6 mt-4 rounded-lg text-sm text-gray-800 border">
      <div className="relative pl-5">
        {/* The vertical line */}
        <div
          className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-gray-200"
          aria-hidden="true"
        ></div>

        {itinerary.map((stop, index) => (
          <div key={index} className="relative mb-5">
            {/* The circle on the line */}
            <div
              className={`absolute -left-1 top-1.5 w-4 h-4 rounded-full ${
                index === 0 ? "bg-green-500 ring-4 ring-white" : "bg-gray-300"
              }`}
            ></div>

            <div className="flex items-baseline ml-6">
              <p className="font-semibold text-gray-600 mr-4">{stop.time}</p>
              <div>
                <p className="font-bold text-gray-800">{stop.name}</p>
                <p className="text-gray-600 text-xs">{stop.address}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 pt-4 border-t border-dashed">
        <p className="text-xs text-gray-500 italic">
          <span className="font-bold">Lưu ý:</span> Thời gian các mốc lịch trình
          là thời gian dự kiến. Lịch trình này có thể thay đổi tuỳ vào tình hình
          thực tế xuất bến sớm hay trễ.
        </p>
      </div>
    </div>
  );
}

export default LichTrinh;
