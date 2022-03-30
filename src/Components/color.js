import "https://cdnjs.cloudflare.com/ajax/libs/tracking.js/1.1.3/tracking-min.js"
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {selectCamera} from "../app/colorReducer";

function ColorTracking() {
    const camera = useSelector(selectCamera)

    useEffect(() => {
        if (camera !== '') {
            // eslint-disable-next-line no-undef
            tracking.ColorTracker.registerColor('green', function (r, g, b) {
                if (r < 50 && g > 120 && b < 200) {
                    return true;
                }
                return false;
            });

            // eslint-disable-next-line no-undef
            // tracking.ColorTracker.registerColor('purple', function (r, g, b) {
            //     let dx = r - 120;
            //     let dy = g - 60;
            //     let dz = b - 210;
            //
            //     if ((b - g) >= 100 && (r - g) >= 60) {
            //         return true;
            //     }
            //     return dx * dx + dy * dy + dz * dz < 3500;
            // });

            // eslint-disable-next-line no-undef
            const colors = new tracking.ColorTracker(['green']);

            colors.on('track', function (event) {
                setTimeout(() => {
                    if (event.data.length === 0) {
                        // No colors were detected in this frame.
                    } else {
                        event.data.forEach(function (rect) {
                            console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
                        });
                    }
                }, 0)
            });

            // eslint-disable-next-line no-undef
            tracking.track(camera, colors, {camera: true});
        }
    }, [camera])

    return <></>
}

export default ColorTracking