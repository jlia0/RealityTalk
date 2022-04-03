import React, {Component, useEffect, useState} from "react";
import {render} from "react-dom";
import {Stage, Layer, Image} from "react-konva";
import Konva from "konva";

export const Video = (props) => {
    const imageRef = React.useRef(null);
    const [size, setSize] = React.useState({width: 50, height: 50});
    const [scaleX, setScaleX] = useState(0);
    const [duration, setDuration] = useState(0);


    // we need to use "useMemo" here, so we don't create new video element on any render
    const videoElement = React.useMemo(() => {
        const element = document.createElement("video");
        element.src = props.url;
        element.autoPlay = "autoPlay";
        element.muted = true;
        return element;
    }, [props.url]);

    // when video is loaded, we should read it size
    React.useEffect(() => {
        const onload = function () {
            setSize({
                width: videoElement.videoWidth,
                height: videoElement.videoHeight
            });
            const scaleWidth = 0.15 * window.innerWidth;
            setScaleX(scaleWidth / videoElement.videoWidth);
            setDuration(videoElement.duration);
        };
        videoElement.addEventListener("loadedmetadata", onload);
        return () => {
            videoElement.removeEventListener("loadedmetadata", onload);
        };
    }, [videoElement]);

    useEffect(() => {
        if (props.url !== undefined) {
            let playPromise = videoElement.play();
            // In browsers that don’t yet support this functionality,
            // playPromise won’t be defined.
            if (playPromise !== undefined) {
                playPromise.then(function () {
                    // Automatic playback started!
                }).catch(function (error) {
                    console.log(error)
                    // Automatic playback failed.
                    // Show a UI element to let the user manually start playback.
                });
            }
        }

        if (duration !== 0){
            setTimeout(() => {
                if (imageRef.current !== null) {
                    imageRef.current.to({
                        scaleX: 0,
                        scaleY: 0,
                        opacity: 0,
                        easing: Konva.Easings.BackEaseInOut,
                        duration: 0.4
                    })
                    setTimeout(() => {
                        imageRef.current.destroy();
                    }, 400)
                }
            }, duration * 1000 + 1000);
        }
    }, [duration])

    // use Konva.Animation to redraw a layer
    React.useEffect(() => {
        const layer = imageRef.current.getLayer();
        const anim = new Konva.Animation(() => {
        }, layer);
        anim.start();

        return () => anim.stop();
    }, [videoElement]);

    return (
        <Image
            ref={imageRef}
            image={videoElement}
            // x={20}
            // y={20}
            // stroke="red"
            width={size.width}
            height={size.height}
            scale={{x: scaleX, y: scaleX}}
            // draggable
        />
    );
};

{/* <Video src="https://firebasestorage.googleapis.com/v0/b/metar-e5f0d.appspot.com/o/1554414349614495.mp4?alt=media&token=d6399112-c747-42f5-9ac2-eaa0bad52c16" /> */
}

