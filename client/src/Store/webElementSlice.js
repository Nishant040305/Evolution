import { createSlice } from "@reduxjs/toolkit";

const webElementSlice= createSlice({
    name:"webElement",
    initialState:{},
    reducers:{
        setElement:(state,action)=>{
            return action.payload;
        },
        setPosition:(state,action)=>{
            return {
                ...state,
                [action.payload.id]:{
                    ...state[action.payload.id],
                    position:{
                        x:state[action.payload.id].position.x+action.payload.dx,
                        y:state[action.payload.id].position.y+action.payload.dy
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
                    transform:action.payload.transform,
                }
            }
        },
        setProperty:(state,action)=>{
            return {
                ...state,
                [action.payload.id]:{
                    ...state[action.payload.id],
                    style:{
                        ...state[action.payload.id].style,
                        [action.payload.property]:action.payload.value
                    }
                }
            }
        },
        setAttribute:(state,action)=>{
            return{
                ...state,
                [action.payload.id]:{
                    ...state[action.payload.id],
                    attribute:{
                        ...state[action.payload.id].attribute,
                        [action.payload.propery]:action.payload.value
                    }
                }
            }
        }
    }
})
export const {setElement,setPosition,addElement,setTransform,setProperty,setAttribute} = webElementSlice.actions;
export default webElementSlice.reducer;