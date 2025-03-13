import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const ProgressSlice = createSlice({
    name: "progress",
    initialState: {
        current: 0,
        isError: false
    },
    reducers:{
        incrementCurrent: (state)=>{
            console.log('increment')
            state.current+=1
            console.log(state.current)
        },
        incrementCurrentByValue: (state,action: PayloadAction<{value:number}>)=>{
            console.log('increment')
            state.current=action.payload.value
            console.log(state.current)
        },
        decrementCurret: (state)=>{
            console.log('decrement')
            
            state.current>0? state.current-=1: state.current
            console.log(state.current)
        },
        setError: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isError = action.payload.value;
        },

    }
})

export default ProgressSlice.reducer;
export const { incrementCurrent, decrementCurret, incrementCurrentByValue, setError } =ProgressSlice.actions;