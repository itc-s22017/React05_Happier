import React from 'react'
import "./Happier.css"
import { useRef } from 'react'
import { Avatar, Button } from '@mui/material'
import Post from "../../components/Post/Post"

function Happier() {
  const titleRef = useRef()
  const contentRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <div className="Tweet">
        <form onSubmit={e => handleSubmit}>
          <div className="Tweet--input">
            <Avatar />
            <input
              type="text"
              placeholder='身近にある小さな幸せは？'
            />
          </div>
          <Button className='tweetButton' type='submit'>投稿する</Button>
        </form>
      </div>

      <Post />

    </>

  )
}

export default Happier