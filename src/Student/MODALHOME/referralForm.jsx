
import React,{useEffect, useState} from 'react'
import { motion } from "framer-motion"
import Axios from 'axios';
import Swal from 'sweetalert2'
import { IoIosPersonAdd } from "react-icons/io";
import { BsPersonFillAdd } from "react-icons/bs";



export default function ReferralForm({close}) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      scale:[0.5,1],
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerDirection: -1
      }
    }
  }

            //teacher
              const [employeeID,setEmployeeID] = useState('')
              const [referredBy,setreferredBy] = useState('')
              const [teacherContactNum,setteacherContactNum] = useState('')
              const [designation,setdesignation] = useState('')

              const [agreetoCounsel,setagreetoCounsel] = useState('')

              const [reasonReferral,setreasonReferral] = useState('')
              const [initalActions,setinitalActions] = useState('')

              //student
              const [lrn,setlrn] = useState('')

              const [nameOfStudent,setnameOfStudent] = useState('')
              const [gradeLevel,setgradeLevel] = useState('')
              const [gender,setgender] = useState('')
              const [parentGuardian,setparentGuardian] = useState('')
              const [parentGuardianContact,setparentGuardianContact] = useState('')

              const todaydate = new Date();
              var dd = todaydate.getDate();
              var mm = todaydate.getMonth()+1; 
              var yyyy = todaydate.getFullYear();
        
              if(dd<10) {dd='0'+dd} 
              if(mm<10) { mm='0'+mm} 

              
              const sendRequest = {
                employeeID:employeeID,
                referredBy:referredBy,
                teacherContactNum:'+63'+teacherContactNum,
                designation:designation,
                agreetoCounsel:agreetoCounsel,
                reasonReferral:reasonReferral,
                initalActions:initalActions,

                lrn:lrn,
                nameOfStudent:nameOfStudent,
                gradeLevel:gradeLevel,
                gender:gender,
                parentGuardian:parentGuardian,
                parentGuardianContact:'+63'+parentGuardianContact,
                date:yyyy + "-" + mm + "-" + dd
              }


              const sendtherequest = async (e)=>{
                e.preventDefault()
                Swal.fire({
                  title: 'Double check your input?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Submit!!'
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    try{
                      const response= await Axios.post(`http://localhost:3600/referral`,{
                        content:sendRequest
                      })
                      
                        if(response){

                              try{
                                const response= await Axios.post(`http://localhost:3600/notification`,{
                                    type:'Counseling',
                                    message:`Teacher ${sendRequest.referredBy} create a referral request`,
                                    status:'unread'
                                })
                                      if(!response) { 
                                              console.log('server Error')
                                      }
                                      Swal.fire({
                                        icon: 'success',
                                        title: 'Request Sent!',
                                        text: 'Referral request submitted!!',
                                      })
                                      close(false)
                
                              }catch (err){
                                if (!err?.response) {
                                  console.log(err)
                                }
                              }
                            }
                      


                    }catch (err){
                        Swal.fire({
                          icon: 'error',
                          title: err.response.data
                        })
                    }
                  }
                })
              }
              
                const selectedStud = (studInfo) =>{
                   console.log(studInfo)
                  setlrn(studInfo.LRN)
                  setgradeLevel(studInfo.gradeLevel)
                  setnameOfStudent(studInfo.lastname+' '+studInfo.firstname + " " +studInfo.middlename)
                  const personal = (JSON.parse(studInfo.personalBackground))
                  setgender(personal.gender)
                  const families = (JSON.parse(studInfo.familyBackground))
                  if(families.father.name && families.father.contactNumber){
                    setparentGuardian(families.father.name)
                    setparentGuardianContact(families.father.contactNumber.slice(3))
                    Swal.fire({
                      icon: 'success',
                      title: 'Selected'
                    })
                    setstudentlist(false)
                  }else if(families.mother.name && families.mother.contactNumber){
                    setparentGuardian(families.mother.name)
                    setparentGuardianContact(families.mother.contactNumber.slice(3))
                    Swal.fire({
                      icon: 'success',
                      title: 'Selected'
                    })
                    setstudentlist(false)
                  }else 
                  if(families.guardian.name && families.guardian.contactNumber){
                    setparentGuardian(families.guardian.name)
                    setparentGuardianContact(families.guardian.contactNumber.slice(3))
                    Swal.fire({
                      icon: 'success',
                      title: 'Selected'
                    })
                    setstudentlist(false)
                    
                  }else{
                    setparentGuardian('')
                    setparentGuardianContact('')
                    Swal.fire({
                      icon: 'warning',
                      title: 'Oops...!',
                      text: `Student's P.I.S is incomplete!!`,
                    })
                    setstudentlist(false)

                  }
                }
              



            const [studentlist,setstudentlist] = useState(false) 

              const [students,setStudents] = useState([])
              const [tofilter,settofilter]= useState([])
              const getPisContent = async ()=>{
                try{
                    const response= await Axios.get(`http://localhost:3600/getStud`)
                        if(!response.data) return alert('ERROR')
                        console.log(response.data)
                        setStudents(response.data)
                        settofilter(response.data)
                  }catch (err){
                    if (!err?.response) {
                      console.log(err)
                    }
                  }
              }
              useEffect(()=>{
                getPisContent()
              },[])

              const filterstud = (e)=>{
                if(e){
                  setStudents(tofilter.filter((name)=> (name.lastname+name.firstname).includes(e) ))
                }else{
                  setStudents(tofilter)
                }
              }
            
  return (
    <>
  
    <form onSubmit={sendtherequest} className='w-full h-[full] overflow-y-auto overflow-x-hidden py-12 sm:p-4 font-[poppins] bg-white bg-opacity-90 rounded-b-md' >
         {/*content*/}
              <div className=''>
                                    {/*header*/}
                                    <div className="flex items-start justify-between border-b border-solid border-slate-200 text-[]  rounded-t mx-auto w-fit text-[20px] font-bold">
                                            Referral Form
                                     </div>
                                    {/*body*/} 
                                                <div className="relative flex flex-col ">

                                                <div className='flex flex-col md:flex-row justify-start items-center'>   
                                                    <div className='m-1 text-[18px] w-1/2 min-w-[310px]' >
                                                        <div>Employee ID:</div>
                                                        <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                        onChange={(e)=> setEmployeeID(e.target.value)}
                                                        value={employeeID}></input>
                                                    </div>  

                                                    <div className='m-1 text-[18px] w-1/2 min-w-[310px]' >
                                                        <div>Referred by: (Teacher Name)</div>
                                                        <input type='text' required className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                        onChange={(e)=> setreferredBy(e.target.value)}
                                                        value={referredBy}></input>
                                                    </div>  
                                                  </div>   

                                                  <div className='flex flex-col md:flex-row justify-start items-center'>   
                                                    <div className='m-1 text-[18px] w-1/2 min-w-[310px]' >
                                                        <div>Contact Number: <span className='text-[gray]'>Ex. "9123456789"</span> </div>
                                                        <div className='flex flex-row w-[290px] items-center'><span className='shadow-inner px-2 py-1 shadow-gray-500/50 border-[1px] border-gray-200 rounded-md'>+63</span>
                                                          <input type='text' required className='shadow-inner w-full shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2 py-1 relative' 
                                                              pattern='^(9)\d{9}$'
                                                          value={Number(teacherContactNum)? Number(teacherContactNum):''}  
                                                          maxlength="10"
                                                          onChange={(e)=> {
                                                              if(isNaN(e.target.value))
                                                              { return alert("Must input numbers")}
                                                              setteacherContactNum(e.target.value)
                                                              }} >
                                                          </input>
                                                        </div>
                                                    </div>  

                                                    <div className='m-1 text-[18px] w-1/2 min-w-[310px]' >
                                                        <div>Designation:</div>
                                                        <input type='text' required className=' w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                        onChange={(e)=> setdesignation(e.target.value)}
                                                        value={designation}></input>
                                                    </div>  
                                                  </div>   

                                                  <div onClick={()=> setstudentlist(true)} className='textS mx-auto my-1 flex flex-row gap-x-[15px] shadow-sm shadow-black px-[15px] items-center w-fit bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-md'>
                                                    <IoIosPersonAdd size={40}  className=' '/>
                                                    <span className=' font-bold text-white'>Search & Add Student</span>
                                                  </div>

                                                  <div className='flex flex-col md:flex-row justify-start items-center '>   

                                                    <div className='m-1 text-[18px] w-1/2 min-w-[310px]' >
                                                        <div>Name of Student:</div>
                                                        <input type='text' required className=' w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                        onChange={(e)=> setnameOfStudent(e.target.value)}
                                                        value={nameOfStudent}></input>
                                                    </div>  

                                                    <div className='flex flex-col m-1'>
                                                      <label className='text-[18px]'>Grade Level</label>
                                                      <select  onChange={(e)=>setgradeLevel(e.target.value)} value={gradeLevel} required className='w-[100px] h-[30px] px-2 text-[18px] shadow-inner shadow-gray-500/50 rounded-md' >
                                                              <option value={null}></option>
                                                              <option value="7">7</option>
                                                              <option value="8">8</option>
                                                              <option value="9">9</option>
                                                              <option value="10">10</option>
                                                              <option value="11">11</option>
                                                              <option value="12">12</option>
                                                          </select>
                                                    </div>
                                                    <div className='flex flex-col m-1'> 
                                                          <label className='text-[18px]'>Gender</label>
                                                          <select onChange={(e)=>setgender(e.target.value)} value={gender} required className='w-[100px] h-[30px] px-2 text-[18px] shadow-inner shadow-gray-500/50 rounded-md'   >
                                                                  <option value={null}></option>
                                                                  <option value="male">Male</option>
                                                                  <option value="female">Female</option>
                                                          </select>
                                                    </div>   
                                                  </div> 

                                                  <div className='flex flex-col md:flex-row justify-start items-center'>   
                                                    <div className='m-1 text-[18px] w-1/2 min-w-[310px]' >
                                                        <div>Guardian Name:</div>
                                                        <input type='text' className=' w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                         onChange={(e)=> setparentGuardian(e.target.value)}
                                                         value={parentGuardian}></input>
                                                    </div>  

                                                    <div className='m-1 text-[18px] w-1/2 min-w-[310px]' >
                                                        <div>Guardian Contact #: <span className='text-[gray]'>Ex. "9123456789"</span></div>
                                                        <div className='flex flex-row w-[290px] items-center'><span className='shadow-inner px-2 py-1 shadow-gray-500/50 border-[1px] border-gray-200 rounded-md'>+63</span>
                                                          <input type='text' className='shadow-inner w-full shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2 py-1 relative' 
                                                              pattern='^(9)\d{9}$'
                                                          value={Number(parentGuardianContact)? Number(parentGuardianContact):''}  
                                                          maxlength="10"
                                                          onChange={(e)=> {
                                                              if(isNaN(e.target.value))
                                                              { return alert("Must input numbers")}
                                                              setparentGuardianContact(e.target.value)
                                                              }} >
                                                          </input>
                                                        </div>
                                                    </div>  
                                                  </div>   

                                                  <div className='flex flex-col md:flex-row justify-between items-center'>   
                                  {/* Date of Referral: */}
                                                    <div className='mb-2 text-[18px] mx-2 flex flex-row'>
                                                        <div>Did the student agree to be referred to GCO?:</div>
                                                        <div>
                                                          <input type='radio'  onChange={(e)=> setagreetoCounsel(e.target.value)} className='w-[20px] h-[20px]'
                                                              name="referred"
                                                              value="yes" /> 
                                                              <span>Yes</span> 
                                                        </div>

                                                        <div>
                                                          <input type='radio'  onChange={(e)=> setagreetoCounsel(e.target.value)} className='w-[20px] h-[20px]'
                                                            name="referred"
                                                            value="no" /> 
                                                            <span>No</span> 
                                                        </div>
                                                    </div>  
                                                  </div>   

                                                  <div className='flex flex-col md:flex-row justify-between items-center'>   
                                                    <div className='m-1 text-[18px] w-1/2 min-w-[310px]' >
                                                        <div>Reason for Referral:</div>
                                                        <textarea type='text' required className=' w-full max-h-[150px] h-[60px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                          onChange={(e)=> setreasonReferral(e.target.value)}
                                                          value={reasonReferral}
                                                        ></textarea>
                                                    </div>  
                                                    <div className='m-1 text-[18px] w-1/2 min-w-[310px]'>
                                                        <div>Initial Actions Taken:</div>
                                                        <textarea type='text' required className=' w-full max-h-[150px] h-[60px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                             onChange={(e)=> setinitalActions(e.target.value)}
                                                             value={initalActions}
                                                        ></textarea>
                                                    </div>  
                                                  </div>   
                                                
                                                    
                                                </div>
                                    {/*footer*/}
                                            <div className="flex items-center justify-end border-t border-solid sm:p-2 border-slate-200 rounded-b">
                                          
                                                    <input
                                                        className="textS text-white-500 cursor-pointer bg-blue-500 hover:bg-blue-600 rounded-md hover:text-white shadow-black shadow-sm background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        
                                                        type='submit'
                                                        value='Send Request'
                                                     />
                                                   
                                            </div>
                     
              </div>
    </form>
         
        {studentlist && 
        <>
            <div className="absolute top-[8%] left-0 w-[100%] z-50 h-[1px] flex justify-center font-[poppins] min-w-[300px] ">
                                {/*content*/}
                                            <motion.div className="mx-auto z-50 border-0 rounded-lg shadow-lg fixed flex flex-col w-fit bg-[white] outline-none focus:outline-none"
                                              variants={container}
                                              initial="hidden"
                                              animate="show"> 
                                    {/*header*/}
                                                    <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                                                        <h3  className=" text-[black] w-full m-auto flex flex-col items-center">
                                                              <div className='text-[25px] break-words'>Select the student</div>
                                                              <input type='text' placeholder='Search Name' onChange={(e)=> filterstud(e.target.value)} className='w-[320px] py-[3px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                                        </h3>
                                                    </div>
                                    {/*body*/}
                                                <div className=" relative px-2 h-[300px] w-[350px] sm:w-full overflow-auto">
                                                  <div  className=' bg-white h-full w-fit bg-opacity-20 rounded-md shadow-sm  px-4 '>
                                                  <table className='min-w-[500px] text-left text-sm font-light font-[poppins] w-[500px] overflow-auto'>
                                                      <thead  className='border-b font-medium dark:border-neutral-500 sticky top-0  bg-white text-[15px]'>
                                                        <tr>
                                                          <th scope="col" className="px-6 py-[3px]">Last Name</th>
                                                          <th scope="col" className="px-6 py-[3px]">First Name</th>
                                                          <th cscope="col" className="px-6 py-[3px]">Middle Name</th>
                                                        </tr>
                                                      </thead>
                                                  <tbody >
                                                      {students && students.map((value,index)=>{
                                                      return   <tr key={index} className='border-b-[1px] py-[2px] border-black text-[16px]'>
                                                                  <td className="whitespace-nowrap px-6 py-[6px]">{value.lastname}</td>
                                                                  <td className="whitespace-nowrap px-6 py-[6px]">{value.firstname}</td>
                                                                  <td className="whitespace-nowrap px-6 py-[6px]">{value.middlename}</td>
                                                                  <td className="whitespace-nowrap px-6 py-[6px]"><BsPersonFillAdd size={30} 
                                                                  className='cursor-pointer hover:text-blue-500'
                                                                  onClick={()=> selectedStud(value)}/></td>
                                                                </tr>
                                                    })}
                                                     </tbody>
                                                  </table>
                                                  </div>
                                                </div>
                                    {/*footer*/}
                                            <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        className="text-white-500 hover:bg-red-500 rounded-md background-transparent text-black font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                      onClick={()=> setstudentlist(false)}
                                                    >
                                                        Close
                                                    </button>
                                            </div>
                                        </motion.div>
                                </div>
                         
        </>}
        {studentlist &&  <div className="opacity-75 fixed inset-0 z-40 bg-black "></div>}
    
    </>
  )
}
