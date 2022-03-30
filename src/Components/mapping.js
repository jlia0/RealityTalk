import {usePapaParse} from "react-papaparse";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setResults} from "../app/mappingReducer";

export function ReadMapping() {
    const {readString} = usePapaParse();
    const dispatch = useDispatch();

    const csvString = `university of calgary\thttps://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimages.all-free-download.com%2Fimages%2Fgraphiclarge%2Funiversity_of_calgary_87471.jpg
recording\thttps://firebasestorage.googleapis.com/v0/b/metar-e5f0d.appspot.com/o/1554414349614495.mp4?alt=media&token=d6399112-c747-42f5-9ac2-eaa0bad52c16
demo\thttps://firebasestorage.googleapis.com/v0/b/metar-e5f0d.appspot.com/o/video_demo.mp4?alt=media&token=09cf6f04-2370-49b4-8c43-a75561c69962
embedded\thttps://www.youtube.com/embed/xDMP3i36naA
bottle\tobject mode start
presentation\tobject mode end`


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