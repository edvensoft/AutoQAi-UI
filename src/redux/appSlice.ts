import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface AppState{
    project_id:string,
    user_id:string
}

const initialState:AppState={
    project_id:'',
    user_id:'1'
}

const appSlice = createSlice({
    name:'applicationState',
    initialState,
    reducers:{
        setProjectId:(state,action:PayloadAction<string>)=>{
            state.project_id=action.payload;
        },
        setUserId:(state,action:PayloadAction<string>)=>{
            state.user_id=action.payload;
        },
    }
})

export const { setProjectId,setUserId } = appSlice.actions;
export default appSlice.reducer;
