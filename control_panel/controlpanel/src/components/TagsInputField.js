import React, { useContext, useState, useEffect } from 'react'
import StartupChart from './StartupChart';
import { createContext } from 'react'
import { FiX } from "react-icons/fi";

const TagsInputField = (props) => {
  let [labels, setlabels] = useState([])


  function handleKeyDown(e) {
    if (e.key !== 'Enter')
      return
    const value = e.target.value
    if (!value.trim())
      return
    setlabels([...labels, value])
    props.tagsTar([...labels, value])
    e.target.value = ''
  }

  function deleteTag(i) {
    setlabels(labels.filter((value, index) => i !== index))
  }


  return (
    <>
      <div className='flex border-2 rounded-md flex-wrap' >
        {
          labels.map((tag, index) => (
            <>
              <span className='flex items-center m-1 bg-gray-200 rounded-md'>
                <h1 className='w-fit text-black flex items-center justify-center mx-4 capitalize'>{tag}</h1>
                <FiX
                  className='ml-2 bg-white rounded-full m-1 hover:bg-slate-200'
                  size="20px"
                  color="black"
                  onClick={() => deleteTag(index)}
                />
              </span>

            </>

          ))
        }
        <input className='w-fit
            py-3
            px-5
            font-medium
            text-body-color
            placeholder-body-color
            outline-none
            focus:border-primary
            active:border-primary
            transition
            disabled:bg-[#F5F7FD] disabled:cursor-default' onKeyDown={handleKeyDown} type="text" placeholder={props.placeholder} />
      </div>
    </>
  )
}

export default TagsInputField
