import React, { useEffect } from 'react'
import { Avatar } from '@mui/material'
import { Link } from 'react-router-dom'
import "./User.css"


function User({ user }) {
  return (
    <>
      <div className="wrapUser">
        <Avatar className='avatarUser'/>
        <Link to={`/Happier/${user._id}`} style={{textDecoration:"none",color:"black"}}>
          <span className='usernameUser'>{user.name}</span>
        </Link>
      </div>
    </>
  )
}

export default User