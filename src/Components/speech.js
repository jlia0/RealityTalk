import {io} from "socket.io-client";
import {setInterimTranscript, setFinalTranscript, setTokens} from "../app/speechReducer";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

export const socket = io('http://localhost:4000/');
// Speech Recognition
const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
const recognition = new SpeechRecognition()

let finalTranscript = '';

// console.log(recognition)

function Speech() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Socket
        socket.on('message', (data) => {
            let json = JSON.parse(data)

            console.log(json)

            // filter
            json.tokens = json.tokens.filter((token) => {
                return (token.keyword_rank > 0 || token.ent_type !== '')
            })


            dispatch(setTokens(json.tokens))
        })

        // image search
        socket.on('search', function (json) {
            console.log(json)

            // if (json.noResults) return false
            // let description = json.results[0].description
            // console.log(description)
        })

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

            console.log(text)

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
        let defaultTranscript = `Hello everyone, my name is Jian Liao, and I am super excited to join the T04 cohort in October. A little bit background about myself, I recently graduated from the University of Calgary as a computer science undergrad. In the meantime, I am a three-time founder of different businesses from IoT devices to small business SAAS tool, two of them in Hong Kong and one in Calgary. I also worked as a data engineer`

        defaultTranscript = defaultTranscript.replaceAll('.', '')
        defaultTranscript = defaultTranscript.replaceAll(',', '')

        let speechTest = true
        // speechTest = false

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
            }, 650)
        })

        // socket.on('message', (data) => {
        //     let json = JSON.parse(data)
        //     let i = 1
        //
        //     // let jtokens = json.tokens;
        //     json.tokens = json.tokens.filter((token) => {
        //         return (token.keyword_rank > 0 || token.ent_type !== '')
        //     });
        //
        //     setInterval(() => {
        //         let current = json.tokens.slice(0, i)
        //         // console.log(current.tokens)
        //         dispatch(setTokens(current))
        //         // window.App.setState({ tokens: current.tokens })
        //         i++
        //     }, 1800)
        // })
    }, [])

    return (
        <>
        </>
    );
}

export {Speech, TestSpeech} ;