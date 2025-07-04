
import React,{useEffect, useState, useRef,useMemo} from 'react'
import {HashLink as Link} from 'react-router-hash-link'
import Axios from 'axios';
import logo from './Picture/cabanganLogo.png'
import {IoNotificationsOutline} from "react-icons/io5"
import {VscAccount} from "react-icons/vsc"
import {HiOutlineBars4} from "react-icons/hi2"
import {RxCross2} from 'react-icons/rx'
import { motion, useInView } from "framer-motion"
import Layout from './layout';
import Notification from './Notification'
import {Outlet,useNavigate,NavLink,useLocation} from 'react-router-dom';
import {RiDashboardFill} from 'react-icons/ri'
import { Tooltip } from "@material-tailwind/react";
import { HiOutlineNewspaper } from 'react-icons/hi'
import { PiNewspaperClippingFill } from "react-icons/pi";
import { BsFillCalendarRangeFill } from "react-icons/bs";
import Four from './four';

export const blink = `https://back-end-oeg6.onrender.com`;

export default function Navs() {

  const navLinkStyles = ({isActive}) =>{
    return {
      color: isActive? 'white' : 'black',
    }
  }
  const revNavLinkStyles = ({isActive}) =>{
    return {
      color: isActive? 'green' : 'white',
    }
  }


    const [resNav,setresNav] =useState(false)

    const [shownotif,setshownotif] = useState(false)
    const [showAcc,setshowAcc] = useState(false)

    const [numberNotif,setnumberNotif] = useState(false)

    const getNtotification = async ()=>{
      try{ 
          const response= await Axios.get(`${blink}/notification/${'icon'}`)
          if(response.data === '404 Not Found') { 
                  console.log(' no notification')
          }

          setnumberNotif(response.data.unread)

        }catch (err){
          if (!err?.response) {
            console.log(err)
          }
        }
    }
    
    useEffect(()=>{
     const interval =  setInterval(()=>{
        getNtotification();
      },5000)
      return () => clearInterval(interval)
    },[])
    
    const location = useLocation();

    useEffect(()=>{
      setresNav(false)
    },[location.pathname])


  return (
  <>
    <div className=' bg-[#EEEEEE] h-[100vh] w-full overflow-hidden  ' >

        <div className='transition ease-in-out w-full h-[45px] z-40 bg-[#068FFF] boxShadow px-2 absolute top-0 flex flex-row justify-between cursor-pointer'>
          
          <div className=' transition ease-in-out duration-1000 flex  flex-row items-center w-fit lg:w-[320px] justify-evenly py-[4px] mx-4 cursor-pointer'>

                <span>
                  <img src={logo} alt='logo' className='w-[35px] self-start z-50'/>
                </span>
                <div className='hidden lg:block font-[poppins] font-bold text-[18px] sm:text-[20px] text-white textS cursor-pointer'>Cabangan High School </div>

          </div>  

          <div className='flex flex-row items-center justify-evenly gap-x-[45px]'>

              <nav  className='hidden sm:flex items-center justify-center'>
                      <Tooltip content="Dashboard" placement="bottom" className='z-50 px-2 bg-blue-600 ' animate={{mount: { scale: 1.5, y: 10,  x:1 },unmount: { scale: 0, y: 0, x:0 }, }}>
                        <NavLink style={navLinkStyles} to='/nav/home/gc/dashboard' className='text-black text-[15px] px-4 cursor-pointer hover:text-[white] '>
                            <RiDashboardFill size={25}/>
                          </NavLink>
                      </Tooltip>
                      <Tooltip content="PIS" placement="bottom" className='z-50 px-2 bg-blue-600 ' animate={{mount: { scale: 1.5, y: 10,  x:1 },unmount: { scale: 0, y: 0, x:0 }, }}>
                        <NavLink style={navLinkStyles} to='/nav/home/gc/studentPis' className='text-black text-[15px] px-4 cursor-pointer hover:text-[white]'>
                          <HiOutlineNewspaper size={25}/>
                        </NavLink>
                      </Tooltip>
                      <Tooltip content="Requests" placement="bottom" className='z-50 px-2 bg-blue-600 ' animate={{mount: { scale: 1.5, y: 10,  x:1 },unmount: { scale: 0, y: 0, x:0 }, }}>
                        <NavLink style={navLinkStyles} to='/nav/home/gc/requests/normal' className='text-[#1D5D9B] text-[15px] px-4 cursor-pointer hover:text-[white]'>
                          <PiNewspaperClippingFill size={25} />
                        </NavLink>
                      </Tooltip>
                      <Tooltip content="Calendar" placement="bottom" className='z-50 px-2 bg-blue-600 ' animate={{mount: { scale: 1.5, y: 10,  x:1 },unmount: { scale: 0, y: 0, x:0 }, }}>
                        <NavLink style={navLinkStyles} to='/nav/home/gc/calendar' className='text-black text-[15px] px-4 cursor-pointer hover:text-[white]'>
                          <BsFillCalendarRangeFill size={20}/>
                        </NavLink>
                      </Tooltip>
              </nav>
              <div className='flex flex-row items-center justify-evenly gap-x-[15px]'>
                <div  onClick={()=> setshownotif(true)}
                    className='relative flex flex-col justify-center items-center mx-2 rounded-lg hover:scale-125 transition-all  cursor-pointer'>
                      {numberNotif > 0 &&
                        <div className='bg-[red] rounded-full w-[20px] h-[20px] absolute top-0 right-0 flex justify-center items-center text-white'>{numberNotif}</div>
                      }
                      <IoNotificationsOutline size={35} className='hover:text-[white]'/>
                </div>
                <div onClick={(()=> setshowAcc(true))} className='flex flex-col justify-center items-center mr-4 rounded-lg hover:scale-125 transition-all text-black cursor-pointer hover:text-[white]'>
                    <VscAccount size={30} onClick={(()=> setshowAcc(true))}/>
                </div>
                {!resNav &&  
                  <div onClick={()=> setresNav(true)} className='flex sm:hidden items-center hover:scale-125 transition-all  cursor-pointer'><HiOutlineBars4 size={32}/></div>
                }
              </div>

          </div>  
         
        </div>  

        <section className='bg-transparent overflow-auto h-[100vh] flex items-center justify-center bg-black'>
            <Outlet className='overflow-auto '/>
        </section>

        <motion.div  className='z-50 absolute top-[-1000px] right-0  h-[100vh] w-[320px] px-2 items-center bg-black bg-opacity-75'
            transition={{
              type: "spring",
              stiffness: 25
              }}
            animate={{
            y: shownotif?  1000:0}}>
            {shownotif && 
              <div>
                <Notification className='z-50 w-full' close={setshownotif}/>
              </div>}
        </motion.div> 

        {shownotif &&
         <div onClick={(()=>setshownotif(false))} className='inset-0 absolute  flex w-full h-[100vh] justify-center items-center text-center z-40'></div>}

        
            {showAcc && 
              <div>
                <Four className='z-50 w-full' close={setshowAcc}/>
              </div>}

        {showAcc &&
         <div onClick={(()=>setshowAcc(false))} className='inset-0 absolute bg-black bg-opacity-20 flex w-full h-[100vh] justify-center items-center text-center z-40'></div>}
    
    </div>

    {resNav && 
        <div className=" fixed inset-0 z-50 bg-black bg-opacity-90">
            <div className='flex sm:hidden items-center w-fit absolute top-2 right-2 cursor-pointer text-white'>
              <RxCross2 size={42} onClick={()=> setresNav(false)}/>
            </div>
                <nav  className='flex flex-col items-start justify-center gap-[10px] h-[400px]'>
                  <span>
                    <img src={logo} alt='logo' className='w-[100px] self-start z-50 px-3'/>
                  </span>
                  <NavLink style={revNavLinkStyles} to='/nav/home/gc/dashboard' className='text-white text-[15px] px-4 text-xl cursor-pointer'>Dashboard</NavLink>
                  <NavLink style={revNavLinkStyles} to='/nav/home/gc/one' className='text-white text-[15px] px-4 text-xl  cursor-pointer'>PIS</NavLink>
                  <NavLink style={revNavLinkStyles} to='/nav/home/gc/two' className='text-white text-[15px] px-4 text-xl  cursor-pointer'>Requests</NavLink>
                  <NavLink style={revNavLinkStyles} to='/nav/home/gc/three' className='text-white text-[15px] px-4 text-xl  cursor-pointer'>Calendar</NavLink>
                </nav>
      </div>}
  </>
  )
}
