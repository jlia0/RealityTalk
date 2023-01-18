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
    selectMultiHand,
    selectLeftPointing,
    selectRightPointing,
    selectLeftPointingTwo,
    selectRightPointingTwo,
    setLeftPinch, setRightPinch
} from "../app/handsReducer";
import {selectInterimTranscript, selectTokens} from "../app/speechReducer";

import {EmbeddedScreen} from "./KonvaElements/embeddedscreen";
import {calc_angle, detectURL, dist, findGroup, findLabel, get_url_extension, getRandomNumber} from "./helper";
import {EmbedWithGroup, ImageWithGroup, TextWithGroup, VideoWithGroup} from "./visuals";
import {selectResults} from "../app/mappingReducer";
import {withGroup} from "./KonvaElements/groupwrapper";
import {selectObjectMode, selectObjectPosX, selectObjectPosY, setObjectMode} from "../app/colorReducer";
import {socket} from "./speech";
import {TextElement, withGroupWrapped, withGroupWrapped1} from "../figures/teaser";
// import {
//     Benefits,
//     Best, Bottle,
//     BusinessPresentation, Canon, Chart, Discount, Dot,
//     ECommerce,
//     EmbeddedVisual, Gymming, Hiking, Immune, Kill,
//     OnlineLecture, Profile, QRCode, Sony, Swimming,
//     Teaser,
//     TextElement, Title, Video, Virus, White, withGroupWrapped, withGroupWrapped1,
//     WorldTracking
// } from "./figures/teaser";
// import {LayerImage} from "./KonvaElements/layerimage";
// import {to} from "react-spring";
// import {image} from "html2canvas/dist/types/css/types/image";

// const intro_t1 = () => <TextElement text={"Jian Liao         \n\n"} text_color={"#3861e5"} tag_color={'white'} size={60}
//                                     style={'bold'}
//                                     opacity={0.8}/>
// const intro_t2 = () => <TextElement y={100} text={"Undergrad Student\nUniversity of Calgary"} text_color={"#3861e5"}
//                                     tag_color={'white'} size={35} style={'normal'} opacity={0}/>
// const Intro = withGroupWrapped(intro_t1, intro_t2)
// //
// //
// const aug = () => <TextElement text={"Augmented Presentation"} text_color={"#075204"} tag_color={'lightgreen'} size={30}
//                                style={'normal'}
//                                opacity={0.5}/>;
// const Aug = withGroupWrapped1(aug)
//
// const aug_text = () => <TextElement text={"Augmented Reality\n          Interface"} text_color={"#600b98"}
//                                     tag_color={'#be67f8'} size={50} style={'bold'}
//                                     opacity={0.2}/>
// const aug_img = () => <LayerImage url={'./images/ar_interface.png'} opacity={0.7} x={125} y={160}/>
//
// const AR = withGroupWrapped(aug_text, aug_img)
//
// const fe = () => <TextElement text={"Features                                       \n\n\n\n"} text_color={"#943b0b"}
//                               tag_color={'#f5a478'} size={28}
//                               style={'bold'}
//                               opacity={0.3}/>
// const liste = () => <TextElement y={45}
//                                  text={"1. Live kinetic typography\n2. Embedded visuals\n3. Embedded icons\n4. Annotations to a physical object"}
//                                  text_color={"#943b0b"}
//                                  tag_color={'white'} size={25} style={'normal'} opacity={0}/>
//
// const Feature = withGroupWrapped(fe, liste)
//
// const ge = () => <TextElement text={"gestural interaction"} text_color={"#600b98"}
//                               tag_color={'#be67f8'} size={40} style={'bold'}
//                               opacity={0.2}/>
// const img = () => <LayerImage url={'./images/gestural.png'} opacity={0.9} x={100} y={100}/>
//
// const Gestural = withGroupWrapped(ge, img)
//
// const vid = () => <TextElement text={"video editing"} text_color={"#5d0d0d"} tag_color={'red'} size={40}
//                                style={'bold'}
//                                opacity={0.25}/>
// const pro = () => <TextElement y={100} text={"programming"} text_color={"#5d0d0d"} tag_color={'red'} size={40}
//                                style={'bold'}
//                                opacity={0.25}/>
//
// const No = withGroupWrapped(vid, pro)

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

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

    // let ax = (leftPointing || rightPointing) ?
    //     (((leftPointing) ? leftIndex.x : rightIndex.x) * window.innerWidth) : 300;
    // let ay = (leftPointing || rightPointing) ?
    //     (((leftPointing) ? leftIndex.y : rightIndex.y) * window.innerHeight) : 300;


    // Gesture Interactions

    useEffect(() => {
        // try {
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

                    // console.log(stageRef.current)

                    let node = stageRef.current.getIntersection({
                        x: actualX,
                        y: actualY
                    })

                    if (node !== null) {
                        let group = findGroup(node);

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
            } else {
                dispatch(setLeftPinch(false))
                dispatch(setRightPinch(false))
            }
        }
        // } catch (e) {
        //     console.log(e)
        // }


    }, [leftPinch, rightPinch, leftIndex, rightIndex])

    // let flag = false;

    // tokens update
    useEffect(() => {
        console.log(tokens)
        const tempList = tokens.map((ele, index) => {
            let type_temp = 'text';
            let url_temp = '';
            let timeout_temp = 3000;
            let text_temp = ele.text;

            //
            // if (text_temp === 'GN' || text_temp === 'Jen') {
            //     text_temp = 'Jian'
            // } else if (text_temp.toLowerCase().includes('toronto')) {
            //     text_temp = 'Toronto cohort'
            // } else if (text_temp.toLowerCase().includes('undergrad')) {
            //     text_temp = 'undergrad'
            // } else if (text_temp.toLowerCase().includes('computer science')) {
            //     text_temp = 'computer science'
            // } else if (text_temp.toLowerCase().includes('university of calgary')) {
            //     text_temp = 'University of Calgary'
            // } else if (text_temp.toLowerCase().includes('suzuki') || text_temp.toLowerCase().includes('zuki') || text_temp.toLowerCase().includes('doctor')) {
            //     text_temp = 'Dr. Ryo Suzuki'
            // }else if (text_temp.toLowerCase().includes('computing')) {
            //     text_temp = 'AI driven computing system'
            // } else if (text_temp.toLowerCase().includes('recent work')) {
            //     text_temp = 'RealityTalk'
            // }else if (text_temp.toLowerCase().includes('human factor')) {
            //     text_temp = 'human factors'
            // }else if (text_temp.toLowerCase().includes('first')) {
            //     text_temp = 'Entrepreneur First'
            // }else if (text_temp.toLowerCase().includes('commercial')) {
            //     text_temp = 'commercialized'
            // }else if (text_temp.toLowerCase().includes('products')) {
            //     text_temp = 'real-world products'
            // }
            //
            //     // else if (text_temp.toLowerCase().includes('professional')) {
            //     //     text_temp = 'professional experiences'
            //     // } else if (text_temp.toLowerCase().includes('software')) {
            //     //     text_temp = 'full-stack software engineer'
            //     // } else if (text_temp.toLowerCase().includes('data engineer')) {
            //     //     text_temp = 'data engineer'
            // // }
            //
            // else if (text_temp.toLowerCase().includes('small business') && !flag) {
            //     flag = true;
            //     text_temp = 'small business SAAS tool'
            // } else if (text_temp.toLowerCase().includes('diverse background')) {
            //     text_temp = 'diverse background'
            // } else if (text_temp.toLowerCase().includes('founder')) {
            //     text_temp = 'three-time founder'
            // } else if (text_temp.toLowerCase().includes('iot device')) {
            //     text_temp = 'IoT devices'
            // } else if (text_temp.toLowerCase().includes('hong kong')) {
            //     text_temp = 'Hong Kong'
            // } else if (text_temp.toLowerCase().includes('wholesale')) {
            //     text_temp = 'pet supplies wholesale platform'
            // } else if (text_temp.toLowerCase().includes('business management')) {
            //     text_temp = 'pet business management tool'
            // } else if (text_temp.toLowerCase().includes('small business owners')) {
            //     text_temp = 'small business owners'
            // } else if (text_temp.toLowerCase().includes('digital transformation')) {
            //     text_temp = 'digital transformation'
            // } else if (text_temp.toLowerCase().includes('business product')) {
            //     text_temp = 'good business product'
            // } else if (text_temp.toLowerCase().includes('technical artifact')) {
            //     text_temp = 'technical artifact'
            // } else if (text_temp.toLowerCase().includes('vertical')) {
            //     text_temp = 'vertical scenario'
            // } else if (text_temp.toLowerCase().includes('each link')) {
            //     text_temp = 'the data in each link'
            // } else if (text_temp.toLowerCase().includes('data driven decisions') || text_temp.toLowerCase().includes('data-driven decisions')) {
            //     text_temp = 'data-driven decisions'
            // } else if (text_temp.toLowerCase().includes('customer journey')) {
            //     text_temp = 'customer journey'
            // } else if (text_temp.toLowerCase().includes('affiliate marketing')) {
            //     text_temp = 'affiliate marketing'
            // }
            // // else if (text_temp.toLowerCase().includes('mixed reality')) {
            // //     text_temp = 'mixed reality'
            // // }
            // else if (text_temp.toLowerCase().includes('researcher')) {
            //     text_temp = 'mixed reality researcher'
            // }
            // // else if (text_temp.toLowerCase().includes('paper')) {
            // //     text_temp = 'first-author paper'
            // // }
            // else if (text_temp.toLowerCase().includes('conference')) {
            //     text_temp = 'top conference'
            // } else if (text_temp.toLowerCase().includes('communication')) {
            //     text_temp = 'day-to-day communication'
            // } else if (text_temp.toLowerCase().includes('collaboration')) {
            //     text_temp = 'collaboration'
            // } else if (text_temp.toLowerCase().includes('presentation')) {
            //     text_temp = 'presentation'
            // } else if (text_temp.toLowerCase().includes('real time') || text_temp.toLowerCase().includes('real-time')) {
            //     text_temp = 'real-time'
            // } else if (text_temp.toLowerCase().includes('business meetings')) {
            //     text_temp = 'business meetings'
            // } else if (text_temp.toLowerCase().includes('online lectures')) {
            //     text_temp = 'online lectures'
            // } else if (text_temp.toLowerCase().includes('social commerce')) {
            //     text_temp = 'social commerce online sales'
            // } else if (text_temp.toLowerCase().includes('design effort') || text_temp.toLowerCase().includes('design efforts')) {
            //     text_temp = 'design efforts'
            // } else if (text_temp.toLowerCase().includes('thinking')) {
            //     text_temp = 'human-centered thinking'
            // } else if (text_temp.toLowerCase().includes('human factor')) {
            //     text_temp = 'human factors'
            // }
            // // else if (text_temp.toLowerCase().includes('use')) {
            // //     text_temp = 'more accessible and easy to use'
            // // }
            // // else if (text_temp.toLowerCase().includes('technical skill')) {
            // //     text_temp = 'strong technical skills'
            // // }
            // // else if (text_temp.toLowerCase().includes('software')) {
            // //     text_temp = 'software'
            // // } else if (text_temp.toLowerCase().includes('hardware')) {
            // //     text_temp = 'hardware'
            // // } else if (text_temp.toLowerCase().includes('big data')) {
            // //     text_temp = 'big data'
            // // } else if (text_temp.toLowerCase().includes('machine learning')) {
            // //     text_temp = 'machine learning'
            // // }
            //
            // else if (text_temp.toLowerCase().includes('natural language processing')) {
            //     text_temp = 'natural language processing'
            // } else if (text_temp.toLowerCase().includes('corey')) {
            //     text_temp = 'natural language query'
            // } else if (text_temp.toLowerCase().includes('disciplin')) {
            //     text_temp = 'inter-discipline'
            // } else if (text_temp.toLowerCase().includes('business skills')) {
            //     text_temp = 'business skills'
            // } else {
            //     text_temp = ''
            // }

            mappingResults.every((mapping) => {
                // find mapping
                if (text_temp.toLowerCase().includes(mapping[0].toLowerCase())) {
                    // if it's a URL - media mapping
                    if (detectURL(mapping[1])) {
                        const fileType = get_url_extension(mapping[1]);
                        if (fileType === 'jpg' || fileType === 'png') {
                            type_temp = 'image';
                            timeout_temp = 5000;
                            url_temp = mapping[1];
                            return false;
                        } else if (fileType === 'mp4') {
                            type_temp = 'video';
                            timeout_temp = 10000;
                            url_temp = mapping[1];
                            return false;
                        } else {
                            type_temp = 'embed';
                            timeout_temp = 5000;
                            url_temp = mapping[1];
                            return false;
                        }
                    } else {
                        switch (mapping[1]) {
                            case 'object':
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
        // tempList.filter(ele => ele.text !== '')
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
        <Stage ref={stageRef} className={"KonvaLayer"} width={window.innerWidth} height={window.innerHeight}>

            {/*<Layer>*/}
            {/*    {*/}
            {/*        tokens.map((ele, index) => {*/}
            {/*            // if (ele.text.toLowerCase().includes('name')) {*/}
            {/*            //     return <Intro key={index}*/}
            {/*            //                   x={200}*/}
            {/*            //                   y={800}*/}
            {/*            //                    scaleX={1} scaleY={1}*/}
            {/*            //                    timeout={5000}*/}
            {/*            //                    following={true}/>*/}
            {/*            // }*/}
            {/*            // else if (ele.text.toLowerCase().includes('feature')) {*/}
            {/*            //     return <Feature key={index}*/}
            {/*            //                      x={200}*/}
            {/*            //                      y={600}*/}
            {/*            //                      scaleX={1.2} scaleY={1.2}*/}
            {/*            //                      timeout={7500}*/}
            {/*            //                      following={false}/>*/}
            {/*            // }*/}
            {/*            // else if (ele.text.toLowerCase().includes('real-time augmented presentation')) {*/}
            {/*            //     return <Aug key={index}*/}
            {/*            //                     x={200}*/}
            {/*            //                     y={600}*/}
            {/*            //                     scaleX={1.2} scaleY={1.2}*/}
            {/*            //                     timeout={4000}*/}
            {/*            //                     following={false}/>*/}
            {/*            // }*/}

            {/*        })*/}
            {/*    }*/}


            {/*</Layer>*/}

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

                {
                    // Live Typography
                    list.map((ele, index) => {

                        // if (ele.text === '' || ele.text === null) return <></>;

                        let actualX = 0;
                        let actualY = 0;
                        let temp_timeout = 4000;
                        let temp_following = false;
                        // let imageSearch = false;

                        // if (objectMode) {
                        //     actualX = objectPosX;
                        //     let indexY = objectPosY;
                        //     actualY = indexY - ((80 * (index % ((window.innerHeight - indexY) / 200))));
                        //     temp_following = true;
                        // } else {
                        if ((leftPointing && !rightPointing) || (rightPointing && !leftPointing) || (leftPointingTwo && !rightPointingTwo) || (rightPointingTwo && !leftPointingTwo)) {
                            actualX = ((leftPointing || leftPointingTwo) ? leftIndex.x : rightIndex.x) * window.innerWidth;
                            let indexY = ((leftPointing || leftPointingTwo) ? leftIndex.y : rightIndex.y) * window.innerHeight;
                            actualY = indexY - ((80 * (index % ((window.innerHeight - indexY) / 200))));
                            // temp_timeout = (leftPointingTwo || rightPointingTwo) ? 30000 : 4000;
                            // imageSearch = !!(leftPointingTwo || rightPointingTwo);

                        } else {
                            if (Math.random() > 0.5) {
                                actualX = 0.7 * window.innerWidth;
                            } else {
                                actualX = 0.06 * window.innerWidth;
                            }
                            actualY = (window.innerHeight / 4) + (80 * (index % ((window.innerHeight) / 150)));
                        }
                        // }


                        // render


                        if (ele.type === 'image') {

                            // let textX, textY
                            // if (Math.random() < 0.5) {
                            //     textX = 0.2 * window.innerWidth;
                            // } else {
                            //     textX = 0.7 * window.innerWidth;
                            // }
                            // textY = (window.innerHeight / 4) + (80 * (index % ((window.innerHeight) / 150)));


                            return <>

                                <TextWithGroup key={ele.index}
                                               x={actualX}
                                               y={actualY}
                                               timeout={temp_timeout}
                                               following={temp_following}
                                               text={ele.text}/>

                                <ImageWithGroup
                                    // key={ele.index + '-image-' + ele.text}
                                    x={actualX}
                                    y={actualY + 70}
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
                                    x={getRandomArbitrary(0.1, 0.3) * window.innerWidth}
                                    y={0.5 * window.innerHeight}
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

                            if (Math.random() < 0.5) {
                                actualX = 0.1 * window.innerWidth;
                            } else {
                                actualX = 0.7 * window.innerWidth;
                            }
                            actualY = (window.innerHeight / 4) + (80 * (index % ((window.innerHeight) / 150)));

                            return (<TextWithGroup key={ele.index}
                                                   x={actualX}
                                                   y={actualY}
                                                   timeout={temp_timeout}
                                                   following={temp_following}
                                                   text={ele.text}/>);

                            // if (imageSearch) {
                            //     console.log("image search")
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