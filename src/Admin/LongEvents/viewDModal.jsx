import React,{useEffect, useState, useRef} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'
import { motion } from "framer-motion"
import PacmanLoader from "react-spinners/PacmanLoader";


export default function ViewLongEModal({close,value}) {
      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const DateName = (daate) =>{
      const date = new Date(daate);
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
      return `${monthNames[month]} ${day} ${year}`
    }
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
      const userRef = useRef()
      const [title,settitle] = useState(value.value.titleofEvent)
      const [description,setdescription] = useState(value.value.description)
     

    const [loading,setloading] = useState(true)
    const [edit,setedit] = useState(false)

   

    const save = () =>{
      setedit(false)
      Swal.fire({
        title: 'Are you sure?',
        text: "Double check your inputs !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Im sure!'
      }).then( async (result) => {
        if (result.isConfirmed) {
            try{
              const response= await Axios.patch(`http://localhost:3500/longEvents`,{
                id:value.value.ID,
                title:title,
                description:description,
              })
              if(response.data){
                close(false)
                Swal.fire({
                  icon: 'success',
                  title: 'Event details changed!',
                  showConfirmButton: false,
                  timer: 1500
                })
              }
      
            }catch (err){   
                console.log(err)
            }
        }
      else{
        settitle(value.value.titleofEvent)
        setdescription(value.value.setdescription)
      }})
    }

    const Delete = () =>{
      Swal.fire({
        title: 'Are you sure?',
        text: "You wont be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then( async (result) => {
        if (result.isConfirmed) {
            try{
              const response= await Axios.delete(`http://localhost:3500/longEvents/${value.value.ID}`)
              if(response.data){
                close(false)
                Swal.fire({
                  icon: 'success',
                  title: 'Event deleted!',
                  showConfirmButton: false,
                  timer: 1500
                })
              }
            }catch (err){   
                console.log(err)
            }
        }
      })
    }
    

  return (
    
    <>
                {/* {
                loading &&
                <>
                <div className='inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-50 ' >
                <PacmanLoader speedMultiplier={2} color={'white'}/>
                </div>
                </>} */}
    
    <div className="absolute top-[10%] left-0 w-[100%] h-[1px] z-40 flex justify-center font-[poppins] min-w-[300px] ">
        {/*content*/}
                    
                    <motion.div className="mx-auto border-0 rounded-lg shadow-lg fixed flex flex-col w-fit bg-[white] outline-none focus:outline-none"
                      variants={container}
                      initial="hidden"
                      animate="show"> 
            {/*header*/}  
                            <div className="flex items-start justify-between py-2 border-b border-solid border-slate-200 rounded-t">
                                <h3  className=" text-[black] w-full m-auto flex flex-col items-center text-[20px]">
                                          {DateName(value.info.start)} to {DateName(value.info.end)}
                                </h3>
                            </div>
            {/*body*/}
                        <div className="flex flex-col px-4 py-3 z-50 font-[poppins]">
                            <div className='flex flex-col md:flex-row'>

                                <div className='w-[530px] text-[20px] flex flex-col'>
                                    <label name='event' className='font-bold text-black text-[17px] '>Type of event :</label>
                                    <input type='text' readOnly={!edit} ref={userRef} onChange={(e)=> settitle(e.target.value)} value={title} className='px-2'></input>
                                </div>
                            </div>

                            <div className='font-bold text-black text-[15px] px-2'>Description:</div>
                            <textarea readOnly={!edit} onChange={(e)=> setdescription(e.target.value)} value={description} className='w-full  max-h-[150px] h-[140px] text-[18px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2 '></textarea>
                                      
                        </div>
            {/*footer*/}
                    <div className="flex items-center justify-between px-4 py-1 border-t border-solid border-slate-200 rounded-b">
                        <div>
                            <button
                                className="bg-red-400 hover:bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=> close(false)}>
                                 Close
                            </button>
                            <button
                                className="bg-red-400 hover:bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=> Delete()}>
                                 Delete
                            </button>
                        </div>  
                        {
                          edit? 
                          <>
                            <button
                                className="bg-green-400 hover:bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=> save(false)}>
                                 Save
                            </button>
                          </>
                          :
                          <>
                             <button
                                className="bg-green-400 hover:bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=> {
                                  setedit(true)
                                  userRef.current.focus()}}>
                                 Edit
                            </button>
                          </>
                        }
                         
                    </div>
                </motion.div>
        </div>
     <div onClick={()=> close(false)} className="opacity-75 fixed inset-0 z-30 bg-black "></div>
                                    
  
    </>
  )
}
