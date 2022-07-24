import React, {useContext, useEffect, useState} from 'react'
import postApi from '../context/postApi'
import ErrorAlert from './Alerts/ErrorAlert'
import PostsList from './PostsList'
const EditDeleteListHolder = () => {
  const userData = useContext(postApi)
  // const [alert, setAlert] = useState(false)

  // useEffect(() => {
  //   let allData = userData.allposts
  //   if (allData === undefined) {
  //     setAlert(true)
  //   }
  // }, [])
  // console.log(allposts);
  
  return (
    <div>

   
     <h1 className='text-center text-2xl font-bold'>All Posts</h1>
     { userData.allposts ?
          userData.allposts.map((data, index) => {
            return (
                <PostsList
                  key={index}
                  index={index}
                  title={data.title}
                  id={data._id}         
                  category={data.category}         
                  image_link={data.image_link}
                  desc={data.desc}
                  date={data.date.slice(0,10)}         
                />
            )
          }) :  <ErrorAlert show={true} />
        }
    </div> 
  )
}

export default EditDeleteListHolder