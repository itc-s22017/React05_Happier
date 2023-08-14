import React from 'react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = () => { }
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1>ログイン</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input id="email" name="email" ref={emailRef} />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        ref={passwordRef}
                    />
                </div>
                <div>
                    <button type="submit">ログイン</button>
                </div>
            </form>
            <div>
                ユーザ登録は<Link to="/Happier/signup">こちら</Link>
            </div>
        </div>
    )
}

export default Login