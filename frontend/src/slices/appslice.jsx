import {createSlice} from "@reduxjs/toolkit";

const initialState = {
        open:true, 
        video:[],
        category:"All", 
        
    };

const appSlice = createSlice({
    name:"app",
    initialState,  
    reducers:{
        // actions
        toggleSidebar:(state)=>{
            state.open = !state.open;
        },
        setHomeVideo:(state,action)=>{
            state.video = action.payload;
        },
        setCategory:(state,action)=>{
            state.category = action.payload;
        },
       
    } 
});
export const {toggleSidebar,setHomeVideo,setCategory} = appSlice.actions;
export default appSlice.reducer;