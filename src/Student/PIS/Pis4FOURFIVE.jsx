import React,{useState} from 'react'
import useStorePIS from '../../Store/storePIS';
import Axios from 'axios';
import Swal from 'sweetalert2'
export default function Pis4FOURFIVE({next,refresh,load}) {

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
        next(5)
        finishLater()
        savetoDB()
       }


      const pisID = useStorePIS((state)=>state.pisID)
    const savetoDB= async (show)=>{
      load(true)
      try{
        const response= await Axios.patch(`http://localhost:3600/pis`,
        {
          pisID:pisID,
          content:toDB,
          tableName:'uniqueHealthCosult'
        })
        {show === 'true' ? refresh('finishL') : refresh() }
      }catch (err){
        if (!err?.response) {
          console.log(err)
        }
      }
    }


  return (
    <>
      <form onSubmit={SaveAvailable} className='bg-white rounded-md flex flex-col px-6 pt-2 w-[100%] xl:min-w-[900px] lg:min-w-[700px] max-h-[80vh] overflow-auto shadow-md shadow-black relative'>
 
      <div className=' px-4'>
                <div className='text-[18px] font-bold p-2 text-center'> IV. UNIQUE FEATURES</div>

                <div className='mb-2'>
                    <div>Friends in School:</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                      onChange={(e)=> setfriendsInschool(e.target.value)}
                      value={friendsInschool}
                    ></input>
                    
                </div>  
                <div className='mb-2'>
                    <div>Outside in School:</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                    onChange={(e)=> setoutsideInschool(e.target.value)}
                    value={outsideInschool}
                  ></input>
                    
                </div>  
                <div className='mb-2'>
                    <div>Special Interest:</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                    onChange={(e)=> setspecialInterest(e.target.value)}
                    value={specialInterest}
                  ></input>
                    
                </div>  
                <div className='mb-2'>
                    <div>Hobbies:</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                    onChange={(e)=> sethobbies(e.target.value)}
                    value={hobbies}
                  ></input>
                    
                </div>  
                <div className='mb-2'>
                    <div>Characteristics that described you best:</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                    onChange={(e)=> setcharacteristicsThatDescibeU(e.target.value)}
                    value={characteristicsThatDescibeU}
                  ></input>
                    
                </div>  
                <div className='mb-2'>
                    <div>Present Fears:</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                    onChange={(e)=> setpresentFears(e.target.value)}
                    value={presentFears}
                  ></input>
                    
                </div>  



                <div className='text-[18px] font-bold p-2 text-center'> V. HEALTH INFORMATION </div>

                  <div className='mb-2'>
                        <div>Disabilities/impairments:</div>
                      <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                      onChange={(e)=> setdisabilities(e.target.value)}
                      value={disabilities}
                    ></input>
                      
                  </div>  
                  <div className='mb-2'>
                        <div>Chronic Illness:</div>
                      <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                      onChange={(e)=> setchronicIllness(e.target.value)}
                      value={chronicIllness}
                    ></input>
                      
                  </div>  
                  <div className='mb-2'>
                        <div>Medicines regularily taken:</div>
                      <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                      onChange={(e)=> setmedicinesRegTaken(e.target.value)}
                      value={medicinesRegTaken}
                    ></input>
                      
                  </div>  
                  <div className='mb-2'>
                        <div>Accidents experienced/Effect:</div>
                      <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                      onChange={(e)=> setaccidentsExperienced(e.target.value)}
                      value={accidentsExperienced}
                    ></input>
                      
                  </div>  
                  <div className='mb-2'>
                        <div>Operations experienced/Effect:</div>
                      <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                      onChange={(e)=> setoperationsExp(e.target.value)}
                      value={operationsExp}
                    ></input>
                      
                  </div>  
                  <div className='mb-2'>
                        <div>Immunizations you had:</div>
                      <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                      onChange={(e)=> setimmunizations(e.target.value)}
                      value={immunizations}
                    ></input>
                      
                  </div>  

                  <div className='text-[18px] font-bold p-2 text-center'> PREVIOUS PSYCHOLOGICAL CONSULTATIONS </div>
                    {/* /////////////////////////////////////////////// */}
                    <div className='p-2 border-2 border-black mb-1'>
                        <div className='w-full flex flex-col sm:flex-row  justify-between '>

                                  <div className='w-full sm:w-[150px] md:w-fit'>Have you consulted a Psychiatrist before:</div>
                     
                              
                                  <div className='flex flex-col sm:flex-row'>
                                    <span className='flex flex-row'><input type='radio' readOnly checked={consultedPsy? false :true} name='psy' className='w-[30px] h-[20px]'/><span>NO</span></span>
                                    <span className='flex flex-row'><input type='radio' readOnly checked={consultedPsy? true :false} name='psy' className='w-[30px] h-[20px]'/><span>YES</span></span>
                                  </div>
                                  <div className='mb-4 w-full sm:w-[40%]'>
                                      <input type='text' onChange={(e)=> setconsultedPsy(e.target.value)} value={consultedPsy} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                      <div>If yes When:</div>
                                    </div>
                        </div>    
                        <div className='mb-2'>
                          <div>How many Sessions/how long:</div>
                            <input type='text' onChange={(e)=> sethowmanysessionPsy(e.target.value)} value={howmanysessionPsy} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                        </div>  
                        <div className='mb-2'>
                            <div>For What:</div>
                            <input type='text' onChange={(e)=> setforwhatPsy(e.target.value)} value={forwhatPsy} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                        </div>  
                        </div>

                {/* /////////////////////////////////////////////// */}
                <div className='p-2 border-2 border-black mb-1'>
                              <div className='w-full flex flex-col sm:flex-row justify-between '>

                                    <div className='w-full sm:w-[150px] md:w-fit'>Have you consulted a Counselor of Psychologist before:</div>
                     
                              
                                    <div className='flex flex-col sm:flex-row'>
                                      <span className='flex flex-row'><input type='radio' readOnly checked={consultedCoun? false :true} name='coun' className='w-[30px] h-[20px]'/><span>NO</span></span>
                                      <span className='flex flex-row'><input type='radio' readOnly checked={consultedCoun? true :false} name='coun' className='w-[30px] h-[20px]'/><span>YES</span></span>
                                    </div>

                                    <div className='mb-4  w-full sm:w-[40%] '>
                                      <input type='text' onChange={(e)=> setconsultedCoun(e.target.value)} value={consultedCoun} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                      <div>If yes When:</div>
                                    </div>
                              </div>    
                        <div className='mb-2'>
                            <div>How many Sessions/how long:</div>
                            <input type='text' onChange={(e)=> sethowmanysessionCoun(e.target.value)} value={howmanysessionCoun} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                        </div>  
                        <div className='mb-2'>
                            <div>For What:</div>
                            <input type='text' onChange={(e)=> setforwhatCoun(e.target.value)} value={forwhatCoun} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                        </div>  
                       
                </div>  
                <div className='p-2 border-2 border-black mb-1'>
                        <div className='mb-2 flex flex-col sm:flex-row justify-between'>
                            <div className='w-fit'>Person to contact in case of Emergency: <span className='text-[20px] text-red-500'>*</span>  </div>
                            <input type='text' required onChange={(e)=> setemerContact(e.target.value)} value={emerContact}  className='w-full sm:w-[60%] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                        </div>  
             
             
                        <div className='mb-2 flex flex-col sm:flex-row justify-between'>
                            <div className='w-fit'>Address: <span className='text-[20px] text-red-500'>*</span></div>
                            <input type='text' required onChange={(e)=> setaddress(e.target.value)} value={address}  className='w-full sm:w-[60%] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                        </div>  
           
          
                        <div className='mb-2 flex flex-col sm:flex-row justify-between'>
                            <div className='w-fit'>Contact Num.#: <span className='text-[20px] text-red-500'>*</span> <span className='text-[gray]'>Example "9123456789"</span></div>
                            {/* <input type='text'  required onChange={(e)=> setcontactNumber(e.target.value)} 
                            placeholder='+639123456789'
                            pattern='^(\+63)(\d){10}$'
                            value={contactNumber}  className='w-full sm:w-[60%] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input> */}
                            <div className='flex flex-row w-[290px] items-center'><span className='shadow-inner px-2 py-1 shadow-gray-500/50 border-[1px] border-gray-200 rounded-md'>+63</span>
                        <input type='text' required className='shadow-inner w-full shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2 py-1 relative' 
                            pattern='^(9)\d{9}$'
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
                <input className='bg-green-400 rounded-md px-4 py-2 w-full cursor-pointer hover:bg-green-500' 
                                  type="submit"
                                  value="NEXT"
                                />

            <div className=' flex flex-row w-full justify-between border-transparent sticky bottom-0 bg-white p-2'>
                                <div className='bg-red-400 rounded-md px-4 py-2 w-fit cursor-pointer hover:bg-red-500' 
                                onClick={()=>{
                                   next(3)
                                   finishLater()
                                   savetoDB()
                                }}>BACK</div>
                              
                                <div className='bg-green-400 rounded-md px-4 py-2 w-fit cursor-pointer hover:bg-green-500'
                                onClick={()=>{
                                  savetoDB('true')
                               }}>FINISH LATER</div>
                            </div>
        </div>
      </form>
    </>
  )
}
