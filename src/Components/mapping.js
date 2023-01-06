import {usePapaParse} from "react-papaparse";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setResults} from "../app/mappingReducer";

export function ReadMapping() {
    const {readString} = usePapaParse();
    const dispatch = useDispatch();

    // let csvString = ''

    let csvString = `university of calgary\thttps://firebasestorage.googleapis.com/v0/b/petionshipplus.appspot.com/o/uofc.png?alt=media&token=2d616f96-6593-41e5-b40a-2d0f6708e116
intersection\thttps://firebasestorage.googleapis.com/v0/b/petionshipplus.appspot.com/o/inte.png?alt=media&token=ad480048-6278-494b-ab92-c20d08ae0cce
realitytalk\thttps://firebasestorage.googleapis.com/v0/b/petionshipplus.appspot.com/o/rt.mp4?alt=media&token=7aee9235-5d7b-4db7-9044-7c9f548ea972
suzuki\thttps://firebasestorage.googleapis.com/v0/b/petionshipplus.appspot.com/o/profile.png?alt=media&token=36e1a6e9-eac7-47f3-83a6-5c4b3fd85ad8
entrepreneur first\thttps://firebasestorage.googleapis.com/v0/b/petionshipplus.appspot.com/o/logo.png?alt=media&token=0cd1480e-3e1f-4463-aa17-18fae41b9d2b`

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