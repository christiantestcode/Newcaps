import {useState} from 'react'
import useStore from '../../Store/store';
import useStorePIS from '../../Store/storePIS';
import Axios from 'axios';


export default function Personalbg({next,refresh,load}) {

  
    const pisID = useStorePIS((state)=>state.pisID)
    const pisPb = useStorePIS((state)=>state.pb)
    const cUser = useStore(state => state.cUser)

   
    const [personalbg,setPersonalbg] = useState(pisPb)

    const SaveAvailable = () =>{
        next(2)
        finishLater()
        savetoDB()
    }
    

    const [lrn,setLrn]= useState(personalbg.lrn)
    const [lastname,setLastname]= useState(personalbg.lastname)
    const [firstname,setfirstname]= useState(personalbg.firstname)
    const [middlename,setmiddlename]= useState(personalbg.middlename)
    const [age,setage]= useState(personalbg.age)
    const [dateOfBirth,setdateOfBirth]= useState(personalbg.dateOfBirth)
    const [placeOfBirth,setplaceOfBirth]= useState(personalbg.placeOfBirth)
    const [gender,setgender]= useState(personalbg.gender)
    const [birthAmongSib,setbirthAmongSib]= useState(personalbg.birthAmongSib)
    const [citizenship,setcitizenship]= useState(personalbg.citizenship)
    const [religion,setreligion]= useState(personalbg.religion)
    const [civilStatus,setcivilStatus]= useState(personalbg.civilStatus)
    const [currentAddress,setcurrentAddress]= useState(personalbg.currentAddress)
    const [permanentAddress,setpermanentAddress]= useState(personalbg.permanentAddress)
    const [landline,setlandline]= useState(personalbg.landline)
    const [cellphoneNo,setcellphoneNo]= useState(cUser.contactNum)
    const [eMail,seteMail]= useState(personalbg.eMail)
    const [languageSpoken,setlanguageSpoken]= useState(personalbg.languageSpoken)


    const objectTopis = {
        lrn:lrn,
        lastname:lastname,
        firstname:firstname,
        middlename:middlename,
        age:age,
        dateOfBirth:dateOfBirth,
        placeOfBirth:placeOfBirth,
        gender:gender,
        birthAmongSib:birthAmongSib,
        citizenship:citizenship,
        religion:religion,
        civilStatus:civilStatus,
        currentAddress:currentAddress,
        permanentAddress:permanentAddress,
        landline:landline,
        cellphoneNo:cellphoneNo,
        eMail:eMail,
        languageSpoken:languageSpoken
    }

    const addPersonalbg = useStorePIS( state => state.addPersonalbg)

         const finishLater = ()=>{
            addPersonalbg(objectTopis)
            }

    const savetoDB = async (show) => {
        load(true)
        try{
          const response= await Axios.patch(`http://localhost:3600/pis`,
          {
            pisID:pisID,
            content:objectTopis,
            tableName:'personalBackground'
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
        <div className='text-[18px] font-bold'>I. Personal Background</div>
<div className=' w-full flex flex-col justify-around h-[50%] order'>
        <div className=' w-full justify-between items-center'>
                    <div className='my-2'>
                        <div>LRN:<span className='text-[15px] text-red-500'>*</span></div>
                        <input type='text' disabled className='w-full shadow-inner shadow-gray-500/50 border-[1px] p-1 border-gray-200 rounded-md px-2'
                        value={lrn}></input>
                    </div>
                    <div className='flex flex-row gap-x-6'>
                        <div className='mb-2 '>
                            <div>Age: <span className='text-[15px] text-red-500'>*</span></div>
                            <input type='number' min='10' max='99' required className='w-[50px] shadow-inner p-1 shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                            onChange={(e)=> setage(e.target.value)}
                            value={age}
                            ></input>

                        </div>
                        <div className='mb-2'>
                                <div>Gender: <span className='text-[15px] text-red-500'>*</span></div>
                                <select required name="gender" value={gender} className='p-1 shadow-inner shadow-gray-500/50 border-[1px] rounded-md ' 
                                onChange={(e)=>setgender(e.target.value) }>
                                    <option value=" "></option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                        </div>
                        <div className='mb-2'>
                            <div>Date of Birth: <span className='text-[15px] text-red-500'>*</span></div>
                            <input type='date' required className='p-1 w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                            onChange={(e)=> setdateOfBirth(e.target.value)}
                            value={dateOfBirth}
                            ></input>
                            
                        </div>
                    </div> 
               
            
            </div>


    <div className='w-full'>
              

                    <div className='mb-2'>
                        <div>Lastname: <span className='text-[20px] text-red-500'>*</span></div>
                        <input type='text' disabled className='p-1 w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                             value={lastname}></input>
                    </div>  

                    <div className='mb-2'>
                        <div>Firstname: <span className='text-[20px] text-red-500'>*</span></div>
                        <input type='text' disabled className='p-1 w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                         value={firstname}></input>
                    </div> 

                    <div className='mb-2'>
                        <div>Middlename:    </div>
                        <input type='text' disabled className='p-1 w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                        value={middlename}
                        ></input>
                    </div> 

                    
    </div>

        

</div>


        <div className=''>
            <div>Place of Birth: <span className='text-[15px] text-red-500'>*</span></div>
            <input type='text' required className='p-1 w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
           onChange={(e)=> setplaceOfBirth(e.target.value)}
           value={placeOfBirth}></input>
        </div>  

        <div className='p-1 flex flex-col sm:flex-row justify-start '>

                           
                                <div className='mb-2 '>
                                    <div>Religion: <span className='text-[15px] text-red-500'>*</span></div>
                                    <input type='text' required className='p-1 w-[150px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                    onChange={(e)=> setreligion(e.target.value)}
                                    value={religion}></input>
                                </div>
                        
                           
                                <div className=' mb-2 mx-4'>
                                    <div>Civil Status: <span className='text-[15px] text-red-500'>*</span></div>
                                    <select name="cars" id="cars" required className='p-1 w-[100px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                        onChange={(e)=> setcivilStatus(e.target.value)}
                                        value={civilStatus}>
                                        <option value=""></option>
                                        <option value="single">Single</option>
                                        <option value="married">Married</option>
                                    </select>
                                </div>
                          
                        

                        <div className='mb-2 '>
                                <div>Birth Among Siblings: </div>
                                <select name="cars" id="cars" required className='p-1 w-[100px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                    onChange={(e)=> setbirthAmongSib(e.target.value)}
                                    value={birthAmongSib}>
                                    <option value=""></option>
                                    <option value="eldest">Eldest</option>
                                    <option value="middle">Middle</option>
                                    <option value="youngest">Youngest</option>
                                    <option value="onlychild">Only Child</option>
                                </select>
                            
                        </div>
                        
        </div> 
                        <div className='flex flex-col sm:row justify-start '>
                                        <div className='mb-2'>
                                            <div>Citizenship: <span className='text-[20px] text-red-500'>*</span></div>
                                            <input type='text' required className='p-1 w-[150px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                            onChange={(e)=> setcitizenship(e.target.value)}
                                            value={citizenship}></input>
                                            
                                        </div>
                                        {/* <div className='mb-2 '>
                                            <div>Cellphone No.#: <span className='text-gray opacity-50'>Add in Account Details</span></div>
                                            <div  className='p-1 w-[150px] min-h-[25px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                            >{cellphoneNo}</div>
                                        </div> */}
                                        
                        </div> 
                        <div className='flex flex-col sm:flex-row justify-start '>
                                        <div className=' mb-2 '>
                                            <div>Email:</div>
                                            <input type='text' placeholder='example@gmail.com' required className='p-1 w-[240px]  shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                            pattern='[ñA-Za-z]*[a-z0-9]+@[a-z]+\.[a-z]{2,3}'
                                           onChange={(e)=> seteMail(e.target.value)}
                                            value={eMail}></input>
                                            
                                        </div>
                                        <div className=' mb-2 px-2'>
                                            <div>Landline:  </div>
                                            <input type='text' className='p-1 w-[180px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                            pattern='[0-9\-]+$'
                                            onChange={(e)=> setlandline(e.target.value)}
                                            value={landline}></input>
                                            
                                        </div>
                                        
                        </div> 
                        <div className='mb-2'>
                            <div>Current Address: <span className='text-[25px] text-red-500'>*</span></div>
                            <textarea required className='p-1 w-full shadow-inner shadow-gray-500/50 border-[1px] max-h-[50px] border-gray-200 rounded-md px-2'
                             onChange={(e)=> setcurrentAddress(e.target.value)}
                             value={currentAddress}></textarea>
                            
                        </div>
                        <div className='mb-2'>
                            <div>Permanent Address: <span className='text-[20px] text-red-500'>*</span></div>
                            <textarea required className='p-1 w-full shadow-inner shadow-gray-500/50 border-[1px] max-h-[50px] border-gray-200 rounded-md px-2'
                             onChange={(e)=> setpermanentAddress(e.target.value)}
                             value={permanentAddress}></textarea>
                            
                        </div>
                        <div className='mb-2'>
                            <div>Language /Dialect Spoken At home:</div>
                            <input type='text'  className='p-1 w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                             onChange={(e)=> setlanguageSpoken(e.target.value)}
                             value={languageSpoken}></input>
                            
                        </div>
                        <input className='bg-green-400 rounded-md my-2 px-4 py-1 w-full cursor-pointer hover:bg-green-500 p-1' 
                                type="submit"
                                value="NEXT"
                           />
              
                        <div className=' flex flex-row w-full justify-between sticky bottom-0 border-2 border-t-black border-transparent p-2 bg-white'>
                        
                          
                            <div className='bg-green-400 rounded-md px-4 py-2 w-fit cursor-pointer hover:bg-green-500'
                            onClick={()=> 
                                {
                                    savetoDB('true')
                                }
                            }>FINISH LATER</div>
                        </div>

                    {/* {opencover && 
                        <div onClick={()=> setOpencover(false)} className='bg-black cursor-pointer bg-opacity-50 rounded-md flex flex-col justify-center w-[98%] h-[78vh] overflow-auto shadow-md shadow-black absolute'>
                                <img src = {paper} alt='PIS' className='min-w-[300px] w-[200px] text-white rotate-160 mx-auto '/>
                                <p className='text-center text-[30px] font-bold font-[poppins] textS'>Personal Information Sheet</p>
                                <p className='text-center text-[20px] font-bold font-[poppins] textS'>"CLICK ANYWHERE"</p>
                        </div>} */}
        </form>
</>
  )
}
