import React,{useEffect, useState, useRef} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'
import { motion } from "framer-motion"
import PacmanLoader from "react-spinners/PacmanLoader";


export default function DashViewEvent({close,value}) {
    
    const container = {
        hidden: { opacity: 0 },
        show: {
          scale:[0.5,1],
          opacity: 1,
          transition: {
            duration: 0.5,
            delayChildren: 0.5,
            staggerDirection: -1
          }
        },
        exit: {
          scale:0,
          opacity: 0,
          transition: {
            duration: 0.5,
            delayChildren: 0.5,
            staggerDirection: -1
          }
        }
      }

      const [eventDet,setEventDet] = useState({})

      const getEventAppointment = async () =>{
        try{
            const response= await Axios.get(`http://localhost:3500/eventDcalendar/${value.eventID}/${value.eventName}`)
            setTimeout(()=>{
                setEventDet(response.data)
                setloading(false)
            },500)

            }catch (err){   
                if (!err?.response) {
                console.log(err)
                }
            }
     }

      useEffect(()=>{
        if(value.eventName === 'Appointment'){
            getEventAppointment()
        }else if(value.eventName === 'Referral'){
            getEventAppointment()
        }else{
            setTimeout(()=>{
                setloading(false)
            },1000)
        }
      },[])

    const [loading,setloading] = useState(true)

  return (
    
    <>
            {loading ?
                <>
                    <div className='inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-50 ' >
                        <PacmanLoader speedMultiplier={2} color={'white'}/>
                    </div>
                </>:
                    
        <div className="absolute top-[8%] left-0 w-[100%] h-[1px] z-40 flex justify-center font-[poppins] min-w-[300px] ">
        {/*content*/}
                    <motion.div className="mx-auto border-0 rounded-lg shadow-lg fixed flex flex-col w-fit bg-[white] outline-none focus:outline-none"
                      variants={container}
                      initial="hidden"
                      animate="show"> 
            {/*header*/}
                            <div className="flex items-start justify-between py-2 border-b border-solid border-slate-200 rounded-t">
                                <h3  className=" text-[black] w-full m-auto flex flex-col items-center">
                                      <div className='text-[20px] break-words'>Event details </div>
                                </h3>
                            </div>
                        
            {/*body*/}
                        <div className="flex flex-col px-1 sm:px-4 z-40 font-[poppins] max-h-[350px] w-[315px] sm:w-full overflow-auto">

                        {value.eventName === 'Referral'? 
                                <>
                            <div className='flex flex-col sm:flex-row'>
                                <div className='w-[250px] mx-2 '>
                                    <div className='text-[13px] sm:text-[18px] font-bold'>Event name:</div>
                                    <div className='text-[13px] sm:text-[18px] shadow-inner w-full shadow-gray-500/50 border-[1px] py-1 border-gray-200 rounded-md px-4'>{value.eventName}</div>
                                </div>
                                <div className='w-[fit] mx-2 '>
                                    <div className='w-[250px] text-center'>
                                        <div className=' text-[13px] sm:text-[18px] font-bold text-center'>Time Scheduled:</div>
                                            <div className='text-[13px] sm:text-[18px] flex flex-wrap'>
                                                {JSON.parse(value.setTime).map((value,index)=> {
                                                    return <div key={index} className='px-3 py-2'>{value}</div>
                                                })}
                                            </div>
                                        </div>
                                </div>
                            </div>
                                                                
                                <div className='flex flex-col sm:flex-row'>
                                    <div className='w-[250px] mx-2 '>
                                        <div className='text-[13px] sm:text-[18px] font-bold'>Student Name:</div>
                                        <textarea readOnly value={eventDet && eventDet.nameOfStudent}
                                        className='text-[13px] sm:text-[18px] shadow-inner w-full h-[37px] shadow-gray-500/50 border-[1px] py-1 border-gray-200 rounded-md px-4'></textarea>
                                    </div>
                                    <div className='w-[250px] mx-2 '>
                                        <div className='text-[13px] sm:text-[18px] font-bold'>Teacher Name:</div>
                                        <textarea readOnly value={eventDet && eventDet.teacherName}
                                        className='text-[13px] sm:text-[18px] shadow-inner w-full h-[37px] shadow-gray-500/50 border-[1px] py-1 border-gray-200 rounded-md px-4'></textarea>
                                    </div>
                                </div>
                                <div className='flex flex-col sm:flex-row '>
                                    <div className='w-[250px] mx-2 '>
                                        <div className='text-[13px] sm:text-[18px] font-bold'>Parent Contact No:</div>
                                        <div className='text-[13px] sm:text-[18px] shadow-inner w-full shadow-gray-500/50 border-[1px] py-1 border-gray-200 rounded-md px-4'>
                                            {eventDet && eventDet.parentContactNum}
                                        </div>
                                    </div>
                                    <div className='w-[250px] mx-2 '>
                                        <div className='text-[13px] sm:text-[18px] font-bold'>Teacher Contact No:</div>
                                        <div className='text-[13px] sm:text-[18px] shadow-inner w-full shadow-gray-500/50 border-[1px] py-1 border-gray-200 rounded-md px-4'>
                                            {eventDet && eventDet.teacherContactNum}
                                        </div>
                                    </div>
                                </div>
                                               
                                <div className='flex flex-row '>
                                    <div className='w-[300px] pb-2 mx-1'>
                                        <div className='text-[13px] sm:text-[18px] font-bold '>Reason for Referral:</div>
                                        <textarea readOnly value={eventDet && eventDet.reasonforReferral}  className='text-[13px] sm:text-[18px] w-full  shadow-inner h-[150px] shadow-gray-500/50 border-[1px] py-1 border-gray-200 rounded-md px-4'></textarea>
                                    </div>
                                    <div className='w-[300px] mx-1 '>
                                        <div className='text-[13px] sm:text-[18px] font-bold'>Initial Action:</div>
                                        <textarea readOnly value={eventDet && eventDet.initialActions}  className='text-[13px] sm:text-[18px] w-full shadow-inner h-[150px] shadow-gray-500/50 border-[1px] py-1 border-gray-200 rounded-md px-4'></textarea>
                                    </div>
                                </div>  
                                </>
                                :
                                <>
                            <div className='flex flex-row py-1'>
                                <div className='w-[300px]  '>
                                    <div className='text-[13px] sm:text-[18px] font-bold'>Event name:</div>
                                    <div className='text-[13px] sm:text-[18px] shadow-inner w-full shadow-gray-500/50 border-[1px] py-1 border-gray-200 rounded-md px-4'>{value.eventName}</div>
                         {/* APPOINTMENT */}           
                                    {value.eventName === 'Appointment' ? <>
                                    <div className='text-[13px] sm:text-[18px] font-bold'>Name of student:</div>
                                    <textarea  readOnly value={eventDet && eventDet.studInfo && ( eventDet.studInfo.lastname + " " +  eventDet.studInfo.firstname)} 
                                        className='text-[13px] sm:text-[18px] h-[37px] shadow-inner w-full shadow-gray-500/50 border-[1px] py-1 border-gray-200 rounded-md px-4'>
                                    </textarea>
                                    </>:<>
    {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                    <div className='text-[13px] sm:text-[18px] font-bold'>Place:</div>
                                    <textarea readOnly value={value.place} className='text-[13px] sm:text-[18px] h-[40px] max-h-[65px] shadow-inner w-full shadow-gray-500/50 border-[1px] py-1 border-gray-200 rounded-md px-4'></textarea>
                                    </>}
                                </div>
                                <div className='w-[250px] flex flex-col justify-center items-center '>
                                    <div className='text-[13px] sm:text-[18px] font-bold text-center '>Time scheduled:</div>
                                    <div className='text-[12px] sm:text-[18px] flex flex-wrap'>    
                                        {JSON.parse(value.setTime).map((value,index)=> {
                                            return <div key={index} className='px-3 py-2'>{value}</div>
                                        })}
                                    </div>
                                </div>
                            </div>
                            
                            <div className='flex flex-col w-full py-1'>
                        {/* APPOINTMENT */}
                                {value.eventName === 'Appointment' ? 
                                <>
                                <div className='text-[13px] sm:text-[18px] font-bold'>Reason for appointment:</div>
                                <textarea readOnly value={eventDet && eventDet.studInfo && eventDet && eventDet.eventInfo.reason}
                                    className='text-[13px] sm:text-[18px] focus:outline-none shadow-inner h-[100px] max-h-[100px] shadow-gray-500/50 border-[1px] py-1 border-gray-200 rounded-md px-4'></textarea>
                                </>
                                :
                                <>
                                 <div className='text-[13px] sm:text-[18px] font-bold'>Description:</div>
                                <textarea readOnly value={value.description} className='text-[13px] sm:text-[18px] focus:outline-none shadow-inner h-[100px] max-h-[100px] shadow-gray-500/50 border-[1px] py-1 border-gray-200 rounded-md px-4'></textarea>
                                </>}
                                 </div>
                            </>}

                        </div>
            {/*footer*/}
                    <div className="flex items-center justify-between py-2 px-3 border-t border-solid border-slate-200 rounded-b">
                        <div>
                              <button
                                className="bg-red-400 hover:bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-1 sm:py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=> {
                                    close(false)
                                }}>
                                 Back
                            </button>
                       </div>
                    </div>
                </motion.div>
        </div>
        }
     <div onClick={()=> close(false)} className="opacity-75 fixed inset-0 z-30 bg-black "></div>

                                    
  
    </>
  )
}
