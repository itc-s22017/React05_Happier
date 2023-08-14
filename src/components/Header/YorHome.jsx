import React from 'react'
import { Link } from 'react-router-dom'

function YorHome({val,linkTo}) {
    return (
        <Link to={linkTo} style={{ textDecoration: "none", color: "black" }}>
            <h4 className='Happier'>
                {val}
            </h4>
        </Link>
    )
}

export default YorHome