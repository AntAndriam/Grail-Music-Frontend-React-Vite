import React,{useEffect,useState,useRef,useContext} from 'react'
import '../App.css'
import { Song,Current } from './Contexts';
import MyHeartIcon from "../images/heart1.svg"
import Waveform from './WaveForm';


export default function List({children,cover,album,artist,src,click}) {
    //mon premier context on va voir si ça marche

  const Son=useContext(Song)
  const chanson=useContext(Current)

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

      useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.addEventListener('loadedmetadata', () => {
          setDuration(audio.duration);
        });

      }, []);
    
      const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      };

      useEffect(()=>{
        try{
          if(chanson == children){
            setIsPlaying(true)
          }
        }
        catch{
          console.log("erreur est survennu")
        }

        return ()=>{
          setIsPlaying(false)
        }
      },[chanson])
  return (
    <div className='heh'>
        <img src={cover} id="cover-img"/>
        <div className="info-cont">
            <span>{children.titre}</span>
            <span className='bomall'>{artist}</span>
        </div>
        <div className='time'>
          {isPlaying ? <Waveform/> : formatTime(duration)}
        </div>
        <div className="playing">
          <img src={MyHeartIcon} height="23px" width='23px' />
        </div>
        <audio ref={audioRef} src={src} type="audio/mpeg" />

    </div>
  )
}
