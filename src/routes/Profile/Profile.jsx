import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "../../utils/axios"
import Post from '../../components/Post/Post'
import { Avatar } from '@mui/material'


function Profile() {
  const username = useParams().username
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`/post/profile/${username}`)
        console.log(res.data)
        setPosts(res.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt)
        }))
      } catch (e) {
        alert("CAN NOT FIND")
      }
    }
    fetch()
  }, [])


  return (
    <>
    <Avatar /> 
    <span>u</span>
      {posts.map(post => (
        <Post post={post} key={post._id} />
      ))}
    </>
  )
}

export default Profile