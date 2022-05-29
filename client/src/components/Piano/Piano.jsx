import React, { useState } from 'react'
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano'
import 'react-piano/dist/styles.css'
import SoundfontProvider from './SoundfontProvider'
import Styles from './Piano.module.css'
import { notes, notesNum } from './notes'
import Soundfont from 'soundfont-player'
import { useMessage } from '../../hooks/message.hook'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useReactMediaRecorder } from "react-media-recorder";
import Octaves from './../../images/octaves.png'

export const PianoC = () => {
    toast.configure({
        autoClose: 5000,
        draggable: true,
        position: 'top-right'
    })

    const [note, setNote] = useState()
    const [guess, setGuess] = useState('')
    const [show, setShow] = useState(false)

    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ screen: true, audio: false })

    const message = useMessage()

    const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)()
    const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net'

    const noteRange = {
        first: MidiNumbers.fromNote('a0'),
        last: MidiNumbers.fromNote('c8'),
    }
    const keyboardShortcuts = KeyboardShortcuts.create({
        firstNote: noteRange.first,
        lastNote: noteRange.last,
        keyboardConfig: KeyboardShortcuts.HOME_ROW,
    })
    
    const playNote = () => {
        Soundfont.instrument(new AudioContext(), 'acoustic_grand_piano').then(function (piano) {
            piano.play(guess)
        })
    }

    const startGame = () => {
        // for (let i = 0; i < notesStart.length; i++) {
        //     Soundfont.instrument(new AudioContext(), 'acoustic_grand_piano').then(function (piano) {
        //         piano.play(notesStart[i])
        //     })
        // }
        setShow(true)
        startRecording()
    }

    const guessNote = (note) => {
        if (guess === '') {
            return
        } else if (guess === note) {
            message(`Молодец! Ты угадал ноту ${notes[guess]}`, 'success')
            setGuess('')
            setShow(false)
            setTimeout(stopRecording, 1000)
            // localStorage.setItem('guessed', JSON.parse(localStorage.getItem('guessed')) + 1)
        }
        // } else {
        //     message(`Неправильно! Попробуй ещё раз`, 'error')
        // }
    }

    console.log(note)

    return (
        <div className={Styles.piano}>
            <img src={ Octaves } alt="" />
            <p>Нота* - графическое обозначение звука музыкального произведения</p>
            <p style={{marginBottom: '20px'}}>Октава* - музыкальный интервал, в котором соотношение частот между звуками составляет один к двум</p>
            <SoundfontProvider
                setNote={setNote}
                guessNote={guessNote}
                instrumentName="acoustic_grand_piano"
                audioContext={audioContext}
                hostname={soundfontHostname}
                render={({ isLoading, playNote, stopNote }) => (
                    <Piano
                        noteRange={noteRange}
                        width={1400}
                        playNote={playNote}
                        stopNote={stopNote}
                        disabled={isLoading}
                        // keyboardShortcuts={keyboardShortcuts}
                    />
                )}
            />

            {
                note !== undefined ?
                <h2 className={Styles.currentNote}>
                    {
                        notes[note]
                    }
                </h2> : ''
            }
            <button onClick={startGame} className={Styles.gameButton}>
                Поиграть
                <span className="material-icons">
                    play_circle
                </span>
            </button>
            <div className={Styles.play} style={show ? {display: 'flex'} : {display: 'none'}}>
                <button onClick={() => setGuess(notesNum[Math.floor(Math.random() * notesNum.length)])}>
                    Загадать ноту
                    <span className="material-icons">
                        music_note
                    </span>
                </button>
                <button onClick={playNote} disabled={guess === '' ? true : false}>
                    Прослушать ноту
                    <span className="material-icons">
                        replay
                    </span>
                </button>
            </div>
            {/* <p>{status}</p> */}
            {
                status === 'stopped' ?
                <video style={{marginTop: '20px'}} width={'100%'} src={mediaBlobUrl} controls autoPlay loop /> :
                null
            }
        </div>
    )
}
