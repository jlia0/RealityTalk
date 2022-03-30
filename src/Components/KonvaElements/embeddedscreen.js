import {useEffect, useRef, useState} from "react";
import {Group, Label, Tag, Text} from "react-konva";
import {Html} from "react-konva-utils";
import Iframe from "react-iframe";

export const EmbeddedScreen = (props) => {
    const textRef = useRef(null)
    const [x, setX] = useState(0)
    // "http://www.youtube.com/embed/xDMP3i36naA"

    useEffect(() => {
        setX(textRef.current.textWidth + 15)
    }, [textRef])

    return (
        <Group draggable={true} width={props.width} height={props.height} x={props.x} y={props.y} opacity={0.75}>
            <Html>
                <Iframe url={props.url}
                        width={props.width}
                        height={props.height}
                        display="initial"
                />
            </Html>
            <Label x={(props.width / 2) - (x / 2)} y={-60}>
                <Tag fill={'#62A6BF'}/>
                <Text
                    ref={textRef}
                    text={props.text}
                    fontFamily={'Helvetica'}
                    fontSize={25}
                    padding={15}
                    fill={'white'}
                    align={'center'}
                    verticalAlign={'middle'}
                />
            </Label>
        </Group>)

}