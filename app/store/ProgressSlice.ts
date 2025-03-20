import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

interface InitialState{
    current : number,
    isError: boolean,
    totalProgress: number
}

const initalState: InitialState ={
    current: 0,
    isError: false,
    totalProgress: 0
}

const ProgressSlice = createSlice({
    name: "progress",
    initialState: initalState,
    reducers:{
        incrementCurrent: (state)=>{
            state.current+=1
            state.totalProgress = Math.max(state.totalProgress, state.current);
        },
        setCurrentByValue: (state,action: PayloadAction<{value:number}>)=>{
            // console.log(action.payload.value);
            state.current=action.payload.value
        },
        decrementCurret: (state)=>{
            
            state.current>0? state.current-=1: state.current
        },
        setError: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isError = action.payload.value;
        },
        setTotalProgress: (state, action: PayloadAction<{ value: number}>)=>{
            state.totalProgress= action.payload.value;
        }

    }
})

export default ProgressSlice.reducer;
export const { incrementCurrent, decrementCurret, setCurrentByValue, setError, setTotalProgress } =ProgressSlice.actions;