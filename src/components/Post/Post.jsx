import React from 'react'
import "./Post.css"
import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'


function Post({ post }) {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/Happier/${post.username}`)
  }
  return (
    <div className="post">
      <div className="iconAndName">
        <Avatar className='avatar' onClick={handleNavigate}/>
        <span className='username'>{post.username}</span>
      </div>
      <div className="content">
        <p>{post.content}</p>
      </div>
      <span className='dataTime'>{post.createdAt}</span>
    </div>
  )
}

export default Post