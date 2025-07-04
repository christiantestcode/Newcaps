import React,{useEffect, useState} from 'react'
import { IoIosPaper } from "react-icons/io";
import { Tooltip, Button } from "@material-tailwind/react";
import Axios from 'axios';
import Swal from 'sweetalert2'
import { motion } from "framer-motion"
import {RxCross2} from 'react-icons/rx'
import Calendar from '../calendar';
import PacmanLoader from "react-spinners/PacmanLoader";
import { AnimatePresence } from 'framer-motion';


export default function Details({value,refresh,close,load}){
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

    const sugeested = value.response? true:false
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
      ];

    const date2 = new Date(value.dateRequested);
      let day2 = date2.getDate();
      let month2 = date2.getMonth();
      let year2 = date2.getFullYear();
    const dateRequested = monthNames[month2]+` ${day2} ${year2}`



    const todaydate2 = new Date(value.dateRequested);
    var dd2 = todaydate2.getDate();
    var mm2 = todaydate2.getMonth()+1; 
    var yyyy2 = todaydate2.getFullYear();
  
    if(dd2<10) {dd2='0'+dd2} 
    if(mm2<10) { mm2='0'+mm2} 
  

    const dateRequest = `${yyyy2}-${mm2}-${dd2}`


    const todaydate = new Date();
    var dd = todaydate.getDate();
    var mm = todaydate.getMonth()+1; 
    var yyyy = todaydate.getFullYear();

    if(dd<10) {dd='0'+dd} 
    if(mm<10) { mm='0'+mm} 

    const datetoday =  `${yyyy}-${mm}-${dd}`


            
        const resched = async () =>{  
            if(!(availability.includes(JSON.parse(value.timeRequested).toString())) || (dateRequested < datetoday))
            return  Swal.fire({
                icon: 'error',
                title: 'Unavailable!',
                text:'The date or time is unavailable',
                showConfirmButton: false,
                timer: 1500
              })
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
                load(true)
                try{
                    const response= await Axios.post(`http://localhost:3500/getEvents`,
                    {
                      content:value,
                      date:value.dateRequested,
                      request:'appointment'
                    })
                    setTimeout(()=>{
                        refresh('setSched')
                        close(false)
                    },500)
                    
                  }catch (err){
                    if (!err?.response) {
                      console.log(err)
                    }
                  }
            }
          })
        }   
    

        const [scheduleAppointment,setscheduleAppointment] = useState(false) 


        const [availability,setavailability] = useState('') 

        const getAvailableTime = async () =>{
            try{
                const response= await Axios.get(`http://localhost:3500/availableCal/${value.dateRequested}`)
        
                  const timeTochoosedb = ['9am-10am','10am-11am','2pm-3pm','3pm-4pm','4pm-5pm']
        
                  if(response.data[0]){
        
                    const dateUnava = response.data
                    
                    let text = [ ];
                    for (let i = 0; i < dateUnava.length; i++) {
                        text += dateUnava[i].setTime+ ','}
                  
                    //tira nalang
              
                    const filtereddb =  timeTochoosedb.filter((time)=> !text.includes(time))
                  
                    setavailability(filtereddb)
        
                  }else{
                    setavailability(timeTochoosedb)
                  }

                  setTimeout(()=>{
                    setloading(false)
                },500)
        
              }catch (err){
                  console.log(err)
              }
           }

           useEffect(()=>{
            getAvailableTime()

           },[])

      
            const [eventSet,setEvent] = useState()

            const dateS = new Date(eventSet && eventSet.setDate);
            let dayS = dateS.getDate();
            let monthS = dateS.getMonth();
            let yearS = dateS.getFullYear();
             const dateRequesteS = monthNames[monthS]+` ${dayS} ${yearS}`
      
 

            const getdateTimeset = async () =>{
                try{
                    const response= await Axios.get(`http://localhost:3500/getEventID/${value.eventID}`)
                      setEvent(response.data[0])
                  }catch (err){
                      console.log(err)
                  }
            }
            useEffect( ()=>{
                getdateTimeset()
            },[])
            const [loading,setloading] = useState(true)
    return(
        <>
                {
                loading &&
                <>
                <div className=' inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-25 ' >
                <PacmanLoader speedMultiplier={2} color={'white'}/>
                </div>
                </>}
        <div className="absolute h-[100vh] left-0 top-0 w-full z-10 flex justify-center items-center font-[poppins] min-w-[300px] ">
  
            <div onClick={(()=>close(false))} className="opacity-75 fixed inset-0 z-10 bg-black "></div>
            {/* <div className='text-white absolute top-0 left-0 z-10 cursor-pointer'><RxCross2 size={40}/></div>  */}

            <motion.div className="z-20 relative"
                variants={container}
                initial="hidden"
                animate="show">         
                <div className='w-[100%] max-h-[410px] mx-auto h-[60vh] bg-white rounded-md overflow-auto'>
                                    {/*header*/}
                                    <div className="flex items-start justify-between border-b border-solid border-slate-200 rounded-t ">
                                                        <div  className="flex flex-row text-[black] text-[21px] py-1 w-full m-auto justify-center items-center">
                                                            Appointment Details
                                                        </div>
                                                    </div>
                                    {/*body*/} 
                                                    <div className='px-2 text-[12px] sm:text-[16px] '>
                                                    <div className='w-full '>
                                                        <div>Student Name:</div>
                                                        <div className=' w-[280px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                                               {value.lastname +' '+ value.firstname +' ' +value.middlename}
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-col sm:flex-row'>
                                                        {value.status === 'pending'? 
                                                        <div className='w-1/2'>
                                                            <div>
                                                                <div>Date Requested:</div>
                                                                <div className=' w-[280px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                                                        {dateRequested}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div>Time Requested:</div>
                                                                <div className=' w-[280px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                                                        {(JSON.parse(value.timeRequested)).toString()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className='w-1/2'>
                                                            <div>
                                                                <div>Date Set:</div>
                                                                <div className=' w-[280px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                                                        {eventSet? dateRequesteS:dateRequested}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div>Time Set:</div>
                                                                <div className=' w-[280px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                                                        {eventSet? (JSON.parse( eventSet.setTime)).toString() :(JSON.parse(value.timeRequested)).toString()}
                                                                </div>
                                                            </div>
                                                        </div>}
                                                        <div className='w-1/2'>
                                                            <div>
                                                                <div>Grade Level:</div>
                                                                <div className=' w-[280px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                                                       {value.gradeLevel}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div>Status:</div>
                                                                <div className=' w-[280px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                                                   {value.status}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='h-full'>
                                                        <div>Reason:</div>
                                                        <textarea value={value.reason} readOnly className=' w-full h-[100px] my-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2 break-words'>
                                                         
                                                        </textarea>
                                                        {value.reschedTime && value.status === 'canceled' &&<>
                                                        <div>Response:</div>
                                                        <textarea value={value.response} readOnly className=' w-full h-[100px] my-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2 break-words'>
                                                         
                                                        </textarea></>}
                                                    </div>
                                                    {value.status === 'pending' &&
                                                    <div className="sticky bottom-0 w-full flex items-start justify-between border-t border-solid border-slate-200 rounded-t p-2">
                                                        
                                                        {sugeested ? <div className="text-center bg-green-500 hover:bg-green-600 w-full py-2 textS font-bold rounded-sm" >Waiting for student response on your suggested Date and Time</div>:
                                                        <>
                                                        <div onClick={()=> resched()}  className="flex flex-row bg-green-500 hover:bg-green-600 cursor-pointer text-[white] text-[15px] py-2 w-full m-auto justify-center items-center">
                                                            Accept
                                                        </div>       
                                                                
                                                        <div onClick={()=> setscheduleAppointment(true)}  className="flex flex-row bg-blue-500 hover:bg-blue-600 cursor-pointer text-[white] text-[15px] py-2 w-full m-auto justify-center items-center">
                                                            Suggest 
                                                        </div>
                                                        </>}
                                                    </div>}
                                                    
                                                </div>
                                    {/*footer*/}
                                    

                </div>
            </motion.div>
        </div>

                <AnimatePresence>        
                    {scheduleAppointment && <Calendar close={setscheduleAppointment} close2={close} value={value} type={'appointment'} refresh={refresh} load={load}/>}
                </AnimatePresence>

                    {/* <motion.div  className='z-50 absolute top-[-1000px] right-0 left-0 mx-auto h-[100vh] w-full  flex justify-center px-2 items-center bg-black bg-opacity-50'
                        transition={{
                            type: "spring",
                            stiffness: 25
                        }}
                        animate={{
                            y: scheduleAppointment? 1000:0}}
                            >
                             <div onClick={(()=>setscheduleAppointment(false))} className='text-red-500 absolute top-0 left-0 z-50 cursor-pointer'><RxCross2 size={40}/></div>    
                            {scheduleAppointment && <Calendar close={setscheduleAppointment} close2={close} value={value} type={'appointment'} refresh={refresh} load={load}/>}          
                    </motion.div> */}

                   
        </>
    )
}



