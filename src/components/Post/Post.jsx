import React from 'react'
import "./Post.css"
import { Avatar } from '@mui/material'


function Post() {
  return (
    <div className="post">
        <div className="iconAndName">
          <Avatar className='avatar'/>
          <span className='username'>username</span>
        </div>
        <div className="content">
          <p>ここに本文</p>
        </div>
      </div>
  )
}

export default Post