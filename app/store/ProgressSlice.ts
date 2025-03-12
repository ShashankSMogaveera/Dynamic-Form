import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const ProgressSlice = createSlice({
    name: "progress",
    initialState: {
        current: 0
    },
    reducers:{
        incrementCurrent: (state)=>{
            console.log('increment')
            state.current+=1
            console.log(state.current)
        },
        incrementCurrentByValue: (state,action: PayloadAction<number>)=>{
            console.log('increment')
            state.current=action.payload
            console.log(state.current)
        },
        decrementCurret: (state)=>{
            console.log('decrement')
            
            state.current>0? state.current-=1: state.current
            console.log(state.current)
        },

    }
})

export default ProgressSlice.reducer;
export const { incrementCurrent, decrementCurret, incrementCurrentByValue } =ProgressSlice.actions;