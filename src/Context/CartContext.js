import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext()

export default function CartContextProvider(props) {

    const [Cart, setCart] = useState(null)
    let headers = { token: localStorage.getItem("token") }


    function addToCart(productId) {
        return axios.post(`https://route-ecommerce.onrender.com/api/v1/cart`, {
            productId
        }, {
            headers
        })
            .then(res => res)
            .catch(err => err)
    }

    function deleteCartItem(id) {
        return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`, {
            headers
        })
            .then(res => res)
            .catch(err => err)
    }

    function deleteAllItems() {
        return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart`, {
            headers
        })
            .then(res => res)
            .catch(err => err)
    }
    function updateItemCount(id ,count) {
        return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,{
            count
        } ,{
            headers
        })
            .then(res => res)
            .catch(err => err)
    }

    return <CartContext.Provider value={{ addToCart, deleteCartItem, Cart, setCart , deleteAllItems, updateItemCount}}>
        {props.children}
    </CartContext.Provider>

}