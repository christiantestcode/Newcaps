
import React,{useEffect, useState, useRef} from 'react'
import { motion } from "framer-motion"
import HelpExcel1 from './Picture/HelpExcel1.png'



export default function HelpExcel({close}) {


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
                                                    <div className='px-4 h-[400px] overflow-auto w-full sm:w-[550px]'>
                                                        <div className='px-3 font-bold'><span className='text-green-500 font-bold'>NOTE: </span>The excel file content must not have random text outside the content row and content 4 column:</div>
                                                         <img src={HelpExcel1} className='w-full sm:w-[550px] h-[450px] mb-3'/> 

                                                       

                                                    </div>
                                                </div>
                                    {/*footer*/}
                                            <div className="flex items-center justify-between p-2 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        className="border-gray-600 border-[2px] text-black active:bg-gray-600 hover:bg-gray-500 hover:text-white font-bold uppercase text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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

