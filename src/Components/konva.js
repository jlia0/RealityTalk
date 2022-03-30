import {Stage, Layer, Rect, Circle, Image, Group, Text, Label, Tag, Line} from 'react-konva';
import './konva.css'
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    selectThumb,
    selectLeftIndex,
    selectRightIndex,
    selectMiddle,
    selectLeftPinch,
    selectRightPinch,
    selectMultiHand, selectLeftPointing, selectRightPointing, selectLeftPointingTwo, selectRightPointingTwo
} from "../app/handsReducer";
import {selectInterimTranscript, selectTokens} from "../app/speechReducer";

import {EmbeddedScreen} from "./KonvaElements/embeddedscreen";
import {calc_angle, detectURL, dist, findGroup, findLabel, get_url_extension, getRandomNumber} from "./helper";
import {EmbedWithGroup, ImageWithGroup, TextWithGroup, VideoWithGroup} from "./visuals";
import {selectResults} from "../app/mappingReducer";
import {withGroup} from "./KonvaElements/groupwrapper";
import {selectObjectMode, selectObjectPosX, selectObjectPosY, setObjectMode} from "../app/colorReducer";
// import {socket} from "./speech";


function KonvaLayer() {
    const stageRef = useRef(null)
    const [list, setList] = useState([])
    const leftPinch = useSelector(selectLeftPinch)
    const rightPinch = useSelector(selectRightPinch)
    const leftIndex = useSelector(selectLeftIndex)
    const rightIndex = useSelector(selectRightIndex)
    const tokens = useSelector(selectTokens)
    const multiHand = useSelector(selectMultiHand)
    const leftPointing = useSelector(selectLeftPointing)
    const rightPointing = useSelector(selectRightPointing)
    const leftPointingTwo = useSelector(selectLeftPointingTwo)
    const rightPointingTwo = useSelector(selectRightPointingTwo)
    const mappingResults = useSelector(selectResults)
    const objectMode = useSelector(selectObjectMode)
    const objectPosX = useSelector(selectObjectPosX)
    const objectPosY = useSelector(selectObjectPosY)
    const interimTranscript = useSelector(selectInterimTranscript)
    const dispatch = useDispatch()

    // Gesture Interactions
    useEffect(() => {
        if (multiHand === 2 && leftPinch && rightPinch) {
            // scaling mode
            const actualXL = leftIndex.x * window.innerWidth;
            const actualYL = leftIndex.y * window.innerHeight;
            let nodeL = stageRef.current.getIntersection({
                x: actualXL,
                y: actualYL
            });

            const actualXR = rightIndex.x * window.innerWidth;
            const actualYR = rightIndex.y * window.innerHeight;

            let nodeR = stageRef.current.getIntersection({
                x: actualXR,
                y: actualYR
            });

            if (nodeL !== null && Object.getPrototypeOf(nodeL).className !== 'Line') {
                let group = findGroup(nodeL);

                if (nodeL === nodeR) {
                    // let angle = calc_angle(actualXL, actualYL, actualXR, actualYR)
                    // group.rotation(actualYR < actualYL ? -1 * angle : angle)
                } else {
                    let width = window.innerWidth / 2
                    let distance = dist(actualXL, actualYL, actualXR, actualYR)
                    let scale = 1 + (distance / width);
                    group.scale({x: scale, y: scale})
                }
            }

        } else {
            if (leftPinch || rightPinch) {
                if (stageRef.current !== null) {
                    const actualX = (leftPinch ? leftIndex.x : rightIndex.x) * window.innerWidth;
                    const actualY = (leftPinch ? leftIndex.y : rightIndex.y) * window.innerHeight

                    let node = stageRef.current.getIntersection({
                        x: actualX,
                        y: actualY
                    })

                    if (node !== null) {
                        const group = findGroup(node);

                        if (group !== undefined) {
                            const nodeClassName = Object.getPrototypeOf(node).className;

                            // if node is Text
                            if (nodeClassName === 'Text') {
                                const label = findLabel(node);

                                let labelX = 0, labelY = 0

                                if (label !== undefined) {
                                    labelX = isNaN(label.x()) ? 0 : label.x();
                                    labelY = isNaN(label.y()) ? 0 : label.y();
                                }

                                // list.forEach((ele) => {
                                //     if (ele.text === node.attrs.text) {
                                //         timeoutList.current[ele.index] = 60000;
                                //     }
                                // });

                                group.x(actualX - (node.width() * group.scaleX() / 2) - labelX * group.scaleX())
                                group.y(actualY - (node.height() * group.scaleY() / 2) - labelY * group.scaleY())

                                // if node is Image
                            } else if (nodeClassName === 'Image') {
                                group.x(actualX - (node.width() * node.scaleX() * group.scaleX() / 2))
                                group.y(actualY - (node.height() * node.scaleY() * group.scaleX() / 2))
                            }

                            // if (group.rotation() !== 0) {
                            //     let offsetX = Math.abs(Math.cos(group.rotation()) * node.width());
                            //     let offsetY = Math.cos(group.rotation()) * node.height();
                            //
                            //     // console.log(offsetX, offsetY, actualX - (offsetX * group.scaleX() / 2) - textX - labelX, actualY - (offsetY * group.scaleY() / 2) - textY - labelY)
                            //     //
                            //     // group.x(actualX - (offsetX * group.scaleX() / 2) - textX - labelX)
                            //     // group.y(actualY - ((node.height() + offsetY) * group.scaleY() / 2) - textY - labelY)
                            // }
                        }
                    }

                }
            }
        }

    }, [leftPinch, rightPinch, leftIndex, rightIndex])

    // tokens update
    useEffect(() => {
        const tempList = tokens.map((ele, index) => {
            let type_temp = 'text';
            let url_temp = '';
            let timeout_temp = 4000;
            let text_temp = ele.text;
            mappingResults.every((mapping) => {
                // find mapping
                if (ele.text.toLowerCase().includes(mapping[0].toLowerCase())) {
                    // if it's a URL - media mapping
                    if (detectURL(mapping[1])) {
                        const fileType = get_url_extension(mapping[1]);
                        if (fileType === 'jpg' || fileType === 'png') {
                            type_temp = 'image';
                            timeout_temp = 300000;
                            url_temp = mapping[1];
                            return false;
                        } else if (fileType === 'mp4') {
                            type_temp = 'video';
                            timeout_temp = 600000;
                            url_temp = mapping[1];
                            return false;
                        } else {
                            type_temp = 'embed';
                            timeout_temp = 600000;
                            url_temp = mapping[1];
                            return false;
                        }
                    } else {
                        switch (mapping[1]) {
                            case 'object mode start':
                                if (!interimTranscript.includes(mapping[0])) {
                                    console.log('physical object mode start');
                                    dispatch(setObjectMode(true));
                                }
                                break;
                            case 'object mode end':
                                if (!interimTranscript.includes(mapping[0])) {
                                    console.log('physical object mode end');
                                    dispatch(setObjectMode(false));
                                }
                                break;
                            default:
                                // user-defined text
                                type_temp = 'text';
                                text_temp = mapping[1];
                                timeout_temp = 10000;
                        }

                        return false;
                    }
                }
                return true;
            });

            return {
                text: text_temp,
                ent_type: ele.ent_type,
                timeout: timeout_temp,
                index: index,
                type: type_temp,
                url: url_temp
            };

        });
        setList(tempList)
    }, [tokens])

    // mapping update
    useEffect(() => {
        console.log(mappingResults)
    }, [mappingResults])

    return (
        // Stage - is a div wrapper
        // Layer - is an actual 2d canvas element, so you can have several layers inside the stage
        // Rect and Circle are not DOM elements. They are 2d shapes on canvas

        <Stage ref={stageRef} className={"KonvaLayer"} width={window.innerWidth} height={window.innerWidth * 0.75}>
            <Layer>

                {
                    // drawing the line of scaling
                    multiHand === 2 && leftPinch && rightPinch ?
                        <>
                            <Line
                                points={[leftIndex.x * window.innerWidth, leftIndex.y * window.innerHeight, rightIndex.x * window.innerWidth, rightIndex.y * window.innerHeight]}
                                stroke={'red'}
                                strokeWidth={8}
                                lineCap={'round'}
                                lineJoin={'round'}
                            />

                            <TextWithGroup
                                x={leftIndex.x * window.innerWidth + (rightIndex.x * window.innerWidth - leftIndex.x * window.innerWidth) / 2}
                                y={leftIndex.y * window.innerHeight + (rightIndex.y * window.innerHeight - leftIndex.y * window.innerHeight) / 2}
                                timeout={6000}
                                following={false}
                                text={Math.floor(dist(leftIndex.x * window.innerWidth, leftIndex.y * window.innerHeight, rightIndex.x * window.innerWidth, rightIndex.y * window.innerHeight))}/>

                        </>

                        : <></>
                }

                {/*<EmbeddedScreen url={"https://www.youtube.com/embed/xDMP3i36naA"}*/}
                {/*                text={"Embedded Screen"}*/}
                {/*                width={300}*/}
                {/*                height={300}*/}
                {/*                x={300}*/}
                {/*                y={300}*/}
                {/*/>*/}
                {/*<Group x={300} y={500}>*/}
                {/*    <TextWithGroup timeout={time} following={false} text={'this is a title text'}/>*/}
                {/*</Group>*/}
                {/*<ImageWithGroup x={500} y={500} timeout={300000} following={false} url={'./images/sony.png'}/>*/}
                {/*<VideoWithGroup x={500} y={500} timeout={300000} following={false} opacity={1}*/}
                {/*                src={"https://firebasestorage.googleapis.com/v0/b/metar-e5f0d.appspot.com/o/video_demo.mp4?alt=media&token=09cf6f04-2370-49b4-8c43-a75561c69962"}/>*/}


                {
                    // Live Typography
                    list.map((ele, index) => {
                        let actualX = 0;
                        let actualY = 0;
                        let temp_timeout = 4000;
                        let temp_following = false;
                        let imageSearch = false;

                        if (objectMode) {
                            actualX = objectPosX;
                            let indexY = objectPosY;
                            actualY = indexY - ((80 * (index % ((window.innerHeight - indexY) / 200))));
                            temp_following = true;
                        } else {
                            if ((leftPointing && !rightPointing) || (rightPointing && !leftPointing) || (leftPointingTwo && !rightPointingTwo) || (rightPointingTwo && !leftPointingTwo)) {
                                // console.log("pointing position")
                                actualX = ((leftPointing || leftPointingTwo) ? leftIndex.x : rightIndex.x) * window.innerWidth;
                                let indexY = ((leftPointing || leftPointingTwo) ? leftIndex.y : rightIndex.y) * window.innerHeight;
                                actualY = indexY - ((80 * (index % ((window.innerHeight - indexY) / 200))));
                                temp_timeout = (leftPointingTwo || rightPointingTwo) ? 30000 : 4000;
                                imageSearch = !!(leftPointingTwo || rightPointingTwo);

                                // return (<TextWithGroup key={index}
                                //                        x={actualX}
                                //                        y={indexY}
                                //                        timeout={ele.timeout}
                                //     // timeout={timeoutList.current[ele.index]}
                                //                        following={false}
                                //     // disable the following typography text
                                //     // timeout={(leftPointing || rightPointing) ? 3000 : 60000}
                                //     // following={(!(leftPointing || rightPointing))}
                                //                        text={ele.text}/>);
                            } else {
                                // console.log("random position")
                                actualX = getRandomNumber(0.2, 0.8) * window.innerWidth;
                                actualY = getRandomNumber(0.4, 0.7) * window.innerHeight;
                                // return (<TextWithGroup key={index}
                                //                        x={actualX}
                                //                        y={actualY}
                                //                        timeout={ele.timeout}
                                //     // timeout={timeoutList.current[ele.index]}
                                //                        following={false}
                                //                        text={ele.text}/>);
                            }
                        }


                        if (ele.type === 'image') {
                            return <>
                                <TextWithGroup
                                    // key={ele.index + '-text-' + ele.text}
                                    x={actualX}
                                    y={actualY}
                                    timeout={ele.timeout}
                                    following={false}
                                    text={ele.text}
                                />
                                <ImageWithGroup
                                    // key={ele.index + '-image-' + ele.text}
                                    x={actualX}
                                    y={actualY}
                                    timeout={ele.timeout}
                                    following={false}
                                    url={ele.url}
                                />
                            </>;

                        } else if (ele.type === 'video') {
                            return <>
                                <TextWithGroup
                                    // key={ele.index + '-text-' + ele.text}
                                    x={actualX}
                                    y={actualY}
                                    timeout={ele.timeout}
                                    following={false}
                                    text={ele.text}

                                />
                                <VideoWithGroup
                                    // key={ele.index + '-video-' + ele.text}
                                    x={actualX}
                                    y={actualY}
                                    timeout={ele.timeout}
                                    following={false}
                                    opacity={1}
                                    url={ele.url}
                                />
                            </>;
                        } else if (ele.type === 'embed') {
                            return <>
                                <EmbedWithGroup
                                    x={actualX}
                                    y={actualY}
                                    timeout={ele.timeout}
                                    following={false}
                                    url={ele.url}
                                    text={ele.text}
                                    width={300}
                                    height={300}
                                />
                            </>;
                        } else {

                            return (<TextWithGroup key={ele.index + '-text-' + ele.text}
                                                   x={actualX}
                                                   y={actualY}
                                                   timeout={temp_timeout}
                                                   following={temp_following}
                                                   text={ele.text}/>);

                            // if (imageSearch) {
                            //     socket.emit('search', ele.text)
                            //     return <>
                            //         <TextWithGroup
                            //             // key={ele.index + '-text-' + ele.text}
                            //             x={actualX}
                            //             y={actualY}
                            //             timeout={ele.timeout}
                            //             following={false}
                            //             text={ele.text}
                            //         />
                            //         <ImageWithGroup
                            //             // key={ele.index + '-image-' + ele.text}
                            //             x={actualX}
                            //             y={actualY}
                            //             timeout={ele.timeout}
                            //             following={false}
                            //             url={ele.url}
                            //         />
                            //     </>;
                            // } else {
                            //     return (<TextWithGroup key={ele.index + '-text-' + ele.text}
                            //                            x={actualX}
                            //                            y={actualY}
                            //                            timeout={temp_timeout}
                            //                            following={temp_following}
                            //                            text={ele.text}/>);
                            // }

                        }

                    })
                }

            </Layer>
        </Stage>
    );

}

export default KonvaLayer;