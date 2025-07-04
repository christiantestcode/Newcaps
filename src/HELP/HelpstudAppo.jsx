
import React,{useEffect, useState, useRef} from 'react'
import { motion } from "framer-motion"
import useStore from '../Store/store';
import useStorePIS from '../Store/storePIS';
import Axios from 'axios';
import Swal from 'sweetalert2'
import PacmanLoader from "react-spinners/PacmanLoader";
import First from './Picture/first.png'
import Second from './Picture/second.png'



export default function HelpstudAppointment({close}) {



  

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

      const picture =[
        {
        picture:First,
        name:'1'
        },
        {
          picture:Second,
          name:'2'
        },
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
                                                              <div className='text-[25px] break-words'>Appointment Guide</div>
                                                        </h3>
                                                    </div>
                                    {/*body*/} 
                                                <div>
                                                    <div className='border border-black h-[400px] overflow-auto'>
                                                      {picture && picture.map((value,index)=>{ 
                                                        return <div key={index} className='relative p-2'>
                                                                  <div className='text-white px-2 text-[20px] text-center rounded-md bg-blue-600 z-50 cursor-pointer shadow-md shadow-black'>Guide #{value.name} </div>
                                                                  <img src={value.picture} className='w-full sm:w-[750px] h-[450px] mb-3'/> 
                                                              </div>
                                                        })}
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

