import {createSlice} from '@reduxjs/toolkit'

export const colorSlice = createSlice({
    name: 'color',
    initialState: {
        camera: '',
        object_mode: false,
        pos_x: 0,
        pos_y: 0

    },
    reducers: {
        setCamera: (state, action) => {
            state.camera = action.payload
        },
        setObjectMode: (state, action) => {
            state.object_mode = action.payload
        },
        setObjectPositionX: (state, action) => {
            state.pos_x = action.payload
        },
        setObjectPositionY: (state, action) => {
            state.pos_y = action.payload
        },
    }
})

export const {setCamera, setObjectMode, setObjectPositionX, setObjectPositionY} = colorSlice.actions
export const selectCamera = (state) => state.color.camera;
export const selectObjectMode = (state) => state.color.object_mode;
export const selectObjectPosX = (state) => state.color.pos_x;
export const selectObjectPosY = (state) => state.color.pos_y;

export default colorSlice.reducer