import { createSlice } from "@reduxjs/toolkit";

const webElementSlice= createSlice({
    name:"webElement",
    initialState:{},
    reducers:{
        setWebElement:(state,action)=>{
            return action.payload;
        }
    }
})
export const {setWebElement} = webElementSlice.actions;
export default webElementSlice.reducer;