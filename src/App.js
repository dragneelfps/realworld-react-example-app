import React, { useState, useRef, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import { useObservable, useLocalStore, useObserver } from 'mobx-react-lite';
import { useStore } from './store'
import API from './network/api'

function App() {
  const store = useStore()
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const onSubmit = useCallback(() => {
    const email = emailRef.current.value
    const password = passwordRef.current.value
    console.log(email, password)
    API.login({ email, password }).then(user => {
      console.log(user)
    }).catch(e => {
      console.error(e)
    })
  }, [])

  return useObserver(() => (
    <div>
      <input ref={emailRef} placeholder="Email" type="text" />
      <input ref={passwordRef} placeholder="Password" type="password" />
      <button onClick={onSubmit}>Login</button>
    </div>
  ))
}

export default App;
