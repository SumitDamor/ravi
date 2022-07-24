import React, { useState, useEffect, useContext } from 'react'
import PostsContext from './context/posts/postsContext'
import Home from './components/Home'
import PostDesign from './design/PostDesign'
import { Link, useParams } from 'react-router-dom'
import MyAlert from './components/MyAlert'
const ReadTemplate = (props) => {
  const [first, myData] = useState({})
  const id = props.match.params.id
  const first_load_func = async () => {
    const id = props.match.params.id
    try {
      const response_business = await fetch(`https://my-ravi-project.herokuapp.com/api/posts/${id}`)
      const business_data = await response_business.json()
      myData(business_data)
      //  console.log(business_data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    first_load_func();
  }, [id])


  return (
    <>
      <PostDesign 
      key={first._id}
      props={first}
      />   
    </>

  )
}

export default ReadTemplate