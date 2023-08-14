import React, { useState } from 'react'
import axios from "axios"
import "./Home.css"


function Home() {
  const [joke,setJoke] = useState("")

  const handleJoke = async() => {
    const response = await axios.get("https://icanhazdadjoke.com/slack")
    setJoke(response.data.attachments[0].text)
  }
  return (
    <div className='dadJoke'>
      <p className='text'>{joke ? joke : "TEXT"}</p>
      <button onClick={handleJoke} className='btn'>押して！</button>
    </div>
  )
}

export default Home