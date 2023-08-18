import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { Link, Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
    const { user } = useAuthContext()
    if (user === undefined) {
        return (
            <Link to="/Happier/Login" style={{textDecoration:"none"}}>
                <p style={{ fontSize: "30px", textAlign: "center" }}>PLEASE LOGIN</p>
            </Link>
        )
    }

    if (!user) {
        return <Navigate to="/Happier/login" />
    }


    return children
}

export default ProtectedRoute