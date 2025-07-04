import React,{useState,useEffect,useRef} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'
import { motion } from "framer-motion"
import FileDownload from 'js-file-download'
import { resolvePath } from 'react-router-dom';
import PacmanLoader from "react-spinners/PacmanLoader";
import HelpExcel from '../../HELP/HelpExcel';

export default function InsertExcel({close}) {
    const container = {
        hidden: { opacity: 0 , scale:0},
        show: {
          scale:[0.5,1],
          opacity: 1,
          transition: {
            duration:.5,
          }
        },
        exit: {
          scale:0,
          opacity: 0,
          transition: {
            duration:.5
          }
        }
      }
      
      
       const formData = new FormData()
       const [filee,setfilee]= useState('')

    const restore = async (e) =>{
        e.preventDefault()
              const myFiles = document.getElementById('myFiles').files
        
              Object.keys(myFiles).forEach(key => {
                formData.append(myFiles.item(key).name, myFiles.item(key))
            })
                  try{
                          const response = await fetch(`http://localhost:3500/uploadExcel`, {
                            method: 'POST',
                            body: formData
                        })

                  
                        if(response.status === 500)
                         return Swal.fire({
                          icon: 'error',
                          title: 'ERROR',
                          showConfirmButton: false,
                          timer: 1500
                        }) 
                         
                        setTimeout(()=>{
                          close(false)
                         Swal.fire({
                            icon: 'success',
                            title: 'Date successfully uploaded!!',
                            showConfirmButton: false,
                            timer: 1500
                          }) 
                        },500)
                  
                }catch (err){
                  
                          close(false)
                          Swal.fire({
                            icon: 'error',
                            title: 'ERROR',
                            showConfirmButton: false,
                            timer: 1500
                          }) 
                     
                 }

       }

       const[loading,setloading] = useState(false)

       const[help,sethelp] = useState(false)


  return (
    <>
     {
                loading &&
                <>
                <div className='inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-50 ' >
                <PacmanLoader speedMultiplier={2} color={'white'}/>
                </div>
                </>}
    {/* <div className="absolute top-[10%] left-0 w-[100%] h-[1px] z-50 flex justify-center font-[poppins] min-w-[300px] "> */}
    <div className="absolute h-[100vh] left-0 top-0 w-[100%] z-50 flex justify-center items-center font-[poppins] min-w-[300px] ">
    {/*content*/}
    <div onClick={()=> close(false)} className="opacity-75 fixed inset-0 z-40 bg-black "></div>
    
                
                <motion.div className="z-50 mx-aut max-h-[320px] h-[100vh]  overflow-auto border-0 rounded-lg shadow-lg fixed flex flex-col justify-between w-fit bg-[white] outline-none focus:outline-none"
                  variants={container}
                  initial="hidden"
                  animate="show"> 
        {/*header*/}  
                        <div className="flex items-start justify-between py-2 border-b border-solid border-slate-200 rounded-t">
                            <h3  className=" text-[black] w-full m-auto flex flex-col items-center text-[20px]">
                                Insert Excel
                            </h3>
                        </div>
        {/*body*/}
                    <div className="flex flex-col px-4 py-3 z-50 font-[poppins] max-w-[320px] ">

                        <form onSubmit={restore} className='py-6'>
                          <div className='font-bold'>For Students :</div>
                          <div className='py-2 text-center'>Choose " .xlsx File " or " excel File "</div>
                            <input type="file" id="myFiles" accept="*" className='w-[300px]' onChange={(e)=> setfilee(e.target.value)}/>
                            {filee && <button className='w-full px-4 py-1 rounded-md bg-green-500 hover:bg-green-600 text-white font-bold shadow-sm shadow-black my-1'>INSERT</button> }
                        </form>
                    </div>
        {/*footer*/}
                <div className="flex items-center justify-between px-2 py-2 border-t border-solid border-slate-200 rounded-b">
                        <button
                            className="border-gray-600 border-[2px] text-black active:bg-gray-600 hover:bg-gray-500 hover:text-white font-bold text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={()=> close(false)}>
                             close
                        </button>
                        <button
                            className="border-green-600 border-[2px] active:bg-green-600 bg-green-500 hover:bg-green-600 text-white font-bold tracking-wider text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={()=> sethelp(true)}>
                             Help?
                        </button>
                </div>
            </motion.div>
    </div>
    {help && <HelpExcel close={sethelp} /> } 


</>
  )
}
