import './App.css';
import HandsRecognition from "./Components/hands";
import KonvaLayer from "./Components/konva";
import {Speech, TestSpeech} from "./Components/speech";
import ColorTracking from "./Components/color";
import {useDispatch, useSelector} from "react-redux";
import {selectObjectMode} from "./app/colorReducer";
import {usePapaParse} from 'react-papaparse';
import {ReadMapping} from "./Components/mapping";
import {useEffect, useRef, useState} from "react";


function App() {
    const objectMode = useSelector(selectObjectMode)
    const [isObjectMode, setObjectMode] = useState(false);

    useEffect(() => {
        if (objectMode) {
            setObjectMode(true);
        } else {
            setObjectMode(false);
        }
    }, [objectMode])

    return (
        <div className="App">
            <>
                <Speech/>
                <ReadMapping/>
                {/*<ColorTracking/>*/}
                {isObjectMode === true ? <ColorTracking/> : null}
                {/*<TestSpeech/>*/}
                <HandsRecognition/>
                <KonvaLayer/>
            </>
        </div>
    );


}


export default App;
