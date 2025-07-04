import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import Axios from 'axios';
import Swal from 'sweetalert2'
import { RiDeleteBin4Fill } from "react-icons/ri";
import { MdEditNote } from "react-icons/md";
import EditCmodal from './editCmodal';
import PacmanLoader from "react-spinners/PacmanLoader";
import { RxCross2 } from 'react-icons/rx'
import Calendar from '../Request/calendar';

export default function CounselingR({student,studentStat,close}) {

    const container = {
      hidden: { opacity: 0 , scale:0},
      show: {
        scale:[0.5,1],
        opacity: 1,
        transition: {
              duration:.5,
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
      const getRecords = async (ress) =>{
        try{
            const response= await Axios.get(`http://localhost:3500/counselingRec/${studentStat.LRN}`)
            setrecordds(JSON.parse(response.data[0].counsellingRec))
            setTimeout(()=>{
              setloading(false)
              if(ress === 'add')
              return Swal.fire({
                icon: 'success',
                title: 'Record saved!',
                showConfirmButton: false,
                timer: 1500
              })

                if(ress === 'delete')
                return Swal.fire({
                  icon: 'success',
                  title: 'Deleted!!',
                  showConfirmButton: false,
                  timer: 1500
                })

                if(ress === 'update')
                return Swal.fire({
                  icon: 'success',
                  title: 'Record updated!!',
                  showConfirmButton: false,
                  timer: 1500
                })

            },500)
          }catch (err){
              console.log(err)
          }
      }

    useEffect(()=>{
        getRecords()
    },[])
    
    const [recordds,setrecordds] = useState('')

    const [addmodal,setaddmodal] =useState(false)

    const [nature,setnature] =useState('')
    const [results,setresult] =useState('')
    const [date,setdate] =useState('')

    const [others,setothers] =useState('')
    const [resothers,setresothers] =useState('')

    function eventType(e){
        if(e === 'Others'){
          setothers(true)
        }else{
          setnature(e)
          setothers(false)
        }
    }

    function reseventType(e){
        if(e === 'Others'){
            setresothers(true)
        }else{
            setresult(e)
          setresothers(false)
        }
    }

    const save = () =>{
        if(!nature || !results || !date)
        return Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Input empty field!!',
            showConfirmButton: false,
            timer: 1500
          })
          Swal.fire({
            title: 'Double check your input?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save!!'
          }).then( async (result) => {
            if (result.isConfirmed) {
              setloading(true)
                try{
                    const response= await Axios.post(`http://localhost:3500/counselingRec`,
                    {
                      lrn:studentStat.LRN,
                      nature:nature,
                      result:results,
                      date:date,
                      oldRec:recordds
                    })
                    if(response){
                        setaddmodal(false)
                        setnature('')
                        setresult('')
                        setdate('')
                        getRecords('add')
                    }
                    
                        
                  }catch (err){
                      console.log(err)
                  }
            }
          })
      
    }
    const [editValue,seteditValue] =useState('')
    const [editmodal,seteditmodal] =useState(false)

    const deleteR = (index) =>{
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete!!'
          }).then( async (result) => {
            if (result.isConfirmed) {
              setloading(true)
                recordds.splice(index, 1)
                try{
                    const response= await Axios.patch(`http://localhost:3500/counselingRec`,
                    {
                      lrn:studentStat.LRN,
                      newR:recordds
                    })
                    
                    if(response){
                      getRecords('delete')
                    }
                    
                  }catch (err){
                      console.log(err)
                  }

            }
          })
      
    }
    const [loading,setloading] = useState(true)

    const [reason,setreason] = useState(true)  
    
    const theReason = (rea) =>{
      setaddmodal(true)
      setreason(rea)
    }

   

  return (
    <>
            {loading ?
                <>
                  <div className=' inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-50 ' >
                    <PacmanLoader speedMultiplier={2} color={'white'}/>
                  </div>
                  </>
                :<>
      <div className="absolute h-[100vh] left-0 top-0 w-full z-50 flex justify-center items-center font-[poppins] min-w-[300px] ">
  
          <div className="opacity-75 fixed inset-0 z-10 bg-black "></div>

          <motion.div className="z-10 mx-auto max-h-[470px] h-[100vh]  overflow-auto border-0 rounded-lg shadow-lg fixed flex flex-col w-fit bg-[white] outline-none focus:outline-none"
              variants={container}
              initial="hidden"
              animate="show"> 
            
                <div className='z-10 px-2 bg-white overflow-auto h-full w-[310px] lg:w-full relative'>
                  <div onClick={(()=>close(false))} className='absolute right-0 cursor-pointer'><RxCross2 size={35}/></div>
                  <div className=' font-bold overflow-auto font-[poppins] text-center px-2 pt-2 rounded-t-md bg-white'>
                    <div className=' rounded-md py-1  text-[22px]'>Counseling Records</div>
                  </div>
              
                        <table className='w-full min-w-[800px]  text-left text-sm font-light font-[poppins] overflow-auto'>
                            <thead className='border-b font-medium dark:border-neutral-500 bg-white border-2 border-black sticky top-0'>
                                <tr className='font-bold'>
                                    <th scope="col" className="px-6 py-[10px] text-[17px]">Nature of Test</th>
                                    <th scope="col" className="px-6 py-[10px] text-[17px] text-center">Result</th>
                                    <th scope="col" className="px-6 py-[10px] text-[17px] text-center">Date of Counseling</th>
                                    {/* <th scope="col" className="px-6 py-[10px] text-[17px]">Options</th> */}
                                </tr>
                            </thead>
                            {!recordds[0]? 
                            <tbody>
                                <tr>
                                    <td className='text-[30px] py-2'>NO RECORD</td>
                                </tr>
                            </tbody>
                            :<>
                              {recordds && recordds.map((value,index)=>{
                                  return   <tbody key={index}>
                                  <tr className="border-b dark:border-neutral-500 text-[18px]">
                                      <td className="whitespace-nowrap px-6 py-[8px]">{value.nature}</td>
                                      <td className="whitespace-nowrap px-6 py-[8px] text-center">{value.result}</td>
                                      <td className="whitespace-nowrap px-6 py-[8px] text-center">{value.date}</td>
                                      {/* <td >
                                          <span onClick={()=>{
                                                  seteditValue({valueV:value,indexV:index})
                                                  seteditmodal(true)
                                              }} className='bg-blue-500 cursor-pointer rounded-md mx-1 font-bold textS px-2 text-[15px] hover:bg-blue-600'>edit</span>
                                          <span onClick={()=>{
                                                  deleteR(index)
                                              }} className='bg-red-500 cursor-pointer rounded-md font-bold textS px-2 text-[15px] hover:bg-red-600'>delete</span>
                                      </td> */}
                                  </tr>
                              </tbody>
                              })}
                            </>}
                        </table>
                </div> 

                <div className='text-[18px] font-[poppins] text-center p-2 rounded-b-md bg-white cursor-pointer '>
                  <div className='w-full flex flex-row gap-4'>
                    <button onClick={()=>theReason('follow')}
                                className="border-green-600 border-[2px] active:bg-green-600 bg-green-500 hover:bg-green-600 text-white  tracking-wider  py-1 rounded-md hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                                type="button">
                                 For follow up
                    </button>
                    <button onClick={()=>theReason('self')}
                                className="border-green-600 border-[2px] active:bg-green-600 bg-green-500 hover:bg-green-600 text-white  tracking-wider  py-1 rounded-md hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                                type="button">
                                Self Referral
                    </button>
                  </div>
                </div>

          </motion.div>
          
          {addmodal && <div  className="opacity-15 fixed inset-0 z-40 bg-black "> </div> }                    
      </div>

            </>}
          
            {addmodal &&
             <div className='z-50 '>
             <Calendar close={setaddmodal} close2={close} value={studentStat} type={'appointment'} reason={reason} load={setloading}/>
             </div>}
             
         
                    
            {/* {editmodal && <EditCmodal refresh2={getRecords} lrn={studentStat.LRN} value={editValue} records={recordds} close={seteditmodal} load={setloading}/>} */}
             {/* {editmodal &&  <div className="opacity-50 fixed inset-0 z-40 bg-black block"></div>} */}
    </>
  )
}
