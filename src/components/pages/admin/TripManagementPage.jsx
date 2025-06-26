import React, { useState } from "react";
import Modal from "react-modal";

// Dữ liệu mẫu ban đầu
const initialTrips = [
  {
    id: 1,
    origin: "TP. Hồ Chí Minh",
    destination: "An Giang",
    departureTime: "07:00",
    busType: "Limousine",
    price: "190.000đ",
    status: "Sắp khởi hành",
  },
  {
    id: 2,
    origin: "Đà Nẵng",
    destination: "Cần Thơ",
    departureTime: "19:00",
    busType: "Giường",
    price: "450.000đ",
    status: "Sắp khởi hành",
  },
];

// Gắn modal vào root element của ứng dụng để tránh lỗi về accessibility
Modal.setAppElement("#root");

const TripManagementPage = () => {
  const [trips, setTrips] = useState(initialTrips);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTrip, setCurrentTrip] = useState(null); // Dùng để biết đang sửa chuyến nào
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departureTime: "",
    busType: "Giường",
    price: "",
  });

  // --- HÀM XỬ LÝ MODAL ---
  const openModal = (trip = null) => {
    if (trip) {
      // Chế độ Sửa: điền form với dữ liệu của chuyến xe
      setCurrentTrip(trip);
      setFormData({
        origin: trip.origin,
        destination: trip.destination,
        departureTime: trip.departureTime,
        busType: trip.busType,
        price: trip.price.replace("đ", ""), // Bỏ "đ" để dễ chỉnh sửa
      });
    } else {
      // Chế độ Thêm mới: form rỗng
      setCurrentTrip(null);
      setFormData({
        origin: "",
        destination: "",
        departureTime: "",
        busType: "Giường",
        price: "",
      });
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

  // --- HÀM XỬ LÝ THÊM/SỬA ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentTrip) {
      // Logic Sửa
      setTrips(
        trips.map((trip) =>
          trip.id === currentTrip.id
            ? { ...trip, ...formData, price: formData.price + "đ" }
            : trip
        )
      );
      console.log("Đã cập nhật chuyến xe:", { ...currentTrip, ...formData });
    } else {
      // Logic Thêm mới
      const newTrip = {
        id: trips.length > 0 ? Math.max(...trips.map((t) => t.id)) + 1 : 1, // Tạo ID mới
        ...formData,
        price: formData.price + "đ",
        status: "Sắp khởi hành",
      };
      setTrips([...trips, newTrip]);
      console.log("Đã thêm chuyến xe mới:", newTrip);
    }
    closeModal();
  };

  // --- HÀM XỬ LÝ XÓA ---
  const handleDelete = (tripId, tripInfo) => {
    if (window.confirm(`Bạn có chắc muốn xóa chuyến xe "${tripInfo}"?`)) {
      setTrips(trips.filter((trip) => trip.id !== tripId));
      console.log("Đã xóa chuyến xe ID:", tripId);
    }
  };

  // --- HÀM CẬP NHẬT TRẠNG THÁI ---
  const handleStatusChange = (tripId, newStatus) => {
    setTrips(
      trips.map((trip) =>
        trip.id === tripId ? { ...trip, status: newStatus } : trip
      )
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý Chuyến xe</h1>
        <button
          onClick={() => openModal()}
          className="bg-orange-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-orange-700"
        >
          + Thêm chuyến xe mới
        </button>
      </div>

      {/* Bảng hiển thị danh sách chuyến xe */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <table className="w-full">
          <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-600">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Điểm đi</th>
              <th className="p-3">Điểm đến</th>
              <th className="p-3">Giờ đi</th>
              <th className="p-3">Loại xe</th>
              <th className="p-3">Giá vé</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr key={trip.id} className="border-b hover:bg-orange-100">
                <td className="p-3">{trip.id}</td>
                <td className="p-3 font-semibold">{trip.origin}</td>
                <td className="p-3 font-semibold">{trip.destination}</td>
                <td className="p-3">{trip.departureTime}</td>
                <td className="p-3">{trip.busType}</td>
                <td className="p-3">{trip.price}</td>
                <td className="p-3">
                  <select
                    value={trip.status}
                    onChange={(e) =>
                      handleStatusChange(trip.id, e.target.value)
                    }
                    className="p-1 border rounded-md text-xs"
                  >
                    <option>Sắp khởi hành</option>
                    <option>Đang chạy</option>
                    <option>Đã hoàn thành</option>
                    <option>Đã hủy</option>
                  </select>
                </td>
                <td className="p-3 whitespace-nowrap space-x-1">
                  <button
                    onClick={() => openModal(trip)}
                    className="px-3 py-1 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-800 transition"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(
                        trip.id,
                        `${trip.origin} - ${trip.destination}`
                      )
                    }
                    className="px-3 py-1  rounded-md bg-red-500 text-white font-medium hover:bg-red-800 transition  "
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL CHO FORM THÊM/SỬA --- */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Trip Form Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "40rem",
            padding: "2rem",
            borderRadius: "0.5rem",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
        }}
      >
        <h2 className="text-2xl font-bold mb-6">
          {currentTrip ? "Sửa thông tin chuyến xe" : "Thêm chuyến xe mới"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Điểm đi
              </label>
              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Điểm đến
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Giờ khởi hành (HH:mm)
              </label>
              <input
                type="text"
                name="departureTime"
                value={formData.departureTime}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Giá vé
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Loại xe
              </label>
              <select
                name="busType"
                value={formData.busType}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option>Giường</option>
                <option>Limousine</option>
                <option>Ghế</option>
              </select>
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
              {currentTrip ? "Lưu thay đổi" : "Thêm mới"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TripManagementPage;
