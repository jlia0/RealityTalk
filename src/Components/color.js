import "https://cdnjs.cloudflare.com/ajax/libs/tracking.js/1.1.3/tracking-min.js"
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCamera, setObjectPositionX, setObjectPositionY} from "../app/colorReducer";
import {createRingBuffer} from "./helper";

let xbuffer = createRingBuffer(3);
let ybuffer = createRingBuffer(3);

function ColorTracking() {
    const camera = useSelector(selectCamera)
    const dispatch = useDispatch()

    useEffect(() => {
        if (camera !== '') {
            // eslint-disable-next-line no-undef
            tracking.ColorTracker.registerColor('pink', function (r, g, b) {
                if (r > 250 && g < 190 && g > 160 && b < 255 && b > 230) {
                    return true;
                }
                return false;
            });

            // // eslint-disable-next-line no-undef
            // tracking.ColorTracker.registerColor('blue', function (r, g, b) {
            //     if (r > 70 && r < 100 && g > 180 && g < 210 && b > 200 && b < 230) {
            //         return true;
            //     }
            //     return false;
            // });
            //
            // // eslint-disable-next-line no-undef
            // tracking.ColorTracker.registerColor('bright_yellow', function (r, g, b) {
            //     if (r > 220 && r < 250 && g > 220 && g < 240 && b > 50 && b < 100) {
            //         return true;
            //     }
            //     return false;
            // });

            // eslint-disable-next-line no-undef
            const colors = new tracking.ColorTracker(['pink']);

            colors.on('track', function (event) {

                if (event.data.length === 0) {
                    // No colors were detected in this frame.
                } else {
                    event.data.forEach(function (rect) {
                        xbuffer.push(window.innerWidth - rect.x + rect.width / 2);
                        ybuffer.push(rect.y + rect.height / 2);
                        dispatch(setObjectPositionX(xbuffer.avg()))
                        dispatch(setObjectPositionY(ybuffer.avg()))
                        console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
                    });
                }

            });

            // eslint-disable-next-line no-undef
            tracking.track(camera, colors, {camera: true});

        }
    }, [camera])

    return <></>
}

export default ColorTracking