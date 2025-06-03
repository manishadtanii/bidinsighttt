import React from 'react'
import { Link } from 'react-router-dom'

function Button({text, link}) {
  return (
    <Link to={link} className='btn flex justify-between items-center bg-white rounded-full p-1'>
        <div className="btn-arrow rounded-full bg-primary text-center ">
            <i class="far fa-long-arrow-right text-white"></i>
        </div>
        <div className="btn-text font-h text-black px-4 body-t">{text}</div>
    </Link>
  )
}

export default Button
