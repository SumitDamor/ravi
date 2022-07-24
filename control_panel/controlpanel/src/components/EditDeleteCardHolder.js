import React from 'react'
import { FiClipboard, FiBarChart, FiMonitor, FiDribbble, FiCheck, FiUser } from "react-icons/fi"
import { Link, useLocation } from 'react-router-dom'
import CardItem from '../screens/CardItem'
import PostFields from './PostFields'

const EditDeleteCardHolder = (props) => {
    const location = useLocation()
    var myPathname = location.pathname 
  return (
  <>
              <h1 className='text-center text-2xl font-semibold mt-12'>{props.title}</h1>
         <div className='grid grid-cols-2 justify-items-center  object-center items-center align-center content-center cursor-pointer'>
         <Link to={{pathname: `${myPathname}/business-post/fetched`,
         state: {
            title: "Business post"
        }
         }}>
         <CardItem
        icon= {<FiClipboard size="100px" color="cornflowerblue"/>}
        title="Business Post"
      />
      </Link>
      <Link to={{pathname: `${myPathname}/startup-post/fetched`,
       state: {
            title: "Startup post"
        }
      }}>
         <CardItem
        icon= {<FiBarChart size="100px" color="cornflowerblue"/>}
        title="Startup Post"
      />
      </Link>
      <Link to={{pathname:`${myPathname}/technology-post/fetched`,
       state: {
            title: "Technology post"
        }
      }}>
         <CardItem
        icon= {<FiMonitor size="100px" color="cornflowerblue"/>}
        title="Technology Post"
      />
      </Link>
      <Link to={{pathname:`${myPathname}/sports-post/fetched`,
        state: {
            title: "Sports post"
        }
      }}>
         <CardItem
        icon= {<FiDribbble size="100px" color="cornflowerblue"/>}
        title="Sports Post"
      />
      </Link>
         </div>
         
  </>
  )
}

export default EditDeleteCardHolder