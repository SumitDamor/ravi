import React, { useEffect, useState } from 'react'
import postApi from './postApi'
import axios from 'axios'

import { Link } from 'react-router-dom'

const StateController = (props) => {
  const [changing, setchanging] = useState([])
  const [allposts, setallposts] = useState([])

  const api_call = process.env.REACT_APP_BACKEND_API;
  // console.log(api_call);

  useEffect(() => {
    async function getusers() {
      // console.log(props.id);
      try {
        const res = await axios.get(`https://my-ravi-project.herokuapp.com/api/auth/users`)
        setchanging(res.data)
        // console.log(res.data);
        // props.func()
      } catch (error) {
        console.log(error);
      }

    }

    // All Posts
    async function allPosts() {
      try {
        const allPostsData = await (await axios.get(`https://my-ravi-project.herokuapp.com/api/fetch-all-posts`)).data
        setallposts(allPostsData)
        // console.log(allposts);
      } catch (error) {
        console.log(error);
      }
    }

    allPosts()
    getusers()
  }, [])



  async function userDelete(id) {
    try {
      if (changing) {
        const res = await axios.delete(`https://my-ravi-project.herokuapp.com/api/auth/delete-user/${id}`)
        var array = changing
        const mynewArray = array.filter((post) => post._id !== id)
        setchanging(mynewArray)
        // console.log(res);
      }
    } catch (error) {
      console.log(error);
    }

  }

  // Add Post
  async function addPost(obj) {
    console.log(obj);
    // Category Suffling Logic
    var categoryForFetch;
    if (obj.category == "Business") {
      categoryForFetch = "post-business"
    } else if (obj.category == "Startups") {
      categoryForFetch = "post-startups"
    } else if (obj.category == "Technology") {
      categoryForFetch = "post-technology"
    } else if (obj.category == "Sports") {
      categoryForFetch = "post-sports"
    }

    console.log(categoryForFetch);
    try {
      const res = await fetch(`https://my-ravi-project.herokuapp.com/${api_call}/posts/category/${categoryForFetch}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      })

      const json = await res.json()
      // console.log(json);
    } catch (error) {
      console.log("error aayi hai");
    }
  }

  // Update Post
  async function updatePost(obj) {

    // console.log(obj);
    // Category Suffling Logic
    // http://localhost:5000/api/posts/category/update-report-post/${id}
    var categoryForFetch;
    if (obj.category == "Business") {
      categoryForFetch = "update-business-post"
    } else if (obj.category == "Startups") {
      categoryForFetch = "update-startups-post"
    } else if (obj.category == "Technology") {
      categoryForFetch = "update-technology-post"
    } else if (obj.category == "Sports") {
      categoryForFetch = "update-sports-post"
    } else if (obj.category == "General") {
      categoryForFetch = "update-report-post"
    }

    console.log(categoryForFetch);
    try {
      const res = await fetch(`https://my-ravi-project.herokuapp.com/${api_call}/posts/category/${categoryForFetch}/${obj.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      })

      const json = await res.json()
    } catch (error) {
      console.log("error aayi hai");
    }
  }

  // Delete Post
  async function deletePost(obj) {

    // console.log(obj);
    // // Category Suffling Logic
    // // http://localhost:5000/api/posts/category/update-report-post/${id}
    var categoryForFetch;
    if (obj.props.category == "Business") {
      categoryForFetch = "delete-business-post"
    } else if (obj.props.category == "Startups") {
      categoryForFetch = "delete-startups-post"
    } else if (obj.props.category == "Technology") {
      categoryForFetch = "delete-technology-post"
    } else if (obj.props.category == "Sports") {
      categoryForFetch = "delete-sports-post"
    } else if (obj.props.category == "General") {
      categoryForFetch = "delete-report-post"
    }

    // console.log(categoryForFetch);
    try {
      const res = axios.delete(`https://my-ravi-project.herokuapp.com/${api_call}/posts/category/${categoryForFetch}/${obj.props.id}`)
      var array = allposts
      const mynewArray = array.filter((post) => post._id !== obj.props.id)
      setallposts(mynewArray)
      // console.log(mynewArray);
    } catch (error) {
      console.log("error aayi hai");
    }
  }

  // Add Report Post
  async function addReportPost(obj) {
    // console.log(obj);
    delete obj.id;
    // console.log(obj);
    
    try {
      const res = await fetch(`https://my-ravi-project.herokuapp.com/${api_call}/posts/category/report-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      })

      const json = await res.json()
      // console.log(json);
    } catch (error) {
      console.log(error);
      console.log("error aayi hai");
    }
  }


 async function ChartFunc(obj) {
  // console.log(obj);

  try {
    const res = await fetch(`https://my-ravi-project.herokuapp.com/api/chart-startups/chart-js-custom-api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })

    const json = await res.json()
    alert("Done")
    // console.log(json);
  } catch (error) {
    console.log("error aayi hai");
  }
 }

  return (
    <>
      <postApi.Provider value={{ changing, userDelete, addPost, updatePost, allposts, deletePost, addReportPost, ChartFunc}}>
        {props.children}
      </postApi.Provider>
    </>
  )
}

export default StateController