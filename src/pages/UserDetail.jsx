import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const UserDetail = () => {
  const { userId, userData, updateUserData } = useContext(ShopContext);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData || !formData.name || !formData.email) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
   await updateUserData(userId, formData);
    window.location.reload();
    toast.success("Cập nhật thành công!");
  };

  return (
    <div className="justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSave}
        // className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Thông tin người dùng</h2>

        <label className="block font-bold mb-2">Tên</label>
        <input
          type="text"
          value={formData.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-[50%] px-2 py-1 border rounded mb-4"
        />

        <label className="block font-bold mb-2">Email</label>
        <input
          type="email"
          value={formData.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-[50%] px-2 py-1 border rounded mb-4"
        />

        <div className="flex w-[40%] gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDetail;
