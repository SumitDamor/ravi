import React, { useState, useEffect, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import FileBase64 from 'react-file-base64';
import { useContext } from 'react';
import PostsContext from '../context/posts/postsContext';
import CenterLoading from './CenterLoading';


const ProfilePage = () => {
  const [centerLoading, setcenterLoading] = useState(false)
  const c1 = useContext(PostsContext);
  const history = useHistory()

 

  const [userData, setuserData] = useState({ email: "", password: "", })
  const [credentials, setcredentials] = useState({ id: "", name: "", profile_pic: "http://www.cybecys.com/wp-content/uploads/2017/07/no-profile.png" , email: "", accessFrom: "", date: "" })
  useEffect(() => {
    let data = localStorage.getItem('userDetails')

    setuserData(JSON.parse(data))
  }, [])

  function logingOut() {
    window.localStorage.clear();
    history.push('/home')
    window.location.reload()
  }

  function credentialsFunc(e) {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  function updateUserNameProfile() {
    credentials.id = userData._id
    credentials.email = userData.email
    credentials.accessFrom = userData.accessFrom
    credentials.date = userData.date
    if (credentials.profile_pic === "http://www.cybecys.com/wp-content/uploads/2017/07/no-profile.png") {
      credentials.profile_pic = userData.profile_pic
    }
    if (credentials.name === "") {
      credentials.name = userData.name
    }
    // console.log(credentials);
    if (credentials) {
      let updatedUser = c1.updateUserProfileName(credentials).then((data) => {
        // setcredentials(...credentials, {_id: userData._id, email: userData.email})
        console.log(data.data.post);
        localStorage.setItem('userDetails', JSON.stringify(data.data.post))
        window.location.reload()
      }).catch((error) => {
        alert(error)
        console.log(error);
      })

  
      
    }
  }

  return (
    <div className='static'>
      <div className="absolute right-[50%] top-[50%]">
      </div>
      <div className="hero min-h-screen" style={{ backgroundImage: `url(${userData.profile_pic})` }}>
        <div className="overlay"></div>
        <div className="text-center text-neutral-content">
          <div className="max-w-2xl">
            <h1 className="font-google mb-5 text-5xl font-bold">{userData.name}</h1>
            <p className="font-google mb-5">{userData.email}</p>
            <p className="font-google mb-5">{userData.date}</p>
            <p className="font-google mb-5">{userData._id}</p>
            <div className="flex flex-col space-y-2">
              <button className="font-google btn btn-primary" onClick={logingOut}>Log out</button>
              <label for="my-modal-4" className="font-google btn btn-primary">Change Name and Profile</label>
            </div>
 
          </div>
        </div>
      </div>

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
     

      <label for="my-modal-4" className="modal cursor-pointer">
    <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
      <div className="md:flex items-center">
        <div className=" mt-4 md:mt-0 text-center md:text-left space-y-6">
        <div className='flex justify-between'>
            <img src={userData.profile_pic} className="object-cover mx-2 rounded-full h-10 w-10" />
            <img src={credentials.profile_pic} className="object-cover mx-2 rounded-full h-10 w-10" />
          </div>
          <input className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="name" type="text" placeholder={userData.name} name='name' onChange={credentialsFunc} />
          <FileBase64
            multiple={false}
            onDone={({ base64 }) => setcredentials({ ...credentials, profile_pic: base64 })}
          />

<div className="text-center md:text-right mt-4 md:flex md:justify-end">
        <button className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2" onClick={updateUserNameProfile}>Update</button>
      </div>
        </div>
        
      </div>
    
    </div>
      </label>

  
    </div>

  )
}

export default ProfilePage