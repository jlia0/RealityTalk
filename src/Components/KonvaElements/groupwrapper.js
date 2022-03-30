import {useEffect, useRef, useState} from "react";
import Konva from "konva";
import {Group, Label, Tag, Text} from "react-konva";

export function withGroup(Wrapped) {
    return function (props) {
        const groupRef = useRef(null)
        const [xp, setXp] = useState(0)
        const [yp, setYp] = useState(0)
        const {x, y, timeout, following, ...passThroughProps} = props;

        useEffect(() => {
            setXp(x)
            setYp(y)

            groupRef.current.to({
                // scaleX: 1,
                // scaleY: 1,
                opacity: 0.75,
                easing: Konva.Easings.BackEaseInOut,
                duration: 0.4
            });

            setTimeout(() => {
                if (groupRef.current !== null) {
                    groupRef.current.to({
                        scaleX: 0,
                        scaleY: 0,
                        opacity: 0,
                        easing: Konva.Easings.BackEaseInOut,
                        duration: 0.4
                    })
                    setTimeout(() => groupRef.current.destroy(), 400)
                }
            }, timeout);

        }, [groupRef])

        useEffect(() => {
            if (following) {
                setXp(x)
                setYp(y)
            }
        }, [x])

        return (
            <Group
                ref={groupRef}
                draggable={true} opacity={0}
                // scale={groupRef.current === null ? {x: 0, y: 0} : {x: 1, y: 1}}
                x={following ? x : xp} y={following ? y : yp}
            >
                <Wrapped {...passThroughProps} />
            </Group>
        );
    }
}

