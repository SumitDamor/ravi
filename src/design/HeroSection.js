import React from 'react'
import MyButton from './MyButton'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser';
const HeroSection = (props) => {
  function handleClick() {
    document.getElementById('our-daily').scrollIntoView({
      behavior: 'smooth'
    });
  }
  return (

    <div className="flex flex-col h-screen bg-cover bg-no-repeat bg-center select-none" style={{ backgroundImage: `url(${props.data.image_link})` }}>
      <div className="flex flex-col justify-center items-center h-full w-full text-center bg-black text-white bg-opacity-80 p-8">
        <h1 className="mb-5 text-4xl font-bold font-google">{props.data.title}</h1>
        <p className="mb-5 text-md font-extralight ">{parse(`${props.data.desc.slice(0, 175)}`)}</p>
        <p className="mb-5">{props.data.date.slice(0, 15)}</p>
        <Link to={`/read/${props.data._id}`}>
          <button className="bg-purple-800 px-6 py-4 rounded font-google transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:font-bold hover:bg-purple-600 hover:shadow-xl">Read More</button>
        </Link>
        <div class="mouse_scroll pt-24 md:pt-52 cursor-pointer" onClick={handleClick}>

          <div class="mouse">
            <div class="wheel"></div>
          </div>
          <div>
            <span class="m_scroll_arrows unu"></span>
            <span class="m_scroll_arrows doi"></span>
            <span class="m_scroll_arrows trei"></span>
          </div>
        </div>

      </div>

    </div>

  )
}

export default HeroSection