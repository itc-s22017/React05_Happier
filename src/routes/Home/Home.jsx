import React, { useState } from 'react'
import axios from "axios"
import "./Home.css"


function Home() {
  const [joke,setJoke] = useState("")

  const headers = {
    'Content-Type': 'application/json',
  }

  const handleJoke = async() => {
    const response = await axios.get("https://icanhazdadjoke.com/slack")
    setJoke(response.data.attachments[0].text)
  }
  return (
    <div>
      <p>{joke ? joke : "TEXT"}</p>
      <button onClick={handleJoke}>push</button>
    </div>
  )
}

export default Home