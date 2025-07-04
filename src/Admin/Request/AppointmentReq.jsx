
import React,{useEffect, useState} from 'react'
import { IoIosPaper } from "react-icons/io";
import { Tooltip, Button } from "@material-tailwind/react";
import Axios from 'axios';
import Swal from 'sweetalert2'
import { motion } from "framer-motion"
import {RxCross2} from 'react-icons/rx'
import Calendar from './calendar';
import PacmanLoader from "react-spinners/PacmanLoader";
import Details from './AppointmentComp/AppDetails';
import { AnimatePresence } from 'framer-motion';
import { BiSkipNext , BiSolidRightArrow } from "react-icons/bi";
import { MdOutlineManageSearch } from 'react-icons/md'


export default function AppointmentReq({close}) {

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

    const [appointmentlist,setappointmentlist] = useState([])
    const [tofilter,settofilter] = useState()

    const [showname,setshowname] = useState(false)

        const getAppointmentReqs = async (ress) =>{
            try{
                const response= await Axios.get(`http://localhost:3500/gcAppointment`)
                    // console.log(response.data)
                   
                    setTimeout(()=>{
                        settofilter(response.data)
                        setappointmentlist(response.data.filter((list)=> (list.status.toLowerCase()).includes('pending')))
                        setloading(false)
                        if(ress === 'setSched'){
                            Swal.fire({
                                icon: 'success',
                                title: 'Event scheduled!',
                                showConfirmButton: false,
                                timer: 1500
                              })
                             
                        }
                    },500) 
              }catch (err){ 
                  console.log(err)
              }
        }
        useEffect(()=>{
            getAppointmentReqs()
        },[])


        const details = (value) =>{
            setappointmentdetails(value)
            setshowappointmentdetails(true)
        }
        const [showappointmentdetails,setshowappointmentdetails] = useState(false)
        const [appointmentdetails,setappointmentdetails] = useState('')

        const [tofilterStatus,settofilterStatus]= useState('pending') 

        const [tofilterSearch,settofilterSearch]= useState('') 
        

        const filterStatus = (e)=>{
            settofilterStatus(e)
            setappointmentlist(tofilter.filter((list)=> (list.status.toLowerCase()).includes(e)))
            settofilterSearch('')
      }

      
      const filterstud = (e)=>{
        settofilterSearch(e)
        if(e) return setappointmentlist(tofilter.filter((referral)=> (referral.status.includes(tofilterStatus)) )
                    .filter((referral)=>(referral.lastname.toLowerCase() + referral.firstname.toLowerCase() + referral.middlename.toLowerCase()).includes(e)))
        
                    setappointmentlist(tofilter.filter((referral)=> (referral.status.includes(tofilterStatus)) ))
      }

      const [loading,setloading] = useState(true)

      const [replyDetails,setreplyDetails] = useState(false)
    const [dateReq,setdateReq] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 9
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    const records = appointmentlist && appointmentlist.slice(firstIndex,lastIndex);
    const npage = Math.ceil(appointmentlist.length /recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    function prePage(){
        if(currentPage !== 1){
                setCurrentPage(currentPage - 1 )
        }
      }
    
      function nextPage(){
        if(currentPage !== npage){
                setCurrentPage(currentPage + 1 )
        }
      }

    const diplayPages = [currentPage-2,currentPage-1,currentPage,currentPage+1,currentPage+2]  
    
  return (
    <>
                {loading &&
                <>
                    <div className=' inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-25 ' >
                        <PacmanLoader speedMultiplier={2} color={'white'}/>
                    </div>
                </>}
               
                <div className='w-full h-fit flex flex-col items-center mx-auto'>
                    <div className='w-full md:w-[80%] h-fit'>
                            <div className='flex justify-start px-2 py-2 text-white bg-[#068FFF] md:rounded-t-lg'>
                                
                                <div className='flex flex-row w-fit self-center'>
                                    <div className='flex flex-row justify-center items-center relative w-[250px]'>
                                        <Tooltip content="Search" placement="right" className='z-30 px-2 text-[10px] bg-blue-600 ' animate={{  mount: { scale: 1.8, y: 0, x:5},  unmount: { scale: 0, y: 0, x:0 }}}>
                                            <span className='text-[18px] mx-2 absolute top-1 left-0 text-[#1D5D9B]'>
                                                <MdOutlineManageSearch size={25} />
                                            </span>
                                        </Tooltip>
                                        <input type='text' onChange={(e)=> filterstud(e.target.value)} value={tofilterSearch} placeholder='Search' className='w-[250px] pl-9 p-1 text-black mx-auto shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                    </div>
                                    <select name="status" onChange={(e)=> filterStatus(e.target.value)} value={tofilterStatus} className='h-full mx-2 p-1 bg-transparent cursor-pointer rounded-md text-center'>
                                            <option className='text-black' value="pending">Pending</option>
                                            <option className='text-black' value="ongoing">Ongoing</option>
                                            <option className='text-black' value="canceled">Canceled</option>
                                            <option className='text-black' value="done">Done</option>
                                        </select>
                                </div>
                            </div>
                       

                        <div className='w-full h-[70vh] min-h-[450px] max-h-[500px] bg-white boxShadow rounded-b-lg  overflow-auto relative'>
                                <table className='w-full min-w-[800px] text-left text-sm font-light font-[poppins] '>
                                        <thead className='border-b font-medium dark:border-neutral-500 '>
                                            <tr className='font-bold'>
                                                
                                                <th scope="col" className="px-6 flex flex-col md:flex-row py-[12px]">
                                                <div onClick={()=> setshowname(!showname)} className='px-2 w-fit rounded-md bg-green-400 hover:bg-green-600 text-white font-bold cursor-pointer mx-2'>{showname? 'SHOW NAME':'SHOW LRN'}</div>
                                                Student LRN /Name
                                                </th>
                                                <th scope="col" className="px-6 py-[12px]">{tofilterStatus === 'pending' ? 'Date Requested':'Date of Event'}</th>
                                                <th scope="col" className="px-6 py-[12px]">Records</th>
                                            </tr>
                                        </thead>
                                        {records && !records[0]? 
                                            <tbody>
                                                <tr>
                                                    <td className='text-[30px] py-2'>No Record</td>
                                                </tr>
                                            </tbody>
                                            :<>
                                        <tbody>
                                            {records && records.map((value,index)=>{
                                                    return <AppointmentList key={index} value={value} showname={showname} details={details}/>
                                                })}
                                        </tbody></>}
                                </table>
                            </div> 
                            <nav className='py-2 px-4 bg-[#068FFF] md:rounded-b-lg text-white'>
                                    <ul className='flex flex-row items-center justify-center gap-6 w-[300px] px-4'>
                                        <li>
                                            <span  onClick={()=> setCurrentPage(1)} className='cursor-pointer'>
                                                <BiSkipNext size={30} className='text-white rotate-180'/>
                                            </span>
                                        </li>
                                        <li>
                                            <span onClick={prePage} className='cursor-pointer rotate-180'>
                                                <BiSolidRightArrow size={15} className='text-white rotate-180'/>
                                            </span>
                                        </li>
                                            {diplayPages.map((n,i)=>(
                                                <li key={i} className={`${currentPage === n ? 'activePage':''} text-center rounded-md cursor-pointer w-[200px] `}>
                                                    {(n < 1) + ((numbers.length) < n) ? ' ':
                                                    <span onClick={()=>setCurrentPage((n)*1 ? n:1)} className={`${currentPage === n ? 'activePage':''} w-[20px] font-bold`}>
                                                    {n}
                                                    </span>}
                                                </li>
                                            ))}
                                        <li>
                                            <span onClick={nextPage} className='cursor-pointer'>
                                                <BiSolidRightArrow size={15}/>
                                            </span>
                                        </li>
                                        <li>
                                            <span onClick={()=> setCurrentPage(numbers.length)} className='cursor-pointer'>
                                                <BiSkipNext size={30}/>
                                            </span>
                                        </li>
                                    </ul>
                            </nav>                    
                        </div>                    
                </div>                                




                <AnimatePresence>        
                    {showappointmentdetails && <Details close={setshowappointmentdetails} value={appointmentdetails} refresh={getAppointmentReqs} load={setloading}/>}
                </AnimatePresence> 
                            

    </>
  )
}

function AppointmentList({value,showname,details}) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
      ];
      const date = new Date(value.dateOfRequest);
                  let day = date.getDate();
                  let month = date.getMonth();
                  let year = date.getFullYear();
      const dateOfRequest = monthNames[month]+` ${day} ${year}`

    //   const dateOFEvent = (value) =>{
    //         const date2 = new Date(value);
    //         let day2 = date2.getDate();
    //         let month2 = date2.getMonth();
    //         let year2 = date2.getFullYear();
    //     return monthNames[month2]+` ${day2} ${year2}`
    //   }
    //   console.log(dateOFEvent(value.status === 'ongoing' ? (value.reschedDate? value.reschedDate : value.dateRequested) :value.dateRequested))

      const date2 = new Date(value.status === 'ongoing' ? (value.reschedDate? value.reschedDate : value.dateRequested) :value.dateRequested);
            let day2 = date2.getDate();
            let month2 = date2.getMonth();
            let year2 = date2.getFullYear();
        const dateRequested = monthNames[month2]+` ${day2} ${year2}`

    return(
        <>
                <tr  className="border-b dark:border-neutral-500 text-[18px]">
                                        <td className="whitespace-wrap break-word px-6 py-[12px] ">{showname? value.LRN : value.lastname+' '+value.firstname+' '+value.middlename }</td>
                                        <td className="whitespace-wrap break-word px-6 py-[12px]">{dateRequested}</td>
                                        <td className="whitespace-nowrap h-[50px] md:h-fit flex flex-col md:flex-row justify-around items-center">

            
                                            <Tooltip content="Details" placement="bottom" className='z-30 px-2 bg-blue-600 '
                                                                animate={{
                                                                mount: { scale: 1.5, y: 10,  x:1 },
                                                                unmount: { scale: 0, y: 0, x:0 },
                                                                }}>
                                            <div size={35} onClick={()=> details(value)}  className='rounded-full p-2 bg-blue-500 cursor-pointer hover:bg-blue-600 '><IoIosPaper className='text-white'/></div>
                                            </Tooltip>
{/*         
                                            <Tooltip content="details for ongoing" placement="bottom" className='z-30 px-2 bg-green-600 '
                                                                animate={{
                                                                mount: { scale: 1.5, y: 10,  x:1 },
                                                                unmount: { scale: 0, y: 0, x:0 },
                                                                }}>            
                                            <div  className='rounded-full p-2 bg-green-500 hover:bg-green-600 cursor-pointer'><IoIosPaper className='text-white'/></div>
                                            </Tooltip>   */}
                                       
                                        </td>
                </tr>

                
        </>
    )
}

