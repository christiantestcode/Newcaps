import React,{useEffect, useState} from 'react'
import { IoIosPaper } from "react-icons/io";
import { Tooltip, Button } from "@material-tailwind/react";
import Axios from 'axios';
import Swal from 'sweetalert2'
import { motion } from "framer-motion"
import {RxCross2, RxValueNone} from 'react-icons/rx'
import Calendar from './calendar';
import PacmanLoader from "react-spinners/PacmanLoader";
import { AnimatePresence } from 'framer-motion';
import Details from './ReferralComp/RefDetails';
import Reply from './ReferralComp/RefReply';
import { BiSkipNext , BiSolidRightArrow } from "react-icons/bi";
import { MdOutlineManageSearch } from 'react-icons/md'


export default function RefferalReq({close}) {
    
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

    const [referrals,setreferrals] = useState([])
    const [tofilter,settofilter]= useState([])
    const [tofilterStatus,settofilterStatus]= useState('pending') 

    const getallRequest = async (ress)=>{
        try{
            const response= await Axios.get(`http://localhost:3500/referral`)
                // console.log(response.data)
            
                    setTimeout(()=>{
                        setreferrals(response.data.filter((referral)=> (referral.status.includes(tofilterStatus)) ))
                        settofilter(response.data)
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
    getallRequest()
    },[])

    const details = (value) =>{
        setreferraldetails(value)
        setshowreferraldetails(true)
    }
    const [showreferraldetails,setshowreferraldetails] = useState(false)
    const [referraldetails,setreferraldetails] = useState('')

    const [tofilterSearch,settofilterSearch]= useState('') 

    const filterstud = (e)=>{
        settofilterSearch(e)

        if(e) return setreferrals(tofilter.filter((referral)=> (referral.status.includes(tofilterStatus)) )
                    .filter((referral)=>(referral.teacherName.toLowerCase() + referral.employeeID.toLowerCase()).includes(e)))
        
         setreferrals(tofilter.filter((referral)=> (referral.status.includes(tofilterStatus)) ))
        
    }

    const filterStatus = (e)=>{
            settofilterStatus(e)
            setreferrals(tofilter.filter((referral)=> (referral.status.toLowerCase()).includes(e)))
            settofilterSearch('')
    }

    const [loading,setloading] = useState(true)

    const [replyDetails,setreplyDetails] = useState(false)
    const [dateReq,setdateReq] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 9
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    const records = referrals && referrals.slice(firstIndex,lastIndex);
    const npage = Math.ceil(referrals.length /recordsPerPage)
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
                    <div className='inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-50 ' >
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
                                        <input type='text' onChange={(e)=> filterstud(e.target.value)} value={tofilterSearch} placeholder='Search' className='w-[250px] pl-9 p-1 text-black mx-auto shadow-inner shadow-gray-500/50 border-[1px]  border-gray-200 rounded-md px-2'></input>
                                    </div>
                                    <select name="status" onChange={(e)=> filterStatus(e.target.value)} className='h-full mx-2 p-1 bg-transparent cursor-pointer rounded-md text-center'>
                                        <option className='text-black' value="pending">Pending</option>
                                        <option className='text-black' value="ongoing">Ongoing</option>
                                        <option className='text-black' value="done">Done</option>
                                    </select>
                            </div>
                                    
                        </div>

                        <div className='w-full h-[70vh] min-h-[450px] max-h-[500px] bg-white boxShadow rounded-b-lg  overflow-auto relative'>
                                <table className='w-full min-w-[800px] text-left text-sm font-light font-[poppins] '>
                            
                                        <thead className='border-b font-medium dark:border-neutral-500 '>
                                            <tr className='font-bold'>
                                                <th scope="col" className="px-6 py-[12px]">Teacher's Name</th>
                                                <th scope="col" className="px-6 py-[12px]">{tofilterStatus === 'pending' ?'Date of request':'Date of event'}</th>
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
                                        <tbody >
                                        {records && records.map((value,index)=>{
                                                return <ReferralList key={index} value={value} filter={tofilterStatus} details={details} dateR={setdateReq} repD={setreplyDetails}/>
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
                {showreferraldetails && <Details close={setshowreferraldetails} value={referraldetails} refresh={getallRequest} load={setloading}/>}
            </AnimatePresence>

            <AnimatePresence>        
                    {replyDetails && <Reply close={setreplyDetails} value={replyDetails} date={dateReq}/>}
            </AnimatePresence> 
           
    </>
  )
}

function ReferralList({value,filter,details,dateR,repD}) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
      ];
      const date = new Date(value.dateOfReferral);
                  let day = date.getDate();
                  let month = date.getMonth();
                  let year = date.getFullYear();
      const dateRequested = monthNames[month]+` ${day} ${year}`

      
      const [referraldetails,setreferraldetails] = useState(false)
      const [referralReply,setreferralReply] = useState(false)


      const getEventAppointment = async () =>{
        try{
          const response= await Axios.get(`http://localhost:3500/eventDcalendar/${value.eventID}/${'Referral'}`)
          settimeANDdate(response.data)
        }catch (err){   
            console.log(err)
          
        }
    }
          useEffect(()=>{
                if(value.eventID){
                    getEventAppointment()
                }
          },[])

    const [timeANDdate,settimeANDdate] = useState('')

    const dateE = new Date(timeANDdate.setDate);
    let dayE = dateE.getDate();
    let monthE = dateE.getMonth();
    let yearE = dateE.getFullYear();
    const dateOfevent = monthNames[monthE]+` ${dayE} ${yearE}`

    return(
        <>
                <tr  className=" border-b dark:border-neutral-500 text-[18px]">
                                        <td className="whitespace-wrap break-word px-6 py-[12px] ">{value.teacherName}</td>
                                        <td className="whitespace-wrap break-word px-6 py-[12px]">{filter === 'pending'?dateRequested:dateOfevent}</td>
                                        <td className="whitespace-nowrap flex flex-row justify-around items-center ">

                                            <Tooltip content="Details" placement="bottom" className='z-30 px-2 bg-blue-600 '
                                                                animate={{
                                                                mount: { scale: 1.5, y: 10,  x:1 },
                                                                unmount: { scale: 0, y: 0, x:0 },
                                                                }}>
                                            <div onClick={()=> details(value)}  className='rounded-full p-2 bg-blue-500 cursor-pointer hover:bg-blue-600 '><IoIosPaper className='text-white'/></div>
                                            </Tooltip>
        
                                            <Tooltip content="Reply" placement="bottom" className='z-30 px-2 bg-green-600 '
                                                                animate={{
                                                                mount: { scale: 1.5, y: 10,  x:1 },
                                                                unmount: { scale: 0, y: 0, x:0 },
                                                                }}>            
                                                <div onClick={()=> {
                                                        repD(value)
                                                        dateR(dateRequested)
                                                }} className='rounded-full p-2 bg-green-500 hover:bg-green-600 cursor-pointer'><IoIosPaper className='text-white'/></div>
                                            </Tooltip>  
                                        </td>
                </tr>
                
        </>
    )
}





