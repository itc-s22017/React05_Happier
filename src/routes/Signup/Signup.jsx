import React from 'react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

function Signup() {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSubmit = () => { }
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1>ユーザ登録</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input id="name" name="name" ref={nameRef} />
                </div>
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
                    <button type="submit">ユーザ登録</button>
                </div>
            </form>
            <div>
                ログインは<Link to="/Happier/login">こちら</Link>
            </div>
        </div>
    )
}

export default Signup