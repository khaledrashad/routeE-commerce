import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
    items: [],
    isLoading: true,
    isError: null,
}

export let getWishlist = createAsyncThunk("wishlistSlice/getWishlist",
    async ()=>{
        let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/wishlist`,{
            headers: {
                token: localStorage.getItem("token")
            }
        }).catch((err)=> console.log(err))
        return data
    }
)
export let addWishlistItem = createAsyncThunk("wishlistSlice/addWishlistItem",
    async (id)=>{
        let {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/wishlist`,
        {productId : id} , {
            headers: {
                token: localStorage.getItem("token")
            }
        }).catch((err)=> console.log(err))
         return data; 
    }
)
export let removeWishlistItem = createAsyncThunk("wishlistSlice/removeWishlistItem",
    async (id)=>{
        let {data} = await axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${id}`,{
            headers: {
                token: localStorage.getItem("token")
            }
        }).catch((err)=> err)
        console.log(data);
        return data
    }
)

let wishlistSlice = createSlice({
    name: "wishlistSlice",
    initialState,
    extraReducers: (builder)=>{
        builder.addCase(getWishlist.pending , (state)=>{
            state.isLoading = true
        })
        builder.addCase(getWishlist.fulfilled, (state , action) => {
            state.isLoading = false
            state.items = action.payload
        })
        builder.addCase(addWishlistItem.fulfilled, (state , action) => {
            state.items = action.payload
        })
        builder.addCase(removeWishlistItem.pending , (state)=>{
            state.isLoading = true
        })
        builder.addCase(removeWishlistItem.fulfilled, (state , action) => {
            state.isLoading = false
        })
    }
})

export let wishlistReducer = wishlistSlice.reducer