import React from 'react'
import "./Post.css"
import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { format } from 'timeago.js';
import { useAuthContext } from '../../context/AuthContext';
import axios from "../../utils/axios"


function Post({ post }) {
  const navigate = useNavigate()
  const { user } = useAuthContext()

  const handleNavigate = () => {
    navigate(`/Happier/${post.username}`)
    console.log(post._id)
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    const confirm = window.confirm("本当に削除しますか？")
    if (!confirm) {
      return
    }
    try {
      const res = await axios.delete(`/post/delete/${post._id}`)
      window.location.reload()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="post">
      <div className="wrap">
        <div className="iconAndName">
          <Avatar className='avatar' onClick={handleNavigate} />
          <span className='username'>{post.username}</span>
        </div>
        <div>
          <span className='minutes'>{format(post.createdAt)}</span>
        </div>
      </div>
      <div className="content">
        <p>{post.content}</p>
      </div>
      {user.name === post.username && (
        <button className='deleteBtn' onClick={handleDelete}>Delete</button>
      )}
    </div>
  )
}

export default Post