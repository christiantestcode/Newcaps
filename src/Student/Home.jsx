import { useEffect, useState } from 'react'
import { VscAccount } from "react-icons/vsc"
import { RxCross2 } from 'react-icons/rx'
import { motion } from "framer-motion"
import Axios from 'axios';
import Swal from 'sweetalert2'

import logo from '../images/Login/cabanganLogo.png'
import communication from '../images/student/communication.svg'
import paper from '../images/student//paper.svg'

import AccountModal from './MODALHOME/accountModal'
import useStore from './../Store/store';
import Pis from './PIS/Pis'
import HelpPis from './HELP/HelpPIS'
import Appointment from './Appointment/Appointment'
import HelpstudAppointment from './HELP/HelpstudAppo'

import './Home.css' 


export default function Home() {
  
  const [openAcc,setopenAcc] = useState(false)

  const [showappointment,setShowappointment] = useState(false)
  const [showPis,setShowPis] = useState(false)
  
  const [HelpstudApp,setHelpstudApp] = useState(false)
  const [HelpPisT,setHelpPisT] = useState(false)

  const cUser = useStore(state => state.cUser)
  const id= cUser.accountID

  const getPisContent = async ()=>{
    try{
        const response= await Axios.get(`http://localhost:3600/pis/${id}`)
        if(response.data === '404 Not Found') { 
          return  Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'NO RESPONSE'
            })
        }
       
        if(!(response.data.pis.statusComp === 'complete')){
          Swal.fire({
            icon: 'warning',
            title: 'Reminder',
            text: 'Please COMPLETE your P.I.S soon as possible!!'
          })
        }
       
        
      }catch (err){
        if (!err?.response) {
          console.log(err)
        }
      }
  }
  
  useEffect(()=>{
    if((cUser.contactNum).length < 11){
      Swal.fire({
        title: 'Reminder?',
        text: "Please enter your contact Number in Account details!!!",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Go to Account Details!'
      }).then( async (result) => {
        if (result.isConfirmed) {
          setopenAcc(true)
          }else{
            getPisContent()
          }
      })
    }else{
      getPisContent()
    }
    
  },[])

  return (
    <>
      <div className='min-h-[100vh] h-[100vh] w-full flex flex-col justify-center relative items-center overflow-hidden bg-[#068FFF]' >
        
        {/* //WAVE  */}
        <div className="custom-shape-divider-bottom-1697958498">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
                <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
            </svg>
        </div>
        {/* //WAVE  */}

      {/* HEADER */}
        <div className=' w-full z-10 text-black px-8 py-2 fixed top-1 bg-opacity-0 flex flex-row justify-between'>
                <img src={logo} alt='logo' className='w-[60px] z-50  block sm:hidden'/>
                <div className='hidden sm:flex flex-row items-center w-[350px] justify-around'><span><img src={logo} alt='logo' className='w-[50px] z-50'/></span>
                  <div className='poppins-medium text-[20px] text-white textS '>Cabangan High School </div>
                </div>      
                <div className='flex flex-row items-center justify-around'>
                  <div  onClick={()=>setopenAcc(true)}
                    className='flex flex-col justify-center items-center m-2 rounded-lg hover:scale-125 transition-all text-white cursor-pointer'>
                    <VscAccount size={40}/>
                  </div>
                </div>  
        </div>  
        {openAcc && <AccountModal close={setopenAcc} /> }  
        {/* HEADER */}



    {/* DISPLAY SQUARE */}
        <div className='flex flex-col md:flex-row w-full justify-center items-center'>
              {/* APPOINTMENT */}
            <div onClick={(()=>setShowappointment(true))} className='relative flex flex-row items-center justify-around w-[250px] lg:w-[300px] h-[200px] lg:h-[250px] box-shadow bg-gray-100 hover:bg-gray-200 m-2 rounded-lg cursor-pointer'>                           
                  <div className='flex flex-col justify-center items-center w-full'>
                    <div><p className='break-words text-center font-[poppins] font-bold text-[20px] text-gray-600 px-8'>Counseling Appointment</p></div>
                  </div>
                  <div className={`px-[10px] py-[15px] bg-[#f6c23e] w-[150px] rounded-r-lg h-full`}>
                      <img src={communication} className='w-[80px] h-full mx-auto '/>
                  </div>
            </div>
              {/* PIS DOCUMENT */}
            <div onClick={(()=>setShowPis(true))} className='relative flex flex-row items-center justify-around w-[250px] lg:w-[300px] h-[200px] lg:h-[250px] box-shadow bg-gray-100 hover:bg-gray-200 m-2 rounded-lg cursor-pointer'>
                    <div className={`px-[10px] py-[15px] bg-[#1cc88a] w-[150px] rounded-l-lg h-full`}>
                      <img src={paper} className='w-[60px] h-full mx-auto '/>
                    </div>
                    <div className='flex flex-col justify-center items-center w-full'>
                      <div><p className='break-words text-center font-[poppins] font-bold text-[20px] text-gray-600 px-10'>Personal Information Sheet</p></div>
                    </div>
            </div>
        </div>
    {/* DISPLAY SQUARE */}


    {/* MODALSS */}

          {/* Appointment */}      
            <div  className={`z-20 absolute ${showappointment ? 'flex' : 'hidden'} top-0 right-0 left-0 mx-auto h-fit sm:h-[100vh] w-full justify-center sm:p-10 items-center bg-black bg-opacity-75 overflow-hidden`}>
                <div>
                  <div onClick={(()=>setShowappointment(false))} className='text-white absolute top-0 left-0 z-50 cursor-pointer'><RxCross2 className='text-red-600' size={40}/></div> 
                  <div onClick={(()=>setHelpstudApp(true))} className='text-white absolute top-0 left-10 m-2 px-2 rounded-md bg-blue-600 z-50 cursor-pointer shadow-md shadow-black'>HELP ?</div>
                  <Appointment className='z-30 w-full' req={showappointment}/>
                </div>
            </div> 
            {HelpstudApp && <HelpstudAppointment close={setHelpstudApp} /> }     


              {/* PIS*/}
              <div  className={`z-20 absolute ${showPis ? 'flex' : 'hidden'}  right-0 left-0 mx-auto h-[100vh] w-full  justify-center sm:p-10 items-center bg-black bg-opacity-75`}>
              
                <div>
                  <div onClick={(()=>setShowPis(false))} className='text-white absolute top-0 left-0 z-50 cursor-pointer'><RxCross2 size={40}/></div> 
                  <div onClick={(()=>setHelpPisT(true))} className='text-white absolute top-0 left-10 m-2 px-2 rounded-md bg-blue-600 z-50 cursor-pointer shadow-md shadow-black'>HELP ?</div>
                  <Pis className='z-30 w-full ' close={setShowPis}/>
                </div>
              </div>
              {HelpPisT && <HelpPis close={setHelpPisT} />}  
              
      {/* MODALSS */}


      </div>
  </>
  )
}
