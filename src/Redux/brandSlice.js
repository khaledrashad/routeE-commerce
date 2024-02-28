import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
    brands: [],
    isLoading: false,
    error: null
}

export let getBrands = createAsyncThunk("brandSlice/getBrands", 
    async () => {
        let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/brands`)
        .catch((err)=> err)
        return data.data ;
    }
)

let brandSlice = createSlice({
    name: "brandSlice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getBrands.pending , (state , action) => {
            state.isLoading = true
        });
        builder.addCase(getBrands.fulfilled , (state, action)=>{
            state.isLoading = false
            state.brands = action.payload
        })
    }
}
)

export let brandReducer = brandSlice.reducer