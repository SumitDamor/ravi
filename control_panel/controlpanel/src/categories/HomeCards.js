import React from 'react'
import { Link } from 'react-router-dom'
// eslint-disable-next-line
import CardItem from '../screens/CardItem'
import { FiActivity, FiPlus, FiEdit2, FiTrash, FiCheck, FiUser, FiPaperclip } from "react-icons/fi";
import { IconContext } from "react-icons";
const HomeCards = () => {
  return (
    <>
         <h1 className='text-center text-2xl font-semibold mt-12'>Ravi Bariya Backend Panel</h1>
         <h1 className='text-center text-xl font-medium mt-6'>Post Services</h1>
         <div className='grid justify-items-center object-center items-center align-center content-center lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xsm:grid-cols-1'>

      <Link to={"/add-post"}>
      <CardItem
        icon= {<FiPlus size="100px" color="cornflowerblue"/>}
        title="Add Post"
      />
      </Link>
      <Link to={"/edit-post"}>
      <CardItem
        icon= {<FiEdit2 size="100px" color="cornflowerblue"/>}
        title="Edit Post"
      />
      </Link>
      <Link to={"/delete-post"}>
      <CardItem
          icon= {<FiTrash 
            size="100px" color="cornflowerblue"
          />}
        title="Delete Post"
      />
      </Link>
      <Link to={"/add-report-post"}>
      <CardItem
          icon= {<FiCheck
            size="100px" color="cornflowerblue"
          />}
        title="Add Report Post"
      />
      </Link>
      <Link to={"/startup-chart"}>
      <CardItem
          icon= {<FiActivity
            size="100px" color="plain"
          />}
        title="Startup Chart"
      />
      </Link>
  
      </div>
      <h1 className='text-center text-xl font-medium mt-6'>Marketing Services</h1>
      <div className='grid justify-items-center  object-center items-center align-center content-center lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xsm:grid-cols-1'>

      <Link to={"/all-users"}>
      <CardItem
          icon= {<FiUser
            size="100px" color="cornflowerblue"
          />}
        title="Users"
      />
      </Link>
      <Link to={"/send-email"}>
      <CardItem
          icon= {<FiPaperclip
            size="100px" color="plain"
          />}
        title="Compose Email"
      />
      </Link>
      </div>

    </>
  )
}

export default HomeCards