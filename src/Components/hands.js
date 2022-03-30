import {useEffect, useRef} from "react";
import * as draw from "@mediapipe/drawing_utils";
import * as HandsMediaPipe from "@mediapipe/hands";
import {Camera} from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import './hands.css'
import {useDispatch} from 'react-redux';
import {
    setThumb,
    setLeftIndex,
    setRightIndex,
    setMiddle,
    setLeftPinch,
    setRightPinch,
    setMultiHand, setRightPointing, setLeftPointing, setRightPointingTwo, setLeftPointingTwo,
} from '../app/handsReducer'
import {setCamera} from "../app/colorReducer";
import {dist, throttle} from "./helper";


const showLandmarks = true

// const throttleTime = 1000

function HandsRecognition() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const dispatch = useDispatch();


    const checkLandmarks = (landmarks, isRightHand) => {
        // Finger tips
        const thumbTip = landmarks[4]
        const indexTip = landmarks[8]
        const middleTip = landmarks[12]
        const ringTip = landmarks[16]
        const pinkyTip = landmarks[20]

        // Finger joints
        const thumbJoint = landmarks[2]
        const indexJoint = landmarks[6]
        const middleJoint = landmarks[10]
        const ringJoint = landmarks[14]
        const pinkyJoint = landmarks[18]

        // check thumb and index pinch
        if (dist(thumbTip.x, thumbTip.y, indexTip.x, indexTip.y) < 0.05) {
            if (isRightHand) {
                // throttle(dispatch(setRightPinch(true)), throttleTime)
                dispatch(setRightPinch(true))
                // console.log('right pinch')
            } else {
                // throttle(dispatch(setLeftPinch(true)), throttleTime)
                dispatch(setLeftPinch(true))
                // console.log('left pinch')
            }
        } else {
            if (isRightHand) {
                // throttle(dispatch(setRightPinch(false)), throttleTime)
                dispatch(setRightPinch(false))
            } else {
                // throttle(dispatch(setLeftPinch(false)), throttleTime)
                dispatch(setLeftPinch(false))
            }
        }

        // pointing gesture
        if (indexTip.y < indexJoint.y && middleTip.y > middleJoint.y && ringTip.y > ringJoint.y && pinkyTip.y > pinkyJoint.y) {
            if (isRightHand) {
                dispatch(setRightPointing(true))
            } else {
                dispatch(setLeftPointing(true))
            }
        } else {
            if (isRightHand) {
                dispatch(setRightPointing(false))
            } else {
                dispatch(setLeftPointing(false))
            }
        }

        // two finger pointing gesture
        if (indexTip.y < indexJoint.y && middleTip.y < middleJoint.y && ringTip.y > ringJoint.y && pinkyTip.y > pinkyJoint.y) {
            if (isRightHand) {
                dispatch(setRightPointingTwo(true))
            } else {
                dispatch(setLeftPointingTwo(true))
            }
        } else {
            if (isRightHand) {
                dispatch(setRightPointingTwo(false))
            } else {
                dispatch(setLeftPointingTwo(false))
            }
        }

        // set index position
        if (isRightHand) {
            const rightIndexTip = landmarks[8]
            // throttle(dispatch(setRightIndex(rightIndexTip)), throttleTime)
            dispatch(setRightIndex(rightIndexTip))
        } else {
            const leftIndexTip = landmarks[8]
            // throttle(dispatch(setLeftIndex(leftIndexTip)), throttleTime)
            dispatch(setLeftIndex(leftIndexTip))
        }
    }

    function onResults(results) {
        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement.getContext('2d');

        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

        // canvasCtx.drawImage(
        //     results.image, 0, 0, canvasElement.width, canvasElement.height);

        // check how many hands
        dispatch(setMultiHand(results.multiHandLandmarks.length))

        if (results.multiHandLandmarks.length !== 0) {

            for (let index = 0; index < results.multiHandLandmarks.length; index++) {
                const classification = results.multiHandedness[index];
                const landmarks = results.multiHandLandmarks[index];
                const isRightHand = classification.label === 'Right';

                setTimeout(() => {
                    checkLandmarks(landmarks, isRightHand)
                }, 0)

                if (showLandmarks) {
                    draw.drawConnectors(canvasCtx, landmarks, HandsMediaPipe.HAND_CONNECTIONS,
                        {color: isRightHand ? '#00FF00' : '#FF0000'});

                    draw.drawLandmarks(canvasCtx, landmarks, {
                        color: isRightHand ? '#00FF00' : '#FF0000',
                        fillColor: isRightHand ? '#FF0000' : '#00FF00',
                        radius: (data) => {
                            return draw.lerp(data.from.z, -0.15, .1, 10, 1);
                        }
                    });
                }

            }
        }
        canvasCtx.restore();
    }

    useEffect(() => {
        // Hands
        const hands = new HandsMediaPipe.Hands({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            }
        });
        hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 1,
            minDetectionConfidence: 0.7,
            minTrackingConfidence: 0.5,
            selfieMode: true
        });
        hands.onResults(onResults);

        // Camera
        const camera = new Camera(videoRef.current.video, {
            onFrame: async () => {
                await hands.send({image: videoRef.current.video});
            },
            width: window.innerWidth,
            height: window.innerHeight
        });
        camera.start().then(r => {
            dispatch(setCamera("#webcam"))
        });

    }, [videoRef])


    return (

        <div className={"VideoLayer"}>
            <Webcam id={"webcam"} className={"abs_cam"} ref={videoRef} mirrored={true}
                    videoConstraints={{width: window.innerWidth, height: window.innerHeight}}/>
            <canvas className={"abs_canvas"} ref={canvasRef} width={window.innerWidth} height={window.innerHeight}/>
        </div>
    );
}

export default HandsRecognition;