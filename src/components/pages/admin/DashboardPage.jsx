import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Sector,
} from "recharts";
import {
  FaDollarSign,
  FaTicketAlt,
  FaUserPlus,
  FaRoute,
  FaClock,
} from "react-icons/fa";

// --- DỮ LIỆU MẪU CHO CÁC BIỂU ĐỒ VÀ LIST ---
const monthlyRevenueData = [
  { month: "Thg 1", revenue: 4000 },
  { month: "Thg 2", revenue: 3000 },
  { month: "Thg 3", revenue: 5000 },
  { month: "Thg 4", revenue: 4780 },
  { month: "Thg 5", revenue: 5890 },
  { month: "Thg 6", revenue: 6390 },
  { month: "Thg 7", revenue: 7490 },
];

const busTypeData = [
  { name: "Limousine", value: 450 },
  { name: "Giường", value: 1250 },
  { name: "Ghế", value: 300 },
];

const COLORS = ["#FF8042", "#0088FE", "#00C49F"];

const topRoutesData = [
  { name: "TP.HCM - Đà Lạt", tickets: 1250 },
  { name: "TP.HCM - Nha Trang", tickets: 980 },
  { name: "TP.HCM - Cần Thơ", tickets: 850 },
  { name: "Hà Nội - Sapa", tickets: 720 },
  { name: "Đà Nẵng - Hội An", tickets: 600 },
];

const recentActivities = [
  {
    user: "Nguyễn Văn A",
    action: "đặt vé chuyến TP.HCM - Đà Lạt",
    time: "5 phút trước",
  },
  {
    user: "Admin",
    action: "thêm chuyến xe mới Sài Gòn - Vũng Tàu",
    time: "30 phút trước",
  },
  {
    user: "Trần Thị B",
    action: "hủy vé chuyến Hà Nội - Sapa",
    time: "1 giờ trước",
  },
  {
    user: "Lê Văn C",
    action: "đặt vé chuyến TP.HCM - Nha Trang",
    time: "3 giờ trước",
  },
];

// --- COMPONENT CON CHO CÁC THÀNH PHẦN ---
const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white p-5 rounded-xl shadow-lg flex items-center transition-transform transform hover:-translate-y-1">
    <div
      className={`w-14 h-14 flex items-center justify-center rounded-full mr-4 ${color}`}
    >
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const DashboardPage = () => {
  return (
    <div className="space-y-8">
      {/* Header của Dashboard */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Tổng quan</h1>
        <div className="flex items-center space-x-4">
          {/* Đây là nơi bạn có thể thêm bộ lọc ngày tháng sau này */}
          <div className="bg-white p-2 rounded-lg shadow-md">
            <span>Thời gian: </span>
            <select className="bg-transparent font-semibold focus:outline-none">
              <option>Tháng này</option>
              <option>Tháng trước</option>
              <option>Năm nay</option>
            </select>
          </div>
        </div>
      </div>

      {/* --- CÁC THẺ THỐNG KÊ NHANH --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={<FaDollarSign size={24} className="text-white" />}
          title="Doanh thu Tháng 6"
          value="1.58 Tỷ"
          color="bg-gradient-to-tr from-green-500 to-green-400"
        />
        <StatCard
          icon={<FaTicketAlt size={24} className="text-white" />}
          title="Vé đã bán (tháng 6)"
          value="1,950"
          color="bg-gradient-to-tr from-blue-500 to-blue-400"
        />
        <StatCard
          icon={<FaUserPlus size={24} className="text-white" />}
          title="Khách hàng mới"
          value="125"
          color="bg-gradient-to-tr from-orange-500 to-orange-400"
        />
      </div>

      {/* --- LƯỚI BỐ CỤC CHÍNH --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Biểu đồ doanh thu (chiếm 2/3) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Phân tích doanh thu (Đơn vị: triệu đồng)
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart
              data={monthlyRevenueData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "0.5rem",
                }}
                formatter={(value) =>
                  `${new Intl.NumberFormat("vi-VN").format(value)}tr`
                }
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ tròn và các hoạt động gần đây (chiếm 1/3) */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Tỷ lệ loại xe
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={busTypeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                >
                  {busTypeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} vé`} />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Hoạt động gần đây
            </h2>
            <ul className="space-y-4">
              {recentActivities.map((activity, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center">
                    <FaClock className="text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-800">
                      <span className="font-semibold text-orange-500">
                        {activity.user}
                      </span>{" "}
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* --- TUYẾN XE HÀNG ĐẦU --- */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Các tuyến xe hàng đầu
        </h2>
        <div className="space-y-4">
          {topRoutesData.map((route, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-gray-600">
                  {index + 1}. {route.name}
                </span>
                <span className="text-gray-500">{route.tickets} vé</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-orange-400 to-orange-500 h-2.5 rounded-full"
                  style={{
                    width: `${
                      (route.tickets / topRoutesData[0].tickets) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
