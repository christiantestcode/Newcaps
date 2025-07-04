import React,{useState} from 'react'
import AddEducbg from '../../Student/PIS/MODALS/addEducationalBG';
import useStorePIS from '../../Store/storePIS';
import Axios from 'axios';
import Swal from 'sweetalert2'
import { FaAsterisk } from "react-icons/fa";

export default function Studpis3({refresh,close}) {
    

    const educBG = useStorePIS((state)=>state.educBG)
    const fromDB = useStorePIS((state)=>state.educBG2)

    const SaveAvailable = (e) =>{
            finishLater()
     }

    const pisID = useStorePIS((state)=>state.pisID)

    const removeSiblings = async (index) =>{
        educBG.splice(index,1)

        const updatededuBG = educBG       
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then( async (result) => {
            if (result.isConfirmed) {
                try{
                    const response= await Axios.patch(`http://localhost:3500/pis`,
                    {
                      pisID:pisID,
                      content:updatededuBG,
                      tableName:'educationalInformation'
                    })
                      Swal.fire({
                          icon: 'success',
                          title: 'Deleted!',
                          showConfirmButton: false,
                        })
                        refresh()
                  }catch (err){
                    if (!err?.response) {
                      console.log(err)
                    }
                  }
            }
          })
      
    }

        const addeducBG2 = useStorePIS( state => state.addeducBG2)

         const finishLater = ()=>{
          
            addeducBG2(toDB)
            }


    const [subjectWithLowestGrade,setsubjectWithLowestGrade]= useState(fromDB.subjectWithLowestGrade)
    const [subjectWithHighestGrade,setsubjectWithHighestGrade]= useState(fromDB.subjectWithHighestGrade)
    const [awards,setawards]= useState(fromDB.awards)

     
    const [fourpis,setfourpis]= useState(fromDB.newscholarship.fourpis)
    const [cibi,setcibi]= useState(fromDB.newscholarship.cibi)
    const [sistersCharity,setsistersCharity]= useState(fromDB.newscholarship.sistersCharity)
    const [others,setothers]= useState(fromDB.newscholarship.others)


    const toDB= {
        subjectWithLowestGrade:subjectWithLowestGrade,
        subjectWithHighestGrade:subjectWithHighestGrade,
        awards:awards,
        newscholarship:{
            fourpis:fourpis,
            cibi:cibi,
            sistersCharity:sistersCharity,
            others:others
            }
    }
    const updateEduc2 = async (content) =>{
                try{
                    const response= await Axios.patch(`http://localhost:3500/pis`,
                    {
                      pisID:pisID,
                      content:content,
                      tableName:'educbg2'
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

    const [showaddEducbg,setshowaddEducbg] = useState(false)

    const updatededucBG2 = useStorePIS((state)=>state.educBG2)

    const saveAll = () =>{
        updateEduc2(updatededucBG2)
    }   

  return (
    <>
       <div className='bg-white rounded-md px-4 flex flex-col overflow-auto overflow-x-hidden shadow-md shadow-black'>

<div className='  '>
     <div><span className='inline-block text-[18px] font-bold p-2 '>Schools Attended:</span> </div>
           {educBG.map((value,index)=>{
               return <div key={index} className='border-2 relative border-b-black border-transparent'>
                    <div onClick={()=> removeSiblings(index)} className='bg-red-600 text-white cursor-pointer absolute top-0 right-0 rounded-md hover:bg-red-700 px-2'>X</div>
                   <div className='flex flex-col sm:flex-row justify-between'>
                       
                       <div className='mb-4 w-[15%]'>
                           <div className='w-[90px]'>Grade Level</div>
                           <input type='text' disabled value={value.gradeLevel} className='w-[70px] h-[40px] text-center shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                           
                       </div>
                       <div className='mb-4 sm:w-[40%]'>
                           <div>School Attended</div>
                           <textarea type='text' disabled value={value.schoolAttended} className='w-full max-h-[50px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></textarea>
                           
                       </div>
                       <div className='mb-4 sm:w-[40%]'>
                           <div>Inclusive Years of Attended</div>
                           <textarea type='text' disabled value={value.inclusiveYearsAttended} className='w-full max-h-[50px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></textarea>
                           
                       </div>
                   </div>         
               </div>
           })}
               <div className=' flex flex-row w-full justify-between border-2 border-t-black border-transparent p-2'>
                   <div onClick={()=> setshowaddEducbg(true)} className='bg-green-400 rounded-md px-4 py-2 w-full cursor-pointer hover:bg-green-500 text-center'>ADD</div>
               </div>
               <div className='mb-2'>
                           <div>Subject with the Lowest Grade</div>
                           <input type='text' className='w-full shadow-inner h-[40px] shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                            onBlur={()=> SaveAvailable()}
                            onChange={(e)=> setsubjectWithLowestGrade(e.target.value)}
                            value={subjectWithLowestGrade}></input>
                           
                       </div> 
               <div className='mb-2'>
                           <div>Subject with the Highest Grade</div>
                           <input type='text' className='w-full shadow-inner h-[40px] shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                           onBlur={()=> SaveAvailable()}
                           onChange={(e)=> setsubjectWithHighestGrade(e.target.value)}
                           value={subjectWithHighestGrade}></input>
                           
                       </div> 
               <div className='mb-2'>
                           <div>Awards Honors Received</div>
                           <input type='text' className='w-full shadow-inner h-[40px] shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                           onBlur={()=> SaveAvailable()}
                           onChange={(e)=> setawards(e.target.value)}
                           value={awards}></input>
                           
                       </div> 
               <div className='mb-2'>
                       <div className='text-[20px] text-center'>Membership in Organization</div>
                       <div className='flex flex-row flex-wrap justify-around items-center'>
                           <div><input type='checkbox' onBlur={()=> SaveAvailable()} onClick={(e)=>setfourpis(!fourpis)} checked={fourpis && true} readOnly className='w-[20px] h-[20px]'/> <span>4ps Beneficiary</span>  </div>
                           <div><input type='checkbox' onBlur={()=> SaveAvailable()} onClick={(e)=>setcibi(!cibi)} checked={cibi && true} readOnly className='w-[20px] h-[20px]'/> <span>CIBI</span> </div>
                           <div><input type='checkbox' onBlur={()=> SaveAvailable()} onClick={(e)=>setsistersCharity(!sistersCharity)} checked={sistersCharity && true} readOnly className='w-[20px] h-[20px]'/> <span>Sisters of Charity </span> </div>
                           <div><input type='checkbox'  checked={others && true} readOnly className='w-[20px] h-[20px]'/> <span>Other's</span> 
                           <input type='text' onBlur={()=> SaveAvailable()} onChange={(e)=>setothers(e.target.value)} value={others} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input> </div>
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
{showaddEducbg && <AddEducbg close={setshowaddEducbg} refresh={refresh}/> }
    </>
  )
}
