import React, {useContext} from 'react'
import PostsContext from '../context/posts/postsContext';
import CardDesign from '../design/CardDesign';
const OurDailyDose = () => {
    const c1 = useContext(PostsContext);
  return (
    <>
             <div className='w-screen grid md:grid-cols-2 lg:grid-cols-4 justify-center p-16'>
        {c1.data.map((info) => {
          return(
            <>
            <CardDesign {...info} />  
            </>
          )
        })}
        </div>
    </>
  )
}

export default OurDailyDose