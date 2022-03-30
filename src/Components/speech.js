import {io} from "socket.io-client";
import {setInterimTranscript, setFinalTranscript, setTokens} from "../app/speechReducer";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

const socket = io('http://localhost:4000/');
// Speech Recognition
const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
const recognition = new SpeechRecognition()

let finalTranscript = '';

function Speech() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Socket
        socket.on('message', (data) => {
            let json = JSON.parse(data)

            // filter
            json.tokens = json.tokens.filter((token) => {
                return (token.keyword_rank > 0 || token.ent_type !== '')
            })

            console.log(json.tokens)

            dispatch(setTokens(json.tokens))
        })

        // image search
        // socket.on('search', function (json) {
        //     console.log(json)
        //     if (json.noResults) return false
        //     let description = json.results[0].description
        //     console.log(description)
        // })

        // Speech
        recognition.lang = 'en-US'
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.addEventListener('error', function (event) {
            console.log(event.error + ' and ' + recognition)
        })

        recognition.onend = (event) => {
            recognition.start()
        }

        recognition.onresult = (event) => {

            let interimTranscript = "";

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript + '.';
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }

            }

            let text = finalTranscript + interimTranscript;
            // text = interimTranscript;
            text = text.replace(/(\r\n|\n|\r)/gm, ' ')

            dispatch(setFinalTranscript(text))
            dispatch(setInterimTranscript(interimTranscript))

            // console.log(`emitting ${text}`)
            socket.emit('message', text)

            // for (let i = event.resultIndex; i < event.results.length; i++) {
            //     let transcript = event.results[i][0].transcript;
            //     if (event.results[i].isFinal) {
            //         finalTranscript += transcript;
            //         interimTranscript = '';
            //     } else {
            //         interimTranscript += transcript;
            //     }
            //     let text = finalTranscript + interimTranscript;
            //     // debugEl.innerText = value
            //     // textEl.setAttribute("value", value);
            //     // text = interimTranscript
            //     text = text.replace(/(\r\n|\n|\r)/gm, ' ')
            //     console.log(`emitting ${text}`)
            //     socket.emit('message', text)
            // }
        }

        recognition.start()
    }, [])

    return (
        <>
        </>
    );
}

function TestSpeech() {
    const dispatch = useDispatch();

    useEffect(() => {
        let defaultTranscript = "Hi, my name is Adnan Karim. I am a graduate student at the University of Calgary in the Department of Computer Science. Today, I want to talk about Real-time Augmented Presentation demo. As you can see when I talk about something, we can augment presentation using an augmented reality interface. We have several features, such as live kinetic typography, embedded icons, embedded visuals, as well as an embedded annotation to a physical object. All components are interactive with gestural interactions. And most importantly all animations happen in real-time. This means that no video editing or programming is required. Thus it can significantly reduce the time and efforts of making such an augmented presentation, but also expands the tremendous potential for real-time live presentations like classroom lectures. We believe these techniques can make the presentation more expressive and engaging. In this talk, I want to describe how we designed such a system and introduce a new system to describe how we implemented this demo. And here's the object mode."
        defaultTranscript = defaultTranscript.replaceAll('.', '')
        defaultTranscript = defaultTranscript.replaceAll(',', '')

        let speechTest = true
        speechTest = false

        if (speechTest) {
            let words = defaultTranscript.split(' ')
            let text = ''
            let i = 0
            setInterval(() => {
                if (i > words.length) return false
                text += words[i]
                text += ' '
                i++
                socket.emit('message', text)
            }, 500)
        } else {
            socket.emit('message', defaultTranscript)
        }

        socket.on('message', (data) => {
            let json = JSON.parse(data)
            let i = 1
            setInterval(() => {
                let current = Object.assign({}, json)
                current.tokens = current.tokens.slice(0, i)
                current.tokens = current.tokens.filter((token) => {
                    return (token.keyword_rank > 0 || token.ent_type !== '')
                })

                // console.log(current.tokens)
                dispatch(setTokens(current.tokens))
                // window.App.setState({ tokens: current.tokens })
                i++
            }, 400)
        })
    }, [])

    return (
        <>
        </>
    );
}

export {Speech, TestSpeech} ;