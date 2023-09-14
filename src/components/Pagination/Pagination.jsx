import React from 'react'
import "./Pagination.css"

function Pagination({ MAX, setValue,itemsPerPage }) {
    var list = [];

    const handleValue = (v) => {
        setValue(v)
    }

    for (let i = 1; i < (MAX / itemsPerPage) + 1; i++) {
        list.push(
            <li className='li' key={i} onClick={(e) => handleValue(i)}>{i}</li>
        );
    }

    return (
        <ul className='ul'>
            {list}
        </ul>
    )
}

export default Pagination