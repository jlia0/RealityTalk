import {createSlice} from '@reduxjs/toolkit'

export const colorSlice = createSlice({
    name: 'color',
    initialState: {
        camera: '',
        object_mode: false

    },
    reducers: {
        setCamera: (state, action) => {
            state.camera = action.payload
        },
        setObjectMode: (state, action) => {
            state.object_mode = action.payload
        }
    }
})

export const {setCamera} = colorSlice.actions
export const selectCamera = (state) => state.color.camera;
export const selectObjectMode = (state) => state.color.object_mode;


export default colorSlice.reducer