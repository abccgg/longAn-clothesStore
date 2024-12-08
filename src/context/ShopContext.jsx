import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'; 

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const backendurl = import.meta.env.VITE_BACKEND_URL
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(true);
    const [products,setProducts] = useState([]);
    const [cartItems,setCartItems] = useState({});
    const [token,setToken] = useState(null);
    const [userData,setUserData] = useState(false);
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);


    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded.id); 
        }
    }, [token]);
    
    const addToCart = async (itemId,size) => {
        if (!size){
            toast.error('Vui long chon size!');
            return;
        }
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]){
            if (cartData[itemId][size]){
                cartData[itemId][size] += 1;
                toast.success('Da them vao gio hang');
            }else{
                cartData[itemId][size] = 1;
                toast.success('Da them vao gio hang');
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
            toast.success('Da them vao gio hang');
        }
        setCartItems(cartData);
        if (token) {
            try {
                await axios.post(backendurl + '/api/cart/add',{itemId,size},{headers:{token}})
                
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems){
            for (const item in cartItems[items]){
                try{
                    if (cartItems[items][item] >0 ){
                        totalCount += cartItems[items][item];
                    }
                }catch (error){
                    console.log(error)
                }
            }
        }
        return totalCount;
    }
    const updateQuantity = async (itemId,size,quantity) =>{
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
        if (token){
            try {
                await axios.post(backendurl + '/api/cart/update',{itemId,size,quantity},{headers:{token}})
                toast.success('Xoa san pham thanh cong');
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }
    const getCartAmount = () => {
        let totalAmount = 0 ;
        for (const items in cartItems){
            let itemInfo = products.find((product)=> product._id === items);
            for (const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0){
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                }catch (error){
                    console.log(error)
                }
            }
        }
        return totalAmount;
    }

    const getUserData = async (id) => {
        try {
            const response = await axios.get(backendurl + `/api/user/details/${id}`)
            if (response.data.success){            
                setUserData(response.data.user)
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const updateUserData = async (id, updatedData) => {
        try {
            const response = await axios.put(backendurl + `/api/user/update/${id}`, updatedData, {headers: {token}});
            if (response.data.success) {
                setUserData(response.data.user);
                toast.success('Cập nhật thông tin thành công!');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Có lỗi xảy ra khi cập nhật thông tin.');
        }
    };



    const getProductData = async () => {
        try {
            const response = await axios.get(backendurl + '/api/product/list')
            if (response.data.success){
                setProducts(response.data.products)
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendurl + '/api/cart/get',{},{headers:{token}})
            if (response.data.success){
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        getProductData();
     
    },[])
    useEffect(()=>{
        if (!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[])
    const value = {
        products, currency, delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart, setCartItems,
        getCartCount,updateQuantity,
        getCartAmount, navigate,
        backendurl, setToken,token, userData, getUserData, userId, updateUserData
    }
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;