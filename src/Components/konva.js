import {Stage, Layer, Rect, Circle, Image, Group, Text, Label, Tag, Line} from 'react-konva';
import './konva.css'
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {
    selectThumb,
    selectLeftIndex,
    selectRightIndex,
    selectMiddle,
    selectLeftPinch,
    selectRightPinch,
    selectMultiHand, selectLeftPointing, selectRightPointing, selectLeftPointingTwo, selectRightPointingTwo
} from "../app/handsReducer";
import {selectTokens} from "../app/speechReducer";

import {EmbeddedScreen} from "./KonvaElements/embeddedscreen";
import {calc_angle, dist, findGroup, findLabel, getRandomNumber} from "./helper";
import {ImageWithGroup, TextWithGroup} from "./visuals";


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

    useEffect(() => {
        // let visuals = tokens.filter((ele, index) => {
        //
        // });
        console.log(tokens)
    }, [tokens])

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
                                timeout={600000}
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
                {/*    <TextWithGroup timeout={600000} following={false} text={'this is a title text'}/>*/}
                {/*</Group>*/}
                {/*<ImageWithGroup x={500} y={500} timeout={300000} following={false} url={'./images/sony.png'}/>*/}


                {
                    // Live Typography
                    tokens.map((ele, index) => {
                        if ((leftPointing && !rightPointing) || (rightPointing && !leftPointing) || (leftPointingTwo && !rightPointingTwo) || (rightPointingTwo && !leftPointingTwo)) {
                            // console.log("pointing position")
                            let actualX = ((leftPointing || leftPointingTwo) ? leftIndex.x : rightIndex.x) * window.innerWidth;
                            let actualY = ((leftPointing || leftPointingTwo) ? leftIndex.y : rightIndex.y) * window.innerHeight;
                            let indexY = actualY - ((80 * (index % ((window.innerHeight - actualY) / 200))));
                            return (<TextWithGroup key={index}
                                                   x={actualX}
                                                   y={indexY}
                                                   timeout={3000}
                                                   following={false}
                                // disable the following typography text
                                // timeout={(leftPointing || rightPointing) ? 3000 : 60000}
                                // following={(!(leftPointing || rightPointing))}
                                                   text={ele.text}/>);
                        } else {
                            // console.log("random position")
                            let actualX = getRandomNumber(0.2, 0.8) * window.innerWidth;
                            let actualY = getRandomNumber(0.4, 0.7) * window.innerHeight;
                            return (<TextWithGroup key={index}
                                                   x={actualX}
                                                   y={actualY}
                                                   timeout={3000}
                                                   following={false}
                                                   text={ele.text}/>);
                        }

                    })
                }

            </Layer>
        </Stage>
    );

}

export default KonvaLayer;