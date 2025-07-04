import React,{useState,useEffect} from 'react'
import useStorePIS from '../../Store/storePIS';
import Axios from 'axios';
import Swal from 'sweetalert2'
import { FaAsterisk } from "react-icons/fa";


export default function StudPis({refresh,close}) {

    const pisID = useStorePIS((state)=>state.pisID)
    const pisPb = useStorePIS((state)=>state.pb)
    const [personalbg,setPersonalbg] = useState(pisPb)
    const [lrn,setLrn]= useState(personalbg.lrn)
    const [lastname,setLastname]= useState(personalbg.lastname)
    const [firstname,setfirstname]= useState(personalbg.firstname)
    const [middlename,setmiddlename]= useState(personalbg.middlename)
    const [suffix,setsuffix]= useState(personalbg.suffix)
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
    const [cellphoneNo,setcellphoneNo]= useState((personalbg.cellphoneNo.slice(3)))
    const [eMail,seteMail]= useState(personalbg.eMail)
    const [languageSpoken,setlanguageSpoken]= useState(personalbg.languageSpoken)

    
    const content = {
        lrn:lrn,
        lastname:lastname,
        firstname:firstname,
        middlename:middlename,
        suffix:suffix,
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
        cellphoneNo:'+63'+cellphoneNo,
        eMail:eMail,
        languageSpoken:languageSpoken
    }
    const InfoArray = [lastname,firstname,dateOfBirth,placeOfBirth,gender,birthAmongSib,citizenship,religion,civilStatus,currentAddress,cellphoneNo]
    
    
    const SaveAvailable = () =>{
        finishLater()
    }
    const addPersonalbg = useStorePIS( state => state.addPersonalbg)

    const finishLater = ()=> addPersonalbg(content)

    const savetoDB = async (theContent) => {
    
        try{
            const response= await Axios.patch(`http://localhost:3500/pis`,
            {
            pisID:pisID,
            content:theContent,
            tableName:'personalBackground'
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

    // const [progress,setProsress] =useState()
    // useEffect(()=>{
    //         const proggress=[]
    //         for (let i = 0; i < InfoArray.length; i++) {
    //             InfoArray[i] && proggress.push(InfoArray[i]) 
    //         }
    //         setProsress((proggress.length).toString())
            
    // },[content])

    function Checkkbox(){
        let theCheckbox = document.getElementById("checkboxAddress").checked
        if(theCheckbox){
            setpermanentAddress(currentAddress)
        }else{
            setpermanentAddress('')
        }
    }

    const dateOfBirthAndAge = (value) =>{
        setdateOfBirth(value)
            const date = new Date();
            let month = date.getMonth();
            let year = date.getFullYear();
            const date2 = new Date(value);
            let month2 = date2.getMonth();
            let year2 = date2.getFullYear();
            const theYear = `${year}` - `${year2}`
            const theMonth = `${month}` - `${month2}`

        if(theMonth < 0){
            setage( theYear - 1)
        }else if(theMonth > 0){
            setage(theYear)
        }
    }


    const updatedPB = useStorePIS((state)=>state.pb)
    const saveAll = () =>{
        savetoDB(updatedPB)
    }      
    

  return (
    <>
    <div className='bg-white flex flex-col p-4 w-full relative rounded-md '>
        {/* <div className='text-[18px] font-bold flex flex-col items-center lg:flex-row gap-[10px]'> */}
            {/* <div className=''>Progress:</div> */}
            {/* <div className='w-1/2 rounded-md flex items-center'>{progress && <progress id="file" value={progress} max="11" className='w-full rounded-md'></progress>}</div> */}
            {/* <div className='text-[blue]'>{progress === '11'? 'Complete':'Incomplete'}</div> */}
        {/* </div>  */}
        
        <div className='my-2 relative'>
            
            <div><span className='inline-block'>LRN:</span> </div>
            <input type='text' disabled value={lrn} className='w-1/2 h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
        </div>

        <div className='flex flex-col lg:flex-row gap-x-[10px] flex-wrap'>
            <div className='mb-2'>
                <div><span className='inline-block'>Lastname:</span> </div>
                <input type='text' value={lastname} onBlur={(()=> SaveAvailable())} onChange={(e)=> setLastname(e.target.value)} className='w-full h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
            </div> 
            <div className='mb-2'>
                <div><span className='inline-block'>Firstname:</span> </div>
                <input type='text' value={firstname} onBlur={(()=> SaveAvailable())} onChange={(e)=> setfirstname(e.target.value)} className='w-full h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/> 
            </div>
            <div className='mb-2'>
                <div>Middlename:</div>
                <input type='text' value={middlename} onBlur={(()=> SaveAvailable())} onChange={(e)=> setmiddlename(e.target.value)} className='w-full h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
            </div> 
            <div className='mb-2'>
                <div>Suffix:</div>
                <select name="grade" value={suffix} onBlur={(()=> SaveAvailable())} onChange={(e)=> setsuffix(e.target.value)}  className='w-fit h-[40px] cursor-pointer py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                    <option value=' '> </option>
                    <option value='Jr.'>Jr</option>
                    <option value="Sr.">Sr.</option>
                </select>   
            </div> 
            <div className='mb-2'>
                <div><span className='inline-block'>Gender:</span> </div>
                    <select name="gender" value={gender} className='w-[150px] h-[40px] cursor-pointer lg:w-fit shadow-inner shadow-gray-500/50 rounded-md' onBlur={(()=> SaveAvailable())}
                            onChange={(e)=>setgender(e.target.value) }>
                                <option value=" "></option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                    </select>
            </div>
            <div className='mb-2'>
                <div><span className='inline-block'>Date of Birth:</span> </div>
                <input type='date'  value={dateOfBirth} onBlur={(()=> SaveAvailable())} onChange={(e)=> dateOfBirthAndAge(e.target.value)} className='w-full h-[40px] cursor-pointer shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
            </div>
            <div className='mb-2 '>
                <div>Age:</div>
                {/* <input type='number' min='10' max='99' value={age} disabled className='w-[50px] h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/> */}
                <div className='w-[50px] h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2 text-center p-2'>{age}</div>
            </div>
        </div>
        <div className='mb-2'>
            <div><span className='inline-block'>Place of Birth:</span> </div>
            <textarea  value={placeOfBirth} onBlur={(()=> SaveAvailable())} onChange={(e)=> setplaceOfBirth(e.target.value)}  className='w-full shadow-inner shadow-gray-500/50 border-[1px] max-h-[50px] border-gray-200 rounded-md px-2'/>
        </div>  

        <div className='flex flex-col lg:flex-row gap-x-[10px] '>
            <div className='mb-2 '>
                <div><span className='inline-block'>Religion:</span> </div>
                <select name="Religion" id="Religion"  value={religion} onBlur={(()=> SaveAvailable())} onChange={(e)=> setreligion(e.target.value)} className='w-[150px] h-[40px] cursor-pointer shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                        <option value=""></option>
                        <option value="Islam">Islam</option>
                        <option value="Christian">Christian</option>
                        <option value="Protestant">Protestant</option>
                        <option value="Catholic">Catholic</option>
                        <option value="I.N.C">I.N.C</option>
                        <option value="Muslim">Muslim</option>
                </select>
            </div>
            <div className=' mb-2 '>
                <div><span className='inline-block'>Civil Status:</span> </div>
                    <select name="cars" id="cars"  value={civilStatus} onBlur={(()=> SaveAvailable())} onChange={(e)=> setcivilStatus(e.target.value)} className='w-[150px] h-[40px] cursor-pointer shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                        <option value=""></option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                    </select>
            </div>
            <div className='mb-2 '>
                <div><span className='inline-block'>Birth Among Siblings:</span> </div>
                    <select name="cars" id="cars"  value={birthAmongSib} onBlur={(()=> SaveAvailable())} onChange={(e)=> setbirthAmongSib(e.target.value)} className='w-[150px] h-[40px] cursor-pointer shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                        <option value=""></option>
                        <option value="eldest">Eldest</option>
                        <option value="middle">Middle</option>
                        <option value="youngest">Youngest</option>
                        <option value="onlychild">Only Child</option>
                    </select>  
            </div>
            <div className='mb-2'>
                <div><span className='inline-block'>Citizenship:</span> </div>
                <select name="citizenship" id="citizenship"  value={citizenship} onBlur={(()=> SaveAvailable())} onChange={(e)=> setcitizenship(e.target.value)} className='w-[150px] h-[40px] cursor-pointer shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                        <option value="Filipino">Filipino</option>
                </select> 
            </div>
        </div>
        <div className='flex flex-col lg:flex-row gap-x-[10px] w-full'>
            <div className=' mb-2 w-full'>
                <div><span className='inline-block'>Email:</span> </div>
                <input type='text' placeholder='example@gmail.com' pattern='[ñA-Za-z]*[a-z0-9]+@[a-z]+\.[a-z]{2,3}' value={eMail} onBlur={(()=> SaveAvailable())} onChange={(e)=> seteMail(e.target.value)} className=' w-full h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>                           
            </div>

            <div className=' mb-2 w-full'>
                <div>Landline:</div>
                <input type='text' pattern='[0-9\-]+$' value={landline} onBlur={(()=> SaveAvailable())} onChange={(e)=> setlandline(e.target.value)} className='w-full h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
            </div>      
            <div className='relative w-fit h-fit'>
                    <div className='text-[15px]'>Contact No: <span className='text-[gray]'>example "9123456789"</span></div>
                        <div className='flex flex-row w-[290px] items-center'><span className='shadow-inner px-2 py-1 shadow-gray-500/50 border-[1px] border-gray-200 h-[40px] rounded-md'>+63</span>
                            <input type='text' className='shadow-inner w-full shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2 py-1 h-[40px]' 
                                onBlur={((e)=>{
                                    if((cellphoneNo[0] == '9') && (cellphoneNo.length == 10)){ 
                                        setcellphoneNo(cellphoneNo)
                                    }else{
                                        Swal.fire({
                                            icon: 'warning',
                                            title: 'Invalid input!!',
                                            text: ' Must start 9 and follow this format 9123456789',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                       setcellphoneNo('')
                                       content.cellphoneNo = '+63'
                                    }    
                                    SaveAvailable()
                                })}
                                value={Number(cellphoneNo)? Number(cellphoneNo):''} 
                                maxLength="10"
                                onChange={(e)=> {
                                   if(isNaN(e.target.value)) { 
                                    return alert("Must input numbers")}
                                    setcellphoneNo(e.target.value)
                                   }}  
                                />
                        </div>
            </div>               
        </div> 
        <div className='mb-2'>
            <div><span className='inline-block'>Current Address:</span> </div>
            <textarea  value={currentAddress} onBlur={(()=> SaveAvailable())} onChange={(e)=> setcurrentAddress(e.target.value)}className='w-full shadow-inner shadow-gray-500/50 border-[1px] max-h-[50px] border-gray-200 rounded-md px-2'/>
        </div>
        <div className='mb-2'>
            <div className='flex flex-row gap-x-[10px]'>
                <div>Permanent Address:</div>
                <span className='text-[gray]'>The same as current address?</span>
                <div><input type="checkbox" id='checkboxAddress'  onChange={()=> Checkkbox()} /></div>
            </div>
            <textarea  value={permanentAddress} onBlur={(()=> SaveAvailable())} onChange={(e)=> setpermanentAddress(e.target.value)} className='w-full shadow-inner shadow-gray-500/50 border-[1px] max-h-[50px] border-gray-200 rounded-md px-2'/>
        </div>
        <div className='mb-2'>
            <div>Language /Dialect Spoken At home: <span className='text-[gray]'>example "tagalog , bicol"</span></div>
            <textarea  value={languageSpoken} onBlur={(()=> SaveAvailable())} onChange={(e)=> setlanguageSpoken(e.target.value)} className='w-full shadow-inner shadow-gray-500/50 border-[1px] max-h-[50px] border-gray-200 rounded-md px-2'/>
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
