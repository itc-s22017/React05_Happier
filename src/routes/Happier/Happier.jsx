import React, { useCallback, useEffect, useState } from 'react'
import "./Happier.css"
import { useRef } from 'react'
import { Avatar, Button } from '@mui/material'
import Post from "../../components/Post/Post"
import { useAuthContext } from '../../context/AuthContext'
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "../../utils/axios"

function Happier() {
  const { logout } = useAuthContext()
  const { user } = useAuthContext()
  const [posts, setPosts] = useState([])
  const contentRef = useRef()

  const getPosts = useCallback(async () => {
    try {
      const response = await axios.get("/post/getAll")
      setPosts(response.data.sort((post1, post2) => {
        return new Date(post2.createdAt) - new Date(post1.createdAt)
      }))
    } catch (e) {
      console.log(e)
    }
  }, [])

  useEffect(() => {
    getPosts()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("/post", {
        username: user.name,
        email: user.email,
        content: contentRef.current.value
      })
      window.location.reload()
    } catch (e) {
      console.log(e)
    }

  }

  return (
    <>
      <LogoutIcon onClick={logout} />
      <div className="Tweet">
        <form onSubmit={handleSubmit}>
          <div className="Tweet--input">
            <Avatar />
            <input
              type="text"
              placeholder='身近にある小さな幸せは？'
              ref={contentRef}
            />
          </div>
          <Button className='tweetButton' type='submit'>投稿する</Button>
        </form>
      </div>
      {posts.map(post => (
        <Post post={post} key={post._id} />
      ))}
    </>

  )
}

export default Happier