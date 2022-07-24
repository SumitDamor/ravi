import axios from "axios";
import React, { useState, useEffect } from "react";
import PostsContext from "./postsContext";


import { auth } from "../../components/FirebaseGoogleLogin";
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider} from 'firebase/auth';

const PostState = (props) => {
  const [first, setfirst] = useState([])
  const [businessfirst, setBusiness] = useState([])
  const [techfirst, setTech] = useState([])
  const [startupsfirst, setStartups] = useState([])
  const [sportsfirst, setSports] = useState([])
  const [userMyDetails, setUserMyDetails] = useState({})

  let API_KEY = process.env.REACT_APP_CLIENT_ID
  useEffect(() => {
    const currentloginid = async () => {
      try {
        const response = await fetch(`https://my-ravi-project.herokuapp.com/${API_KEY}/posts/category/fetchposts`)
        const data = await response.json()
        setfirst(data)
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
      try {
        const response_business = await fetch(`https://my-ravi-project.herokuapp.com/${API_KEY}/posts/category/fetch-business`)
        const business_data = await response_business.json()
        setBusiness(business_data)
      } catch (error) {
        console.log(error);
      }

      try {
        const response_technology = await fetch(`https://my-ravi-project.herokuapp.com/${API_KEY}/posts/category/fetch-technology`)
        const tech_data = await response_technology.json()
        setTech(tech_data)

      } catch (error) {
        console.log(error);
      }

      try {
        const response_startups = await fetch(`https://my-ravi-project.herokuapp.com/${API_KEY}/posts/category/fetch-startups`)
        const startups_data = await response_startups.json()
        setStartups(startups_data)

      } catch (error) {
        console.log(error);
      }


      try {
        const response_sports = await fetch(`https://my-ravi-project.herokuapp.com/${API_KEY}/posts/category/fetch-sports`)
        const sports_data = await response_sports.json()
        setSports(sports_data)
      } catch (error) {
        console.log(error);
      }
      // console.log(business_data);
      // console.log();
    }

    if (first !== []) {
      currentloginid();
    }
  }, [])

  const data = [
    ...first,
    {
      "_id": "62a0f4304e9a889d4d7d5950",
      "title": "This is a test post",
      "desc": "Sumit Damor has been doing coding for the past few months and now he has made his friend's full-stack with the backend panel project, MERN project",
      "category": "Business",
      "image_link": "https://www.gannett-cdn.com/presto/2019/11/26/USAT/29d1fac9-1225-4b23-baaa-98b8550be1b9-indian_food.JPG?crop=4599,2587,x0,y153&width=3200&height=1801&format=pjpg&auto=webp",
      "date": "Thu Jun 09 2022 00:32:12 GMT+0530 (India Standard Time)",
      "tags": [
        "sumit",
        "damor"
      ],
      "__v": 0
    },
  ]
  // data.push(first)
  // console.log(data);
  const [state, newState] = useState(data[0])

  const business_data = [...businessfirst]
  const sports_data = [...sportsfirst]
  const startups_data = [...startupsfirst]
  const tech_data = [...techfirst]
  // console.log(business_data);


  // Auth Reqs
  // http://localhost:5000/api/auth/login
  //   'Content-Type': 'application/json',
  async function loginUser(obj) {
    try {
     const res = axios({
        method: 'post',
        url: 'https://my-ravi-project.herokuapp.com/api/auth/login',
        headers: {
          'Content-Type': 'application/json',
        }, 
        data: obj
      });
      return res;
    } catch (error) {
      alert('Credentials does not match!!')
      console.log(error);
    }

  }

  // http://localhost:5000/api/auth/register
  //   'Content-Type': 'application/json',
  async function signupUser(obj) {
    try {
     const res = axios({
        method: 'post',
        url: 'https://my-ravi-project.herokuapp.com/api/auth/register',
        headers: {
          'Content-Type': 'application/json',
        }, 
        data: obj
      });
      // setUserMyDetails(res)
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }

  }

  // Auth Req: UserDetails
  async function userDetails(token) {
    try {
     const res = axios({
        method: 'post',
        url: 'https://my-ravi-project.herokuapp.com/api/auth/user-details',
        headers: {
          'Content-Type': 'application/json',
          'token' : token
        },
        
      });
      Promise.resolve(res).then(function(token) {
        setUserMyDetails(token.data)
      });
      return res;
    } catch (error) {
      console.log(error);
    }

  }


async function googleReq(){
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider)
  }



 async function githubReq() {
      const gitProvider = new GithubAuthProvider();
      return signInWithPopup(auth, gitProvider)
  }


  function updateUserProfileName(obj){
    // console.log(obj);
    try {
      const res = axios({
         method: 'post',
         url: `https://my-ravi-project.herokuapp.com/api/auth/user_update/${obj.id}`,
         headers: {
           'Content-Type': 'application/json',
         },
         data: {name: obj.name, profile_pic: obj.profile_pic}
       });
      //  console.log(res);
       return res;
     } catch (error) {
       console.log(error);
     }
    }
  return (
    <PostsContext.Provider value={{state, newState, first, data, business_data, sports_data, startups_data, tech_data, loginUser, userDetails, userMyDetails, signupUser, googleReq, githubReq, updateUserProfileName}}>
      {props.children}
    </PostsContext.Provider>
  )

}

export default PostState;