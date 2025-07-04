import React,{useState} from 'react'
import useStorePIS from '../../Store/storePIS';
import Axios from 'axios';
import Swal from 'sweetalert2'
import { FaAsterisk } from "react-icons/fa";


export default function Studpis4({refresh,close}) {

  const fromDB = useStorePIS((state)=>state.aDDuhc)

  const [friendsInschool,setfriendsInschool]= useState(fromDB.friendsInschool)
  const [outsideInschool,setoutsideInschool]= useState(fromDB.outsideInschool)
  const [specialInterest,setspecialInterest]= useState(fromDB.specialInterest)
  const [hobbies,sethobbies]= useState(fromDB.hobbies)
  const [characteristicsThatDescibeU,setcharacteristicsThatDescibeU]= useState(fromDB.characteristicsThatDescibeU)
  const [presentFears,setpresentFears]= useState(fromDB.presentFears)
  const [disabilities,setdisabilities]= useState(fromDB.disabilities)
  const [chronicIllness,setchronicIllness]= useState(fromDB.chronicIllness)
  const [medicinesRegTaken,setmedicinesRegTaken]= useState(fromDB.medicinesRegTaken)
  const [accidentsExperienced,setaccidentsExperienced]= useState(fromDB.accidentsExperienced)
  const [operationsExp,setoperationsExp]= useState(fromDB.operationsExp)
  const [immunizations,setimmunizations]= useState(fromDB.immunizations)

  const [consultedPsy,setconsultedPsy]= useState(fromDB.consultedPsy)
  const [howmanysessionPsy,sethowmanysessionPsy]= useState(fromDB.howmanysessionPsy)
  const [forwhatPsy,setforwhatPsy]= useState(fromDB.forwhatPsy)

  const [consultedCoun,setconsultedCoun]= useState(fromDB.consultedCoun)
  const [howmanysessionCoun,sethowmanysessionCoun]= useState(fromDB.howmanysessionCoun)
  const [forwhatCoun,setforwhatCoun]= useState(fromDB.forwhatCoun)

  const [emerContact,setemerContact]= useState(fromDB.emerContact)
  const [address,setaddress]= useState(fromDB.address)
  const [contactNumber,setcontactNumber]= useState(fromDB.contactNumber.slice(3))


  
  const toDB = {
    friendsInschool:friendsInschool,
    outsideInschool:outsideInschool,
    specialInterest:specialInterest,
    hobbies:hobbies,
    characteristicsThatDescibeU:characteristicsThatDescibeU,
    presentFears:presentFears,
    disabilities:disabilities,
    chronicIllness:chronicIllness,
    medicinesRegTaken:medicinesRegTaken,
    accidentsExperienced:accidentsExperienced,
    operationsExp:operationsExp,
    immunizations:immunizations,

    consultedPsy:consultedPsy,
    howmanysessionPsy:howmanysessionPsy,
    forwhatPsy:forwhatPsy,

    consultedCoun:consultedCoun,
    howmanysessionCoun:howmanysessionCoun,
    forwhatCoun:forwhatCoun,

    emerContact:emerContact,
    address:address,
    contactNumber:'+63'+contactNumber,

  }

  const addUniqueHealthCosult = useStorePIS( state => state.addUniqueHealthCosult)

    const finishLater = ()=>{
      addUniqueHealthCosult(toDB)
      
      }

    const SaveAvailable = () =>{
      finishLater()
     }


    const pisID = useStorePIS((state)=>state.pisID)


    const savetoDB= async (record)=>{
      try{
        const response= await Axios.patch(`http://localhost:3500/pis`,
        {
          pisID:pisID,
          content:record,
          tableName:'uniqueHealthCosult'
        })
        refresh()
            Swal.fire({
                icon: 'success',
                title: 'Saved!',
                showConfirmButton: false,
                timer: 500
              })
      }catch (err){
        if (!err?.response) {
          console.log(err)
        }
      }
    }

    const updatedeFourFive = useStorePIS((state)=>state.aDDuhc)
    const saveAll = () =>{
      savetoDB(updatedeFourFive)
    }


 
    
  return (
    <>
      <div className='bg-white rounded-md flex flex-col px-2 overflow-auto overflow-x-hidden shadow-md shadow-black relative'>
 
 <div className=' px-4'>
           <div className='text-[18px] font-bold p-2 text-center'> UNIQUE FEATURES</div>

           <div className='mb-2'>
               <div>Friends in School:</div>
               <input type='text' onBlur={()=> SaveAvailable()} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                 onChange={(e)=> setfriendsInschool(e.target.value)}
                 value={friendsInschool}
               ></input>
               
           </div>  
           <div className='mb-2'>
               <div>Outside in School:</div>
               <input type='text' onBlur={()=> SaveAvailable()} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
               onChange={(e)=> setoutsideInschool(e.target.value)}
               value={outsideInschool}
             ></input>
               
           </div>  
           <div className='mb-2'>
               <div>Special Interest:</div>
               <input type='text' onBlur={()=> SaveAvailable()} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
               onChange={(e)=> setspecialInterest(e.target.value)}
               value={specialInterest}
             ></input>
               
           </div>  
           <div className='mb-2'>
               <div>Hobbies:</div>
               <input type='text' onBlur={()=> SaveAvailable()} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
               onChange={(e)=> sethobbies(e.target.value)}
               value={hobbies}
             ></input>
               
           </div>  
           <div className='mb-2'>
               <div>Characteristics that described you best:</div>
               <input type='text' onBlur={()=> SaveAvailable()} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
               onChange={(e)=> setcharacteristicsThatDescibeU(e.target.value)}
               value={characteristicsThatDescibeU}
             ></input>
               
           </div>  
           <div className='mb-2'>
               <div>Present Fears:</div>
               <input type='text' onBlur={()=> SaveAvailable()} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
               onChange={(e)=> setpresentFears(e.target.value)}
               value={presentFears}
             ></input>
               
           </div>  



           <div className='text-[18px] font-bold p-2 text-center'> HEALTH INFORMATION </div>

             <div className='mb-2'>
                   <div>Disabilities/impairments:</div>
                 <input type='text' onBlur={()=> SaveAvailable()} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                 onChange={(e)=> setdisabilities(e.target.value)}
                 value={disabilities}
               ></input>
                 
             </div>  
             <div className='mb-2'>
                   <div>Chronic Illness:</div>
                 <input type='text' onBlur={()=> SaveAvailable()} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                 onChange={(e)=> setchronicIllness(e.target.value)}
                 value={chronicIllness}
               ></input>
                 
             </div>  
             <div className='mb-2'>
                   <div>Medicines regularily taken:</div>
                 <input type='text' onBlur={()=> SaveAvailable()} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                 onChange={(e)=> setmedicinesRegTaken(e.target.value)}
                 value={medicinesRegTaken}
               ></input>
                 
             </div>  
             <div className='mb-2'>
                   <div>Accidents experienced/Effect:</div>
                 <input type='text' onBlur={()=> SaveAvailable()} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                 onChange={(e)=> setaccidentsExperienced(e.target.value)}
                 value={accidentsExperienced}
               ></input>
                 
             </div>  
             <div className='mb-2'>
                   <div>Operations experienced/Effect:</div>
                 <input type='text' onBlur={()=> SaveAvailable()} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                 onChange={(e)=> setoperationsExp(e.target.value)}
                 value={operationsExp}
               ></input>
                 
             </div>  
             <div className='mb-2'>
                   <div>Immunizations you had:</div>
                 <input type='text' onBlur={()=> SaveAvailable()} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                 onChange={(e)=> setimmunizations(e.target.value)}
                 value={immunizations}
               ></input>
                 
             </div>  

             <div className='text-[18px] font-bold p-2 text-center'> PREVIOUS PSYCHOLOGICAL CONSULTATIONS </div>
               {/* /////////////////////////////////////////////// */}
               <div className='p-2 mb-1'>
                   <div className='w-full flex flex-col sm:flex-row  justify-between '>

                             <div className='w-full sm:w-[150px] md:w-fit'>Have you consulted a Psychiatrist before:</div>
                
                         
                             <div className='flex flex-col sm:flex-row'>
                               <span className='flex flex-row'><input type='radio' readOnly checked={consultedPsy? false :true} name='psy' className='w-[30px] h-[20px]'/><span>NO</span></span>
                               <span className='flex flex-row'><input type='radio' readOnly checked={consultedPsy? true :false} name='psy' className='w-[30px] h-[20px]'/><span>YES</span></span>
                             </div>
                             <div className='mb-4 w-full sm:w-[40%]'>
                                 <input type='text' onBlur={()=> SaveAvailable()} onChange={(e)=> setconsultedPsy(e.target.value)} value={consultedPsy} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                 <div>If yes When:</div>
                               </div>
                   </div>    
                   <div className='mb-2'>
                     <div>How many Sessions/how long:</div>
                       <input type='text' onBlur={()=> SaveAvailable()} onChange={(e)=> sethowmanysessionPsy(e.target.value)} value={howmanysessionPsy} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                   </div>  
                   <div className='mb-2'>
                       <div>For What:</div>
                       <input type='text' onBlur={()=> SaveAvailable()} onChange={(e)=> setforwhatPsy(e.target.value)} value={forwhatPsy} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                   </div>  
                   </div>

           {/* /////////////////////////////////////////////// */}
           <div className='p-2 mb-1'>
                         <div className='w-full flex flex-col sm:flex-row justify-between '>

                               <div className='w-full sm:w-[150px] md:w-fit'>Have you consulted a Counselor of Psychologist before:</div>
                
                         
                               <div className='flex flex-col sm:flex-row'>
                                 <span className='flex flex-row'><input type='radio' readOnly checked={consultedCoun? false :true} name='coun' className='w-[30px] h-[20px]'/><span>NO</span></span>
                                 <span className='flex flex-row'><input type='radio' readOnly checked={consultedCoun? true :false} name='coun' className='w-[30px] h-[20px]'/><span>YES</span></span>
                               </div>

                               <div className='mb-4  w-full sm:w-[40%] '>
                                 <input type='text' onBlur={()=> SaveAvailable()} onChange={(e)=> setconsultedCoun(e.target.value)} value={consultedCoun} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                 <div>If yes When:</div>
                               </div>
                         </div>    
                   <div className='mb-2'>
                       <div>How many Sessions/how long:</div>
                       <input type='text' onBlur={()=> SaveAvailable()} onChange={(e)=> sethowmanysessionCoun(e.target.value)} value={howmanysessionCoun} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                   </div>  
                   <div className='mb-2'>
                       <div>For What:</div>
                       <input type='text' onBlur={()=> SaveAvailable()} onChange={(e)=> setforwhatCoun(e.target.value)} value={forwhatCoun} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                   </div>  
                  
           </div>  
           <div className='p-6 border-2 border-black mb-1 rounded-md'>
                   <div className='mb-2 flex flex-col sm:flex-row justify-between'>
                       <div><span className='inline-block '>Person to contact in case of Emergency:</span> </div>
                       <input type='text' onBlur={()=> SaveAvailable()} onChange={(e)=> setemerContact(e.target.value)} value={emerContact}  className='w-full h-[40px] sm:w-[60%] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                   </div>  
        
        
                   <div className='mb-2 flex flex-col sm:flex-row justify-between'>
                        <div><span className='inline-block '> Address:</span> </div>
                        <input type='text' onBlur={()=> SaveAvailable()} onChange={(e)=> setaddress(e.target.value)} value={address}  className='w-full h-[40px] sm:w-[60%] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                   </div>  
      
     
                   <div className='mb-2 flex flex-col sm:flex-row justify-between'>
                       <div><span className='inline-block '> Contact No.:</span>  <span className='text-[gray]'>Example "9123456789"</span></div>
                       <div className='flex flex-row w-[290px] items-center'><span className='shadow-inner px-2 py-1 shadow-gray-500/50 border-[1px] h-[40px] border-gray-200 rounded-md'>+63</span>
                   <input type='text' required className='shadow-inner h-[40px] w-full shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2 py-1 relative' 
                       onBlur={((e)=>{
                              if((contactNumber[0] == '9') && (contactNumber.length == 10)){ 
                                setcontactNumber(contactNumber)
                              }else{
                                  Swal.fire({
                                      icon: 'warning',
                                      title: 'Invalid input!!',
                                      text: ' Must start 9 and follow this format 9123456789',
                                      showConfirmButton: false,
                                      timer: 1500
                                  })
                                  setcontactNumber('')
                                  toDB['contactNumber'] = '+63'
                              }    
                              SaveAvailable()
                          })} 
                      value={Number(contactNumber)? Number(contactNumber):''}  
                      maxlength="10"
                      onChange={(e)=> {
                       if(isNaN(e.target.value))
                       { return alert("Must input numbers")}
                       setcontactNumber(e.target.value)
                       }} >
                   </input>
               </div>
                   </div>  
           </div>  
      
   </div>
        <div className='text-[blue]  fixed bottom-16 right-8 z-30 cursor-pointer flex flex-col '>
                <div  onClick={(()=>saveAll())} className="border-green-600 border-[2px] py-1 px-3 text-center active:bg-green-600 bg-green-500 hover:bg-green-600 text-white font-bold tracking-wider text-[15px] md:text-[20px] shadow hover:shadow-lg outline-none focus:outline-none rounded-md ease-linear transition-all duration-150">
                 SAVE
                </div>
                <div onClick={()=> close(null)} className=' z-30 py-1 my-2 px-3 border-gray-500 border-2 rounded-md cursor-pointer text-center text-black hover:bg-gray-300'>HIDE</div>
        </div>
      </div>

    </>
  )
}
