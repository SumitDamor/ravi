import axios from 'axios'
import React, {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import postApi from '../context/postApi'
import ErrorAlert from './Alerts/ErrorAlert'

const SingleUser = (props) => {
    const [alert, setAlert] = useState(true)
    const userData = useContext(postApi) 
    const [singleData, setsingleData] = useState({})

    // console.log(userData.singleData.data);
    
      // getting single user
// http://localhost:5000/api/auth/user/62b6e728dd0a587fe2c202a5

async function singleDataFunc() {
  const id = props.match.params.id
  console.log(id);
  try {
    const res = await axios.get(`https://my-ravi-project.herokuapp.com/api/auth/user/${id}`)
    setsingleData(res.data)
  } catch (error) {
    setAlert(false)
    console.log(error);
  }
}
useEffect(() => {
  singleDataFunc()
}, [])

// console.log(singleData.name);
 

  return (
    <>
    {alert ?
     <div className="h-screen w-screen bg-cover bg-center" style={{ backgroundImage: `url(${singleData.profile_pic})` }}>
        <div className="absolute top-0 h-screen w-full pt-24 overlay-panel bg-opacity-80">
    <div className="flex flex-col items-center space-y-3">
    <label for="my-modal-4" className='cursor-pointer '><img className='w-48 h-48 object-cover rounded-full border-4 border-green-500 p-[2px] shadow-2xl shadow-slate-500' src={singleData.profile_pic} alt="profile" /></label>
    <h1 className='text-2xl text-white font-bold text-center'>{singleData.name}</h1>
    <h1 className='text-md text-white font-semibold text-center'>{singleData.accessFrom}</h1>
    <h1 className='text-white'>{singleData.date}</h1>
    <h1 className='text-white'>{singleData.email}</h1>
    <h1 className='text-white'>{singleData._id}</h1>
    <Link to={{pathname: `/send-email`,
         state: {
            email: singleData.email
        }
         }}>
    <button className='bg-purple-600 px-4 py-2 rounded cursor-pointer flex text-white hover:bg-black'>Send email to <p className='font-bold mx-1'>{singleData.email}</p></button>
      </Link>
    </div>
    </div>




    </div> : <ErrorAlert show={true} /> }

   
    <input type="checkbox" id="my-modal-4" className="modal-toggle" />

<label for="my-modal-4" className="modal cursor-pointer">
<div className="bg-white rounded-lg md:max-w-md md:mx-auto p-1 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
  <div className="md:flex items-center">
    <div className="rounded-lg">
    <div className='flex justify-between'>
        <img src={singleData.profile_pic} className="object-cover rounded-lg" />
      </div>
    </div>
    
  </div>

</div>
  </label>
    </>
  
  )
}

export default SingleUser