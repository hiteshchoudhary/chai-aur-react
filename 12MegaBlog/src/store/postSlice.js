import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
}

const postSlice = createSlice({
    name:'post',
    initialState,
    reducers: {
        createPost: (state, action) => {
            state.posts.push({...action.payload});
        },

        updatePost: (state, action) => {
          const { post, data } = action.payload;
          state.posts = state.posts.map((p) => p.$id === post.$id ? { $id: post.$id, ...data } : p)
        },
        
        removePost: (state, action) => {
            const post = action.payload;
            state.posts = state.posts.filter((p) => p.$id !== post.$id);
        },

        setPosts: (state, action) => {
            const posts = action.payload;
            state.posts = [...posts];
        }
     
    }
})

export const { createPost, updatePost, removePost, setPosts } = postSlice.actions;

const postReducer = postSlice.reducer;

export default postReducer;
