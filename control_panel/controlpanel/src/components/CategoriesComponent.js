import React from 'react'
import { FiClipboard, FiBarChart, FiMonitor, FiDribbble, FiCheck, FiUser } from "react-icons/fi"
import { Link, useLocation } from 'react-router-dom'
import CardItem from '../screens/CardItem'
import PostFields from './PostFields'
const CategoriesComponent = (props) => {
  const location = useLocation()
  var myPathname = location.pathname 
  // console.log(location);
  return (
    <>
                 <h1 className='text-center text-2xl font-semibold mt-12'>{props.title}</h1>
         <div className='grid grid-cols-1 md:grid-cols-2 justify-items-center  object-center items-center align-center content-center cursor-pointer'>
         <Link to={{pathname: `${myPathname}/business-post`,
         state: {
            title: "Business"
        }
         }}>
         <CardItem
        icon= {<FiClipboard size="100px" color="cornflowerblue"/>}
        title="Business Post"
      />
      </Link>
      <Link to={{pathname: `${myPathname}/startup-post`,
       state: {
            title: "Startups"
        }
      }}>
         <CardItem
        icon= {<FiBarChart size="100px" color="cornflowerblue"/>}
        title="Startup Post"
      />
      </Link>
      <Link to={{pathname:`${myPathname}/technology-post`,
       state: {
            title: "Technology"
        }
      }}>
         <CardItem
        icon= {<FiMonitor size="100px" color="cornflowerblue"/>}
        title="Technology Post"
      />
      </Link>
      <Link to={{pathname:`${myPathname}/sports-post`,
        state: {
            title: "Sports"
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

export default CategoriesComponent