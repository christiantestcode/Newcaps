
import React,{useEffect, useState, useRef} from 'react'
import { motion } from "framer-motion"
import useStore from '../Store/store';
import useStorePIS from '../Store/storePIS';
import Axios from 'axios';
import Swal from 'sweetalert2'
import PacmanLoader from "react-spinners/PacmanLoader";
import First from './Picture/Calendar1.png'
import addEvent1 from './Picture/addEvent1.png'
import addEvent2 from './Picture/addEvent2.png'
import addEvent3 from './Picture/addEvent3.png'
import editEvent1 from './Picture/editEvent1.png'
import editEvent2 from './Picture/editEvent2.png'
import editEvent3 from './Picture/editEvent3.png'
import editEvent4 from './Picture/editEvent4.png'
import reschedEvent3 from './Picture/reschedEvent3.png'
import reschedEvent4 from './Picture/reschedEvent4.png'
import reschedEvent5 from './Picture/reschedEvent5.png'
import longEvent1 from './Picture/longEvent1.png'
import longEvent2 from './Picture/longEvent2.png'



export default function CalendarHelp({close}) {



    const container = {
        hidden: { opacity: 0 },
        show: {
          scale:[0.5,1],
          opacity: 1,
          transition: {
            delayChildren: 0.5,
            staggerDirection: -1
          }
        }
      }

      const [addEvent,setaddEvent] = useState(false)
      const [editEvent,seteditEvent] = useState(false)
      const [resEvent,setresEvent] = useState(false)
      const [addLongEvent,setaddLongEvent] = useState(false)

        const closeAll = ()=>{
            setaddEvent(false)
            seteditEvent(false)
            setresEvent(false)
            setaddLongEvent(false)
        }
        const Addevent =[
            {
            picture:addEvent1,
            name:'1'
            },
            {
            picture:addEvent2,
            name:'2'
            },
            {
            picture:addEvent3,
            name:'3'
            }
          ]

        const Editevent =[
            {
            picture:editEvent1,
            name:'1'
            },
            {
            picture:editEvent2,
            name:'2'
            },
            {
            picture:editEvent3,
            name:'3'
            }
            ,
            {
            picture:editEvent4,
            name:'4'
            }
          ]
        const Reschedevent =[
            {
            picture:editEvent1,
            name:'1'
            },
            {
            picture:editEvent2,
            name:'2'
            },
            {
            picture:reschedEvent3,
            name:'3'
            },
            {
            picture:reschedEvent4,
            name:'4'
            },
            {
            picture:reschedEvent5,
            name:'5'
            }
          ]
          const longEvent =[
            {
            picture:longEvent1,
            name:'1'
            },
            {
            picture:longEvent2,
            name:'2'
            }
          ]

  return (
    <>
            
          
            <div className="h-[100vh] absolute top-0 overflow-auto w-[100%] z-50 flex justify-center font-[poppins] min-w-[300px] ">
                                {/*content*/}
                                            <motion.div className="m-auto border-0 rounded-lg shadow-lg flex flex-col w-fit  bg-[white] outline-none focus:outline-none"
                                              variants={container}
                                              initial="hidden"
                                              animate="show"> 
                                    {/*header*/}
                                                    <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                                                        <h3  className=" text-[black] w-full m-auto flex flex-col items-center">
                                                              <div className='text-[25px] break-words'>GUIDE</div>
                                                        </h3>
                                                    </div>
                                    {/*body*/} 
                                                <div>
                                                    <div className=' h-[500px] overflow-auto'>

                                                         

                                                         <div className='relative p-2'>
                                                            {addEvent || editEvent || resEvent || addLongEvent ? 
                                                            <div>
                                                                {addEvent && 
                                                                <div>
                                                                     {Addevent && Addevent.map((value,index)=>{ 
                                                                        return <div key={index} className='relative p-2 '>
                                                                                <div className='text-white px-2  text-[20px] text-center rounded-md bg-blue-600 z-50 cursor-pointer shadow-md shadow-black'>Step #{value.name} </div>
                                                                                <img src={value.picture} className='w-full sm:w-[750px] border border-black h-[450px] mb-3'/> 
                                                                            </div>
                                                                        })}
                                                                </div>}
                                                                {editEvent && 
                                                                <div>
                                                                      {Editevent && Editevent.map((value,index)=>{ 
                                                                        return <div key={index} className='relative p-2'>
                                                                                <div className='text-white px-2 text-[20px] text-center rounded-md bg-blue-600 z-50 cursor-pointer shadow-md shadow-black'>Step #{value.name} </div>
                                                                                <img src={value.picture} className='w-full sm:w-[750px] border border-black h-[450px] mb-3'/> 
                                                                            </div>
                                                                        })}
                                                                </div>}
                                                                {resEvent && 
                                                                <div>
                                                                       {Reschedevent && Reschedevent.map((value,index)=>{ 
                                                                        return <div key={index} className='relative p-2'>
                                                                                <div className='text-white px-2 text-[20px] text-center rounded-md bg-blue-600 z-50 cursor-pointer shadow-md shadow-black'>Step #{value.name} </div>
                                                                                <img src={value.picture} className='w-full sm:w-[750px] border border-black h-[450px] mb-3'/> 
                                                                            </div>
                                                                        })}
                                                                </div>}
                                                                {addLongEvent &&
                                                                <div>
                                                                     {longEvent && longEvent.map((value,index)=>{ 
                                                                        return <div key={index} className='relative p-2'>
                                                                                <div className='text-white px-2 text-[20px] text-center rounded-md bg-blue-600 z-50 cursor-pointer shadow-md shadow-black'>Step #{value.name} </div>
                                                                                <img src={value.picture} className='w-full sm:w-[750px] border border-black h-[450px] mb-3'/> 
                                                                            </div>
                                                                        })}
                                                                </div>}
                                                                <div onClick={()=> closeAll()} className=' px-2 bg-green-400 hover:bg-green-500 cursor-pointer rounded-md text-center text-[20px] mx-auto font-bold my-2 shadow-sm shadow-black '>BACK</div>
                                                               
                                                            </div>:
                                                            <>
                                                            <div className='relative p-2'>
                                                                <div className='text-white px-2 text-[20px] text-center rounded-md bg-blue-600 z-50 cursor-pointer shadow-md shadow-black'>Calendar display</div>
                                                                <img src={First} className='w-full sm:w-[750px] h-[450px] mb-3'/> 
                                                            </div>
                                                                <div className='text-white px-2 text-[20px] text-center rounded-md bg-blue-600 z-50 cursor-pointer shadow-sm shadow-black'>Tutorial</div>
                                                                <div onClick={()=> setaddEvent(true)} className='px-2 bg-green-400 hover:bg-green-500 cursor-pointer rounded-md w-fit mx-auto font-bold my-2 shadow-md shadow-black '>HOW TO ADD SHORT EVENT ?</div>
                                                                <div onClick={()=> seteditEvent(true)} className='px-2 bg-green-400 hover:bg-green-500 cursor-pointer rounded-md w-fit mx-auto font-bold my-2 shadow-md shadow-black '>HOW TO EDIT SHORT EVENT ?</div>
                                                                <div onClick={()=> setresEvent(true)} className='px-2 bg-green-400 hover:bg-green-500 cursor-pointer rounded-md w-fit mx-auto font-bold my-2 shadow-md shadow-black '>HOW TO RESCHEDULE SHORT EVENT ?</div>
                                                                <div onClick={()=> setaddLongEvent(true)} className='px-2 bg-green-400 hover:bg-green-500 cursor-pointer rounded-md w-fit mx-auto font-bold my-2 shadow-md shadow-black '>HOW TO ADD LONG EVENT ?</div>
                                                            </>}
                                                            </div>
                                                         
                                                    </div>
                                                </div>
                                    {/*footer*/}
                                            <div className="flex items-center justify-between p-2 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        className="text-white-500 hover:rounded-md hover:bg-red-500 background-transparent text-black font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={()=>close(false)}
                                                    >
                                                        close
                                                    </button>
                                            </div>
                                        </motion.div>
                                </div>
                          <div onClick={()=>close(false)}  className="opacity-25 fixed inset-0 z-40 bg-black "></div>
                   
                        
    </>
  )
}

