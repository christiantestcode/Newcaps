
import React,{useEffect, useState} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'
import { motion } from "framer-motion"
import PacmanLoader from "react-spinners/PacmanLoader";

export default function SetTime({close,value,back,eventInfo,type,refresh,load,clos2}) {
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
  //  console.log(value)
  //  console.log(eventInfo)

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
  function timeSelect(event){
    setavailTime([event.target.value])
   }
   
    const resched = async () =>{  
      
      if(!(availTime[0]))
         return Swal.fire({
            icon: 'warning',
            title: 'Please choose a time!',
            showConfirmButton: false,
            timer: 1500
          })
      
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
          load(true)
            try{
                const response= await Axios.post(`http://localhost:3500/getEvents`,
                {
                  content:{event:eventInfo,time:availTime},
                  date:value.dateStr,
                  request:type
                })
            
                setTimeout(()=>{
                  clos2(false)
                    close(false)
                    back(false)
                    refresh('setSched')
                },500)
               
                
                
              }catch (err){
                if (!err?.response) {
                  console.log(err)
                }
              }
        }
      })
    }   

    const [loading,setloading] = useState(true)

  return (
    <>
                {
                loading ?
                <>
                <div className=' inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-50
                
                ' >
                <PacmanLoader speedMultiplier={2} color={'white'}/>
                </div>
                </>
                :<>
                <div className=' inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-10
                
                ' ></div>
        <div className="absolute top-[15%] left-0 w-[100%] h-[1px] z-50 flex justify-center font-[poppins] min-w-[300px] ">
        {/*content*/}
                    <motion.div className="mx-auto border-0 rounded-lg shadow-lg fixed flex flex-col w-fit bg-[white] outline-none focus:outline-none"
                      variants={container}
                      initial="hidden"
                      animate="show"> 
            {/*header*/}
                            <div className="flex items-start justify-between border-b border-solid border-slate-200 rounded-t">
                                <h3  className=" text-[black] w-full m-auto flex flex-col items-center py-2">
                                      <div className='text-[20px] break-words'>{monthNames[month]+` ${day} ${year}`}</div>
                                </h3>
                            </div>
                           
            {/*body*/}
                        <div className="flex flex-col py-4 px-3 z-50 font-[poppins] w-[280px] overflow-x-hidden">
                              {noAvailableTime? <>
                                    <div className='font-bold text-black text-[25px] text-center'>Available Time:</div>  
                                    <div className='flex flex-col flex-wrap h-[120px]'>
                                    {choseeAvailableTime && choseeAvailableTime.map((value,index)=>{
                                   return  <div key={index} className='w-fit flex flex-row items-center justify-center py-2'>
                                            <input type='radio' name='time' onChange={timeSelect} value={value} className='w-[20px] h-[20px] mx-2'/>
                                            <span className='w-[90px]'>{value}</span>
                                        </div>  
                                    } )}
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
                                className="bg-green-500 border-[2px] border-green-600 hover:bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=> resched()}>
                                 Set event
                            </button>}
                            
                      
                    </div>
                </motion.div>
        </div>
        </>}
        

     <div onClick={()=> close(false)} className="opacity-0 fixed inset-0 z-40 bg-black "></div>
  
                                
    </>
  )
}
