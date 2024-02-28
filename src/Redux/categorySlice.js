import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {cat : [], isLoading: false , error : null}

export let getCategories = createAsyncThunk('categorySlice/getCategories', 
    async () => {
        let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
        .catch((err)=>err)
        return data.data

    }
)

let categorySlice = createSlice({
    name: "categorySlice",
    initialState,
    extraReducers: (builder)=>{
        builder.addCase(getCategories.pending,(state)=>{
            state.isLoading = true
        });
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.isLoading = false
            state.cat = action.payload
        })
    }
})


export let categoryReducer = categorySlice.reducer