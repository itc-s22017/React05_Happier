import React, { useState } from 'react'
import "./Post.css"
import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { format } from 'timeago.js';
import { useAuthContext } from '../../context/AuthContext';
import axios from "../../utils/axios"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


function Post({ post }) {
  const navigate = useNavigate()
  const { user } = useAuthContext()

  const [like, setCountLike] = useState(false)

  const handleNavigate = () => {
    navigate(`/Happier/${post.userId}`)
    // console.log(post._id)
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

  const handleLike = () => {
    setCountLike(prev => !prev)
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
      <div className="like" onClick={handleLike}>
        {!like ?
          <FavoriteBorderIcon className='heart' />
          :
          <FavoriteIcon className='heart' />
        }
        {post.likes.length}
      </div>
      {user.name === post.username && (
        <button className='deleteBtn' onClick={handleDelete}>Delete</button>
      )}
    </div>
  )
}

export default Post