import React, { useCallback, useEffect, useRef, useState } from 'react'
import Happier from '../Happier/Happier'
import { useParams } from 'react-router-dom'
import { Avatar, Button } from '@mui/material'
import "./Reply.css"
import { useAuthContext } from '../../context/AuthContext'
import axios from "../../utils/axios"
import Post from '../../components/Post/Post'
// import "../../components/Post/Post.css"


function Reply() {
  const id = useParams().postId
  const contentRef = useRef()
  const { user } = useAuthContext()
  const [posts, setPosts] = useState([])


  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`/post/getReply/${id}`)
      setPosts(res.data)
    }
    fetch()
  }, [id])

  const handleReply = useCallback(async (e) => {
    e.preventDefault()
    if (contentRef.current.value === "") {
      return
    }
    try {
      const res = await axios.post("/post", {
        username: user.name,
        content: contentRef.current.value,
        userId: user._id,
        reply: true
      })
      await axios.post(`/post/setReply/${id}`, {
        postId: res.data._id
      })
      window.location.reload()
    } catch (e) {
      console.log(e)
    }
  }, [id])
  return (
    <>
      <Happier reply={id} />
      <div className='container'>
        <div className="reply">
          <Avatar style={{ marginRight: "10px" }} />
          <form onSubmit={handleReply}>
            <input type="text" className='input' ref={contentRef} onClick={handleReply} />
          </form>
        </div>
        <Button className='tweetButton' type='submit'>Reply</Button>
      </div>
      {posts.filter(post => post !== null).length !== 0 ? posts.filter(post => post !== null).map(post => (
        <Post post={post} key={post._id} />
      )) : <p style={{ textAlign: "center", fontWeight: "bold" }}>コメントがありません</p>}
    </>
  )
}

export default Reply