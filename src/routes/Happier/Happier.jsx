import React, { useEffect, useState } from 'react'
import "./Happier.css"
import { useRef } from 'react'
import { Avatar, Button } from '@mui/material'
import Post from "../../components/Post/Post"
import { useAuthContext } from '../../context/AuthContext'
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "../../utils/axios"
import Pagination from '../../components/Pagination/Pagination'

function Happier({ id, reply }) {
  const { logout } = useAuthContext()
  const { user } = useAuthContext()
  const [posts, setPosts] = useState([])
  const contentRef = useRef()
  const [followingsOrAll, setFollowingsOrAll] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(null)
  const MAX_ITEMS_PER_PAGE = 3


  const set = (response) => setPosts(response.data.posts.sort((post1, post2) => {
    return new Date(post2.createdAt) - new Date(post1.createdAt)
  }).filter(data => data.reply === false))

  const getPosts = async () => {
    try {
      if (id) {
        //プロフ用
        const response = await axios.get(`/post/profile/${id}`)
        set(response)
      } else if (reply) {
        // reply用
        const response = await axios.get(`/post/getPostFromParam/${reply}`)
        setPosts([response.data])
      } else {
        //home用
        switch (followingsOrAll) {
          case "followings":
            const response = await axios.get("/post/friendsPosts", {
              params: {
                userId: user._id,
                skip: (currentPage - 1) * MAX_ITEMS_PER_PAGE,
                limit: MAX_ITEMS_PER_PAGE
              }
            })
            setTotalItems(response.data.Total)
            set(response)
            console.log(response.data.Total)
            break;
          case "all":
            const response2 = await axios.get("/post/getAll", {
              params: {
                skip: (currentPage - 1) * MAX_ITEMS_PER_PAGE,
                limit: MAX_ITEMS_PER_PAGE
              }
            })
            setTotalItems(response2.data.Total)
            set(response2)
            break;
          default:
            const def = await axios.get("/post/getAll", {
              params: {
                skip: (currentPage - 1) * MAX_ITEMS_PER_PAGE,
                limit: MAX_ITEMS_PER_PAGE
              }
            })
            setTotalItems(response2.data.Total)
            set(def)
            break;
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getPosts()
  }, [id, reply, followingsOrAll, currentPage])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (contentRef.current.value === "") {
      return
    }
    try {
      await axios.post("/post", {
        username: user.name,
        content: contentRef.current.value,
        userId: user._id
      })
      window.location.reload()
    } catch (e) {
      console.log(e)
    }
  }

  const handleSetValue = (newVal) => {
    setCurrentPage(newVal)
  }

  return (
    <>
      <LogoutIcon onClick={logout} />
      {!id && !reply && (
        <>
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
            <div className="followingsOrAll">
              <h3 className='all' onClick={(e) => setFollowingsOrAll("all")}>全体</h3>
              <h3 className='followings' onClick={(e) => setFollowingsOrAll("followings")}>フォロー中</h3>
            </div>
          </div>
        </>
      )}
      {posts.map(post => (
        <Post post={post} key={post._id} />
      ))}
      <Pagination MAX={totalItems} setValue={handleSetValue} itemsPerPage={MAX_ITEMS_PER_PAGE} />
    </>

  )
}

export default Happier