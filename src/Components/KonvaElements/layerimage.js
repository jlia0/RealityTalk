// URL Image Component
import useImage from "use-image";
import {useEffect, useRef, useState} from "react";
import {Image} from "react-konva";
import {withGroup} from "./groupwrapper";
import {Textual} from "./textual";

export const LayerImage = (props) => {
    // 'https://konvajs.org/assets/lion.png'
    const [image, status] = useImage(props.url, undefined);
    const imageRef = useRef(null);
    const [scaleX, setScaleX] = useState(0);
    // const scaleProps = props.scale

    useEffect(() => {
        if (imageRef.current !== null && status === 'loaded') {
            // const height = imageRef.current.attrs.image.height;
            const width = imageRef.current.attrs.image.width;
            // const scaleHeight = 0.15 * window.innerHeight;
            const scaleWidth = 0.20 * window.innerWidth;
            setScaleX(scaleWidth / width);
            // setScaleY(scaleHeight / height);
        }
    }, [imageRef, status])

    // useEffect(() => {
    //     setScaleX()
    // }, [scaleProps])

    return <Image ref={imageRef} image={image} opacity={props.opacity}
                  x={props.x} y={props.y}
                  scale={{x: scaleX, y: scaleX}}
    />;
};

