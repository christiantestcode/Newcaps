
import React,{useEffect, useState} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'
import { motion } from "framer-motion"
import PacmanLoader from "react-spinners/PacmanLoader";



export default function SetTimeAppointment({close,close1,closse2,value,back,eventInfo,type,refresh,load,reason}) {

  let reqID = (Math.random() + 10).toString(12).substring(2);
  // if(reason){
    // eventInfo['requestID'] = reqID;
  // }
console.log(eventInfo)
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
      const date = new Date(value.dateStr);
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
    
      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ];
   console.log(value.dateStr)
 

   const [choseeAvailableTime,setchoseeAvailableTime]= useState()

   const [noAvailableTime,setnoAvailableTime]= useState(true)

   const getAvailableTime = async () =>{
    try{
        const response= await Axios.get(`http://localhost:3500/availableCal/${value.dateStr}`)

          const timeTochoosedb = ['9am-10am','10am-11am','2pm-3pm','3pm-4pm','4pm-5pm']

          if(response.data[0]){

            const dateUnava = response.data
            
            let text = [ ];
            for (let i = 0; i < dateUnava.length; i++) {
                text += dateUnava[i].setTime+ ','}
          
            //tira nalang
      
            const filtereddb =  timeTochoosedb.filter((time)=> !text.includes(time))
            setnoAvailableTime(filtereddb[0])
            setchoseeAvailableTime(filtereddb)

          }else{
            setchoseeAvailableTime(timeTochoosedb)
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

   



   const [availTime,setavailTime] = useState([])
   const [message,setMessage] = useState(reason?"------------------------" : 'Unfortunately the date you request is unavailable')


  //  function timeSelect(event){
  //   const {value, checked} = event.target

  //   if(checked) {
  //     setavailTime(pre => [...pre,value])
    
  //   }else{
  //     setavailTime(pre => {
  //       return [...pre.filter(time => time !== value)]
  //         })
  //       }
  //   }
  const toDB={
    requestID:reqID,
    dateRequested:value.dateStr,
    timeRequested:availTime,
    reason:eventInfo.reason,
    status:'pending',
    dateOfRequest:eventInfo.dateOfRequest,
    response:message
}

  function timeSelect(event){
    setavailTime([event.target.value])
   }

    const resched = async () =>{  
      if(!(availTime[0]) || !(message))
      return Swal.fire({
         icon: 'warning',
         title: 'Empty input!',
         showConfirmButton: false,
         timer: 1500
       })

      Swal.fire({
        title: 'Are you sure?',
        text: "Double check your input!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Im sure!'
      }).then( async (result) => {
        
        if (result.isConfirmed) {
          load(true)

          if(reason){
            try{
              const response= await Axios.post(`http://localhost:3600/appointment`,
              {
                content:toDB,
                lrn:eventInfo.LRN
              })
                  if(!response) { 
                          console.log('server Error')
                  }
                                Swal.fire({
                                  icon: 'success',
                                  title: 'Record saved!',
                                  showConfirmButton: false,
                                  timer: 2000
                                })
                  close1(false)
                  closse2(false)
                  close(false)
                  load(false)
              
              }catch (err){
                if (!err?.response) {
                  console.log(err)
                }
              }
            }else{

              try{
                const response= await Axios.patch(`http://localhost:3500/appointment`,
                {
                  content:{event:eventInfo,time:availTime},
                  date:value.dateStr,
                  request:'suggest',
                  message:message
                })
                    setTimeout(()=>{
                        close1(false)
                        closse2(false)
                        back(false)
                        refresh('setSched')
                    },500)
            
              }catch (err){
                if (err?.response) {
                  console.log(err.message)
                }
              }

            }

         
        }
      })
    }   

    const [loading,setloading] = useState(true)

  return (
    <>
     {
                loading?
                <>
                <div className=' inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-25 ' >
                <PacmanLoader speedMultiplier={2} color={'white'}/>
                </div>
                </>
                :
                <>
                
        <div className="absolute top-[15%] left-0 w-[100%] h-[1px] z-40 flex justify-center font-[poppins] min-w-[300px] ">
        {/*content*/}
                    <motion.div className="mx-auto border-0 rounded-lg shadow-lg fixed flex flex-col w-fit bg-[white] outline-none focus:outline-none"
                      variants={container}
                      initial="hidden"
                      animate="show"> 
            {/*header*/}
            
                            <div className="flex items-start justify-between border-b border-solid border-slate-200 rounded-t">
                                <h3  className=" text-[black] w-full m-auto flex flex-col items-center">
                                      <div className='text-[20px] break-words'>{monthNames[month]+` ${day} ${year}`}</div>
                                </h3>
                            </div>
                           
            {/*body*/}
                        <div className="flex flex-col md:flex-row py-4 px-3 z-50 font-[poppins] h-fit overflow-x-hidden">
                              {noAvailableTime? <>
                                    <div className='w-[350px]'>
                                        <div className='font-bold text-black text-[22px] text-center'>Available Time:</div>  
                                        <div className='flex flex-col flex-wrap h-[120px]'>
                                        {choseeAvailableTime && choseeAvailableTime.map((value,index)=>{
                                    return  <div key={index} className='w-fit flex flex-row items-center justify-center py-2'>
                                                <input type='radio' name='time' onChange={timeSelect} value={value} className='w-[20px] h-[20px] mx-2'/>
                                                <span className='w-[90px]'>{value}</span>
                                            </div>  
                                        } )}
                                        </div>  
                                    </div>
                                    <div className='w-[350px]'>
                                        <div className='font-bold text-black text-[15px] text-center'>Response / Message:</div>  
                                        <textarea onChange={(e)=> setMessage(e.target.value)} value={message} className='w-full text-[18px] shadow-inner h-[150px] max-h-[150px] shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></textarea>
                                    </div>    
                                    </> :<>
                                    <div className='px-4 py-2 text-center text-[30px]' >
                                        No more available time
                                    </div>
                                    </>}
                         

                        </div>
            {/*footer*/}
                    <div className="flex items-center justify-between py-2 px-3 border-t border-solid border-slate-200 rounded-b">
                      
                              <button
                                className="hover:bg-gray-500 border-[2px]  border-gray-600 hover:text-white text-gray-600 active:bg-emerald-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=>{
                                    close(false)
                                    back(true)
                                } }>
                                 Back
                            </button>
                            {noAvailableTime && 
                            <button
                                className="bg-green-500 border-green-600 border-[2px] hover:bg-green-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=> resched()}>
                                 Set event
                            </button>}
                            
                      
                    </div>
                </motion.div>
        </div>
        </>}
     <div onClick={()=> close(false)} className="opacity-0 fixed inset-0 z-30 bg-black "></div>
  
                                
    </>
  )
}
