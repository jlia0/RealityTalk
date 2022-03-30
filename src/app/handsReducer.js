import {createSlice} from '@reduxjs/toolkit'

export const handsSlice = createSlice({
    name: 'hands',
    initialState: {
        thumb: {},
        leftIndex: {},
        rightIndex: {},
        middle: {},
        multiHand: 0,
        leftPinch: false,
        rightPinch: false,
        leftPointing: false,
        rightPointing: false,
        leftPointingTwo: false,
        rightPointingTwo: false
    },
    reducers: {
        setThumb: (state, action) => {
            state.thumb = action.payload
        },
        setLeftIndex: (state, action) => {
            state.leftIndex = action.payload
        },
        setRightIndex: (state, action) => {
            state.rightIndex = action.payload
        },
        setMiddle: (state, action) => {
            state.middle = action.payload
        },
        setMultiHand: (state, action) => {
            state.multiHand = action.payload
        },
        setLeftPinch: (state, action) => {
            state.leftPinch = action.payload
        },
        setRightPinch: (state, action) => {
            state.rightPinch = action.payload
        },
        setLeftPointing: (state, action) => {
            state.leftPointing = action.payload
        },
        setRightPointing: (state, action) => {
            state.rightPointing = action.payload
        },
        setLeftPointingTwo: (state, action) => {
            state.leftPointingTwo = action.payload
        },
        setRightPointingTwo: (state, action) => {
            state.rightPointingTwo = action.payload
        },
    }
})

export const {
    setThumb,
    setLeftIndex,
    setRightIndex,
    setMiddle,
    setLeftPinch,
    setRightPinch,
    setMultiHand,
    setLeftPointing,
    setRightPointing,
    setLeftPointingTwo,
    setRightPointingTwo
} = handsSlice.actions

export const selectThumb = (state) => state.hands.thumb;
export const selectLeftIndex = (state) => state.hands.leftIndex;
export const selectRightIndex = (state) => state.hands.rightIndex;
export const selectMiddle = (state) => state.hands.middle;
export const selectMultiHand = (state) => state.hands.multiHand;
export const selectLeftPinch = (state) => state.hands.leftPinch;
export const selectRightPinch = (state) => state.hands.rightPinch;
export const selectLeftPointing = (state) => state.hands.leftPointing;
export const selectRightPointing = (state) => state.hands.rightPointing;
export const selectLeftPointingTwo = (state) => state.hands.leftPointingTwo;
export const selectRightPointingTwo = (state) => state.hands.rightPointingTwo;

export default handsSlice.reducer