import MyButton from './MyButton'
import React from 'react'
import ReadTemplate from '../ReadTemplate'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser';
import { useState } from 'react';
import { useEffect } from 'react';

const CardDesign = (props) => {


  let readTime = props.desc.split(" ").length * 0.008

// Converting To HTML  
  function convertToPlain(html){

    // Create a new div element
    var tempDivElement = document.createElement("div");

    // Set the HTML content with the given value
    tempDivElement.innerHTML = html;

    // Retrieve the text property of the element 
    return tempDivElement.textContent || tempDivElement.innerText || "";
}

var htmlString= props.desc

// covertAndSlice(props.desc, 0, 300)

  return (
    <>


<div className="mx-auto flex w-80 sm:w-96 md:w-96 lg:w-96 xl:w-96 2xl:w-96 flex-col justify-center bg-white rounded-2xl m-4 shadow-xl shadow-slate-300/60 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:font-bold">
<Link to={`/read/${props._id}`}>
<img className="aspect-video w-full rounded-t-2xl object-cover object-center" src={props.image_link} />

<div className="p-4">
  <small className="text-blue-400 text-xs">{props.category}</small>
  <h1 className="text-2xl font-medium text-slate-600">{props.title.slice(0, 30)}..</h1>
  <div className='flex space-x-4 pb-2'>
  <p className="text-sm tracking-tight font-light text-slate-500 leading-6">{Math.round(readTime)} minutes reading</p>
  <p className="text-sm tracking-tight font-light text-slate-500 leading-6">{props.date.slice(0, 15)}</p>
  </div>
  <p className="text-sm tracking-tight font-light text-slate-400">{convertToPlain(htmlString).slice(0, 300)}</p>
</div>
</Link>
</div>

    </>
  )
}

export default CardDesign