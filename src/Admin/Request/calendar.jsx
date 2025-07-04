import React,{useEffect, useState} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { motion } from "framer-motion"
import SetTime from './setTime';
import SetTimeAppointment from './setTimeAppointment';
import { RxCross2 } from 'react-icons/rx'


export default function Calendar({close,close2,value,type,refresh,load,clos2,reason}) {

  

      if(reason == 'follow'){
        value['reason'] = 'For Follow up Counseling with Guidance Counselor'
      } else if(reason == 'self') {
        value['reason'] = 'Guidance Counselor made Self-Referral for your Counseling session.'
      }


      const container = {
        hidden: { opacity: 0 , scale:0},
        show: {
          scale:[0.5,1],
          opacity: 1,
          transition: {
                duration:.2,
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
      
      const clickDate= (info)=>{
       
        if(selected && selected.filter((value)=>(info.dateStr >= value.start) && (info.dateStr < value.end ))[0]) 
          Swal.fire({
          icon: 'warning',
          title: 'following date occupied by long event!!',
        })

        const date = new Date(info.dateStr);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
    
        const todaydates = new Date();
        let Tday = todaydates.getDate();
        let Tmonth = todaydates.getMonth() + 1;
        let Tyear = todaydates.getFullYear();
    
    
        if(year<Tyear){
          Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Unavailable',
                showConfirmButton: false,
                timer: 1500
              })
        }else if(year === Tyear && month < Tmonth){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Unavailable',
            showConfirmButton: false, 
            timer: 1500
          })
        }else if(year === Tyear && month <= Tmonth && day < Tday){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Unavailable',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          setopenSetdateTime(true)
          setdateClicked(info)
        }
      }   

      const [openSetdateTime,setopenSetdateTime] = useState(false)
      const [dateClicked,setdateClicked] = useState('')


      
      const todaydate = new Date();
      var dd = todaydate.getDate();
      var mm = todaydate.getMonth()+1; 
      var yyyy = todaydate.getFullYear();

      if(dd<10) {dd='0'+dd} 
      if(mm<10) { mm='0'+mm} 
      value['dateOfRequest'] = `${yyyy}-${mm}-${dd}`

      const today = [ 
        { date: `${yyyy}-${mm}-${dd}` ,display: 'background', backgroundColor:'#035bf3'},
        { date: `${yyyy}-${mm}-${dd}` ,display: 'background', backgroundColor:'#035bf3'},
        { date: `${yyyy}-${mm}-${dd}` ,display: 'background', backgroundColor:'#035bf3'},
        { date: `${yyyy}-${mm}-${dd}` ,display: 'background', backgroundColor:'#035bf3'},];

      const  [unavailable,setunavailable] = useState([
          { date: '2023-05-25',display: 'background', backgroundColor:'#ff0000'},
          { date: '2023-05-25',display: 'background', backgroundColor:'#ff0000'},
          { date: '2023-05-25',display: 'background', backgroundColor:'#ff0000'}
        ]);


      const [selected,setselected] = useState([])
  
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

      const startTimxe = (date,time) =>{
            return `${date}${tiime(time)}`
          }
      const [eevents,seteevents] = useState('')

      const events = [...today,...selected,...eevents,
        {
          title: `TODAY`,
          className:'font-bold bg-transparent border-transparent text-[12px]',
          start:`${yyyy}-${mm}-${dd}` 
        }
      ]

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
    
      useEffect(()=>{

        setTimeout(()=>{
          getLongEventss()
          getEventss()
        },500)

      },[])

        // console.log(eventInfo)
    return (
        <>
          <div className="absolute w-full h-[100vh] left-0 top-0 z-10 font-[poppins] min-w-[300px] ">
  
                {/* <div className="bg-opacity-25 fixed inset-0 z-10 bg-black "></div> */}
                {/* <div  onClick={(()=>close(false))} className='text-white absolute top-0 left-0 z-30 cursor-pointer'><RxCross2 size={40}/></div>  */}

                <motion.div className="z-20 relative w-full h-[100vh] flex justify-center items-center" 
                  variants={container}
                  initial="hidden"
                  animate="show"> 
                  
                           {!openSetdateTime &&  
                           <>
                           <div className="bg-opacity-5 fixed inset-0 z-10 bg-black" onClick={(()=>close(false))}></div>


                            <div className=" w-fit z-50 h-[100vh] max-h-[560px] font-[poppins]  bg-white flex items-center overflow-auto rounded-md" >

                                <div className='w-[1000px] m-auto sm:p-2  cursor-pointer'>
                              
                                     <FullCalendar
                                        contentHeight='auto'
                                        fixedWeekCount={false}
                                        showNonCurrentDates={false}
                                        headerToolbar={{
                                            left: 'title',
                                            right: 'prev,today,next'
                                        }}
                                        plugins={[ dayGridPlugin,interactionPlugin ]}
                                        initialView="dayGridMonth"
                                        dateClick={ function(info) {
                                          clickDate(info)
                                        }}
                                        eventOrderStrict={true}
                                        dayCellClassNames={'cursor-pointer'}
                                        // eventContent={(arg)=>(
                                        //   <p>{arg.event.extendedProps.description}</p>
                                        // )}
                                        dayMaxEventRows={2}
                                        events={events && events}
                                        
                                    />  
                                    <div className='px-2 textS font-bold bg-blue-400 hover:bg-blue-500 w-fit rounded-md' onClick={(()=>close(false))}>BACK</div>
                                 </div> 
    
    
                            </div></>}
                </motion.div>
          </div>
             

          {openSetdateTime && <> 
          {type === 'referral' && <SetTime close={setopenSetdateTime} value={dateClicked} back={close} eventInfo={value} type={type} refresh={refresh} load={load} clos2={clos2}/>}
          {type === 'appointment' && <SetTimeAppointment close={setopenSetdateTime} close1={close} closse2={close2} value={dateClicked} back={close} eventInfo={value} type={type} refresh={refresh} load={load} reason={reason}/>}
          
          </> }                      
        </>
      )
    }
