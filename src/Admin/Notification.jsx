import React,{useEffect,useState} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'
import paper from './Picture/paper.svg'
import communication from './Picture/communication.svg'
import {HashLink as Link} from 'react-router-hash-link'
import PacmanLoader from "react-spinners/PacmanLoader";
import { CiRead } from "react-icons/ci";
import { Tooltip } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';


export default function Notification({close}) {

    const [notifications,setnotifications] = useState([])


    const getNtotification = async ()=>{
        try{
            const response= await Axios.get(`http://localhost:3500/notification/${'notif'}`)
            if(response.data === '404 Not Found') { 
                    console.log(' no notification')
            }
        
            setTimeout(()=>{
                setloading(false)
                setnotifications(response.data)
            },500)
            
          }catch (err){
            if (!err?.response) {
              console.log(err)
            }
          }
      }
      
      useEffect(()=>{
        getNtotification();
      },[])

      const setRead = async () =>{
        setloading(true)
            try{
                const response= await Axios.patch(`http://localhost:3500/notification`,{
                    type:'all'
                })
                if(response.data === '404 Not Found') { 
                        console.log(' no notification')
                }
                getNtotification()

              }catch (err){
                if (!err?.response) {
                  console.log(err)
                }
              }
    }

      
    const [loading,setloading] = useState(true)

  return (
    <>
            {loading &&
                <>
                <div className='inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-50 ' >
                <PacmanLoader speedMultiplier={2} color={'white'}/>
                </div>
                </>}
        <div className='w-[300px] h-[99vh] overflow-auto z-50'>
            <div onClick={()=> close(false)} className='bg-red-500 sticky sm:hidden top-0 text-center text-white font-bold'>
                <div className='flex items-center justify-center px-2 bg-[black] bg-opacity-20 h-full w-full mx-auto'>
                    Back
                </div>
            </div>
            <div className='bg-white sticky top-0 text-center'>Notifications</div>
            <div onClick={()=> setRead()} className='bg-[#068FFF] text-[white] sticky top-0 text-center cursor-pointer'>
                <div className='flex items-center justify-center px-2 bg-[black] bg-opacity-20 h-full w-full mx-auto'>
                    Mark all as read
                </div>
            </div>
            
            <div className='h-[90%]'>
                    {!(notifications[0]) && <div className='text-white px-2 text-[20px]'>No Notification</div>}
                    {notifications && notifications.map((value,index)=>{
                        return   <NotifList key={index} value={value} refresh={getNtotification} load={setloading}/>

                    })}
                
            </div>
        </div>
    </>
    
  )
}

function NotifList({value,refresh,load}){

    const [timeS,settimeS] = useState()
    const navigate = useNavigate()
        
    var initialTime = new Date(value.timeStamp);
    var finalTime = new Date();

    const timee=({
        years: finalTime.getFullYear() - initialTime.getFullYear(),
        month: finalTime.getMonth() - initialTime.getMonth(),
        days: finalTime.getDate() - initialTime.getDate(),
        hours: finalTime.getHours() - initialTime.getHours(),
        minutes: finalTime.getMinutes() - initialTime.getMinutes(),
        seconds: finalTime.getSeconds() - initialTime.getSeconds()
    })

    useEffect(()=>{
        settimeS(timee.years? timee.years + ' years/s ago':
                    timee.month? timee.month + ' month/s ago':
                        timee.days? timee.days + ' day/s ago':
                            timee.hours? timee.hours + ' hour/s ago':
                                timee.minutes?timee.minutes + ' minute/s ago':
                                    timee.seconds && timee.seconds  + ' second/s ago')
    },[])
    
    const setRead = async () =>{
        load(true)
            try{
                const response= await Axios.patch(`http://localhost:3500/notification`,{
                    id:value.id,
                    type:'once'
                })
                if(response.data === '404 Not Found') { 
                        console.log(' no notification')
                }
                    refresh()

              }catch (err){
                if (!err?.response) {
                  console.log(err)
                }
              }
    }


    return(
        <>

              {value.type === 'PIS'?
            <div onClick={()=> navigate('/nav/home/gc/studentPis')} className='flex flex-row bg-white my-2 w-full h-[100px]'>

                    <div className='flex items-center justify-center h-[100px] w-[20%] '>
                        <div className='bg-[#068FFF] h-full'>
                            <div className='flex items-center justify-center px-2 bg-[black] bg-opacity-20 h-full w-full mx-auto'>
                                <img src= {value.type === 'PIS'? paper : communication} alt='PIS' className='w-[60px] '/>
                            </div>
                        </div>
                    </div>

                    <div className=' flex flex-row hover:rounded-lg hover:text-black w-[80%] h-full'>
                        <div className='w-full flex flex-col justify-between p-2'> 
                            <div className='w-full px-2 text-[15px] text-[black] '>{value.message}</div>
                            <div className='flex flex-row justify-between px-2'>
                                <div onClick={()=> setRead()}>
                                    {value.status === 'unread' &&
                                        <Tooltip content="Mark as Read" placement="bottom" className='z-50 px-2 text-[10px] bg-blue-600 ' animate={{mount: { scale: 1.5, y: 10,  x:1 },unmount: { scale: 0, y: 0, x:0 }, }}>
                                            <div className='text-[blue] self-end px-2 underline rounded-md hover:text-[black] cursor-pointer'><CiRead size={20}/></div>
                                        </Tooltip>
                                    }
                                </div>
                                
                                <div className='text-[black] text-[13px] self-end'>{timeS && timeS}</div>
                            </div>
                        </div>
                    </div>

                </div>
                        :
                <div onClick={()=> navigate('/nav/home/gc/requests/normal')} className='flex flex-row bg-white my-2 w-full h-[100px]'>

                    <div className='flex items-center justify-center h-[100px] w-[20%] '>
                        <div className='bg-[#068FFF] h-full'>
                            <div className='flex items-center justify-center px-2 bg-[black] bg-opacity-20 h-full w-full mx-auto'>
                                <img src= {value.type === 'PIS'? paper : communication} alt='counseling' className='w-[60px] '/>
                            </div>
                        </div>
                    </div>

                    <div className=' flex flex-row hover:rounded-lg hover:text-black w-[80%] h-full'>
                        <div className='w-full flex flex-col justify-between p-2'> 
                            <div className='w-full px-2 text-[15px] text-[black]'>{value.message}</div>
                            <div className='flex flex-row justify-between px-2'>
                                <div onClick={()=> setRead()}>
                                    {value.status === 'unread' &&
                                        <Tooltip content="Mark as Read" placement="bottom" className='z-50 px-2 text-[10px] bg-blue-600 ' animate={{mount: { scale: 1.5, y: 10,  x:1 },unmount: { scale: 0, y: 0, x:0 }, }}>
                                            <div className='text-[blue] self-end px-2 underline rounded-md hover:text-[black] cursor-pointer'><CiRead size={20}/></div>
                                        </Tooltip>
                                    }
                                </div>
                                
                                <div className='text-[red] text-[13px] self-end'>{timeS && timeS}</div>
                            </div>
                        </div>
                    </div>

                </div>
            }    


        </>
    )
}
