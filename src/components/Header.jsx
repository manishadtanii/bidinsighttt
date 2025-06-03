import React, { useEffect } from 'react'
import Navbar from './Navbar'
import  $  from "jquery"

function Header() {
   useEffect(() => {
    const handleScroll = () => {
      if ($(window).scrollTop() > 0) {
        $("header").addClass("active");
      } else {
        $("header").removeClass("active");
      }
    };

    $(window).on("scroll", handleScroll);

    // Cleanup on unmount
    return () => {
      $(window).off("scroll", handleScroll);
    };
  }, []);
  return (
    <header className='fixed top-0 w-full'>
     <Navbar/>
    </header>
  )
}

export default Header
