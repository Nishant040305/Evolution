import { createSlice } from "@reduxjs/toolkit";

const webElementSlice= createSlice({
    name:"webElement",
    initialState:{},
    reducers:{
        setElement:(state,action)=>{
            return action.payload;
        }
    }
})
export const {setElement} = webElementSlice.actions;
export default webElementSlice.reducer;