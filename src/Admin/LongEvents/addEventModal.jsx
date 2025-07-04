import React,{useEffect, useState} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'
import { motion } from "framer-motion"
import PacmanLoader from "react-spinners/PacmanLoader";

export default function AddLongEventModal({close,value,refresh}) {
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

  const [typeOfevent,settypeOfevent] = useState('')
  const str2 = typeOfevent.charAt(0).toUpperCase() + typeOfevent.slice(1);

  const [others,setothers] = useState('')
   
  const [description,setdescription] = useState('')


    function eventType(e){
        if(e === 'others'){
          setothers(true)
        }else{
          settypeOfevent(e)
          setothers(false)
        }
    }


    const submit = () =>{
      Swal.fire({
        title: 'Are you sure?',
        text: "Double check your inputs!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Im sure!'
      }).then( async (result) => {
        if (result.isConfirmed) {
            try{
              const response= await Axios.post(`http://localhost:3500/longEvents`,{
                typeOfevent:str2,
                description:description,
                start:value.startStr,
                end:value.endStr,
              })
              if(response.data){
                refresh()
                close(false)
                Swal.fire({
                  icon: 'success',
                  title: 'Event Saved!',
                  showConfirmButton: false,
                  timer: 1500
                })
              }
      
            }catch (err){   
                console.log(err)
            }
        }})
    }
   
    const [noMoreAvailTime,setnoMoreAvailTime]= useState(true)
    const [choseeAvailableTime,setchoseeAvailableTime]= useState()

  

    const [loading,setloading] = useState(true)
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
                                <h3  className=" text-[black] w-full m-auto flex flex-col items-center">
                                          {DateName(value.start)} to {DateName(value.end)}
                                </h3>
                            </div>
            {/*body*/}
                        <div className="flex flex-col px-4 py-3 z-50 font-[poppins]">
                            <div className='flex flex-col md:flex-row'>

                                <div className='w-[530px] text-[20px] flex flex-col'>
                                    <label name='event' className='font-bold text-black text-[17px] '>Type of event :</label>
                                    <select name="event" id="event" onChange={(e)=> eventType(e.target.value)} className='text-[18px] focus:outline-none w-fit shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                        <option value="">----</option>
                                        <option value="meeting">Meeting</option>
                                        <option value="seminar">Seminar</option>
                                        <option value="others">Others</option>
                                    </select>
                                    {others && <>
                                    <div className='font-bold text-black text-[15px]'>Name of event:</div>
                                    <input type='text' onChange={(e)=> settypeOfevent(e.target.value)} className='w-full min-h-[35px] max-h-[65px] text-[18px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                                     </>}
                                </div>
                            </div>

                            <div className='font-bold text-black text-[15px] px-2'>Description:</div>
                            <textarea onChange={(e)=> setdescription(e.target.value)} value={description} className='w-full min-h-[140px] text-[18px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2 '></textarea>
                                      
                        </div>
            {/*footer*/}
                    <div className="flex items-center justify-between px-4 py-1 border-t border-solid border-slate-200 rounded-b">
                        {noMoreAvailTime? <>     
                              <button
                                className="bg-red-400 hover:bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=> close(false)}>
                                 Close
                            </button>
                            <button
                                className="bg-green-400 hover:bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=> submit()}>
                                 Save
                            </button>
                          </>
                          :<>
                            <button
                                className="bg-green-400 hover:bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=> close()}>
                                 Back
                            </button>
                          </>}
                    </div>
                </motion.div>
        </div>
     <div onClick={()=> close(false)} className="opacity-75 fixed inset-0 z-30 bg-black "></div>
  
    </>
  )
}
