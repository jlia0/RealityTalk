import {createSlice} from '@reduxjs/toolkit'

export const speechSlice = createSlice({
    name: 'speech',
    initialState: {
        interimTranscript: '',
        finalTranscript: '',
        tokens: [],

    },
    reducers: {
        setTokens: (state, action) => {
            state.tokens = action.payload
        },
        setInterimTranscript: (state, action) => {
            state.interimTranscript = action.payload
        },
        setFinalTranscript: (state, action) => {
            state.finalTranscript = action.payload
        },
    }
})

export const {setTokens, setInterimTranscript, setFinalTranscript} = speechSlice.actions
export const selectTokens = (state) => state.speech.tokens;
export const selectInterimTranscript = (state) => state.speech.interimTranscript;
export const selectFinalTranscript = (state) => state.speech.finalTranscript;


export default speechSlice.reducer