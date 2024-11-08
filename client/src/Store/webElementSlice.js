import { createSlice } from "@reduxjs/toolkit";

const webElementSlice= createSlice({
    name:"webElement",
    initialState:{},
    reducers:{
        setElement:(state,action)=>{
            return action.payload;
        },
        setPosition:(state,action)=>{
            if (state[action.payload.id].position === undefined || state[action.payload.id].parent !== undefined)
                return state;
            return {
                ...state,
                [action.payload.id]:{
                    ...state[action.payload.id],
                    position:{
                        x:action.payload.dx,
                        y:action.payload.dy
                    }
                }
            }
        },
        addElement:(state,action)=>{
            return{
                ...state,
                [action.payload.hash]:action.payload.value
            }
        },
        setTransform:(state,action)=>{
            return {
                ...state,
                [action.payload.id]:{
                    ...state[action.payload.id],
                    styles:{
                        ...state[action.payload.id].styles,
                        transform:action.payload.transform,
                    }
                }
            }
        },
        setProperty:(state,action)=>{
            const newEl =  {
                ...state,
                [action.payload.id]:{
                    ...state[action.payload.id],
                    styles:{
                        ...state[action.payload.id].styles,
                        [action.payload.property]:action.payload.value
                    }
                }
            }
            console.log(newEl)
            return newEl
        },
        setAttribute:(state,action)=>{
            return{
                ...state,
                [action.payload.id]:{
                    ...state[action.payload.id],
                    attributes:{
                        ...state[action.payload.id].attributes,
                        [action.payload.property]:action.payload.value
                    }
                }
            }
        },
        setContent:(state,action)=>{
            return{
                ...state,
                [action.payload.id]:{
                    ...state[action.payload.id],
                    [action.payload.property]:action.payload.value
                    
                }
            }
        }
    }
})
export const {setElement,setPosition,addElement,setTransform,setProperty,setAttribute,setContent} = webElementSlice.actions;
export default webElementSlice.reducer;