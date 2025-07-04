import React,{useState,useEffect,useRef} from 'react'
import {BsFillPersonFill} from "react-icons/bs";
import Axios from 'axios';
import Swal from 'sweetalert2'
import { motion } from "framer-motion"
import {RxCross2} from 'react-icons/rx'

export default function AddStudents({close,refresh,load}) {
    const container = {
        hidden: { opacity: 0 },
        show: {
          scale:1,
          opacity: 1,
          transition: {
            delayChildren: 0.5,
            staggerDirection: -1
          }
        }
      }

    const [lrn,setLrn] = useState('')
    const lrnRef = useRef()

    const [lastname,setlastname] = useState('')
    const [firstname,setfirstname] = useState('')
    const [middlename,setmiddlename] = useState('')
    const [suffix,setsuffix] = useState('')
    
    const [gradeL,setgradeL] = useState('')

    function ProperCase(name){
      
        const nameTrim = name.replace(/\s+/g,' ').trim()
        const nameCount = nameTrim.split(' ')

       
        if(nameCount.length === 1){
          const firstLetter = nameTrim[0].toUpperCase()
          const textArray = nameTrim.split("")
          textArray.splice(0, 1)
          const follotingLetters = (textArray.join("")).toLowerCase()
          return firstLetter+follotingLetters
        }else {
            const nameToReturn = []
            for (let i = 0; i < nameCount.length; i++) {
              const names = nameCount[i]
              const firstLetter = names[0].toUpperCase()
              const textArray = names.split("")
              textArray.splice(0, 1)
              const followingLetters = (textArray.join("")).toLowerCase()
              nameToReturn.push(firstLetter+followingLetters)
            }
            return nameToReturn.join(" ")
        }
       
    }

    useEffect(()=>{
        lrnRef.current.focus();
    },[])


    

    const saveTODB = async () => {


      if(!lrn || !lastname || !firstname || !gradeL){
        return Swal.fire({
          icon: 'error',
          title: 'empty input!', 
          text: 'input field empty!!',
          showConfirmButton: false,
          timer: 1500
        })
      }


      if(!(lrn.length === 12)){
        return Swal.fire({
          icon: 'error',
          title: 'Invalid input!', 
          text: 'LRN must be exact 12 numbers',
          showConfirmButton: false,
          timer: 1500
        })
      }

      try{
        const response= await Axios.get(`http://localhost:3500/lrnExist/${lrn}`)
   
        const existting = response.data[0]?true:false
        if(existting){
          return Swal.fire({
            icon: 'error',
            title: 'Invalid Input!', 
            text: 'LRN already exist!!',
            showConfirmButton: false,
            timer: 1500
          })
        }

      }catch (err){
          console.log(err)
      }
      
     
      Swal.fire({
        title: 'Are you sure?',
        text:"Please double check Inputs?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm'
      }).then( async (result) => {
        if (result.isConfirmed) {
          load(true)
        try{
            const response= await Axios.post(`http://localhost:3500/studentAccount`,{
                lrn:lrn,
                lastname:ProperCase(lastname),
                firstname:ProperCase(firstname),
                middlename:middlename ? ProperCase(middlename) : middlename,
                suffix:suffix,
                gradeL:gradeL
            })
            close(false)
            refresh('add')
          }catch (err){
              console.log(err)
          }
        }
      })
    }

  return (
    <>
      
        <div className="absolute top-[10%] left-0 w-[100%] h-[1px] z-50 flex justify-center font-[poppins] min-w-[300px] ">
        {/*content*/}
                    
                    <motion.div className="mx-auto border-0 rounded-lg shadow-lg fixed flex flex-col w-fit bg-[white] outline-none focus:outline-none"
                      variants={container}
                      initial="hidden"
                      animate="show"> 
            {/*header*/}  
                            <div className="flex items-start justify-between py-2 border-b border-solid border-slate-200 rounded-t">
                                <h3  className=" text-[black] w-full m-auto flex flex-col items-center text-[20px]">
                                    Enter details
                                </h3>
                            </div>
            {/*body*/}
                        <div className="flex flex-col px-4 py-3 z-50 font-[poppins] w-[360px]">
                       
                              <div>
                                <div>LRN: <span className='text-[15px] text-red-500'>*</span></div>
                                <input type='number' 
                                pattern={/[0-9]{12}/}
                                ref={lrnRef}
                                onChange={(e)=> setLrn(e.target.value) }
                                value={lrn}
                                className='w-full py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                           
                                <div>Last Name: <span className='text-[15px] text-red-500'>*</span></div>
                                <input type='text' 
                                onChange={(e)=> setlastname(e.target.value) }
                                value={lastname}
                                className='w-full py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                           
                                <div>First Name: <span className='text-[15px] text-red-500'>*</span></div>
                                <input type='text' 
                                onChange={(e)=> setfirstname(e.target.value) }
                                value={firstname}
                                className='w-full py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                              
                                <div>Middle Name:</div>
                                <input type='text' 
                                onChange={(e)=> setmiddlename(e.target.value) }
                                value={middlename}
                                className='w-full py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>

                                <div className=' flex flex-row gap-x-[20px]'>
                                    <div>
                                      <p>Suffix: </p>
                                      <select name="grade" onChange={(e)=> setsuffix(e.target.value)} value={suffix} className='w-fit py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                            <option value=' '> </option>
                                            <option value='Jr.'>Jr</option>
                                            <option value="Sr.">Sr.</option>
                                      </select>
                                    </div>
                                    <div>
                                      <p>Grade Level: <span className='text-[15px] text-red-500'>*</span></p>
                                      <select name="gradeLevel" id="gradeLevel" 
                                      onChange={(e)=> setgradeL(e.target.value) }
                                      value={gradeL}
                                      className='text-[18px] focus:outline-none w-fit shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                              <option value="">--</option>
                                              <option value="7">7</option>
                                              <option value="8">8</option>
                                              <option value="9">9</option>
                                              <option value="10">10</option>
                                              <option value="11">11</option>
                                              <option value="12">12</option>
                                        </select>
                                    </div>
                                </div>

                              </div>
                                    
                        </div>
            {/*footer*/}
                    <div className="flex items-center justify-between px-2 py-2 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="border-gray-600 border-[2px] text-black active:bg-gray-600 hover:bg-gray-500 hover:text-white font-bold text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button" 
                                onClick={()=> close(false)}>
                                 Close
                            </button>
                            <button
                                className="border-green-600 border-[2px] active:bg-green-600 bg-green-500 hover:bg-green-600 text-white font-bold tracking-wider text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=> saveTODB()}>
                                 Save
                            </button>
                    </div>
                </motion.div>
        </div>
     <div onClick={()=> close(false)} className="opacity-75 fixed inset-0 z-40 bg-black ">d</div>
  
    </>
  )
}
