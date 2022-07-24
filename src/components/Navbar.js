import React, { useState, useEffect } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom';
import { FiChevronRight } from "react-icons/fi";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import Hamburger from 'hamburger-react'
import PostsContext from '../context/posts/postsContext';
import { useContext } from 'react';
import { MdLogout } from "react-icons/md";
import { FiHome, FiMonitor, FiFile, FiSmartphone, FiWatch, FiLogOut } from "react-icons/fi";

import {auth} from './FirebaseGoogleLogin'
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut} from 'firebase/auth';

function DrawerComponent(params) {
    const history = useHistory()
    const c1 = useContext(PostsContext);
    const [isOpen, setIsOpen] = React.useState(true)
    // console.log("drawer");
    const [userData, setuserData] = useState({ name: "sumit", email: "demo", })
    useEffect(() => {
        let data = localStorage.getItem('userDetails')
        setuserData(JSON.parse(data))

    }, [])

    function logingOut() {
        window.localStorage.clear();
        setuserData()
        signOut(auth)
        history.push('/home')
        window.location.reload()
    }
    return (

        <>

            <div className="flex flex-col w-full h-screen px-4 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600">
                <h2 className="text-3xl font-semibold text-gray-800 text-center dark:text-white">Dashboard</h2>

                <div className="flex flex-col justify-between flex-1 mt-6">
                    <nav>
                        <NavLink activeClassName='active_class' className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" to="/home">
                            <FiHome />

                            <span className="mx-4 font-medium">Home</span>
                        </NavLink>

                        <NavLink activeClassName='active_class' className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" to="/business">
                            <FiMonitor />

                            <span className="mx-4 font-medium">Business</span>
                        </NavLink>

                        <NavLink activeClassName='active_class' className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" to="/startups">
                            <FiFile />

                            <span className="mx-4 font-medium">Startups</span>
                        </NavLink>

                        <NavLink activeClassName='active_class' className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" to="/technology">
                            <FiSmartphone />

                            <span className="mx-4 font-medium">Technology</span>
                        </NavLink>

                        <NavLink activeClassName='active_class' className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" to="/sports">
                            <FiWatch />
                            <span className="mx-4 font-medium">Sports</span>
                        </NavLink>
                    </nav>

                    <div>
                        {
                            userData ? <div className="flex items-center justify-between px-4 -mx-2">
                            <NavLink
                                activeClassName='profile_active_class'
                                to={{
                                    pathname: `/profile-page/${userData.name.replace(' ', '')}`,
                                    userProps: { name: "This is a passed prop" },
                                }}
                            >
                                <div className="flex items-center">
                                    <img className="object-cover mx-2 rounded-full h-10 w-10 transition ease-in-out delay-150 hover:border-2 hover:border-green-600 
                                duration-50" src={userData.profile_pic} alt="avatar"/>
                                    <h4 className="mx-2 font-medium text-gray-800 dark:text-gray-200 hover:underline hover:font-semibold">  {
                                        userData.name
                                    }</h4>
                                </div>
                                </NavLink>
                                <div className='p-2 rounded-full hover:bg-gray-200
                                transition ease-in-out delay-150 hover:scale-110 duration-300
                                '  onClick={logingOut}>
                                        <MdLogout/>
                                    </div>      
                            </div>
                                :     
                            <div className="flex flex-col items-center justify-between px-4 -mx-2">
                                    <div className="flex items-center">
                                        <img className="object-cover mx-2 rounded-full h-10 w-10" src={"https://www.themoviedb.org/t/p/w500/whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg"}alt="avatar" />
                                        <h4 className="mx-2 font-medium text-gray-800 dark:text-gray-200 hover:underline hover:font-semibold">  {
                                           "Sumit Damor"
                                        }</h4>
                                    </div>
                                    <div className="py-4 text-center font-extralight">
                                        Powered by @SumitDamor
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

const Navbar = () => {
    const [userData, setuserData] = useState({ name: "sumit", email: "demo", })
    useEffect(() => {
        let data = localStorage.getItem('userDetails')
        setuserData(JSON.parse(data))
    }, [])

    const [isHamOpen, setHamOpen] = useState(false)
    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    return (
        <>

            <div>

                <div className="bg-white rounded shadow-lg py-5 px-4 flex justify-between items-center sticky top-0">
                    <nav className="flex space-x-4">
                        <div className='flex items-center cursor-pointer' onClick={toggleDrawer}>
                            <Hamburger size={25} toggled={isOpen} />
                            <div>
                                <Drawer
                                    open={isOpen}
                                    onClose={toggleDrawer}
                                    direction='left'
                                    size={'300px'}
                                    duration={'500'}
                                    zIndex={1251}
                                    overlayColor={'#000000'}
                                >
                                    <DrawerComponent />

                                </Drawer>

                            </div>
                        </div>
                        <NavLink to="/home" className='flex items-center'>
                            <div className="flex items-center space-x-3 lg:pr-16">
                                <svg className="cursor-pointer" width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 17H0H1ZM7 17H6H7ZM17 27V28V27ZM27 17H28H27ZM17 0C12.4913 0 8.1673 1.79107 4.97918 4.97918L6.3934 6.3934C9.20644 3.58035 13.0218 2 17 2V0ZM4.97918 4.97918C1.79107 8.1673 0 12.4913 0 17H2C2 13.0218 3.58035 9.20644 6.3934 6.3934L4.97918 4.97918ZM0 17C0 21.5087 1.79107 25.8327 4.97918 29.0208L6.3934 27.6066C3.58035 24.7936 2 20.9782 2 17H0ZM4.97918 29.0208C8.1673 32.2089 12.4913 34 17 34V32C13.0218 32 9.20644 30.4196 6.3934 27.6066L4.97918 29.0208ZM17 34C21.5087 34 25.8327 32.2089 29.0208 29.0208L27.6066 27.6066C24.7936 30.4196 20.9782 32 17 32V34ZM29.0208 29.0208C32.2089 25.8327 34 21.5087 34 17H32C32 20.9782 30.4196 24.7936 27.6066 27.6066L29.0208 29.0208ZM34 17C34 12.4913 32.2089 8.1673 29.0208 4.97918L27.6066 6.3934C30.4196 9.20644 32 13.0218 32 17H34ZM29.0208 4.97918C25.8327 1.79107 21.5087 0 17 0V2C20.9782 2 24.7936 3.58035 27.6066 6.3934L29.0208 4.97918ZM17 6C14.0826 6 11.2847 7.15893 9.22183 9.22183L10.636 10.636C12.3239 8.94821 14.6131 8 17 8V6ZM9.22183 9.22183C7.15893 11.2847 6 14.0826 6 17H8C8 14.6131 8.94821 12.3239 10.636 10.636L9.22183 9.22183ZM6 17C6 19.9174 7.15893 22.7153 9.22183 24.7782L10.636 23.364C8.94821 21.6761 8 19.3869 8 17H6ZM9.22183 24.7782C11.2847 26.8411 14.0826 28 17 28V26C14.6131 26 12.3239 25.0518 10.636 23.364L9.22183 24.7782ZM17 28C19.9174 28 22.7153 26.8411 24.7782 24.7782L23.364 23.364C21.6761 25.0518 19.3869 26 17 26V28ZM24.7782 24.7782C26.8411 22.7153 28 19.9174 28 17H26C26 19.3869 25.0518 21.6761 23.364 23.364L24.7782 24.7782ZM28 17C28 14.0826 26.8411 11.2847 24.7782 9.22183L23.364 10.636C25.0518 12.3239 26 14.6131 26 17H28ZM24.7782 9.22183C22.7153 7.15893 19.9174 6 17 6V8C19.3869 8 21.6761 8.94821 23.364 10.636L24.7782 9.22183ZM10.3753 8.21913C6.86634 11.0263 4.86605 14.4281 4.50411 18.4095C4.14549 22.3543 5.40799 26.7295 8.13176 31.4961L9.86824 30.5039C7.25868 25.9371 6.18785 21.9791 6.49589 18.5905C6.80061 15.2386 8.46699 12.307 11.6247 9.78087L10.3753 8.21913ZM23.6247 25.7809C27.1294 22.9771 29.1332 19.6127 29.4958 15.6632C29.8549 11.7516 28.5904 7.41119 25.8682 2.64741L24.1318 3.63969C26.7429 8.20923 27.8117 12.1304 27.5042 15.4803C27.2001 18.7924 25.5372 21.6896 22.3753 24.2191L23.6247 25.7809Z" fill="#1F2937" />
                                </svg>
                                <h2 className="font-normal text-2xl leading-6 text-gray-800">Ravi Bariya</h2>
                            </div>
                        </NavLink>

                    </nav>
                    {
                        userData ? <div>
                            <Link
                                to={{
                                    pathname: `/profile-page/${userData.name.replace(' ', '')}`,
                                    userProps: { name: "This is a passed prop" },
                                }}
                            >
                                <img className='w-12 h-12 object-cover rounded-full transition ease-in-out delay-150 hover:border-2 hover:border-green-600 
                                duration-50' src={userData.profile_pic} alt="profile" />
                            </Link>
                        </div> : <div className='flex justify-center items-center space-x-2'>
                            <NavLink to="/login">
                                <button className='btn bg-gray-800 py-2 flex items-center text-white font-semibold rounded px-4' data-ripple-light='true'>Login</button>
                            </NavLink>
                            <NavLink to="/signup">
                                <button className='btn bg-gray-800  py-2 flex items-center text-white font-semibold rounded px-4' data-ripple-light='true'>SignUp</button>
                            </NavLink>
                        </div>
                    }


                </div>
            </div>
        </>
    )
}

export default Navbar