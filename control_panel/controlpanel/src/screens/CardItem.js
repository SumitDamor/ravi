import React from 'react'
import { FaAccessibleIcon } from "react-icons/fa";


const CardItem = (props) => {
  const img = "https://images.unsplash.com/photo-1589561253898-768105ca91a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
  return (
    <>
      <div>
        <div className='w-80 h-80 m-6 p-2 bg-gray-100 rounded-lg flex flex-col justify-center items-center gap-y-4 hover:bg-gray-200'>
          <div>
            {
              props.icon
            }
          </div>
          <h1 className='text-2xl text-black font-semibold normal-case'>{props.title}</h1>
        </div>
      </div>
    </>
  )
}

export default CardItem