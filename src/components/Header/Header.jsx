import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import YorHome from './YorHome'

function Header() {
    const pathname = useLocation().pathname
    const val = {
        val: "Y",
        linkTo: "Happier"
    }
    const val2 = {
        val: "Home",
        linkTo: "/"
    }

    return (
        <div className='header'>
            <div className="headerWrapper">
                <h1 className='team'>X Team</h1>
                {pathname === "/" ?
                    <YorHome {...val} /> : <YorHome {...val2} />
                }

            </div>
        </div>
    )
}

export default Header