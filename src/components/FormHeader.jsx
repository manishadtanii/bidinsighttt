import React from 'react'
import { Link } from 'react-router-dom'

function FormHeader() {
  return (
    <div className="form-header mb-20">
      <div className="form-inner flex justify-between items-center ">
        <div className="logo max-w-[150px]"><img src="logo.png" alt="" /></div>
        <div className="header-link flex gap-4">
            <Link to="/login" className="font-t text-white text-lg">
              Need help? 
            </Link>
            <Link to="/sign-up" className="font-t text-white text-lg">
              Sign up 
            </Link>
        </div>
      </div>
    </div>
  )
}

export default FormHeader
