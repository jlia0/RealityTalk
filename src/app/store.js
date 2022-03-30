import {configureStore} from '@reduxjs/toolkit'
import handsReducer from "./handsReducer";
import speechReducer from "./speechReducer";
import colorReducer from "./colorReducer";
import mappingReducer from "./mappingReducer";

export default configureStore({
    reducer: {
        hands: handsReducer,
        speech:speechReducer,
        color: colorReducer,
        mapping:mappingReducer
    }
})