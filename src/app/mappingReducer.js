import {createSlice} from '@reduxjs/toolkit'

export const mappingSlice = createSlice({
    name: 'mapping',
    initialState: {
        results: [],
    },
    reducers: {
        setResults: (state, action) => {
            state.results = action.payload
        },
    }
})

export const {setResults} = mappingSlice.actions
export const selectResults = (state) => state.mapping.results;


export default mappingSlice.reducer