import React, { useContext, useEffect, useState } from 'react'
import HtmlParser from 'react-html-parser';
import { FiChevronRight, FiTrash2 } from "react-icons/fi";
import { Link, useLocation } from 'react-router-dom';
import postApi from '../context/postApi';
import parse from 'html-react-parser';
const PostsList = (props) => {
  const userData = useContext(postApi)
  const location = useLocation()
  const pathArray = location.pathname.split('/')
  let category = props.category.toLowerCase();
  // console.log(pathArray);

  let title;
  title = props.title.replaceAll(" ", "-").replaceAll(".", "").replaceAll(",", "").replaceAll("%", "").replaceAll(":", "").replaceAll("’", "").toLowerCase();
  // console.log(props.category);
  // console.log(title);
  // console.log(`${pathArray[1]}/${pathArray[2]}/${pathArray[3]}/${props.title}/${props.id}`);

  const parsedText = parse(props.desc)


  
  return (
    <>


      {pathArray[1] === "delete-post" ?
      <div
        className="relative m-4 block p-8 overflow-hidden border border-gray-200 hover:bg-slate-50 rounded-lg"
      >
        <span
          className="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-red-300 via-blue-500 to-purple-600"
        ></span>

        <div className="justify-between sm:flex">
          <div>
            <h5 className="text-xl font-bold text-gray-900">
              {props.title}
            </h5>
            <p className="mt-1 text-xs font-bold text-purple-600">{props.category ? props.category : "General"}</p>
          </div>

          <div className="flex-shrink-0 hidden ml-3 sm:block">
            <img
              className="object-cover w-16 h-16 rounded-lg shadow-sm"
              src={props.image_link}
              alt="image"
            />
          </div>
        </div>

        <div className="mt-4 sm:pr-8">
          <p className="text-sm text-gray-500">
            {parse(`<div className'flex-wrap text-justify'>${props.desc.slice(0, 300)}...........</div>`)}
          </p>
        </div>

        <dl className="flex mt-6 items-center">
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">Published</dt>
            <dd className="text-xs text-gray-500">{props.date}</dd>
          </div>

          <div className="flex flex-col-reverse ml-3 sm:ml-6">
            <dt className="text-sm font-medium text-gray-600">Post ID</dt>
            <dd className="text-xs font-bold text-black">{props.id}</dd>

          </div>
          <dd className="m-4">
            <div className='w-fit flex justify-center p-2 items-center cursor-pointer rounded-md hover:bg-red-400 ' onClick={() => userData.deletePost({ props })}>
              <FiTrash2
                size={15}
              />
            </div>
          </dd>
        </dl>
      </div>
        :
        <Link to={{
          pathname: `${location.pathname}/${category}/${title}/${props.id}`,
          state: {
            title: `${props.title}`,
            category: `${props.category ? props.category : "General"}`,
            desc: `${props.desc}`,
            image_link: `${props.image_link}`
          }
        }}>

          <div
        className="relative m-4 block p-8 overflow-hidden border border-gray-200 hover:bg-slate-50 rounded-lg"
      >
        <span
          className="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-red-300 via-blue-500 to-purple-600"
        ></span>

        <div className="justify-between sm:flex">
          <div>
            <h5 className="text-xl font-bold text-gray-900">
              {props.title}
            </h5>
            <p className="mt-1 text-xs font-bold text-purple-600">{props.category ? props.category : "General"}</p>
          </div>

          <div className="flex-shrink-0 hidden ml-3 sm:block">
            <img
              className="object-cover w-16 h-16 rounded-lg shadow-sm"
              src={props.image_link}
              alt="image"
            />
          </div>
        </div>

        <div className="mt-4 sm:pr-8">
          <p className="text-sm text-gray-500">
            {parse(`<div className'flex-wrap text-justify'>${props.desc.slice(0, 300)}...........</div>`)}
          </p>
        </div>

        <dl className="flex mt-6 items-center">
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">Published</dt>
            <dd className="text-xs text-gray-500">{props.date}</dd>
          </div>

          <div className="flex flex-col-reverse ml-3 sm:ml-6">
            <dt className="text-sm font-medium text-gray-600">Post ID</dt>
            <dd className="text-xs font-bold text-black">{props.id}</dd>

          </div>
          <dd className="m-4">
            <div className='w-fit flex justify-center p-2 items-center rounded-md hover:bg-green-400 '>
            <FiChevronRight
                size={20}
              />
            </div>
          </dd>
        </dl>
      </div>
        </Link>
      }





    </>
  )
}

export default PostsList