import './App.css';
import HandsRecognition from "./Components/hands";
import KonvaLayer from "./Components/konva";
import {Speech, TestSpeech} from "./Components/speech";
import ColorTracking from "./Components/color";
import {useSelector} from "react-redux";
import {selectObjectMode} from "./app/colorReducer";
import {usePapaParse} from 'react-papaparse';


function App() {
    let objectMode = useSelector(selectObjectMode)

    return (
        <div className="App">
            <>
                {/*<ReadString/>*/}
                {objectMode ? <ColorTracking/> : <></>}
                {/*<Speech/>*/}
                <TestSpeech/>
                <HandsRecognition/>
                <KonvaLayer/>
            </>

        </div>
    );
}


function ReadString() {
    const {readString} = usePapaParse();

    const handleReadString = () => {
        const csvString = `Column 1,Column 2,Column 3,Column 4
1-1,1-2,1-3,1-4
2-1,2-2,2-3,2-4
3-1,3-2,3-3,3-4
4,5,6,7`;

        readString(csvString, {
            worker: true,
            header: true,
            complete: (results) => {
                console.log('---------------------------');
                let object = new Object();
                results.data.forEach((ele) => {
                    let name = ele['Column 1'];
                    let val = ele['Column 2'];
                    Object.assign(object, {[name]: val})
                })
                console.log(object)
                console.log('---------------------------');
                console.log(object['1-1'])
            },
        });
    };

    return <button onClick={() => handleReadString()}>readString</button>;
}

export default App;
