import React, { useEffect, useState } from 'react'
import "./Post.css"
import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { format } from 'timeago.js';
import { useAuthContext } from '../../context/AuthContext';
import axios from "../../utils/axios"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Modal from '../Modal/Modal';
import AddCommentIcon from '@mui/icons-material/AddComment';


function Post({ post }) {
  const navigate = useNavigate()
  const { user } = useAuthContext()

  const [like, setCountLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [randomInt, setRandomInt] = useState(Math.floor(Math.random() * 2))
  const [numberOfComment, setNumberOfComment] = useState(0)

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`/post/getNumberOfComment/${post._id}`)
      setNumberOfComment(res.data)
    }
    fetch()
  }, [])

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
      await axios.delete(`/post/delete/${post._id}`)
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
    } catch (e) {
      console.log("いいねリクエスト失敗")
    }
  }

  const handleComment = (e) => {
    e.preventDefault()
    navigate(`/Happier/reply/${post._id}`)
  }

  const flag = () => {
    setShowModal(true)
  }

  return (
    <div className={randomInt ? "post" : "post2"}>
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
      <div className="wrapwrap">
        <div className="wrap">
          <div className="like" onClick={handleLike}>
            {!isLiked ?
              <FavoriteBorderIcon className='heart' />
              :
              <FavoriteIcon className='heart' />
            }
          </div>
          <p onClick={flag} className='likesHowMany'>{like}人がいいねしました</p>
        </div>
        <p className='commentIcon' onClick={handleComment}><AddCommentIcon /> {numberOfComment}</p>
      </div>
      {user?._id === post.userId && ( //ここnull許容型じゃないとprofile -> ログアウトの動きするとエラー出る
        <button className='deleteBtn' onClick={handleDelete}>Delete</button>
      )}
      {showModal ?
        <Modal showFlag={showModal} setShowModal={setShowModal} postId={post._id} /> : ""
      }
    </div>
  )
}

export default Post