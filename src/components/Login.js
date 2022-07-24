import axios from 'axios';
import React, { useState } from 'react'
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PostsContext from '../context/posts/postsContext';
import { FaGoogle, FaGithub } from "react-icons/fa";
import { async } from '@firebase/util';

const Login = () => {
  const c1 = useContext(PostsContext);
  const history = useHistory()
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  const [userMyDetailsGoogle, setUserMyDetailsGoogle] = useState({})


  function credentialsFunc(e) {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  function details(data) {
    window.localStorage.setItem('userDetails', JSON.stringify(data))
    history.push('/home')
      window.location.reload();

  }

  async function handleUserDetails(e) {
    e.preventDefault();  
    const token = c1.loginUser(credentials)
    Promise.resolve(token).then(function (token) {
      console.log(token.data); // "Success"
        localStorage.setItem('token', token.data.auth)
        try {
          const res = axios({
            method: 'post',
            url: 'https://my-ravi-project.herokuapp.com/api/auth/user-details',
            headers: {
              'Content-Type': 'application/json',
              'token': token.data.auth
            },
          });
          Promise.resolve(res).then(function (data) {
              details(data.data)
            });
        } catch (error) {
          alert("Error: " + error)
          console.log(error);
        }
    }).catch((error) => {
      alert("Sorry credentials doesn't match")
    });
 
    // setTimeout(() => {
    // }, 2000);
  }

  function storeLocal(rel) {
    // var myobj = { name: rel.user.displayName, email: rel.user.email, profile_pic: rel.user.photoURL, date: new Date() }
    window.localStorage.setItem('userDetails', JSON.stringify(rel))
    history.push('/')
    console.log("Logged In");
    window.location.reload();
  }

  function myGoogleClick() {
    c1.googleReq().then((rel) => {
      // console.log(rel.user);
      var myDatabaseData = { password: rel.user.email + rel.user.displayName, email: rel.user.email }
      const FuncCall = c1.loginUser(myDatabaseData)
      Promise.resolve(FuncCall).then(function (dataRes) {
        if (dataRes.data.success) {
          var myobj = {_id: dataRes.data.user._id, name: rel.user.displayName, email: rel.user.email, profile_pic: dataRes.data.user.profile_pic, date: new Date() }
          // console.log(myobj);
          // console.log(dataRes);
          storeLocal(myobj);
        }
      }).catch((error) => {
        alert("Sorry Credentials Does not exist. Please register your credentials")
      })

    }).catch((error) => {
      console.log(error);
      alert("Sorry Credentials Does not exist with Google")
    })
  }

  function myGithubClick() {
    c1.githubReq().then((rel) => {
      console.log(rel.user);
      // var myDatabaseData = {name: rel.user.displayName, password: rel.user.email + rel.user.displayName, email: rel.user.email, profile_pic: rel.user.photoURL, accessFrom: "Google"}
      // setUserMyDetailsGoogle(rel.user);
      var myDatabaseData = { password: rel.user.email + rel.user.displayName, email: rel.user.email }
      const FuncCall = c1.loginUser(myDatabaseData)
      Promise.resolve(FuncCall).then(function (dataRes) {
        if (dataRes.data.success) {
          var myobj = {_id: dataRes.data.user._id, name: rel.user.displayName, email: rel.user.email, profile_pic: dataRes.data.user.profile_pic, date: new Date() }
          // console.log(myobj);
          storeLocal(myobj);
        }
      }).catch((error) => {
        alert("Sorry Credentials Does not exist. Please register your credentials")
      })
    }).catch((error) => {
      alert("Sorry Credentials Does not exist with Github")
      // console.log(error);
    })
  }
  return (
    <>
      <div className="bg-white sm:m-2 md:m-4 lg:m-6 xl:m-10 rounded px-8 pt-6 pb-8 flex flex-col">
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Username" name='email' onChange={credentialsFunc} />
        </div>
        <div className="mb-6">
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" name="password" type="password" placeholder="Please enter your password." onChange={credentialsFunc} />
          <p className="text-red text-xs italic">Please enter a password.</p>
        </div>
        <div className="flex items-center justify-between">
          <button className="w-full h-full bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="button" onClick={handleUserDetails}>
            Sign In
          </button>
        </div>
      </div>



      <div className="w-full flex items-center p-1 justify-center space-x-6">
        <FaGoogle
          size={40}
          onClick={myGoogleClick}
          cursor={'pointer'}
        />

        <FaGithub
          size={40}
          cursor={'pointer'}
          onClick={myGithubClick}
        />
      </div>

    </>
  )
}

export default Login