import React, { useEffect, useRef, useState, useContext } from "react";
import { IsPlaying } from "./Contexts";
import WaveSurfer from "wavesurfer.js";
import Pause from "../images/pause.svg"
import Play from "../images/play.svg"
import Next from "../images/next.svg"
import Repeat from "../images/repeat.svg"
import Shuffle from "../images/shuffle.svg"
import '../css/style-wave.css'

export default function Waveform({ audioUrl, Nextt, retour }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [audio, setAudio] = useState(null)
  const [time, setTime] = useState({ currentTime: 0, duration: 0 })

  //context isplaying et tout (Mora azo pr)
  const { isPlaying, setIsPlaying, mode, setMode } = useContext(IsPlaying)

  useEffect(() => {
    setAudio(audioUrl)
    setTime(prev => ({ ...prev, currentTime: 0 }))
    setIsPlaying(true)
  }, [audioUrl])

  useEffect(() => {
    if (audio) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        autoplay: true,
        barGap: 2,
        barWidth: 2,
        barRadius: 5,
        width: 400,
        cursorColor: '#2f44ccff',
        cursorWidth: 2,
        waveColor: "#ccc",
        progressColor: "#6985ff",
        height: 20,
        responsive: true
      });
      wavesurfer.current.load(audio);

      wavesurfer.current.on('finish', () => {
        Nextt()
      })
    }

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy()
      }
    };
  }, [audio]);

  useEffect(() => {
    if (wavesurfer.current) {
      setInterval(() => {
        setTime(prev => ({ ...prev, currentTime: wavesurfer.current.getCurrentTime() }))
      }, 1000)
    }
  }, [time])

  const getDuration = () => {
    if (wavesurfer.current) {
      return wavesurfer.current.getDuration();
    }
    return 0;
  };

  const pauseAudio = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
      setIsPlaying(!isPlaying)
    }
  };

  const format = (s) => {
    let minutes = Math.floor(s / 60)
    let seconds = Math.floor(s % 60)

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <div className="wave-cont">
      <div className='wave-cmd'>
        <div className="controller">
          <img src={Next} height='30px' width='30px' onClick={() => retour()} style={{ transform: "scale(-1)" }} alt='hey' />
          {isPlaying ? <img src={Pause} height='40px' width='40px' onClick={pauseAudio} style={{ cursor: 'pointer' }} /> :
            <img src={Play} height='40px' width='40px' onClick={pauseAudio} style={{ cursor: 'pointer' }} />}
          <img src={Next} height='30px' width='30px' onClick={() => Nextt()} />
        </div>
        <div className='mode'>
          {mode === 'shuffle' ?
            <div>
              <img src={Shuffle} height='20px' width='20px' />
              <span>Aléatoire</span>
            </div> : mode === '' ? 
            <div>
              <img src={Shuffle} height='20px' width='20px' />
              <span>Boucle</span>
            </div> : 
            <div>
              <img src={Shuffle} height='20px' width='20px' />
              <span></span>
            </div>
          }
        </div>
      </div>
      <div className="wave-info">
        <span>{format(time.currentTime.toFixed(0))}</span>
        <div ref={waveformRef} className="wave-form"></div>
        <span> {format(getDuration().toFixed(0))}</span>
      </div>
    </div>
  );
}
