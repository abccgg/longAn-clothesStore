import { useContext, useEffect } from 'react'
import {assets} from '../assets/frontend_assets/assets'
import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from "react-toastify";
import { ShopContext } from '../context/ShopContext'

const NavBar = () => {
  const [visible,setVisible] = useState(false);
  const {getCartCount,navigate,token,setToken,setCartItems, getUserData, userId, userData} = useContext(ShopContext);
  const [userName, setUserName] = useState(userData?.name);

  useEffect(() => {
    if (userData && userData.name !== userName) {
      setUserName(userData.name); // Cập nhật tên người dùng
    }
  }, [userData]);


  useEffect(() => {
    if (userId) {
        getUserData(userId); 
    }
}, [userId]);

  const logout = () => {
    navigate('/login')
    toast.success('Ban da dang xuat');
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    setUserName('')
    window.location.reload()
  }
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Trang chủ</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>Bộ sưu tập</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>Về chúng tôi</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Liên hệ</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        {/* <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt='' /> */}
        <div className="group relative flex items-center gap-2 cursor-pointer">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            className="w-5"
            src={assets.profile_icon}
            alt=""
          />

          {userData && <p className="text-gray-700">{userName}</p>}


          {/* Dropdown menu */}
          {token && (
            <div className="hidden group-hover:block absolute top-full right-0 pt-2">
              <div className="flex flex-col gap-3 w-48 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg">
                <p
                 onClick={() => navigate("/userDetail")}
                 className="cursor-pointer hover:text-black">
                  Chi tiết tài khoản
                </p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Đơn hàng của tôi
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Đăng xuất
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <img
            onClick={() => (!token ? toast.error('Bạn phải đăng nhập trước đã') : navigate("/cart"))}
            src={assets.cart_icon}
            className="w-5 min-w-5"
            alt=""
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </div>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            Trang chủ
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            Bộ sưu tập
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            Về chúng tôi
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            Liên hệ
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default NavBar
