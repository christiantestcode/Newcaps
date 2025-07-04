import React,{useEffect, useState} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'
import { motion } from "framer-motion"
import Calendar from '../calendar';
import PacmanLoader from "react-spinners/PacmanLoader";
import { AnimatePresence } from 'framer-motion';


export default function Details({value,refresh,load,close}){

    const container = {
        hidden: { opacity: 0 , scale:0},
        show: {
          scale:[0.5,1],
          opacity: 1,
          transition: {
                duration:.5,
                delayChildren: 0.5,
                staggerDirection: -1
          }
        },
        exit: {
          scale:0,
          opacity: 0,
          transition: {
                duration:.5,
                delayChildren: 0.5,
                staggerDirection: -1
          }
        }
      }

    const [scheduleReferral,setscheduleReferral] = useState(false)      
    const getEventAppointment = async () =>{
        try{
          const response= await Axios.get(`http://localhost:3500/eventDcalendar/${value.eventID}/${'Referral'}`)
          settimeANDdate(response.data)
                setTimeout(()=>{
                    setloading(false)
                },500)
          
        }catch (err){   
            console.log(err)
          
        }
    }

    useEffect(()=>{
                if(value.eventID){
                 getEventAppointment()
                }
                setTimeout(()=>{
                    setloading(false)
                },500)
    },[])

    const [timeANDdate,settimeANDdate] = useState('')

    const monthNames = ["January", "February", "March", "April", "May", "June" , "July", "August", "September", "October", "November", "December"];

    const date = new Date(timeANDdate && timeANDdate.setDate);
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

    const dateRequested = monthNames[month]+` ${day} ${year}`

    const [loading,setloading] = useState(true)

    return(
        <>
                {loading ?
                <>
                    <div className=' inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-50 ' >
                        <PacmanLoader speedMultiplier={2} color={'white'}/>
                    </div>
                </>
                :<>
                <div className="absolute h-[100vh] left-0 top-0 w-full z-10 flex justify-center items-center font-[poppins] min-w-[300px] ">
  
                    <div onClick={(()=>close(false))} className="opacity-25 fixed inset-0 z-10 bg-black "></div>
                        {/* <div className='text-white absolute top-0 left-0 z-10 cursor-pointer'><RxCross2 size={40}/></div>  */}

                    <motion.div className="z-20 relative"
                        variants={container}
                        initial="hidden"
                        animate="show"> 
                            <div className='w-[100%] max-h-[600px] mx-auto bg-white h-[60vh] rounded-md overflow-auto'>
                                    {/*header*/}
                                    <div className="flex items-start justify-between border-b border-solid border-slate-200 rounded-t ">
                                        <div className="flex flex-row text-[black] text-[23px] p-1 w-fit m-auto justify-center items-center">
                                            Referral Details
                                        </div>
                                    </div>

                                    {/*body*/} 
                                    <div className='px-2 text-[12px] sm:text-[16px]'>
                                        <div className='flex flex-col md:flex-row justify-start items-center gap-[10px]'>   
                                                {value.status === 'pending'? <>
                                                    <div className='mb-2 ' >
                                                        <div>Employee ID:</div>
                                                        <div className=' w-[300px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>{value.employeeID? value.employeeID: 'NO INPUT'}</div>
                                                    </div>  

                                                    <div className='mb-2 ' >
                                                        <div>Referred by:</div>
                                                        <div className=' w-[300px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>{value.teacherName}</div>
                                                    </div></>
                                                    :
                                                    <>
                                                     <div className='mb-2' >
                                                        <div>Date Scheduled:</div>
                                                        <div className=' w-[300px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>{dateRequested}</div>
                                                    </div>  

                                                    <div className='mb-2 ' >
                                                        <div>Time Scheduled:</div>
                                                        <div className=' w-[300px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>{timeANDdate && JSON.parse(timeANDdate.setTime)}</div>
                                                    </div>
                                                </>}  
                                        </div>
                                        <div className='flex flex-col md:flex-row justify-start items-center gap-[10px]'>   
                                                <div className='mb-2 ' >
                                                    <div>Contact No:</div>
                                                    <div className=' w-[300px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>{value.teacherContactNum}</div>
                                                 </div>  
                                                <div className='mb-2 ' >
                                                    <div>Designation:</div>
                                                    <div className=' w-[300px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>{value.designation}</div>
                                                </div>
                                        </div> 
                                        <div className='flex flex-col md:flex-row justify-start items-center  gap-[10px]'>   
                                                
                                                <div className='  flex flex-col' >
                                                    <div>Name of Student:</div>
                                                    <div className=' w-[300px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>{value.nameOfStudent}</div>
                                                </div>  

                                                <div className='flex flex-col justify-center items-center mx-2 '>
                                                    <label className=''>Grade Level</label>
                                                    <div className=' w-[60px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>{value.gradeLevel}</div>
                                                </div>

                                                <div className='flex flex-col justify-center items-center mx-2 '>
                                                    <label className=''>Gender</label>
                                                    <div className=' w-[80px]  py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>{value.gender}</div>
                                                </div>   
                                        </div> 
                                        <div className='flex flex-col md:flex-row justify-start items-center gap-[10px]'>   
                                                <div className='mb-2 ' >
                                                    <div>Parent/Guardian Name:</div>
                                                    <div className=' w-[300px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>{value.parentName? value.parentName: 'NO INPUT'}</div>
                                                </div>  
                                                <div className='mb-2 ' >
                                                    <div>Parent/Guardian Contact No:</div>
                                                    <div className=' w-[300px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>{value.parentContactNum}</div>
                                                </div>  
                                               
                                         </div>
                                        <div className=' md:flex-row flex flex-col justify-center items-center '>   
                                                     
                                                <div className='mb-2 mx-2 flex flex-row'>
                                                    <p className='break-words w-[200px]'>Did the student agree to be referred to GCO ? </p>
                                                    <div><input type='radio'  className='w-[20px] h-[20px]'
                                                                name="referred"
                                                                readOnly
                                                                checked={'yes'===value.agreeToCounsel}
                                                                /> <span>Yes</span> </div>
                                                <div><input type='radio' className='w-[20px] h-[20px]'
                                                                name="referred"
                                                                readOnly
                                                                checked={'no'===value.agreeToCounsel}
                                                        /> <span>No</span> </div>
                                                </div>  
                                                     
                                        </div>   
                                        <div className='flex flex-col md:flex-row gap-[10px]'>  
                                            <div className='mb-2 ' >
                                                <div>Reason for Referral:</div>
                                                <textarea type='text' readOnly value={value.reasonforReferral} className='w-full sm:w-[300px] h-[150px] max-h-[200px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                ></textarea>
                                            </div>  
                                            <div className='mb-2 '>
                                                <div>Initial Actions Taken:</div>
                                                <textarea type='text' readOnly value={value.initialActions} className='w-full sm:w-[300px] h-[150px] max-h-[200px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                ></textarea>
                                            </div>  
                                        </div>   
                                            {value.status === 'pending' &&
                                            <div className="flex sticky w-full bottom-0 items-start justify-between border-t border-solid bg-white border-white rounded-t py-2">
                                                <div onClick={()=> setscheduleReferral(true)} className="flex flex-row bg-green-500 hover:bg-green-600 cursor-pointer text-[white]  border-white text-[15px] py-2 w-full m-auto justify-center items-center">
                                                    Set Date
                                                </div>
                                            </div>}
                                    </div>
                            </div>
                    </motion.div>
                </div>
                </>}

                <AnimatePresence>        
                    {scheduleReferral && <Calendar close={setscheduleReferral} value={value} type={'referral'} refresh={refresh} load={load} clos2={close} />}
                </AnimatePresence>

                      {/* <motion.div  className='z-50 absolute top-[-1000px] right-0 left-0 mx-auto h-[100vh] w-full  flex justify-center px-2 items-center bg-black bg-opacity-50'
                        transition={{
                            type: "spring",
                            stiffness: 25
                        }}
                        animate={{
                            y: scheduleReferral? 1000:0}}
                            >
                             <div onClick={(()=>setscheduleReferral(false))} className='text-red-500 absolute top-0 left-0 z-50 cursor-pointer'><RxCross2 size={40}/></div>    
                            {scheduleReferral && <Calendar close={setscheduleReferral} value={value} type={'referral'} refresh={refresh} load={load} clos2={close}/>}         
            
                        </motion.div> */}

        </>
    )
}