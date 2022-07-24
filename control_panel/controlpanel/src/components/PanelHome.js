import React, { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import HomeCards from '../categories/HomeCards'
import postApi from '../context/postApi'

const PanelHome = (props) => {
    const name = useContext(postApi)
    // console.log(props.route.foo);
  return (
    <>
  
   <HomeCards/>
    </>

  )
}

export default PanelHome