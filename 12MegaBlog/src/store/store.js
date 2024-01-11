import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import postReducer from "./postSlice";

const store = configureStore({
    reducer: {
        auth : authSlice,
        //TODO: add more slices here for posts
        post: postReducer
    }
});


export default store;
