import {usePapaParse} from "react-papaparse";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setResults} from "../app/mappingReducer";

export function ReadMapping() {
    const {readString} = usePapaParse();
    const dispatch = useDispatch();

    let csvString = ``

    csvString = csvString.replace('youtu.be/', 'www.youtube.com/embed/')
    // csvString = csvString + `
    // bottle\tobject mode start`


    useEffect(() => {
        handleReadString()
    }, [])

    const handleReadString = () => {


        readString(csvString, {
            worker: true,
            // header: true,
            complete: (results) => {
                // console.log('---------------------------');
                // let object = new Object();
                // results.data.forEach((ele) => {
                //     let name = ele['Column 1'];
                //     let val = ele['Column 2'];
                //     Object.assign(object, {[name]: val})
                // })
                // console.log(object)
                // console.log(results)
                dispatch(setResults(results.data))
                // console.log('---------------------------');
                // console.log(object['1-1'])
            },
        });
    };

    return <></>
}