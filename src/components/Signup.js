import React, { useState } from 'react'
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PostsContext from '../context/posts/postsContext';
import FileBase64 from 'react-file-base64';
import axios from 'axios';
import emailjs from '@emailjs/browser';
// import {getUserDetailsFromGoogle} from './FirebaseGoogleLogin'

import { auth } from './FirebaseGoogleLogin'
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { FaGoogle, FaGithub } from "react-icons/fa";

const Signup = (props) => {
  // let password = process.env.USER_PD_USER 
  const c1 = useContext(PostsContext);
  const history = useHistory()
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", profile_pic: "http://www.cybecys.com/wp-content/uploads/2017/07/no-profile.png", accessFrom: "MyWeb" })

  function credentialsFunc(e) {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  function sendEmail() {
    emailjs.send("service_hu3356u", "template_6uy8mo7", {
      from_name: "Ravi Bariya",
      to_name: credentials.name,
      to_email: credentials.email,
    }, 'AMgttjaC_np9gj5xJ').then((result) => {
      console.log(result.text);

    }, (error) => {
      console.log(error.text);
    });
  }
  function sendEmailForGoogleGithub(name, email) {
    emailjs.send("service_hu3356u", "template_6uy8mo7", {
      from_name: "Ravi Bariya",
      to_name: name,
      to_email: email,
    }, 'AMgttjaC_np9gj5xJ').then((result) => {
      console.log(result.text);
    }, (error) => {
      console.log(error.text);
    });
  }

  function details(data) {
    window.localStorage.setItem('userDetails', JSON.stringify(data))
    history.push('/home')
    sendEmail()
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  }

  async function handleUserDetails(e) {
    e.preventDefault();
    console.log(credentials);
    const token = c1.signupUser(credentials)
    Promise.resolve(token).then(function (token) {
      console.log(token.data);
      if (token.data.success) {
        localStorage.setItem('token', token.data.token)
        try {
          const res = axios({
            method: 'post',
            url: 'https://my-ravi-project.herokuapp.com/api/auth/user-details',
            headers: {
              'Content-Type': 'application/json',
              'token': token.data.token
            },
          });
          Promise.resolve(res).then(function (data) {
            console.log(data.data);
            details(data.data)
          });
          return res;
        } catch (error) {
          console.log(error);
        }
      }
    }).catch((error) => {
      alert("Sorry user already exists")
    })
  }

  function storeLocal(rel) {
    window.localStorage.setItem('userDetails', JSON.stringify(rel))
    history.push('/')
    console.log("Logged In");

    setTimeout(() => {
      window.location.reload();
    }, 4000);
  }

  // var myDatabaseData = {name: rel.user.displayName, password: rel.user.email + rel.user.displayName, email: rel.user.email, profile_pic: rel.user.photoURL, accessFrom: "Google"}
  function myGoogleClick(e) {
    e.preventDefault()
    c1.googleReq().then((rel) => {
      // console.log(rel.user);
      var myDatabaseData = { name: rel.user.displayName, password: rel.user.email + rel.user.displayName, email: rel.user.email, profile_pic: rel.user.photoURL, accessFrom: "Google" }
      // setUserMyDetailsGoogle(rel.user);
      // c1.signupUser(myDatabaseData)
      const FuncCall = c1.signupUser(myDatabaseData)
      Promise.resolve(FuncCall).then(function (dataRes) {
        if (dataRes.data.success) {
          var myobj = { _id: dataRes.data.user._id, name: rel.user.displayName, email: rel.user.email, profile_pic: rel.user.photoURL, date: new Date() }
          storeLocal(myobj)
          sendEmailForGoogleGithub(myobj.name, myobj.email)
        }
      }).catch((error) => {
        alert("Sorry user already exists with different credentials")
      })
    }).catch((error) => {
      alert("Sorry user already exists with Google account! Please login")
    })
  }
  function myGithubClick(e) {
    e.preventDefault()
    c1.googleReq().then((rel) => {
      console.log(rel.user);
      var myDatabaseData = { name: rel.user.displayName, password: rel.user.email + rel.user.displayName, email: rel.user.email, profile_pic: rel.user.photoURL, accessFrom: "Google" }
      const FuncCall = c1.signupUser(myDatabaseData)
      Promise.resolve(FuncCall).then(function (dataRes) {
        if (dataRes.data.success) {
          var myobj = { _id: dataRes.data.user._id, name: rel.user.displayName, email: rel.user.email, profile_pic: rel.user.photoURL, date: new Date() }
          storeLocal(myobj)
          sendEmailForGoogleGithub(myobj.name, myobj.email)
        }
      }).catch((error) => {
        alert("Sorry user already exists with different credentials")
      })
    }).catch((error) => {
      alert("Sorry user already exists with Github account! Please login")
    })
  }




  return (
    <>

      <div className="bg-white flex flex-col justify-center rounded px-8 pt-6 pb-8 sm:m-2 md:m-4 lg:m-6 xl:m-10">
        <div className="mb-4">

          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
            Username
          </label>
          <input className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="name" type="text" placeholder="******************" name='name' onChange={credentialsFunc} />


          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
            Email ID
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" type="email" placeholder="Email"
            name='email' onChange={credentialsFunc}
          />
        </div>
        <div className="mb-6">


          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************" name='password' onChange={credentialsFunc} />
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="cpassword">
            Confirm Password
          </label>
          <input className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="cpassword" type="password" placeholder="******************" />
          <p className="text-red text-xs italic">Please choose a password.</p>
        </div>

        <FileBase64
          multiple={false}
          onDone={({ base64 }) => setcredentials({ ...credentials, profile_pic: base64 })} />


        <div className="flex items-center justify-between">
          <button className="w-full h-full my-2 bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="button" onClick={handleUserDetails}>
            Sign In
          </button>
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
      </div>




    </>
  )
}

export default Signup