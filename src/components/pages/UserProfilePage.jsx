// File: src/pages/UserProfilePage.jsx
// BA COMPONENT ĐƯỢC GỘP CHUNG VÀO MỘT FILE

import React from "react";
import { Link, useLocation } from "react-router-dom"; // Cần react-router-dom
import {
  FaCreditCard,
  FaUserCircle,
  FaHistory,
  FaMapMarkerAlt,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";

//==================================================================
// Component 1: Sidebar (Thanh điều hướng bên trái)
//==================================================================
const menuItems = [
  { to: "/futapay", icon: <FaCreditCard />, text: "FUTAPay" },
  { to: "/profile", icon: <FaUserCircle />, text: "Thông tin tài khoản" },
  { to: "/purchase-history", icon: <FaHistory />, text: "Lịch sử mua vé" },
  { to: "/addresses", icon: <FaMapMarkerAlt />, text: "Địa chỉ của bạn" },
  { to: "/change-password", icon: <FaKey />, text: "Đặt lại mật khẩu" },
  { to: "/logout", icon: <FaSignOutAlt />, text: "Đăng xuất" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`flex items-center py-3 px-4 my-1 rounded-md text-sm font-medium transition-colors ${
                  // Dòng này sẽ highlight menu item đang được chọn
                  location.pathname === item.to
                    ? "bg-orange-100 text-orange-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

//==================================================================
// Component 2: ProfileContent (Nội dung chính hiển thị thông tin)
//==================================================================

// Component con để hiển thị từng trường thông tin
const ProfileField = ({ label, value }) => {
  return (
    <div className="flex items-center py-3">
      <dt className="w-1/3 text-sm font-medium text-gray-500">{label}</dt>
      <dd className="w-2/3 text-sm text-gray-900 font-semibold">
        {value || <span className="text-gray-400 italic">Chưa cập nhật</span>}
      </dd>
    </div>
  );
};

const ProfileContent = ({ user }) => {
  if (!user) {
    return <div>Đang tải thông tin...</div>;
  }

  const handleUpdate = () => {
    // Logic để gọi API cập nhật thông tin sẽ ở đây
    alert("Chức năng đang được phát triển!");
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      alert(`Đã chọn file: ${e.target.files[0].name}. Logic upload sẽ ở đây.`);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Thông tin tài khoản
      </h2>
      <p className="text-sm text-gray-500 mb-8">
        Quản lý thông tin hồ sơ để bảo mật tài khoản
      </p>

      <div className="flex flex-col lg:flex-row">
        {/* Cột thông tin */}
        <div className="w-full lg:w-2/3 lg:pr-8">
          <dl className="divide-y divide-gray-200">
            <ProfileField label="Họ và tên" value={user.fullName} />
            <ProfileField label="Số điện thoại" value={user.phone} />
            <ProfileField label="Giới tính" value={user.gender} />
            <ProfileField label="Email" value={user.email} />
            <ProfileField
              label="Ngày sinh"
              value={user.birthDate || "Invalid date"}
            />
            <ProfileField label="Địa chỉ" value={user.address} />
            <ProfileField label="Nghề nghiệp" value={user.job} />
          </dl>
        </div>

        {/* Cột ảnh đại diện */}
        <div className="w-full lg:w-1/3 mt-8 lg:mt-0 flex flex-col items-center justify-start lg:border-l lg:pl-8">
          <img
            src={user.avatarUrl}
            alt="Ảnh đại diện"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <label
            htmlFor="avatar-upload"
            className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Chọn ảnh
          </label>
          <input
            id="avatar-upload"
            name="avatar-upload"
            type="file"
            className="sr-only"
            onChange={handleFileChange}
          />
          <p className="text-xs text-gray-400 mt-2 text-center">
            Dung lượng file tối đa 1 MB <br /> Định dạng: .JPEG, .PNG
          </p>
        </div>
      </div>

      <div className="mt-8 text-right">
        <button
          onClick={handleUpdate}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-md shadow-md transition-colors"
        >
          Cập nhật
        </button>
      </div>
    </div>
  );
};

//==================================================================
// Component 3: UserProfilePage (Component chính, được export)
//==================================================================

// Dữ liệu người dùng giả lập - Thay thế bằng dữ liệu thật từ Context/API
const mockUser = {
  fullName: "Đặng Quốc Huy",
  phone: "0865864705",
  email: "quochuyw2610@gmail.com",
  gender: "Nam",
  birthDate: null,
  address: "Quận 1, TP. Hồ Chí Minh",
  job: "Lập trình viên",
  avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
};

function UserProfilePage() {
  // Trong ứng dụng thật, bạn sẽ dùng một hook như `useAuth()` để lấy `user`
  // const { user } = useAuth();
  const user = mockUser; // Tạm thời dùng dữ liệu giả lập

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Bạn có thể đặt Header chung của trang web ở đây nếu muốn */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          {/* Cột trái chứa Sidebar */}
          <div className="w-full md:w-1/4 px-4">
            <Sidebar />
          </div>

          {/* Cột phải chứa nội dung chính */}
          <div className="w-full md:w-3/4 px-4 mt-8 md:mt-0">
            <ProfileContent user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
