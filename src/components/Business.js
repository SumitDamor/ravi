import React, {useContext} from 'react'
import PostsContext from '../context/posts/postsContext';
import CardDesign from '../design/CardDesign';
import TopDesign from '../design/TopDesign';

const Business = (props) => {
  const c1 = useContext(PostsContext);
 
  return (
    <>
    <TopDesign 
      img={"https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"}

      topTitle={"Business"}
    />
    <div className='w-screen grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 justify-center p-16'>
    {c1.business_data.map((info) => {
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

export default Business