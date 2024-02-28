import { configureStore } from "@reduxjs/toolkit";
import { brandReducer } from "./brandSlice";
import { categoryReducer } from "./categorySlice";


export let Store = configureStore({
    reducer: {
        brands: brandReducer,
        category: categoryReducer
    }
})

