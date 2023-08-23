import React from 'react'
import "./Header.css"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import YorHome from './YorHome'
import X from '../../assets/XTime.png'

function Header() {
    const pathname = useLocation().pathname
    const val = {
        val: "幸せをつぶやこう",
        linkTo: "Happier"
    }
    const val2 = {
        val: "オヤジギャグ",
        linkTo: "/"
    }

    return (
        <div className='header'>
            <div className="headerWrapper">
                <Link to="/Happier">
                    <img className='logo' src={X} />
                </Link>
                {pathname === "/" ?
                    <YorHome {...val} /> : <YorHome {...val2} />
                }

            </div>
        </div>
    )
}

export default Header