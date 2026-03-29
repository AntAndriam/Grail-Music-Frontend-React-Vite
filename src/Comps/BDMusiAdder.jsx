import React,{useState,useRef} from 'react'
import axios from 'axios'

export default function BDMusiAdder() {
    const [titre,setTitre]=useState()
    const [artist,setArtist]=useState()
    const [mainn,setMain]=useState()
    const [album,setAlbum]=useState()
    const [cover,setCover]=useState()

    const title = useRef(null)
    const art = useRef(null)
    const main = useRef(null)
    const bumal = useRef(null)
    const cov = useRef(null)
    const handleClick = async() =>{
        axios.post("http://localhost:3001/musics",({titre: titre,artist: artist,main: mainn,album: album,cover:cover}))
    setTitre('')
    // setArtist('')
    // setAlbum('')
    // setCover('')        
    }
  return (
    <div>
        <input ref={title} type="text" value={titre} placeholder='Titre' onChange={()=>setTitre(title.current.value)}/>
        <input ref={art} type="text" value={artist} placeholder='Artiste' onChange={()=>setArtist(art.current.value)}/>
        <input ref={main} type="text" value={mainn} placeholder='Artiste Principale' onChange={()=>setMain(main.current.value)}/>
        <input ref={bumal} type="text" value={album} placeholder='Album' onChange={()=>setAlbum(bumal.current.value)}/>
        <input ref={cov} type="text" value={cover} placeholder='cover' onChange={()=>setCover(cov.current.value)}/>
        <button style={{backgroundColor:"white"}} onClick={handleClick}>Let go</button>
    </div>
  )
}
