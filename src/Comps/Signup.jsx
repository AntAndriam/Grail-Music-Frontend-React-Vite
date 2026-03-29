import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.svg'
import axios from 'axios'
import '../App.css'

export default function Signup() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState()
    const [passwd, setPasswd] = useState('')
    const [message,setMessage]= useState()
    const [visible, setVisible] = useState(false)
    const nom = useRef(null)
    const mail = useRef(null)
    const mdp = useRef(null)

useEffect(()=>{
    setTimeout(()=>{
        setMessage()
    },3000)
},[message])

    const post = async(e) => {
        e.preventDefault();
        if (name !=='' && passwd !=='' && email !=='') {
            try {
                const res= await axios.post('http://localhost:3001/auth/signup', {name:name, email: email, password: passwd })
                setEmail('')
                setName('')
                setPasswd('')
                setMessage(res.data.message)
            }
            catch (err) {
                setMessage(err.response.data.error)
            }
        }
    }
    const handleChangeName = () => {
        setName(nom.current.value)
        console.log(name)
    }
    const handleChangeMail = () => {
        setEmail(mail.current.value)
    }
    const handleChangePass = () => {
        setPasswd(mdp.current.value)
    }
    return (
        <div className='login'>
            <div className='Whitebg'>
                {(message && message!='Ok') && <div className='error'>
                    <p>{message}</p>
                </div>}
                <div className='logoo'>
                    <img src={logo} height={50} width={50}></img>
                    <p>Made with React</p>
                </div>
                <div className='placecontaine'>
                    <div className='welcom'>
                        <h1>Nah, You ain't lost!!!</h1>
                        <p>Bruh, complete this if you wanna listen to Good Shyt</p>
                    </div>
                    <form onSubmit={post}>
                        <div>
                            <p>Username:</p>
                            <input ref={nom} value={name} onChange={handleChangeName} placeholder='Username' type='text' />
                        </div>
                        <div>
                            <p>Email:</p>
                            <input ref={mail} value={email} onChange={handleChangeMail} placeholder='Enter your email' type='email' />
                        </div>
                        <div>
                            <p>Password:</p>
                            <input ref={mdp} value={passwd} onChange={handleChangePass} placeholder='Mots de passe' type={!visible ? 'password' : "text"} />
                        </div>
                        <div className='checker'>
                            <div className='checkme'>
                                <input type='checkbox' value={false} />
                                <p>Accept policy shit</p>
                            </div>
                            <div>
                               <Link to='/login'>Log in?</Link> 
                            </div>
                        </div>
                        <div id='finnabutton'>
                            <button id='btn1' type='submit'>Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
