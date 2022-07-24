import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import App from '../App'
import PostsContext from '../context/posts/postsContext'
import CardDesign from '../design/CardDesign'
import HeroSection from '../design/HeroSection'
import MyButton from '../design/MyButton'
import ReadTemplate from '../ReadTemplate'
import MyChartJS from './MyChartJS'
// eslint-disable-next-line
const Home = (props) => {
  const c1 = useContext(PostsContext);
  const [Numb, setNumb] = useState(0)
  // console.log(process.env.REACT_APP_CLIENT_ID);
  // console.log(process.env.NODE_ENV);
  // console.log(c1.first);
  // console.log(c1.data);
  // console.log(c1.state);
  // let data;
  // useEffect(() => {
  // data = window.localStorage.setItem('userDetails', JSON.stringify(c1.userMyDetails))
  // }, [data])
  

  useEffect(() => {
   let randomNumber = Math.floor(Math.random() * c1.data.length);
    setNumb(randomNumber)
  }, [Numb])
  return (
    <>
      <HeroSection key={c1.data._id} data={c1.data[Numb]} />

      <div className='text-center' id='our-daily'>
        <h1 className='text-center mt-8 text-4xl font-semibold'>Read Our Daily</h1>
        <Link to={`/our-daily-dose`}>
          <h5 className='inline-flex text-center mb-4 text-lg cursor-pointer hover:underline transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:font-bold'>Read More</h5>
        </Link>
      </div>
      <div className='w-screen grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 justify-center'>
        {c1.data.slice(1, 5).map((info) => {
          return (
            <>
              <CardDesign {...info} />
            </>
          )
        })}
      </div>


        {/* ******** Business Section ******* */}

      <div className='text-center'>
        <h1 className='text-center mt-8 text-4xl font-semibold'>Business</h1>
        <Link to={`/business`}>
          <h5 className='inline-flex text-center mb-4 text-lg cursor-pointer hover:underline transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:font-bold'>Read More Business</h5>
        </Link>
      </div>

      <div className='w-screen grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 justify-center'>
        {c1.business_data.slice(0, 4).map((info) => {
          return (
            <>
              <CardDesign {...info} />
            </>
          )
        })}
      </div>

{/* Chart Section */}

    
<div className='text-center'>
<h1 className='text-center mt-8 text-4xl font-semibold'>Chart</h1>
<Link to={`/chart-post`}>
          <h5 className='inline-flex text-center mb-4 text-lg cursor-pointer hover:underline hover:font-semibold'>See Chart</h5>
        </Link>
      </div>
<MyChartJS/>

        {/* ******** Startups Section ******* */}
     
        <div className='text-center'>
        <h1 className='text-center mt-8 text-4xl font-semibold'>Startups</h1>
        <Link to={`/startups`}>
          <h5 className='inline-flex text-center mb-4 text-lg cursor-pointer hover:underline hover:font-semibold'>Read More Startups</h5>
        </Link>
      </div>

      <div className='w-screen grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 justify-center'>
        {c1.startups_data.slice(0, 4).map((info) => {
          return (
            <>
              <CardDesign {...info} />
            </>
          )
        })}
      </div>


        {/* ******** Technology Section ******* */}

        <div className='text-center'>
        <h1 className='text-center mt-8 text-4xl font-semibold'>Technology</h1>
        <Link to={`/technology`}>
          <h5 className='inline-flex text-center mb-4 text-lg cursor-pointer hover:underline hover:font-semibold'>Read More Technology</h5>
        </Link>
      </div>

      <div className='w-screen grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 justify-center'>
        {c1.tech_data.slice(0, 4).map((info) => {
          return (
            <>
              <CardDesign {...info} />
            </>
          )
        })}
      </div>

        {/* ******** Sports Section ******* */}

        <div className='text-center'>
        <h1 className='text-center mt-8 text-4xl font-semibold'>Sports</h1>
        <Link to={`/sports`}>
          <h5 className='inline-flex text-center mb-4 text-lg cursor-pointer hover:underline hover:font-semibold'>Read More Sports</h5>
        </Link>
      </div>

      <div className='w-screen grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 justify-center'>
        {c1.sports_data.slice(0, 4).map((info) => {
          return (
            <>
              <CardDesign {...info} />
            </>
          )
        })}
      </div>


 
    </>

  )
}

export default Home