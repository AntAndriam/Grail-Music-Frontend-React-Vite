import { useState, useEffect, useRef, useContext } from 'react'
import { Data } from './Contexts'
import '../App.css'
import cover from '../cover.jpg'
import MyHeartIcon1 from "../images/heart1.svg"
import Search from "../images/Search.svg"
import Fullscreen2 from "../images/fullscreen2.svg"
import { Link, useNavigate } from 'react-router-dom'
import Waveform from './WaveSurfer'
import { Song, Current, IsPlaying } from './Contexts'
import List from './ListStyle'

export const Message = (props) => {
  return (
    <div className='message'>
      {props.children}
    </div>
  )
}
function MusicPlayer() {
  const navigate = useNavigate()
  const data = useContext(Data)

  const [active, setActive] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [mode, setMode] = useState("shuffle")
  const [currentsong, setCurrentsong] = useState()
  const [cover_img, setCover_img] = useState()
  const [indexsong, setIndex] = useState(0)
  const [src, setSrc] = useState()
  const [logged, setLogged] = useState(false)
  const [affichage, setAffichage] = useState("default")

  const audioRef = useRef(null)
  const list = useRef(null)


  const sortDataByNom = (arr) => {
    return arr.slice().sort((a, b) => a.titre.localeCompare(b.titre));
  };
  const getInfo = (el, index) => {
    setCurrentsong(el)
    setIndex(index)
  };
  const playTheAudio = (el, index) => {
    getInfo(el, index)
    console.log(indexsong, el.titre)
  };
  useEffect(() => {
    if (currentsong) {
      setCover_img(`http://localhost:3001/uploads/${currentsong.album}/${currentsong.cover}`)
      setSrc(`http://localhost:3001/uploads/${currentsong.album}/${currentsong.main} - ${currentsong.titre}.mp3`)
    }
  }, [currentsong])

  const Next = () => {
    setCurrentsong(data[indexsong + 1])
    setIndex(indexsong + 1)
  }
  const Preview = () => {
    setCurrentsong(data[indexsong - 1])
    setIndex(indexsong - 1)
  }

  return (
    <Song.Provider value={getInfo}>
      <IsPlaying.Provider value={{ isPlaying, setIsPlaying}}>
        <Current.Provider value={currentsong}>
          {currentsong && (<img src={cover_img} alt='' className='img-bg-nice' />)}
          <div className="music-ctn">
            <div className='bg-blur' />
            <div className='top-nav'>
              <div className='left-top'>
                <div className='style-app'>
                  <div>
                    <img src={Fullscreen2} height="25px" />
                  </div>
                  <div></div>
                </div>
              </div>
              <div className="right-top">
                <div className='search-cont'>
                  <img src={Search} className='search_icon' />
                  <input type="text" placeholder='Un truc intelligent tiktok' className="search" />
                </div>
                {logged ? <div className='left-shit-logged'>
                  <div className='user-img-cont'>
                    <img src={cover} alt='pdp' height="40px" width="40px" style={{ borderRadius: "50%" }} />
                  </div>
                  <div className='utilisateur'>Utilisateur</div>
                </div> :
                  <div className='left-shit'>
                    <div className='btn-connect' onClick={() => navigate('/login')}>Sign Up</div>
                  </div>
                }
              </div>
            </div>
            {/* affichage */}
            <div className="mid-cont">
              <div className="img-cont">
                {currentsong ? <img src={cover_img} height="100%" width="100%" className="cover_image" /> : <img src={cover} height="100%" width="100%" className="cover_image" />}

              </div>
              <div className="choice-cont">
                <nav>
                  <ul>
                    <div className={(active === 1) ? "active" : undefined} onClick={() => setActive(1)}>All</div>
                    <div className={(active === 2) ? "active" : undefined} onClick={() => setActive(2)}>Most Listen</div>
                    <div className={(active === 3) ? "active" : undefined} onClick={() => setActive(3)}>For You</div>
                  </ul>
                </nav>
                <div className='list-cont'>

                  {data.map((el, index) => <div
                    ref={list}
                    key={el._id}
                    onClick={() => playTheAudio(el, index)}>
                    <List
                      cover={`http://localhost:3001/uploads/${el.album}/${el.cover}`}
                      src={`http://localhost:3001/uploads/${el.album}/${el.main} - ${el.titre}.mp3`}
                      album={el.album}
                      artist={el.artist}
                    >
                      {el}
                    </List>
                  </div>)}

                </div>
              </div>
            </div>
            {currentsong &&
              <div className="bottom-nav">
                <div className='info-cc'>
                  <div className="img-cont-bottom">
                    <img src={cover_img} alt='cover' className="cover_bottom_img" />
                  </div>
                  <div className='info_bottom'>
                    <span>{currentsong.titre}</span>
                    <span className='ss'>{currentsong.artist}</span>
                  </div>
                  <div className='like'>
                    <img src={MyHeartIcon1} height='30px' width='30px' fill='red' stroke='red' />
                    {/* <MyHeartIcon1 height='30px' width='30px' stroke={'red'} fill='red'/> */}
                  </div>
                </div>
                <div className="range-bar-cont" ref={audioRef}>
                  <Waveform audioUrl={src} retour={Preview} Nextt={Next} />
                </div>

              </div>
            }
          </div>
        </Current.Provider>
      </IsPlaying.Provider>
    </Song.Provider>

  )
}

export default MusicPlayer
