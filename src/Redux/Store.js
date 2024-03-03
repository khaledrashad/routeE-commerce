import { configureStore } from "@reduxjs/toolkit";
import { brandReducer } from "./brandSlice";
import { categoryReducer } from "./categorySlice";
import { wishlistReducer } from "./wishlistSlice";


export let Store = configureStore({
    reducer: {
        brands: brandReducer,
        category: categoryReducer,
        wishlist: wishlistReducer
    }
})

