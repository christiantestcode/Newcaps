import React,{useEffect, useState} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'
import { motion } from "framer-motion"
import {RxCross2, RxValueNone} from 'react-icons/rx'
import Calendar from '../calendar';
import PacmanLoader from "react-spinners/PacmanLoader";
import { AnimatePresence } from 'framer-motion';


export default function Reply({close,value,date}){
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

    const [starSession,setstarSession] = useState('')
    const [attendedby,setattendedby] = useState('')

    const [checkList,setcheckList] = useState('')
    const [checkListV,setcheckListV] = useState(false)

    const [attendingGC,setattendingGC] = useState('')

    
      const SendSMS= (e) => {
        e.preventDefault()

        const apikey='eb7fb477f3228379cb3e2babe4e4b89f7c292e63'
        const message = 'Hello, Good day Teacher'+ ' ' + value.teacherName + '.This is to confirm that' + ' ' + value.nameOfStudent + ' had started his/her session  on ' +  starSession +' ' + 'and is being attended by'+' ' + attendedby +'\\n'+ 'STATUS : ' +' '+ checkList +' ' +'\\n'+'ATTENDING GUIDANCE COUNSELOR:' +' '+ attendingGC +'\\n \\n \\n NOTE: Do not reply on this message this is system generated. '

        Swal.fire({
            title: 'Double check your input?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Submit!!'
          }).then(async (result) => {
            if (result.isConfirmed) {
              try{
                const response= await fetch(`https://sms.teamssprogram.com/api/send?key=${apikey}&phone=${value.teacherContactNum}&sim=${2}&message=${message}&priority=${1}&device=${581}`)
              
                Swal.fire({
                    icon: 'success',
                    title: 'Reply Sent!',
                    text: 'Message sent Succesfully!!',
                  })
                  close(false)  
              }catch (err){
                  Swal.fire({
                    icon: 'error',
                    title: err.response.data
                  })
              }
            }
          })
      }

    const checllLIST = (e) =>{
        setcheckList(e)
        setcheckListV(false)
    }

    return(
        <>
    <div className="absolute h-[100vh] left-0 top-0 w-full z-10 flex justify-center items-center font-[poppins] min-w-[300px] ">
  
        <div className="opacity-75 fixed inset-0 z-10 bg-black "></div>
        <div onClick={(()=>close(false))} className='text-white absolute top-0 left-0 z-10 cursor-pointer'><RxCross2 size={40}/></div> 

        <motion.div className="z-20 relative "
            variants={container}
            initial="hidden"
            animate="show">     
                <form onSubmit={SendSMS} className='w-full sm:w-fit max-h-[640px] bg-white rounded-md h-[80vh]  overflow-auto sm:px-2'>
                                    
                            <div className="flex items-start justify-between border-b border-solid border-slate-200 rounded-t ">
                                                        <div  className="flex flex-row text-[black] text-[20px] py-2 w-full m-auto justify-center items-center">
                                                            Acknowledgement Form
                                                        </div>
                            </div>
                            <div>
                                   
                                <div className='px-2 w-full'>
                                    <div className='flex flex-col sm:flex-row w-full'>
                                        <div className='mb-2 text-[15px] w-full px-1' >
                                            <div>{'To:(Referring person/Unit)'}</div>
                                            <input type='text' readOnly value={value.teacherName} className='py-1 w-full mx-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                                                           
                                        </div> 
                                        <div className='mb-2 text-[15px] w-full px-1' >
                                            <div>Designation/Department</div>
                                            <input type='text' readOnly value={value.designation} className='py-1 w-full mx-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                                        </div>   
                                    </div>  
                                    <div className='flex flex-col sm:flex-row w-full'>
                                        <div className='mb-2 text-[15px] w-full px-1' >
                                            <div>This is to confirm that</div>
                                                <input type='text' readOnly value={value.nameOfStudent} className='py-1 w-full mx-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                                            </div>   
                                        <div className='mb-2 text-[15px] w-full px-1' >
                                            <div>whom you referred to us on</div>
                                                <input type='text' readOnly value={date} className='py-1 w-full mx-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                                            </div>
                                    </div> 
                                    <div className='flex flex-col sm:flex-row w-full'>
                                        <div className='mb-2 text-[15px] w-full px-1' >
                                            <div>had started his/her session on</div>
                                                <input type='text' required onChange={(e)=> setstarSession(e.target.value)} className='py-1 w-full mx-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                                        </div>
                                        <div className='mb-2 text-[15px] w-full px-1' >
                                            <div>and is being attended by</div>
                                            <input type='text' required onChange={(e)=> setattendedby(e.target.value)} className='py-1 w-full mx-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                                        </div>
                                    </div>

                                </div>

                                <div className='w-full border-t-2 border-solid border-black'>
                                                <div className='text-center text-[18px] py-1'>Refer to the Checklist below</div>
                                                <div className='w-full flex flex-row px-2'>
                                                    <div className=' w-1/2'>
                                                        <div className='flex flex-row text-[15px] py-2'>
                                                            <input type='radio' name='checklist' required value={'Close at intake Interview'} onChange={(e)=> checllLIST(e.target.value)} className='w-[15px]'></input>
                                                            <p className='mx-1'>Close at intake Interview</p>
                                                        </div>
                                                        <div className='flex flex-row text-[15px] py-2'>
                                                            <input type='radio' name='checklist' required value={'For Counseling'} onChange={(e)=> checllLIST(e.target.value)} className='w-[15px]'></input>
                                                            <p className='mx-1'>For Counseling</p>
                                                        </div>
                                                        <div className='flex flex-row text-[15px] py-2'>
                                                            <input type='radio' name='checklist' required value={'Counseling sessions are on-going'} onChange={(e)=> checllLIST(e.target.value)} className='w-[15px]'></input>
                                                            <p className='mx-1'>Counseling sessions are on-going</p>
                                                        </div>
                                                        <div className='flex flex-row text-[15px] py-2'>
                                                            <input type='radio' name='checklist' required value={'Parent/Guardian Conference conducted'} onChange={(e)=> checllLIST(e.target.value)} className='w-[15px]'></input>
                                                            <p className='mx-1'>Parent/Guardian Conference conducted</p>
                                                        </div>
                                                    </div>
                                                    <div className=' w-1/2'>
                                                        <div className='flex flex-row text-[15px] py-2'>
                                                            <input type='radio' name='checklist' required value={'Session-Complete/Terminated'} onChange={(e)=> checllLIST(e.target.value)} className='w-[15px]'></input>
                                                            <p className='mx-1'>Session-Complete/Terminated</p>
                                                        </div>
                                                        <div className='flex flex-row text-[15px] py-2'>
                                                            <input type='radio' name='checklist' required value={'Student did not show up'}  onChange={(e)=> checllLIST(e.target.value)} className='w-[15px]'></input>
                                                            <p className='mx-1'>Student did not show up</p>
                                                        </div>
                                                        <div className='flex flex-row text-[15px] py-2'>
                                                            <input type='radio' name='checklist' required value={'Under Monitoring'} onChange={(e)=> checllLIST(e.target.value)} className='w-[15px]'></input>
                                                            <p className='mx-1'>Under Monitoring</p>
                                                        </div>
                                                        <div className='flex flex-row text-[15px] py-2 '>
                                                            <input type='radio' name='checklist' required value={'Number of Follow-ups made by the Counselor'} onChange={(e)=> checllLIST(e.target.value)} className='w-[15px]'></input>
                                                            <p className='mx-1 w-[250px]'>Number of Follow-ups made by the Counselor</p>
                                                            <input type='text' required={checkList === 'Number of Follow-ups made by the Counselor'? true : false } disabled={checkList === 'Number of Follow-ups made by the Counselor'? false : true } onChange={(e)=> setcheckListV(e.target.value)} className='w-[40px] border-2 border-black px-2'></input>
                                                        </div>
                                                    </div>
                                                </div>
                                                    <div className='flex flex-row text-[18px] items-center py-2'>
                                                            <input type='radio' name='checklist' required value={'Referred to:'} onChange={(e)=> checllLIST(e.target.value)} className='w-[15px]'></input>
                                                            <p className='mx-1'>Referred to:</p>
                                                            <input type='text' required={checkList === 'Referred to:'? true : false } disabled={checkList === 'Referred to:'? false : true } onChange={(e)=> setcheckListV(e.target.value)} className='py-1 w-[350px] mx-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                            ></input>
                                                        </div>
                                                    <div className='flex flex-col text-[18px] items-center py-2'>
                                                            <p className=''>Attending Guidace Counselor:</p>
                                                            <input type='text' required onChange={(e)=> setattendingGC(e.target.value)} className='py-1 w-[280px]  shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                            ></input>
                                                    </div>

                                    </div>

                                    <div className=" sticky bottom-0 flex items-start justify-between border-t border-solid border-slate-200 rounded-t p-2">
                                                {value.status === 'done' ? '':<>
                                                
                                                        <input type='submit' value={'SEND'} className="flex flex-row bg-blue-500  hover:bg-blue-600 cursor-pointer text-white text-[15px] py-2 w-full m-auto justify-center items-center">
                                                         
                                                        </input></>}
                                    </div>
                            </div>
                            
                     
                 </form>
        </motion.div>
    </div>
        </>
    )
}