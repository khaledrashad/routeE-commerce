import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext()

export default function CartContxtProvider(props) {

    const [Cart, setCart] = useState([])
    let userToken = localStorage.getItem("token")


    function addToCart(productId) {
        return axios.post(`https://route-ecommerce.onrender.com/api/v1/cart`, {
            productId
        }, {
            headers: {
                token: userToken
            }
        })
        .then(res => res)
        .catch(err => err)
    }

    return <CartContext.Provider value={{addToCart}}>
        {props.children}
    </CartContext.Provider>

}