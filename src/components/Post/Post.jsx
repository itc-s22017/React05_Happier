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

  const [like, setCountLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)

  const handleNavigate = () => {
    navigate(`/Happier/${post.userId}`)
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

  const handleLike = async (e) => {
    e.preventDefault()
    try {
      // これ↓きたないからいずれまとめたい　今はめんどう
      await axios.put(`/post/like/${post._id}`, {
        userId: user._id
      })
      const getCountLikes = await axios.get(`/post/countLikes/${post._id}`, {
        userId: user._id
      })
      setCountLike(getCountLikes.data.length)
      setIsLiked(getCountLikes.data.isLiked) // なぜかfalseしか帰ってこない　後回し
      // console.log(getCountLikes.data)
    } catch (e) {
      console.log("いいねリクエスト失敗")
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
      <div className="like" onClick={handleLike}>
        {!isLiked ?
          <FavoriteBorderIcon className='heart' />
          :
          <FavoriteIcon className='heart' />
        }
        {like} 人がいいねしました
      </div>
      {user._id === post.userId && (
        <button className='deleteBtn' onClick={handleDelete}>Delete</button>
      )}
    </div>
  )
}

export default Post