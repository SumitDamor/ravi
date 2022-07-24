import React, {useContext, useState} from 'react'

import ListDesign from './ListDesign'
import postApi from '../context/postApi'
import { Link } from 'react-router-dom'
import ErrorAlert from './Alerts/ErrorAlert'
// eslint-disable-next-line
const Users = (props) => {

  const userData = useContext(postApi)

  return (
    <>
  
      <h1 className='text-center text-2xl font-bold'>Users</h1>
      { userData.changing ?   <div className='m-4 grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 justify-center'>
       { userData.changing.map((data, index) => {
            return (
                <ListDesign
                  key={data._id}
                  index={index}
                  name={data.name}
                  date={data.date}
                  email={data.email}
                  id={data._id}
                  profile_pic={data.profile_pic}         
                  accessFrom={data.accessFrom}         
                />
            )
          }) 
          }
        </div> : <ErrorAlert show={true} /> }
  
    </>
  )
}

export default Users