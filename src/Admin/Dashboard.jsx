import { BsPersonSquare , BsDatabaseFillGear , BsClipboard2DataFill} from "react-icons/bs";
import React,{useEffect, useState, useRef} from 'react'
import paper from './Picture/paper.svg'
import Counseling from './Picture/counseling-icon.svg'
import Conversation from './Picture/conversation.svg'
import Communication from './Picture/communication.svg'
import { BsThreeDotsVertical } from "react-icons/bs";
import otherE from './Picture/conference-room-icon.svg'
import Axios from 'axios';
import { motion } from "framer-motion"
import DashViewEvent from './DashboardModal/DashViewEvent'
import { AnimatePresence } from 'framer-motion'
import { GiClick } from "react-icons/gi";
import { BsFillCircleFill } from "react-icons/bs";
import { forGraph } from './DashBGraph'
import { useNavigate } from "react-router-dom"; 
import StudAccounts from './GcConfig/StudAccounts'
import CounselingRec from './GcConfig/CounselingRec';
import PacmanLoader from "react-spinners/PacmanLoader"
import './Dashboard.css'


export default function Dashboard() {

        const navigate = useNavigate()

        const todaydate = new Date();
        var dd = todaydate.getDate();
        var mm = todaydate.getMonth()+1; 
        var yyyy = todaydate.getFullYear();
    
        if(dd<10) {dd='0'+dd} 
        if(mm<10) { mm='0'+mm} 

        const todayD =  `${yyyy}-${mm}-${dd}`
        const [display,setdisplay] = useState()
        const [graps,setgraps] = useState(false)

        const getCounselingRec = async ()=>{
                try{
                    const response= await Axios.get(`http://localhost:3500/forDasboard`)

                        const one = (response.data.pis.filter((value)=> value.statusComp === "complete").length)
                        // (response.data.tocounsel.filter((value)=>  ((value.eventName === "Appointment") || (value.eventName === "Counselling") || (value.eventName === "Referral") && (value.setDate > todayD)) ))
                        const two = (response.data.tocounsel.filter((value)=> value.setDate > todayD).length)
                        const three = (response.data.referralreq.filter((value)=> (value.status === 'pending')).length)
                        const four = (response.data.appointmentreq.filter((value)=> (value.status === 'pending') && (value.dateRequested > todayD)).length)
                        setgraps(response.data.pis)

                        setdisplay({
                                one:one,
                                two:two,
                                three:three,
                                four:four
                        })
                        setTimeout(()=>{
                                setloading(false)           
                        },500)
        
                  }catch (err){
                    if (!err?.response) {
                      console.log(err)
                    }
                  }
        }

        const [events,setEvents] = useState()
        const [haveEvents,sethaveEvents] = useState() 

        const getEvents = async () =>{
                        try{
                        const response= await Axios.get(`http://localhost:3500/getEvents/${todayD}`)

                                setEvents(response.data.filter((item)=> item.status != 'canceled'))
                                sethaveEvents(response.data.filter((item)=> item.status != 'canceled')[0]? true:false)
                                setTimeout(()=>{
                                        setloading(false)           
                                },500)
                        }catch (err){
                        if (!err?.response) {
                        console.log(err)
                        }
                        }
        }
             
        useEffect(()=>{
                getCounselingRec() 
                getEvents()
                const interval =  setInterval(()=>{
                        getCounselingRec() 
                        getEvents()
                  },5000)
            
                return () => clearInterval(interval)
        },[])

        const orderTime = (time) =>{
                if (time.includes('9am-10am'))
                return `order-1`;
                if (time.includes('10am-11am'))
                return `order-2`;
                if (time.includes('2pm-3pm'))
                return `order-3`;
                if (time.includes('3pm-4pm'))
                return `order-4`;
                if(time.includes('4pm-5pm'))
                return `order-5`;
        }

        const dashboard1 = [
                {
                 img: paper,
                 altert: 'PIS',
                 name: 'Personal Information Sheet Completed',
                 toDisplay:display && display.one,
                 shade:'bg-[#1cc88a]',
                 route:'studentPis'
                },
                {
                 img: Counseling,
                 altert: 'Counseled',
                 name: 'To be Counsel Student',
                 toDisplay:display && display.two,
                 shade:'bg-[#36b9cc]',
                 route:'calendar'
                }]
        const dashboard2 = [        
                {
                 img: Conversation,
                 altert: 'Referral',
                 name: 'Referral Request',
                 toDisplay:display && display.three,
                 shade:'bg-[#068FFF]',
                 route:'requests/normal'
                },
                {
                 img: Communication,
                 altert: 'Appointment',
                 name: 'Appointment Request',
                 toDisplay:display && display.four,
                 shade:'bg-[#f6c23e]',
                 route:'requests/appointment'
                }]

        const [openEvents,setOpenEvents] = useState(false)
        const [viewEventDetails,setviewEventDetails] = useState(false)
        const gradeLevel = forGraph(graps && graps) 

        const [studACCs,setstudACCs] = useState(false)        
        const [counselingRec,setcounselingRec] = useState(false)

        const [loading,setloading] = useState(true)
        


  return (
    <>
                
                <div className='w-full h-[100vh] font-[poppins] relative z-30'>  
                        {loading ?
                        <>
                                <div className='inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-40 bg-opacity-10 ' >
                                        <PacmanLoader speedMultiplier={2} color={'black'}/>
                                </div>
                        </>:
                        <>  
                                <div className='w-full h-[100vh] overflow-auto pt-[45px]'>
                                        {/* DASHBOARD */}
                                        <div className='mx-auto w-full h-fit lg:w-[80%] text-[32px] py-[20px] text-gray-800 font-bold '>DASHBOARD</div>
                                        <div className='w-full h-fit lg:w-[80%] flex flex-col items-center gap-y-[30px] mx-auto'>
                                                {/* DASHBOARD DETAILS */}
                                                <div className='w-full flex flex-col sm:flex-row gap-[10px] '>
                                                        <div className='w-full flex flex-col lg:flex-row justify-evenly gap-[10px]'>
                                                                {dashboard1.map((value,index)=>{
                                                                        return(    
                                                                        <div key={index} onClick={() => navigate(`/nav/home/gc/${value.route}`)} className='cursor-pointer flex flex-row items-center m-1 justify-around bg-[white] boxShadow rounded-lg min-w-[200px] w-[85%] mx-auto lg:w-[50%] h-[fit] hover:scale-[1.1] transition-all'>
                                                                                <div className={`px-[10px] py-[15px] ${value.shade} rounded-l-lg`}>
                                                                                        <img src={value.img} alt={value.altert} className='w-[60px] h-[70px] lg:h-[90px] mx-auto '/>
                                                                                </div>
                                                                                <div className='flex flex-col justify-center items-center w-full'>
                                                                                        <div className=' text-[30px] text-gray-600'>{value.toDisplay}</div>
                                                                                        <div className='text-center text-[15px] text-gray-500 px-[5px] '>{value.name}</div>
                                                                                </div>
                                                                        </div>
                                                                        )
                                                                })}
                                                        </div>
                                                        <div className='w-full flex flex-col lg:flex-row justify-evenly gap-[10px]'>
                                                                {dashboard2.map((value,index)=>{
                                                                        return(    
                                                                        <div key={index}  onClick={() => navigate(`/nav/home/gc/${value.route}`)} className='cursor-pointer flex flex-row items-center m-1 justify-around bg-[white] boxShadow rounded-lg min-w-[200px] w-[85%] mx-auto h-[fit] hover:scale-[1.1] transition-all'>
                                                                                <div className={`px-[10px] py-[15px] ${value.shade} rounded-l-lg`}>
                                                                                        <img src={value.img} alt={value.altert} className='w-[60px] h-[70px] lg:h-[90px] mx-auto '/>
                                                                                </div>
                                                                                <div className='flex flex-col justify-center items-center w-full'>
                                                                                        <div className=' text-[30px] text-gray-600'>{value.toDisplay}</div>
                                                                                        <div className='text-center text-[15px] text-gray-500 px-[5px] '>{value.name}</div>
                                                                                </div>
                                                                        </div>
                                                                        )
                                                                })}
                                                        </div>
                                                </div>   
                                                
                                                {/* DASHBOARD BOTTOM SIDE */}                
                                                <div className='w-full py-4 '>
                                                        <div className='flex flex-col xl:flex-row gap-4'>
                                                                {/* RESPONSIVE EVENT BUTTON */}
                                                                <div onClick={()=> setOpenEvents(true)} className='flex flex-row items-center glass justify-center gap-x-[10px] lg:hidden bottom-0 w-full bg-[#068FFF] rounded-t-lg p-2 font-bold cursor-pointer textS'>
                                                                        <span>TODAY'S EVENTS</span><span><GiClick size={30}/></span>
                                                                </div>

                                                                {/* P  I S DASHBOARD GRAPH  */}
                                                                <div className="w-full flex flex-col lg:flex-row gap-4">
                                                                        <div className='w-full lg:w-[70%] min-h-[400px] h-fit bg-[white] boxShadow rounded-lg p-2 text-gray-500'>
                                                                                <div className='p-2 text-[20px] font-bold flex flex-row justify-between'><p className="text-[15px] sm:text-[18px]">Personal Information Sheet Status </p><div className="text-[15px] sm:text-[18px]">Total students : {graps && graps.length}</div></div>
                                                                                
                                                                                <div className=' w-full h-full flex flex-row'>
                                                                                        <div className='w-[15%] sm:w-[10%] p-2 h-[550px] flex flex-col justify-around  font-bold items-center'>
                                                                                                <div className='h-[20px]'>Grade</div>
                                                                                                <div className='h-[60px]'>12</div>
                                                                                                <div className='h-[60px]'>11</div>
                                                                                                <div className='h-[60px]'>10</div>
                                                                                                <div className='h-[60px]'>9</div>
                                                                                                <div className='h-[60px]'>8</div>
                                                                                                <div className='h-[60px]'>7</div>
                                                                                                <div className='h-[30px]'></div>
                                                                                        </div>
                                                                                        <div className='w-[85%] sm:w-[90%] h-[550px] border-l-2 border-black flex flex-col justify-around items-center '>
                                                                                                <div className='w-full h-[20px] flex justify-around'> </div>
                                                                                                {gradeLevel && gradeLevel.map((value,index)=>{
                                                                                                return(
                                                                                                        <div key={index} className='w-full h-[60px] px-2'>
                                                                                                                <div className='w-full relative'>
                                                                                                                        <div className='absolute top-[-20px] left-0 w-full text-center font-bold'>Total : {value.numberOfToTalStudentInGrade ? value.numberOfToTalStudentInGrade : 0 }</div>
                                                                                                                        <div className='w-full h-[30px] absolute top-0 left-0 '> 
                                                                                                                                <div style={{'--widthP':value.percentOFCOmplete}} className={`percent h-full bg-[#3AB4F2] text-[white] flex justify-center items-center`}><div className=' relative z-30 translate-x-[10px] bg-[#3AB4F2] px-1 h-full'>{value.percentOFCOmplete}</div></div>
                                                                                                                                <div className='w-full flex justify-between'>
                                                                                                                                        <div className='flex flex-row gap-[10px] font-bold items-center'><div>{value.numberWhoComplete ? value.numberWhoComplete : 0 }</div></div>
                                                                                                                                        <div className='flex flex-row gap-[10px] font-bold items-center'><div>{value.numberWhoInComplete ? value.numberWhoInComplete : 0 }</div></div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                        <div className='w-full h-[30px] absolute top-0 left-0 rotate-180 '>
                                                                                                                                <div style={{'--widthP':value.percentOFInCOmplete}} className={`percent h-full bg-[orange] text-[white] flex justify-center items-center`}><div className='rotate-180 relative z-50 translate-x-[10px] bg-[orange] px-1 h-full'>{value.percentOFInCOmplete}</div></div>
                                                                                                                        </div>
                                                                                                                </div>
                                                                                                        </div>                 
                                                                                                )    
                                                                                                })}
                                                                                                
                                                                                                <div className='w-full h-[30px] border-t-2 border-black flex flex-row justify-end gap-[20px] '>
                                                                                                        <div className='flex flex-row gap-[10px] font-bold items-center'>
                                                                                                                <BsFillCircleFill size={20} className='text-[#3AB4F2]'/>
                                                                                                                <p className="text-[12px] sm:text-[15px]">Number of complete PIS</p>
                                                                                                        </div>
                                                                                                        <div className='flex flex-row gap-[10px] font-bold items-center'>
                                                                                                                <BsFillCircleFill size={20} className='text-[orange]'/>
                                                                                                                <p className="text-[12px] sm:text-[15px]">Number of incomplete</p>
                                                                                                        </div>
                                                                                                </div>
                                                                                        </div>
                                                                                </div>
                                                                                
                                                                        
                                                                        </div>

                                                                        {/* EVENTS  */}
                                                                        <div className='hidden lg:block lg:w-[30%] min-h-[600px] h-fit bg-[white] boxShadow rounded-lg '>
                                                                                <div className='sticky top-0 text-center py-2 bg-white rounded-md m-2 font-bold text-gray-600 border-2 border-blue-500'>Today's event</div>
                                                                                <div className=' w-full h-fit flex flex-col gap-[10px] p-2 overflow-hidden'>
                                                                                        {!haveEvents && <div className='text-gray-600 font-[poppins] font-bold text-center'>No events today</div>}
                                                                                        {events && events.map((value,index)=>{
                                                                                        return <div key={index } className={`relative w-full shadow-sm shadow-[gray] flex flex-row text-white px-2 py-4 bg-[#1e9aff] rounded-md hover:scale-[1.03] transition-all ${orderTime(value.setTime)}`}>
                                                                                                        {value.eventName === 'Counseling' || value.eventName === 'Appointment' || value.eventName === 'Referral' ? 
                                                                                                        <img src={Counseling} alt='Counseling' className='w-[60px]  mx-auto '/>
                                                                                                        :
                                                                                                        <img src={otherE} alt='events' className='w-[60px]  mx-auto '/>
                                                                                                        }
                                                                                                        
                                                                                                        <div className='w-full flex flex-col'>   
                                                                                                                <p className='text-[20px] px-2 truncate overflow-ellipsis'>{value.eventName} </p>
                                                                                                                <p className='text-[15px] max-w-[200px] px-2 truncate overflow-ellipsis'>{' '+
                                                                                                                `${JSON.parse(value.setTime.toString())[0].split('-')[0]}
                                                                                                                -
                                                                                                                ${JSON.parse(value.setTime.toString()).slice(-1).toString().split('-').slice(-1).toString()}`
                                                                                                                }</p>
                                                                                                        </div>
                                                                                                        <div  className=' absolute top-0 right-0 bg-[#1e9aff] h-full py-2 rounded-md'>      
                                                                                                                <BsThreeDotsVertical size={30} className='cursor-pointer' onClick={()=> setviewEventDetails(value)} />
                                                                                                        </div >
                                                                                                </div>
                                                                                        })}
                                                                                </div>
                                                                        </div>
                                                                </div>                       
                                                                <div className='w-full xl:w-fit flex flex-row xl:flex-col justify-around xl:justify-start gap-[20px] '>
                                                                                <div onClick={()=> setstudACCs(true)} className='flex justify-center items-center py-1'>
                                                                                        <div  className='w-[150px] md:w-[200px] h-fit flex flex-row bg-white rounded-lg boxShadow hover:scale-105 transition-all cursor-pointer'>
                                                                                                <div className={`px-[10px] py-[15px] bg-[#1e9aff] rounded-l-lg`}>
                                                                                                        <div className='w-[40px] h-[70px] text-white flex items-center justify-center'>
                                                                                                                <BsPersonSquare size={35}/>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <div className='flex flex-col justify-center items-center w-full'>
                                                                                                        <div className='text-center text-[15px] text-gray-600 px-[5px]'>Student Account</div>
                                                                                                </div>
                                                                                        </div>
                                                                                </div>

                                                                                <div className=' flex justify-center items-center py-1'>
                                                                                        <div onClick={()=>  navigate(`/nav/home/restore`)} className='w-[150px] md:w-[200px] h-fit flex flex-row bg-white rounded-lg boxShadow hover:scale-105 transition-all cursor-pointer'>
                                                                                                <div className={`px-[10px] py-[15px] bg-[#1e9aff] rounded-l-lg`}>
                                                                                                        <div className='w-[40px] h-[70px] text-white flex items-center justify-center'>
                                                                                                                <BsDatabaseFillGear size={35}/>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <div className='flex flex-col justify-center items-center w-full'>
                                                                                                        <div className='text-center text-[15px] text-gray-600 px-[5px]'>Backup and Restore</div>
                                                                                                </div>
                                                                                        </div>  
                                                                                </div>

                                                                                <div className='flex justify-center items-center py-1'>
                                                                                        <div onClick={()=> setcounselingRec(true)} className='w-[150px] md:w-[200px] h-fit flex flex-row bg-white rounded-lg boxShadow hover:scale-105 transition-all cursor-pointer'>
                                                                                                <div className={`px-[10px] py-[15px] bg-[#1e9aff] rounded-l-lg`}>
                                                                                                        <div className='w-[40px] h-[70px] text-white flex items-center justify-center'>
                                                                                                                <BsClipboard2DataFill size={35}/>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <div className='flex flex-col justify-center items-center w-full'>
                                                                                                        <div className='text-center text-[15px] text-gray-600 px-[5px]'>Counseling Records</div>
                                                                                                </div>
                                                                                        </div> 
                                                                                </div>
                                                                </div>
                                                        
                                                        </div>
                                                </div>
                                        </div>  

                                </div> 
                        </>}
                </div>     
              
              


                        {openEvents && <EventsRes events={events} closeEvents={setOpenEvents} closeDetails={setviewEventDetails}/>}
                        
                        {viewEventDetails && <DashViewEvent close={setviewEventDetails} value={viewEventDetails}/>}

                        {studACCs && <StudAccounts close={setstudACCs} modal={studACCs}/>}

                        {counselingRec && <CounselingRec close={setcounselingRec} />}   
               
    </>
  )
}

function EventsRes({events,closeEvents,closeDetails}){

        const container = {
                hidden: { opacity: 0 , scale:0},
                show: {
                  rotate:0,
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
        const orderTime = (time) =>{
                if (time.includes('9 am-10 am'))
                return `order-1`;
                if (time.includes('10 am-11 am'))
                return `order-2`;
                if (time.includes('2 pm-3 pm'))
                return `order-3`;
                if (time.includes('3 pm-4 pm'))
                return `order-4`;
                if(time.includes('4 pm-5 pm'))
                return `order-5`;
        }
              
        return(
            <>
                <div className="absolute h-[100vh] left-0 top-0 w-full z-10 flex justify-center items-center font-[poppins] ">
  
                        <div onClick={()=> closeEvents(false)} className="opacity-75 fixed inset-0 z-10 bg-black "></div>
                        
                        <motion.div className="z-20 relative"
                                variants={container}
                                initial="hidden"
                                animate="show"
                                exit="exit"> 

                                <div className='w-full min-h-[600px] h-fit bg-[white] boxShadow rounded-lg '>
                                        <div className='sticky top-0 text-center py-2 bg-white rounded-md m-2 font-bold text-gray-600 border-2 border-blue-500'>Today's event</div>
                                        <div className=' w-full h-fit flex flex-col gap-[10px] p-2 overflow-hidden'>
                                                {!events && <div className='text-gray-600 font-[poppins] font-bold text-center'>No events today</div>}
                                                {events && events.map((value,index)=>{
                                                return <div key={index } className={`relative w-full min-w-[310px] shadow-sm shadow-[gray] flex flex-row text-white px-2 py-4 bg-[#A1EEBD] rounded-md hover:scale-[1.03] transition-all ${orderTime(value.setTime)}`}>
                                                                {value.eventName === 'Counseling' || value.eventName === 'Appointment' || value.eventName === 'Referral' ? 
                                                                <img src={Counseling} alt='Counseling' className='w-[60px]  mx-auto '/>
                                                                :
                                                                <img src={otherE} alt='events' className='w-[60px]  mx-auto '/>
                                                                }
                                                                
                                                                <div className='w-full flex flex-col'>   
                                                                        <p className='text-[20px] px-2 truncate overflow-ellipsis'>{value.eventName} </p>
                                                                        <p className='text-[15px] max-w-[200px] px-2 truncate overflow-ellipsis'>{' '+
                                                                        `${JSON.parse(value.setTime.toString())[0].split('-')[0]}
                                                                        -
                                                                        ${JSON.parse(value.setTime.toString()).slice(-1).toString().split('-').slice(-1).toString()}`
                                                                        }</p>
                                                                </div>
                                                                <div  className=' absolute top-0 right-0 bg-[#A1EEBD] h-full py-2 rounded-md'>      
                                                                        <BsThreeDotsVertical size={30} className='cursor-pointer' onClick={()=> closeDetails(value)} />
                                                                </div >
                                                        </div>
                                                })}
                                        </div>
                                </div>
                        
                        </motion.div>
                </div>
            </>
        )
}