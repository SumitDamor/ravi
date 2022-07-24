import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import postApi from '../context/postApi'
// Editor
import parse from 'html-react-parser';
import { Editor } from 'react-draft-wysiwyg';
// import { Editor } from 'draft-js-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import TagsInputField from './TagsInputField';
import TinyMCEEditor from './TinyMCEEditor';
// import 'draft-js/dist/Draft.css';


const PostFields = (props) => {
  const userData = useContext(postApi)
  const [tecData, dataFromTCE] = useState()
  const location = useLocation()
  let linkValue = location.pathname.split('/');
  // console.log(location);
  const [image, setimage] = useState()
  const [imageSrc, setimageSrc] = useState(location.state ? location.state.image_link : "")

  function dataFunc(data) {
    dataFromTCE(data)
  }

  const { addPost, updatePost, addReportPost } = userData

  const [obj, setObj] = useState(
    {
      title: location.state && linkValue[1] === "edit-post" ? location.state.title : "",
      desc: location.state ? location.state.desc : "",
      tags: "",
      id: ""
    }
  )

  function changingText(e) {
    setObj({ ...obj, [e.target.name]: e.target.value })
  }

  function imageInput(e) {
    setimage(e.target.value)
  }

  async function getImage() {
    try {
      const link = `https://api.unsplash.com/search/photos?page=1&query=${image}&client_id=NbsBiSMi7A7I61Z3Xk5AOAviG37moIab9njyhT3Y2N0`
      const res = await axios.get(link)
      let randomNumber = Math.floor(Math.random() * res.data.results.length);
      setimageSrc(res.data.results[randomNumber].links.download)
    } catch (error) {
      console.log(error);
    }
  }


  // Submit
  function submit() {
    try {
      const categories = location.state ? location.state.title : "General"
      obj.category = categories
      obj.image_link = imageSrc;
      obj.desc = tecData;
      obj.tags = [obj.tags]
      // addPost(obj)
      if (addPost(obj)) {
        alert("Done")
      }
      // console.log(addPost(obj));
    } catch (error) {
      alert(error)
    }


  }
  function update() {
    try {
      const categories = location.state ? location.state.category : "General"
      obj.category = categories
      obj.image_link = imageSrc;
      obj.desc = tecData;
      obj.id = linkValue[4];
      obj.tags = [obj.tags]
      console.log(obj);


      try {
        if (updatePost(obj)) {
          alert("Done")
        }

      } catch (error) {
        alert(error)
        return
      }

    } catch (error) {
      alert(error)
    }

  }

  function addReportPostClick() {
    const categories = "General"
    obj.category = categories
    obj.image_link = imageSrc;
    obj.desc = tecData;
    // console.log(obj);
    obj.tags = [obj.tags]
    addReportPost(obj)
    // console.log("update");
    alert("Done")
  }


  return (
    <>
      <div className='my-4 md:m-12'>
        {
          linkValue[1] === "add-report-post" ? <h1 className="font-semibold text-black text-center capitalize text-4xl">Add Report Post</h1> :
            <div>
              <h1 className="font-semibold text-black text-center capitalize text-4xl">{location.state ? location.state.title : ""}</h1>
              <h1 className="font-semibold text-purple-800 text-center capitalize text-xl">{location.state ? location.state.category : "General"}</h1>
            </div>

        }

        <div className='flex flex-col m-4 gap-2'>
          <div className="mb-6">
            <label for="" className="font-medium text-base text-black block mb-3">
              Add Title (Minimum Character Length 10)
            </label>

            <input className='
          error-class
          w-full
            border-[1.5px] border-form-stroke
            rounded-lg
            py-3
            px-5
            font-medium
            text-body-color
            placeholder-body-color
            outline-none
            focus:border-primary
            active:border-primary
            transition
            disabled:bg-[#F5F7FD] disabled:cursor-default' type="text" minlength="10" placeholder='Enter title' id='title' name='title' onChange={changingText} value={obj.title} />
          </div>
          <label for="" className="font-medium text-black block mb-3">
            Add Description (Minimum Character Length 15)
          </label>

          <div>
            <TinyMCEEditor
              dataFunc={dataFunc}
              objDesc={obj.desc}
              apiKey='prndtdop69f2yh9hk3rend694t0dtz3fq734rz63vr6jczzq'
              
            />
          </div>

          {/* Image Section */}
          <img className='w-screen h-48 object-contain text-center border-2 p-4'
            src={imageSrc} alt="Generated image will be shown here" />
          <input className='
           error-class
          w-full
            border-[1.5px] border-form-stroke
            rounded-lg
            py-3
            px-5
            font-medium
            text-body-color
            placeholder-body-color
            outline-none
            focus:border-primary
            active:border-primary
            transition
            disabled:bg-[#F5F7FD] disabled:cursor-default' type="text" placeholder='Enter Keyword To Generate Image' name='image' onChange={imageInput} />
          <button className='bg-gray-200 p-2 hover:bg-yellow-200' onClick={getImage}>Generate Image</button>
          <input className='
           error-class
          w-full
            border-[1.5px] border-form-stroke
            rounded-lg
            py-3
            px-5
            font-medium
            text-body-color
            placeholder-body-color
            outline-none
            focus:border-primary
            active:border-primary
            transition
            disabled:bg-[#F5F7FD] disabled:cursor-default' type="text" data-role="taginput" data-tag-trigger="Space" id='tags' name='tags' onChange={changingText} placeholder='Enter Tags using ,' />



          <div>
            {linkValue[1] === "edit-post" ? <button className='bg-gray-200 p-2 hover:bg-green-200' onClick={update}>Update</button> : linkValue[1] === "add-report-post" ?
              <button className='bg-gray-200 p-2 hover:bg-green-200' onClick={addReportPostClick}>Add Report Post</button> :
              <button className='bg-gray-200 p-2 hover:bg-green-200' onClick={submit}>Submit</button>}
          </div>
        </div>
      </div>



    </>
  )
}
export default PostFields