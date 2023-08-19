import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "../../utils/axios"
import { Avatar } from '@mui/material'
import Happier from '../Happier/Happier'
import "./Profile.css"

function Profile() {
  const username = useParams().username
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`/users/${username}`)
        setCurrentUser(res.data.name)
      } catch (e) {
        console.log("error profile page")
      }
    }
    fetch()
  }, [])


  return (
    <>
      <div className="profile">
        <Avatar className='avatar2'/>
        <span className='username'>{currentUser} さんのプロフィール</span>
      </div>
      <Happier username={username} />
    </>
  )
}

export default Profile