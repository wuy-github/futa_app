import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";

// Dữ liệu mẫu ban đầu
const initialCustomers = [
  {
    id: "KH001",
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    phone: "0909123456",
    joinDate: "20/06/2025",
  },
  {
    id: "KH002",
    name: "Trần Thị B",
    email: "tranthib@email.com",
    phone: "0987654321",
    joinDate: "21/06/2025",
  },
  {
    id: "KH003",
    name: "Lê Văn C",
    email: "levanc@email.com",
    phone: "0912345678",
    joinDate: "22/06/2025",
  },
];

// Gắn modal vào root element của ứng dụng
Modal.setAppElement("#root");

const CustomerListPage = () => {
  // --- STATE QUẢN LÝ DỮ LIỆU VÀ GIAO DIỆN ---
  const [customers, setCustomers] = useState(initialCustomers);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null); // Để biết đang sửa ai
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // --- HÀM XỬ LÝ MODAL ---
  const openModal = (customer = null) => {
    if (customer) {
      // Chế độ Sửa
      setCurrentCustomer(customer);
      setFormData({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      });
    } else {
      // Chế độ Thêm mới
      setCurrentCustomer(null);
      setFormData({ name: "", email: "", phone: "" });
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- HÀM XỬ LÝ LOGIC THÊM/SỬA/XÓA ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentCustomer) {
      // Logic Sửa
      setCustomers(
        customers.map((customer) =>
          customer.id === currentCustomer.id
            ? { ...customer, ...formData }
            : customer
        )
      );
    } else {
      // Logic Thêm mới
      const newIdNumber =
        customers.length > 0
          ? parseInt(customers[customers.length - 1].id.replace("KH", "")) + 1
          : 1;
      const newCustomer = {
        id: `KH${String(newIdNumber).padStart(3, "0")}`,
        ...formData,
        joinDate: new Date().toLocaleDateString("vi-VN"),
      };
      setCustomers([...customers, newCustomer]);
    }
    closeModal();
  };

  const handleDelete = (customerId, customerName) => {
    if (
      window.confirm(`Bạn có chắc chắn muốn xóa người dùng "${customerName}"?`)
    ) {
      setCustomers(customers.filter((customer) => customer.id !== customerId));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Danh sách Khách hàng
        </h1>
        <button
          onClick={() => openModal()}
          className="bg-orange-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-orange-700"
        >
          + Thêm khách hàng mới
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <table className="w-full">
          <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-600">
            <tr>
              <th className="p-3">ID Khách hàng</th>
              <th className="p-3">Họ tên</th>
              <th className="p-3">Email</th>
              <th className="p-3">Số điện thoại</th>
              <th className="p-3">Ngày tham gia</th>
              <th className="p-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-mono text-sm">{customer.id}</td>
                <td className="p-3">{customer.name}</td>
                <td className="p-3">{customer.email}</td>
                <td className="p-3">{customer.phone}</td>
                <td className="p-3">{customer.joinDate}</td>
                <td className="p-3 whitespace-nowrap space-x-1">
                  {/* =====  THÊM LẠI LINK XEM LỊCH SỬ ===== */}
                  <Link
                    to={`/admin/customers/${customer.id}/history`}
                    className="px-3 py-1 bg-green-500 text-white rounded-md font-semibold hover:bg-green-800 transition"
                  >
                    Xem lịch sử
                  </Link>
                  <button
                    onClick={() => openModal(customer)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-800 transition"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(customer.id, customer.name)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md font-semibold hover:bg-red-800 transition"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL CHO FORM THÊM/SỬA KHÁCH HÀNG --- */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Customer Form Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "32rem",
            padding: "2rem",
            borderRadius: "0.5rem",
          },
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
        }}
      >
        <h2 className="text-2xl font-bold mb-6">
          {currentCustomer ? "Sửa thông tin khách hàng" : "Thêm khách hàng mới"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Họ tên
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Số điện thoại
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
            >
              {currentCustomer ? "Lưu thay đổi" : "Thêm mới"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CustomerListPage;
