import { useState, useRef, useEffect } from 'react'
import { Data } from './Contexts'
import axios from 'axios'
import '../App.css'
import Home from '../images/home.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Error from './ErrorPage'
import Login from './Login'
import Signup from './Signup'
import LandingPage from './LandingPage'
import MusicPlayer from './MusicPlayer'
import BDMusiAdder from './BDMusiAdder'

export default function Main() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/musics')
      .then(res => setData(res.data))
  }, [])

  const [valeur, setValeur] = useState('')
  const inputt = useRef(null)
  return (
    <Data.Provider value={data}>
      <div className="app">
        <Router>
          <Routes>
            <Route exact path='/' element={<LandingPage />} />
            <Route path='/sign' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/grand' element={<MusicPlayer />} />
            <Route Component={Signup} />
          </Routes>
        </Router>
      </div>
    </Data.Provider>
  )
}
