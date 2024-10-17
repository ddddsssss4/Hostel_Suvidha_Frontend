import React from 'react'
import "./Spinner.css"

const Spinner = () => {
  return (
    <div className='bg-[#181A1E] w-screen h-screen overflow-hidden'>
      <div className='loader h-screen text-white flex justify-center items-center mx-auto'></div>
    </div>
  )
}

export default Spinner
