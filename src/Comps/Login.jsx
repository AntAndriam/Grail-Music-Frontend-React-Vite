import React,{useState,useRef,useEffect} from 'react'
import logo from '../logo.svg'
import google from '../icons8-google.svg'
import { UserStatus } from './Contexts'
import {useNavigate,Link} from 'react-router-dom'
import axios from 'axios'
import '../App.css'

export default function Login() {
  const [email,setEmail]= useState('')
  const [message,setMessage]= useState()
  const [passwd,setPasswd]= useState('')
  const [visible,setVisible]= useState(false)
  const [status,setStatus]= useState('deconnecté')
  const mail= useRef(null)
  const mdp= useRef(null)
  const navigate = useNavigate();

    const post = async(e) => {
        e.preventDefault();
        if (passwd !=='' && email !=='') {
            try {
                const res= await axios.post('http://localhost:3001/auth/login', { email: email, password: passwd })
                setEmail('')
                setPasswd('')
                setMessage(res.data.message)
                navigate('/grand')
            }
            catch (err) {
                setMessage(err.response.data.error)
            }
        }
    }

  const handleChangeMail =()=>{
    setEmail(mail.current.value)
    console.log(email)
  }
  const handleChangePass =()=>{
    setPasswd(mdp.current.value)
    console.log(passwd)
  }
  return (
    <div className='login'>
      <div className='Whitebg'>
        <div className='logoo'>
          <img src={logo} height={50} width={50}></img>
          <p>Made with React</p>
        </div>
        <div className='placecontain'>
          <div className='welcom'>
            <h1>Welcome back!!!</h1>
            <p>What you trippin' fill this shit, and lissen to heavenly rap</p>
          </div>
          <form onSubmit={post}>
            <div>
              <p>Email:</p>
              <input ref={mail} value={email} onChange={handleChangeMail} placeholder='Enter your email' type='email' />
            </div>
            <div>
              <p>Password:</p>
              <input ref={mdp} value={passwd} onChange={handleChangePass} placeholder='Mots de passe' type={!visible?'password':"text"}/>
            </div>
            <div className='checker'>
              <div className='checkme'>
                <input type='checkbox' value={false}/>
                <p>Remember me</p>
              </div>
              <div>
                Forgot Password
              </div>
            </div>
            <div id='finnabutton'>
              <button id='btn1' type='submit'>Log In</button>
              <button id='btn2'>
                <img src={google} height={20}/>
                <p>Log In with Google</p>
              </button>
            </div>
          </form>
          <div className='donthaveanaccount'>
            <p>Don't have an account?<span><Link to='/sign'>Sign up</Link></span></p>
          </div>
        </div>
      </div>
    </div>
  )
}
