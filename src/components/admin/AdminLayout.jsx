import React from "react";
import { NavLink, Outlet } from "react-router-dom";

// Component NavLink sẽ giúp làm nổi bật link đang active
// Outlet là nơi nội dung của các trang con (Dashboard, Quản lý chuyến xe) sẽ được hiển thị

const AdminLayout = () => {
  const activeLinkStyle = {
    backgroundColor: "#EA580C", // Màu cam đậm
    color: "white",
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Menu bên trái */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-gray-700">
          FUTA Admin
        </div>
        <nav className="flex-1 px-4 py-4">
          <NavLink
            to="/admin/dashboard"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            className="block px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/customers"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            className="block px-4 py-2 mt-2 rounded-md hover:bg-gray-700"
          >
            Quản lý Khách hàng
          </NavLink>
          <NavLink
            to="/admin/payment-confirm"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            className="block px-4 py-2 mt-2 rounded-md hover:bg-gray-700"
          >
            Xác nhận Thanh toán
          </NavLink>

          <NavLink
            to="/admin/trips"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            className="block px-4 py-2 mt-2 rounded-md hover:bg-gray-700"
          >
            Quản lý Chuyến xe
          </NavLink>
          {/* Thêm các link quản lý khác ở đây */}
        </nav>
      </aside>

      {/* Main Content - Nội dung chính bên phải */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
