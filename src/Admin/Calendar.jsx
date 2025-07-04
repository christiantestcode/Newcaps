import React,{useEffect, useState} from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import Axios from 'axios';
import Swal from 'sweetalert2'
import { motion } from "framer-motion"
import {RxCross2} from 'react-icons/rx'
import { CgDetailsMore } from "react-icons/cg";
import { MdAssignmentAdd } from "react-icons/md";
import AddEventModal from './Calendar/addEventModal';
import ViewDModal from './Calendar/viewDModal';
import Reschedule from './Calendar/Reschedule';
import Events from './Events'
import AddLongEventModal from './LongEvents/addEventModal'
import ViewLongEModal from './LongEvents/viewDModal';
import CalendarHelp from '../HELP/CalendarHelp';
import { AnimatePresence } from 'framer-motion';



export default function Calendar() {
 

  const todaydate = new Date();
  var dd = todaydate.getDate();
  var mm = todaydate.getMonth()+1; 
  var yyyy = todaydate.getFullYear();

  if(dd<10) {dd='0'+dd} 
  if(mm<10) { mm='0'+mm} 

  const today = [ 
    { date: `${yyyy}-${mm}-${dd}` ,display: 'background', backgroundColor:'BEE71E'},
    { date: `${yyyy}-${mm}-${dd}` ,display: 'background', backgroundColor:'BEE71E'},
    { date: `${yyyy}-${mm}-${dd}` ,display: 'background', backgroundColor:'BEE71E'},
    { date: `${yyyy}-${mm}-${dd}` ,display: 'background', backgroundColor:'BEE71E'},];

  const  [unavailable,setunavailable] = useState([
      { date: '2023-05-25',display: 'background', backgroundColor:'#ff0000'},
      { date: '2023-05-25',display: 'background', backgroundColor:'#ff0000'},
      { date: '2023-05-25',display: 'background', backgroundColor:'#ff0000'}
    ]);


     
  
        const tiime = (time) =>{
          if((time.toString()).includes('9am')){
              return 'T09:00:00'
          }else if((time.toString()).includes('10am')){
            return 'T10:00:00'
          }else if((time.toString()).includes('2pm')){
            return 'T14:00:00'
          }else if((time.toString()).includes('3pm')){
            return 'T15:00:00'
          }else if((time.toString()).includes('4pm')){
            return 'T16:00:00'
          }
        }

  const [selected,setselected] = useState([])

 const startTimxe = (date,time) =>{
      return `${date}${tiime(time)}`
    }
    const [eevents,seteevents] = useState('')

    const events = [...today,...selected,...eevents]

    const getEventss = async () =>{
      try{
        const response= await Axios.get(`http://localhost:3500/getAllEvents`)
        seteevents((response.data).map((item)=> {
          return {
            title:item.eventName === ('Referral' || 'Appointment')? 'Counseling' : item.eventName,
            start: startTimxe(item.setDate,item.setTime)
          }
        }))

      }catch (err){   
          console.log(err)
      }
  }
  

    // console.log('2023-05-05' < '2023-05-12')

    const currenEvents= [...today,...unavailable]

    const [openEvents,setopenEvents] = useState(false)

    const clickDate = (info) => {
      setopenEvents(true)
      setdateClicked(info)
      // adwd(info)
    }

    const [openaddEvents,setopenaddEvents] = useState(false)
    const [dateClicked,setdateClicked] = useState()

    const [eventViewDetails,setEventViewDetails] = useState(false)
    const [eventValue,setEventValue] = useState()

    const [openReschedule,setopenReschedule] = useState()

    

      
    const closeAll = (data) =>{
      setopenReschedule(data)
      setEventViewDetails(data)
      setopenEvents(data)
    }

    const getLongEventss = async () =>{
      try{
        const response= await Axios.get(`http://localhost:3500/longEvents`)
        
         setselected((response.data).map((item)=> {
          return {
            title:item.title,
            titleofEvent:item.title,
            ID:item.eventID,
            description:item.description,
            start: item.start,
            end: item.end
          }
        }))
       

      }catch (err){   
          console.log(err)
      }
  }



    const [addLongEvents,setaddLongEvents] = useState(false)
    const [LongEventsValue,setLongEventsValue] = useState('')

    const [LongDetails,setLongDetails] = useState(false)
    const [LongDetailsValue,setLongDetailsValue] = useState('')

    const seleect = (info)=>{
      if(selected && selected.filter((value)=>(info.startStr > value.start) && (info.endStr <= value.end ))[0]) 
      return  Swal.fire({
        icon: 'warning',
        title: 'following date occupied by long event!!',
        showConfirmButton: false,
        timer: 1500
      })
      if(selected && selected.filter((value)=>(info.startStr > value.start) && (info.startStr < value.end ))[0]) 
      return Swal.fire({
        icon: 'warning',
        title: 'following date occupied by long event!!',
        showConfirmButton: false,
        timer: 1500
      })
      if(selected && selected.filter((value)=>(info.endStr > value.start) && (info.endStr <= value.end ))[0]) 
      return Swal.fire({
        icon: 'warning',
        title: 'following date occupied by long event!!',
        showConfirmButton: false,
        timer: 1500
      })

      const startD = new Date(info.startStr)
      const endD = new Date(info.endStr)
 
        if(endD.getDate() - startD.getDate() > 1 || (endD.getMonth() - startD.getMonth())){
          setaddLongEvents(true)
          setLongEventsValue(info)
        }     
    }
    const seleectDetails = (info,value)=>{
      const start = new Date(info.start)
      const end = new Date(info.end)
        if(!(end.getDate() - start.getDate() === 1)){
          setLongDetails(true)
          setLongDetailsValue({info:info,value:value})
        }    
    }

    useEffect(()=>{
      getEventss()
      getLongEventss()
      const interval =  setInterval(()=>{
             getEventss()
             getLongEventss()
        },2500)
        return () => clearInterval(interval)
    },[openEvents,openReschedule,eventViewDetails])


    const [help,sethelp] = useState(false)

  return (
    <>
    <div className='w-full relative h-[100vh] overflow-x-auto overflow-y-hidden items-start font-[poppins]'>
      <div className='w-full h-fit flex justify-center items-center'>

          <div className='bg-white min-w-[500px] mx-auto h-[90vh] sm:p-2 rounded-sm mt-10 w-full'>
                <FullCalendar
                height='100%'
                // fixedWeekCount={false}
                // showNonCurrentDates={false}
                headerToolbar={{
                    left: 'title',
                    right: 'prevYear,prev,today,next,nextYear myCustomButton'
                }}
                plugins={[ dayGridPlugin,interactionPlugin ]}
                initialView="dayGridMonth"
                dateClick={ function(info) {
                  clickDate(info)
                }}
                eventClassNames={'text-[12px]  text-black' }
                eventColor={'#2a5af7'}
                dayMaxEventRows={2}
                // initialEvents={events && events}
                
                // dayMaxEventRows={5}
                eventClick={(info)=>{
                  seleectDetails(info.el.fcSeg.eventRange.range,info.event._def.extendedProps)
                   console.log(info.el.fcSeg.eventRange.range,info.event._def.extendedProps)
                }}

                selectable
                select={function(info) {
                  seleect(info)
                }}
                
                eventOrderStrict={true}
                dayCellClassNames={'cursor-pointer w-fit'}
                // eventContent={(arg)=>(
                //   <p>{arg.event.extendedProps.description}</p>
                // )}
                events={events && events}

                customButtons= {{
                  myCustomButton:{
                    text: 'Help?',
                    click: function() {
                      sethelp(true);
                    }
                  }
                }}
                />      
          </div>
      </div>    
            <AnimatePresence>        
                {openReschedule && <Reschedule close={setopenReschedule} close2={closeAll} back={setEventViewDetails} value={eventValue} />}
            </AnimatePresence> 
    </div>
    


      {/* ///////////////////////////////////////////////////////////////////////////////// */}

        {/* date EVENTS */}    
        
           

        {/*blackbehind  EVENTS */}
        {openEvents &&<>
       
         <motion.div className='z-50 absolute top-0 left-[-1000px] h-[100vh] w-full sm:w-fit flex justify-center sm:p-10 items-center bg-black bg-opacity-50'
            transition={{
                type: "spring",
                stiffness: 30
            }}
            animate={{
                x: openEvents? 1000:0}}
                >
                   <div onClick={(()=>setopenEvents(false))} className='text-white absolute top-0 left-0 z-50 cursor-pointer'><RxCross2 size={40}/></div> 
                { openEvents && 
            <div>
                
                    <Events  addModal={setopenaddEvents} value={dateClicked} refresh={eventViewDetails} opendetails={setEventViewDetails} details={setEventValue}/>
            </div>}
           </motion.div>    
        <div className="opacity-75 fixed inset-0 z-40 bg-black block"></div>
        </>}

        {help && <CalendarHelp close={sethelp} /> } 

      {/* //////////////// ADD EVENTS ///////////////////////////////////////////////////////////////// */}

        {openaddEvents && <AddEventModal close={setopenaddEvents} close2={closeAll} value={dateClicked && dateClicked}/>}
          
        {eventViewDetails && <ViewDModal close={setEventViewDetails} close2={closeAll} resched={setopenReschedule} value={eventValue} />}
            
        {/* {openReschedule && <Reschedule close={setopenReschedule} close2={closeAll} back={setEventViewDetails} value={eventValue} />} */}

        {addLongEvents && <AddLongEventModal close={setaddLongEvents} value={LongEventsValue && LongEventsValue} refresh={getLongEventss}/>}
        
        {LongDetails && <ViewLongEModal close={setLongDetails} value={LongDetailsValue && LongDetailsValue} refresh={getLongEventss}/>}
        
    

    </>
  )
}

