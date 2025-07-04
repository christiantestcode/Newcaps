import React,{useEffect, useState} from 'react'
import { Tooltip } from "@material-tailwind/react";
import { MdOutlineManageSearch } from 'react-icons/md'
import { IoIosPaper , IoIosApps } from "react-icons/io";
import { IoNewspaper } from "react-icons/io5";
import communication from './Picture/communication.svg'
import conversation from './Picture/conversation.svg'
import RefferalReq from './Request/RefferalReq'
import AppointmentReq from './Request/AppointmentReq'
import { RxCross2 } from 'react-icons/rx'
import { motion } from "framer-motion"
import { AnimatePresence } from 'framer-motion'
import { GrChapterNext , GrChapterPrevious , GrCaretNext , GrCaretPrevious } from 'react-icons/gr'
import { useParams } from 'react-router-dom'; 

export default function Requests() {

  const{ type } = useParams();

  const [openReferral,setopenReferral] = useState(false)
  const [openAppoinment,setopenAppoinment] = useState(false)

    useEffect(()=>{
      document.getElementById(type).scrollIntoView();
    },[])

  return (
    <>
    <div className='w-full font-[poppins]'>    

        <div className='w-full h-[100vh] overflow-auto pt-[45px]' id='normal'>

            <div className='w-full h-fit flex flex-col items-center mx-auto' >
                <div className='mx-auto h-fit w-full sm:w-[80%] text-[32px] py-[20px] text-gray-800 font-bold px-2'>Teachers' Referral Request</div>
                <RefferalReq/>
            </div>

            <div className='w-full h-fit flex flex-col items-center mx-auto my-4' id='appointment'>
                <div className='mx-auto h-fit w-full sm:w-[80%] text-[32px] py-[20px] text-gray-800 font-bold px-2 '>Counseling Appointment Request</div>
                <AppointmentReq />
            </div>


        </div>
        
    </div>
    

    {/* <div className='flex justify-center items-center h-[100vh]'>
          <div className='flex flex-col sm:flex-row w-full justify-center'>
            
              <div onClick={(()=>setopenReferral(true))} 
              className='flex flex-col justify-center items-center w-[200px] lg:w-[300px] h-[200px] lg:h-[300px] bg-[#068FFF] m-2 rounded-lg hover:scale-105 transition-all boxShadow hover:shadow-xl hover:shadow-black border-2 border-blue-200 cursor-pointer'>
                <img src= {conversation} alt='referral' className='w-[40%]'/>
                <div><p className='break-words text-center font-[poppins] font-bold text-[18px] textS'>Teachers' Referral Request</p></div>
              </div>
             
              <div onClick={(()=>setopenAppoinment(true))} 
                className=' flex flex-col justify-center items-center w-[200px] lg:w-[300px] h-[200px] lg:h-[300px] bg-[#068FFF] m-2 rounded-lg hover:scale-105 transition-all boxShadow hover:shadow-xl hover:shadow-black border-2 border-blue-200 cursor-pointer'>
                  <img src= {communication} alt='appointment' className='w-[40%] '/>
                <div><p className='break-words text-center font-[poppins] font-bold text-[18px] textS'>Counseling Appointment Request</p></div>
                </div>
          </div>
    </div> */}

            {/* referral */}      
          <AnimatePresence>        
            {openReferral && <RefferalReq close={setopenReferral} />}
          </AnimatePresence>
           
          {/* Appointment */}   
          <AnimatePresence>        
            {openAppoinment && <AppointmentReq close={setopenAppoinment} />}
          </AnimatePresence>

    </>
  )
}
