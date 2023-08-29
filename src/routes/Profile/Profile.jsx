import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "../../utils/axios"
import { Avatar, Button } from '@mui/material'
import Happier from '../Happier/Happier'
import "./Profile.css"
import { useAuthContext } from '../../context/AuthContext'
import Modal from '../../components/Modal/Modal'

function Profile() {
  const id = useParams().id
  const { user } = useAuthContext()
  const [currentUser, setCurrentUser] = useState({})
  const [isFollowing, setIsFollowing] = useState()
  const [fOrf, setForF] = useState("")
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()



  useEffect(() => {
    const fetch = async () => {
      try {
        const userId = user._id;

        const res = await axios.get(`/users/${id}/isFollowing`, {
          params: { userId }
        });
        setIsFollowing(res.data);
        console.log(res.data)
      } catch (e) {
        console.log(e)
      }
    };

    //なるほどねーこんなやり方かー
    if (user && user._id) {
      fetch();
    }
  }, [user, id]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`/users/${id}`)
        setCurrentUser(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    fetch()
  }, [id])



  const handleFollow = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`/users/${id}/follow`, {
        userId: user._id
      })
    } catch (e) {
      console.log(e)
    }
  }

  const handleF = (e) => {
    e.preventDefault()
    setShowModal(true)
  }

  useEffect(() => {
    setShowModal(false)
  }, [navigate])


  return (
    <>
      <div className="container">
        <div className="profile">
          <Avatar className='avatar2' />
          <span className='username'>{currentUser.name}さんのプロフィール</span>
          {user?._id !== id && (
            <Button className='fBtn' onClick={handleFollow}>{"フォロー解除"}</Button>
          )}
        </div>
        <div className="follow" onClick={handleF}>
          <Button className="fBtn" onClick={() => setForF("followings")}>フォロー中</Button>
          <Button className='fBtn' onClick={() => setForF("followers")}>フォロワー</Button>
        </div>
        {showModal ?
          <Modal showFlag={showModal} setShowModal={setShowModal} follow={id} forf={fOrf} /> : ""
        }
      </div>
      <Happier id={id} />
    </>
  )
}

export default Profile