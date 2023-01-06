import {Circle, Group, Label, Tag, Text} from "react-konva";
import {LayerImage} from "../Components/KonvaElements/layerimage";
import {Html} from "react-konva-utils";
import Iframe from "react-iframe";
import {useEffect, useRef, useState} from "react";
import Konva from "konva";
import {withGroup} from "../Components/KonvaElements/groupwrapper";

export function withGroupWrapped(Wrapped1, Wrapped2) {
    return function (props) {
        const groupRef = useRef(null)
        const [xp, setXp] = useState(0)
        const [yp, setYp] = useState(0)
        const {x, y, timeout, following, opacity, scaleX, scaleY} = props;
        // const initialTimeout = useRef(timeout);
        // const timer = useRef(null)

        useEffect(() => {
            setXp(x)
            setYp(y)

            groupRef.current.to({
                // scaleX: 1,
                // scaleY: 1,
                opacity: opacity === undefined ? 0.8 : opacity,
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
                draggable={true}
                opacity={0}
                scaleX={scaleX} scaleY={scaleY}
                // scale={groupRef.current === null ? {x: 0, y: 0} : {x: 1, y: 1}}
                x={following ? x : xp} y={following ? y : yp}
            >
                <Wrapped1/>
                <Wrapped2/>
            </Group>
        );
    }
}

export function withGroupWrapped1(Wrapped1) {
    return function (props) {
        const groupRef = useRef(null)
        const [xp, setXp] = useState(0)
        const [yp, setYp] = useState(0)
        const {x, y, timeout, following, opacity, scaleX, scaleY} = props;
        // const initialTimeout = useRef(timeout);
        // const timer = useRef(null)

        useEffect(() => {
            setXp(x)
            setYp(y)

            groupRef.current.to({
                // scaleX: 1,
                // scaleY: 1,
                opacity: opacity === undefined ? 0.8 : opacity,
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
                scaleX={scaleX} scaleY={scaleY}
                // scale={groupRef.current === null ? {x: 0, y: 0} : {x: 1, y: 1}}
                x={following ? x : xp} y={following ? y : yp}
            >
                <Wrapped1/>
            </Group>
        );
    }
}

export function withGroupWrapped3(Wrapped1, Wrapped2, Wrapped3) {
    return function (props) {
        const groupRef = useRef(null)
        const [xp, setXp] = useState(0)
        const [yp, setYp] = useState(0)
        const {x, y, timeout, following, opacity, scaleX, scaleY} = props;
        // const initialTimeout = useRef(timeout);
        // const timer = useRef(null)

        useEffect(() => {
            setXp(x)
            setYp(y)

            groupRef.current.to({
                // scaleX: 1,
                // scaleY: 1,
                opacity: opacity === undefined ? 0.8 : opacity,
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
                draggable={true}
                opacity={0}
                scaleX={scaleX} scaleY={scaleY}
                // scale={groupRef.current === null ? {x: 0, y: 0} : {x: 1, y: 1}}
                x={following ? x : xp} y={following ? y : yp}
            >
                <Wrapped1/>
                <Wrapped2/>
                <Wrapped3/>
            </Group>
        );
    }
}

export function TextElement(props) {
    const {text, text_color, tag_color, size, x, y, style, opacity} = props
    //'#62A6BF'
    return (
        <Label x={x} y={y}>
            <Tag opacity={opacity} fill={tag_color}/>
            <Text text={text}
                  fontFamily={'Ubuntu'}
                  fontSize={size}
                  padding={25}
                  fill={text_color}
                  align={'left'}
                  verticalAlign={'middle'}
                  fontStyle={style}
            />
        </Label>
    );
}

export function TextElementPointer(props) {
    const {text, text_color, tag_color, size, x, y, style, opacity} = props
    //'#62A6BF'
    return (
        <Label x={x} y={y}>
            <Tag opacity={opacity}
                 fill={tag_color}
                 pointerDirection={'left'}
                 pointerWidth={60}
                 pointerHeight={40}
                 lineJoin={'round'}
            />
            <Text text={text}
                  fontFamily={'Ubuntu'}
                  fontSize={size}
                  padding={20}
                  fill={text_color}
                  align={'left'}
                  verticalAlign={'middle'}
                  fontStyle={style}
            />
        </Label>
    );
}

// const TextWithGroup = withGroup(TextElement);
// const TextPointerWithGroup = withGroup(TextElementPointer);

// x, y, timeout, following, opacity, scaleX, scaleY, ...passThroughProps


// export const Teaser = (keyword) => {
//     const intro_t1 = <TextElement text={"Jane Doe   \n\n"} text_color={"#3861e5"} tag_color={'white'} size={60}
//                                   style={'bold'}
//                                   opacity={0.5}/>
//     const intro_t2 = <TextElement y={100} text={"Computer Scientist\nResearch Institute"} text_color={"#3861e5"}
//                                   tag_color={'white'} size={35} style={'normal'} opacity={0}/>
//     const Intro = withGroupWrapped(intro_t1, intro_t2)
//
//
//     const aug = <TextElement text={"Augmented Presentation"} text_color={"#075204"} tag_color={'lightgreen'} size={60}
//                              style={'bold'}
//                              opacity={0.5}/>;
//     const Aug = withGroupWrapped1(aug)
//
//     const aug_text = <TextElement text={"Augmented Reality\n          Interface"} text_color={"#600b98"}
//                                   tag_color={'#be67f8'} size={50} style={'bold'}
//                                   opacity={0.2}/>
//     const aug_img = <LayerImage url={'./images/ar_interface.png'} opacity={0.7} x={125} y={160}/>
//
//     const AR = withGroupWrapped(aug_text, aug_img)
//
//     const fe = <TextElement text={"Features                                       \n\n\n\n"} text_color={"#943b0b"}
//                             tag_color={'#f5a478'} size={28}
//                             style={'bold'}
//                             opacity={0.3}/>
//     const list = <TextElement y={45}
//                               text={"1. Live kinetic typography\n2. Embedded visuals\n3. Embedded icons\n4. Annotations to a physical object"}
//                               text_color={"#943b0b"}
//                               tag_color={'white'} size={25} style={'normal'} opacity={0}/>
//
//     const Feature = withGroupWrapped(fe, list)
//
//     const ge = <TextElement text={"gestural interaction"} text_color={"#600b98"}
//                             tag_color={'#be67f8'} size={40} style={'bold'}
//                             opacity={0.2}/>
//     const img = <LayerImage url={'./images/gestural.png'} opacity={0.9} x={100} y={100}/>
//
//     const Gestural = withGroupWrapped(ge, img)
//
//     const vid = <TextElement text={"video editing"} text_color={"#5d0d0d"} tag_color={'red'} size={40}
//                              style={'bold'}
//                              opacity={0.25}/>
//     const pro = <TextElement y={100} text={"programming"} text_color={"#5d0d0d"} tag_color={'red'} size={40}
//                              style={'bold'}
//                              opacity={0.25}/>
//
//     const No = withGroupWrapped(vid, pro)
//
//
//
//     // const
//
//
//     // const elements = <Group>
//     //
//     //     <Group x={300} y={300} draggable={true}>
//     //         <TextElement text={"Jane Doe   \n\n"} text_color={"#3861e5"} tag_color={'white'} size={60}
//     //                      style={'bold'}
//     //                      opacity={0.5}/>
//     //         <TextElement y={100} text={"Computer Scientist\nResearch Institute"} text_color={"#3861e5"}
//     //                      tag_color={'white'} size={35} style={'normal'} opacity={0}/>
//     //     </Group>
//     //
//     //     <Group draggable={true}>
//     //         <TextElement text={"Augmented"} text_color={"#075204"} tag_color={'lightgreen'} size={40} style={'bold'}
//     //                      opacity={0.5}/>
//     //     </Group>
//     //
//     //     <Group draggable={true}>
//     //         <TextElement text={"Augmented Presentation"} text_color={"#075204"} tag_color={'lightgreen'} size={60}
//     //                      style={'bold'}
//     //                      opacity={0.5}/>
//     //     </Group>
//     //
//     //     <Group draggable={true}>
//     //         <TextElement text={"Augmented Reality\n          Interface"} text_color={"#600b98"}
//     //                      tag_color={'#be67f8'} size={50} style={'bold'}
//     //                      opacity={0.2}/>
//     //         <LayerImage url={'./images/ar_interface.png'} opacity={0.7} x={125} y={160}/>
//     //     </Group>
//     //
//     //     <Group draggable={true} scaleX={1.5} scaleY={1.5}>
//     //         <TextElement text={"Features                                       \n\n\n\n"} text_color={"#943b0b"}
//     //                      tag_color={'#f5a478'} size={28}
//     //                      style={'bold'}
//     //                      opacity={0.3}/>
//     //         <TextElement y={45}
//     //                      text={"1. Live kinetic typography\n2. Embedded visuals\n3. Embedded icons\n4. Annotations to a physical object"}
//     //                      text_color={"#943b0b"}
//     //                      tag_color={'white'} size={25} style={'normal'} opacity={0}/>
//     //     </Group>
//     //
//     //     <Group draggable={true}>
//     //         <TextElement text={"gestural interaction"} text_color={"#600b98"}
//     //                      tag_color={'#be67f8'} size={40} style={'bold'}
//     //                      opacity={0.2}/>
//     //         <LayerImage url={'./images/gestural.png'} opacity={0.9} x={100} y={100}/>
//     //     </Group>
//     //
//     //     <Group draggable={true}>
//     //         <TextElement text={"video editing"} text_color={"#5d0d0d"} tag_color={'red'} size={40}
//     //                      style={'bold'}
//     //                      opacity={0.25}/>
//     //         <TextElement y={100} text={"programming"} text_color={"#5d0d0d"} tag_color={'red'} size={40}
//     //                      style={'bold'}
//     //                      opacity={0.25}/>
//     //     </Group>
//     //
//     // </Group>
//
//
//     // return keyword.toLowerCase().includes('my name') ? <Intro/> : null;
//     // return elements;
//     return <Group>
//         <Intro />
//     </Group>;
// }

export const EmbeddedVisual = () => {
    return (
        <Group>
            {/*<Group draggable={true} scaleX={1.6} scaleY={1.6}>*/}
            {/*    <LayerImage url={'./images/google.png'} opacity={0.7}/>*/}
            {/*</Group>*/}

            <Group draggable={true} scaleX={2.5} scaleY={2.5}>
                <LayerImage url={'./images/book.png'} opacity={0.5}/>
            </Group>
        </Group>
    );
}

export const WorldTracking = () => {
    return (
        <Group>
            {/*<Group draggable={true} scaleX={1.5} scaleY={1.5}>*/}
            {/*    <LayerImage url={'./images/wall_pic1.png'} opacity={0.5}/>*/}
            {/*</Group>*/}

            {/*<Group draggable={true} scaleX={1.8} scaleY={1.8}>*/}
            {/*    <LayerImage url={'./images/wall_pic2.png'} opacity={0.5}/>*/}
            {/*</Group>*/}

            {/*<Group draggable={true} scaleX={1.8} scaleY={1.8}>*/}
            {/*    <LayerImage url={'./images/vase.png'} opacity={0.7}/>*/}
            {/*</Group>*/}

            <Group draggable={true} scaleX={1.1} scaleY={1.1}>
                <LayerImage url={'./images/tree.png'} opacity={0.7}/>
            </Group>

            <Group draggable={true} scaleX={1.1} scaleY={1.1}>
                <LayerImage url={'./images/tree.png'} opacity={0.7}/>
            </Group>

            <Group draggable={true} scaleX={1.1} scaleY={1.1}>
                <LayerImage url={'./images/tree.png'} opacity={0.7}/>
            </Group>

        </Group>
    );
}


const ps = () => <TextElement text={"Product Sales Presentation"} text_color={"#075204"} tag_color={'lightgreen'}
                              size={35}
                              style={'bold'}
                              opacity={0.4}/>
const pt = () => <TextElement y={100} text={"Presenter: Jane Doe"} text_color={"#5d0d0d"} tag_color={'red'} size={35}
                              style={'bold'}
                              opacity={0.25}/>
const time = () => <TextElement y={200} text={"March 1st, 2022"} text_color={"#3861e5"} tag_color={'white'} size={35}
                                style={'bold'}
                                opacity={0.5}/>
export const Profile = withGroupWrapped3(ps, pt, time)

const tit = () => <TextElement text={"    Canon EOS 40D v.s. Sony Alpha 850    "} text_color={"#600b98"}
                               tag_color={'#be67f8'} size={35} style={'bold'}
                               opacity={0.2}/>
export const Title = withGroupWrapped1(tit)

const si = () => <LayerImage url={'./images/sony.png'} opacity={0.7}/>;

export const Sony = withGroupWrapped1(si)

const ca = () => <LayerImage url={'./images/canon.png'} opacity={0.7}/>


export const Canon = withGroupWrapped1(ca)

const ch = () => <LayerImage url={'./images/chart.png'} opacity={0.6}/>

export const Chart = withGroupWrapped1(ch)


const yl = () => <Circle x={100} y={100} fill={'yellow'} radius={10}/>

export const Dot = withGroupWrapped1(yl)

const bb = () => <LayerImage url={'./images/bestbuy.png'} opacity={0.6}/>
export const Best = withGroupWrapped1(bb)

export const BusinessPresentation = () => {
    return (
        <Group>
            <Group draggable={true}>
                <TextElement text={"Product Sales Presentation"} text_color={"#075204"} tag_color={'lightgreen'}
                             size={35}
                             style={'bold'}
                             opacity={0.4}/>
                <TextElement y={100} text={"Presenter: Jane Doe"} text_color={"#5d0d0d"} tag_color={'red'} size={35}
                             style={'bold'}
                             opacity={0.25}/>
                <TextElement y={200} text={"March 1st, 2022"} text_color={"#3861e5"} tag_color={'white'} size={35}
                             style={'bold'}
                             opacity={0.5}/>

            </Group>

            <Group draggable={true}>
                <TextElement text={"    Canon EOS 40D v.s. Sony Alpha 850    "} text_color={"#600b98"}
                             tag_color={'#be67f8'} size={35} style={'bold'}
                             opacity={0.2}/>
            </Group>

            <Group draggable={true}>
                <LayerImage url={'./images/sony.png'} opacity={0.7}/>
            </Group>

            <Group draggable={true} scaleX={1.6} scaleY={1.6}>
                <LayerImage url={'./images/canon.png'} opacity={0.7}/>
            </Group>


            <Group draggable={true} scaleX={3} scaleY={3}>
                <LayerImage url={'./images/chart.png'} opacity={0.6}/>
            </Group>

            <Group draggable={true} scaleX={2.5} scaleY={2.5} opacity={0.6}>
                <Circle x={100} y={100} fill={'yellow'} radius={10}/>
            </Group>

            <Group draggable={true} scaleX={0.7} scaleY={0.7}>
                <LayerImage url={'./images/bestbuy.png'} opacity={0.6}/>
            </Group>


        </Group>
    );
}

const imgwc = () => <LayerImage url={'./images/white_blood_cell.png'} opacity={0.8}/>
const twc = () => <TextElement y={200} text={"White Blood Cells"} text_color={"#4b4c4f"} tag_color={'#f5a478'} size={26}
                               style={'bold'}
                               opacity={0.5}/>
export const White = withGroupWrapped(imgwc, twc)

const imgkt = () => <LayerImage url={'./images/killer_t_cell.png'} opacity={0.8}/>
const tkt = () => <TextElement x={35} y={200} text={"Killer T Cells"} text_color={"#4b4c4f"} tag_color={'#f5a478'}
                               size={26}
                               style={'bold'}
                               opacity={0.5}/>
export const Kill = withGroupWrapped(imgkt, tkt)

const imgvir = () => <LayerImage url={'./images/virus.png'} opacity={0.8}/>
const tvir = () => <TextElement x={40} y={200} text={"HIV Virus"} text_color={"#f1efef"} tag_color={'#7e050f'} size={26}
                                style={'bold'}
                                opacity={0.4}/>
export const Virus = withGroupWrapped(imgvir, tvir)

const imm = () => <LayerImage url={'./images/immune_system.png'} opacity={0.8}/>
export const Immune = withGroupWrapped1(imm)

const vid = () => <Html>
    <Iframe url={"https://www.youtube.com/embed/5g1ijpBI6Dk"}
            width={350}
            height={200}
            display="initial"
            allow={'autoplay'}
    />
</Html>

export const Video = withGroupWrapped1(vid)


// export const OnlineLecture = () => {
//     return (
//         <Group>
//
//             <Group draggable={true}>
//                 <LayerImage url={'./images/white_blood_cell.png'} opacity={0.8}/>
//                 <TextElement y={200} text={"White Blood Cells"} text_color={"#4b4c4f"} tag_color={'#f5a478'} size={26}
//                              style={'bold'}
//                              opacity={0.5}/>
//             </Group>
//
//             <Group draggable={true}>
//                 <LayerImage url={'./images/killer_t_cell.png'} opacity={0.8}/>
//                 <TextElement x={35} y={200} text={"Killer T Cells"} text_color={"#4b4c4f"} tag_color={'#f5a478'}
//                              size={26}
//                              style={'bold'}
//                              opacity={0.5}/>
//             </Group>
//
//             <Group draggable={true}>
//                 <LayerImage url={'./images/virus.png'} opacity={0.8}/>
//                 <TextElement x={40} y={200} text={"HIV Virus"} text_color={"#f1efef"} tag_color={'#7e050f'} size={26}
//                              style={'bold'}
//                              opacity={0.4}/>
//             </Group>
//
//
//             <Group draggable={true} scaleX={1.9} scaleY={1.9}>
//                 <LayerImage url={'./images/immune_system.png'} opacity={0.8}/>
//             </Group>
//
//
//             <Group>
//                 <TextElement x={120} y={360} text={"Immune System"} text_color={"#353638"}
//                              tag_color={'lightgreen'} size={26}
//                              style={'bold'}
//                              opacity={0.4}/>
//             </Group>
//         </Group>
//
//
//     <Group x={300} y={500} draggable={true} opacity={0.35} scaleX={1.8} scaleY={1.8}>
//         <Html>
//             <Iframe url={"https://www.youtube.com/embed/5g1ijpBI6Dk"}
//                     width={350}
//                     height={200}
//                     display="initial"
//                     allow={'autoplay'}
//             />
//         </Html>
//     </Group>
//
//
// </Group>
//
// )
//     ;
// }

const tb = () => <TextElementPointer text={"Swell Water Bottle"} text_color={"#2f2e2f"}
                                     tag_color={'#be67f8'} size={35} style={'bold'}
                                     opacity={0.3}/>
export const Bottle = withGroupWrapped1(tb)

const bn = () => <TextElementPointer
    text={'1. Double-wall vacuum insulation\n\n2. Flexible perforated handle\n\n3. Dishwasher-safe'}
    text_color={"#2f2e2f"}
    tag_color={'#be67f8'} size={25} style={'bold'}
    opacity={0.3}/>
export const Benefits = withGroupWrapped1(bn)

const gym = () => <LayerImage url={'./images/gym.jpeg'} opacity={0.5}/>

export const Gymming = withGroupWrapped1(gym)

const swim = () => <LayerImage url={'./images/swimming.jpeg'} opacity={0.5}/>

export const Swimming = withGroupWrapped1(swim)

const hike = () => <LayerImage url={'./images/hiking.jpeg'} opacity={0.5}/>

export const Hiking = withGroupWrapped1(hike)

const qr = () => <LayerImage url={'./images/qrcode.png'} opacity={0.9}/>

export const QRCode = withGroupWrapped1(qr)

const disc = () => <LayerImage url={'./images/discount.png'} opacity={0.7}/>

export const Discount = withGroupWrapped1(disc)


export const ECommerce = () => {
    return (
        <Group>
            <Group draggable={true}>
                <TextElementPointer text={"Swell Water Bottle"} text_color={"#2f2e2f"}
                                    tag_color={'#be67f8'} size={35} style={'bold'}
                                    opacity={0.3}/>
            </Group>

            <Group draggable={true}>
                <TextElementPointer
                    text={'1. Double-wall vacuum insulation\n\n2. Flexible perforated handle\n\n3. Dishwasher-safe'}
                    text_color={"#2f2e2f"}
                    tag_color={'#be67f8'} size={25} style={'bold'}
                    opacity={0.3}/>

            </Group>

            <Group draggable={true} scaleX={1.5} scaleY={1.5}>
                <LayerImage url={'./images/gym.jpeg'} opacity={0.5}/>
            </Group>

            <Group draggable={true} scaleX={1.5} scaleY={1.5}>
                <LayerImage url={'./images/hiking.jpeg'} opacity={0.5}/>
            </Group>

            <Group draggable={true} scaleX={1.5} scaleY={1.5}>
                <LayerImage url={'./images/swimming.jpeg'} opacity={0.5}/>
            </Group>


            <Group draggable={true} scaleX={1.3} scaleY={1.3}>
                <LayerImage url={'./images/discount.png'} opacity={0.7}/>
            </Group>

            <Group draggable={true} scaleX={1.3} scaleY={1.3}>
                <LayerImage url={'./images/qrcode.png'} opacity={0.9}/>
            </Group>


        </Group>
    );
}