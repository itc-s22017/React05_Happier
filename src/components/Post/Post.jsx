import React from 'react'
import "./Post.css"
import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { format } from 'timeago.js';


function Post({ post }) {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/Happier/${post.username}`)
  }
  return (
    <div className="post">
      <div className="wrap">
      <div className="iconAndName">
        <Avatar className='avatar' onClick={handleNavigate}/>
        <span className='username'>{post.username}</span>
      </div>
      <div>
        <span className='minutes'>{format(post.createdAt)}</span>
      </div>
      </div>
      <div className="content">
        <p>{post.content}</p>
      </div>
    </div>
  )
}

export default Post