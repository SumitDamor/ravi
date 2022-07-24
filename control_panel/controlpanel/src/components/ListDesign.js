import React, { useContext } from 'react'
import { FcEmptyTrash } from "react-icons/fc";
import { Link } from 'react-router-dom';
import postApi from '../context/postApi';

const ListDesign = (props) => {

  const userData = useContext(postApi)

  return (
    <>




      <div class="max-w-md py-4 px-8 bg-white hover:bg-slate-50 shadow-xl rounded-lg my-20">
        <Link to={`/user/${props.name.replace(' ', '')}/${props.id}`}>
          <div class="flex justify-center md:justify-end -mt-16">
            <img class="w-20 h-20 object-cover rounded-full border-2 border-indigo-500" src={props.profile_pic} />
          </div>
          <h2 class="text-gray-800 text-3xl font-semibold">{props.name}</h2>
          <div className='mt-3'>
            <h2 class="text-gray-800 text-lg font-semibold">Email: {props.email}</h2>
            <p class="text-gray-900 whitespace-no-wrap">
              Joined Date: <b>{props.date.slice(0, 10)}</b>
            </p>
            <p class="text-gray-900 whitespace-no-wrap">
              Joined Date: <b>{props.accessFrom}</b>
            </p>
          </div>
        </Link>

        <div class="flex justify-end mt-4">
          <span class="relative cursor-pointer" onClick={() => userData.userDelete(props.id)}>
            <span className='p-2 flex items-center hover:bg-blue-200 rounded z-10 grow-0' >
              <FcEmptyTrash size={"24px"} />
            </span>
          </span>
        </div>
      </div>

    </>
  )
}



export default ListDesign