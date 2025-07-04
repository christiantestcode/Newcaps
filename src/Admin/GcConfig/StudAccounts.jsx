import React,{useEffect, useState} from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import AddStudents from './AddStudents'
import {RxCross2} from 'react-icons/rx'
import PacmanLoader from "react-spinners/PacmanLoader"
import { MdDelete , MdDeleteSweep , MdManageAccounts } from 'react-icons/md';
import { BsPersonFillAdd } from 'react-icons/bs';
import { Tooltip } from "@material-tailwind/react";
import { motion } from "framer-motion"
import { BiSkipNext , BiSolidRightArrow } from "react-icons/bi";
import { BsPersonFillCheck , BsPersonFillX  } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { CgImport } from "react-icons/cg";
import InsertExcel from './InsertExcel';
import EditStudents from './EditStudents'
import EditCmodal from '../GuidanceR/editCmodal'

export default function StudAccounts({close,modal}) {

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
        }
    }

    const [students,setStudents] = useState([])
    const [toFilter,settoFilter] = useState([])

    const getPisContent = async (ress)=>{
        try{
            const response= await Axios.get(`http://localhost:3500/getStud/${'account'}`)
                if(!response.data) return alert('ERROR')

                setTimeout(()=>{
                    setgradefilter('all')
                    setStudents(response.data)
                    settoFilter(response.data)
                    if(ress === 'add')
                    return   Swal.fire({
                        icon: 'success',
                        title: 'Student Added!',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    if(ress === 'edit')
                    return Swal.fire({
                        icon: 'success',
                        title: 'Changes saved', 
                        showConfirmButton: false,
                        timer: 1500
                })
                setloading(false)
                },500)
                
          }catch (err){
            if (!err?.response) {
              console.log(err)
            }
          }
      }
    useEffect(()=>{
        getPisContent()
    },[])

    const [addStud,setaddStud] = useState(false)
    const [editStud,seteditStud] = useState(false)
    const [gradefilter,setgradefilter] = useState('all')
    const [filterSearch,setfilterSearch] = useState('')

    const filterstud = (e)=>{
        setfilterSearch(e)
        setgradefilter('all')
        if(e){
           if(gradefilter === 'all' ){
               return setStudents(toFilter.filter((stud)=> (stud.lastname).includes(e)))
            }else{
                return setStudents(toFilter.filter((stud)=> stud.gradeLevel === gradefilter).filter((stud)=> (stud.lastname).includes(e)))
            }
        }
        if(gradefilter === 'all' ){
            return setStudents(toFilter)
         }else{
             return setStudents(toFilter.filter((stud)=> stud.gradeLevel === gradefilter))
         }
    }

    const filtergrade = (e)=>{
        setgradefilter(e)
        if(e === 'all') return setStudents(toFilter)

        setStudents(toFilter.filter((stud)=> (stud.gradeLevel) === (e)))
        setfilterSearch('')
    }

    const changeStatusAll = () =>{
        Swal.fire({
            title: 'Are you sure?',
            text:"This action will In-active? grade 12 accounts",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm!'
          }).then( async (result) => {
            if (result.isConfirmed) {
                setloading(true)
                try{
                    const response= await Axios.patch(`http://localhost:3500/setStatus`)
                    if(!response.data) {
                        setloading(false)
                        close(false)
                    return Swal.fire({
                       icon: 'warning',
                       title: 'No accounts found!', 
                       text: 'There are no existing Gr 12 account!!',
                       showConfirmButton: false,
                       timer: 2000
                    })}
                    if(response.data) 
                        setloading(false)
                        close(false)
                        return  Swal.fire({
                            icon: 'success',
                            title: 'Success!', 
                            showConfirmButton: false,
                            timer: 1500})
                          
                    }catch (err){
                        if (!err?.response) {
                        console.log(err)
                        }
                    }
            }
          })
    }

    const [loading,setloading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 12
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    const records = students && students.slice(firstIndex,lastIndex);
    const npage = Math.ceil(students.length /recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    function prePage(){
        if(currentPage !== 1){
                setCurrentPage(currentPage - 1 )
        }
    }
    function nextPage(){
        if(currentPage !== npage){
                setCurrentPage(currentPage + 1 )
        }
    }

    const diplayPages = [currentPage-2,currentPage-1,currentPage,currentPage+1,currentPage+2]  

    const SetStatus = (status,id) =>{
        Swal.fire({
            title: status === 'Active'? 'Set In-Active?' : 'Set Active?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
          }).then( async (result) => {
            if (result.isConfirmed) {
                setloading(true)
                try{
                        const response= await Axios.patch(`http://localhost:3500/getStud`,{
                            type:'status',
                            content:{
                                status: status === 'Active'? 'In-active' : 'Active',
                                accountId:id
                            }
                    })
                        if(response.data) 
                            getPisContent()
                            setloading(false)
                            return  Swal.fire({
                                icon: 'success',
                                title: 'Success!', 
                                text: 'Accounts status changed!',
                                showConfirmButton: false,
                                timer: 1500})
                    }catch (err){
                        if (!err?.response) {
                        console.log(err)
                        }
                    }
            }
          })
    }

    const [insertExcel,setinsertExcel] = useState(false)

  return (
    <>
            {loading &&
            <>
                <div className='inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-50 ' >
                    <PacmanLoader speedMultiplier={2} color={'white'}/>
                </div>
            </>}
            <>
            
                <div className="absolute h-[100vh] left-0 top-0 w-full z-40 font-[poppins] min-w-[300px] ">
                
                    <div className="z-40 relative w-full h-[100vh] flex items-start py-10 justify-center "> 
                        
                        {/* <div onClick={(()=>close(false))} className="absolute top-0 left-0 z-30 text-red-500 md:text-white cursor-pointer"><RxCross2 size={35}/></div> */}
<div className="opacity-50 fixed inset-0 z-10 bg-black "onClick={(()=>close(false))}/>
                        <div className='w-full md:w-[80%] max-h-[600px] h-fit items-start z-20 font-[poppins] bg-white rounded-t-md'>

                            <div className='mx-auto flex flex-col md:flex-row w-full justify-between items-center px-[50px] py-2 pt-[20px] relative'>
                                <div onClick={(()=>close(false))} className="absolute top-1 right-1 z-30 text-black cursor-pointer"><RxCross2 size={35}/></div>
                                
                                <p className='text-[25px] text-gray-600 font-bold text-center'>Student Account</p>
                        
                                <div className='flex flex-col md:flex-row items-center'>
                                    <div className='flex flex-row'>
                                        {gradefilter === '12' &&
                                        <Tooltip content="In-Active Accounts" placement="bottom" className=' text-[11px] z-50 px-1 bg-orange-600 ' animate={{mount: { scale: 1.5, y: 10,  x:1 },unmount: { scale: 0, y: 0, x:0 }, }}>
                                            <div onClick={()=> changeStatusAll()} className='bg-orange-500 hover:bg-orange-600 p-1 rounded-md textS mx-1 cursor-pointer text-white'><MdManageAccounts size={28}/></div>
                                        </Tooltip>}
                                        <Tooltip content="Add Account" placement="bottom" className=' text-[11px] z-50 px-1 bg-blue-600 ' animate={{mount: { scale: 1.5, y: 10,  x:1 },unmount: { scale: 0, y: 0, x:0 }, }}>
                                            <div onClick={()=> setaddStud(true)} className='bg-green-500 hover:bg-green-600 p-1 rounded-md textS mx-1 cursor-pointer text-white'><BsPersonFillAdd size={25}/></div>
                                        </Tooltip>    
                                        <Tooltip content="Import Account" placement="bottom" className=' text-[11px] z-50 px-1 bg-blue-600 ' animate={{mount: { scale: 1.5, y: 10,  x:1 },unmount: { scale: 0, y: 0, x:0 }, }}>
                                            <div onClick={()=> setinsertExcel(true)} className='bg-blue-500 hover:bg-blue-600 p-1 rounded-md textS mx-1 cursor-pointer text-white'><CgImport size={28}/></div>
                                        </Tooltip> 
                                        
                                    </div>  
                                    <div className='flex flex-row'>
                                      
                                        <select name="grade" onChange={(e)=> filtergrade(e.target.value)} value={gradefilter} className='h-[37px] mx-1 text-[14px] rounded-md cursor-pointer '>
                                                <option value='all'>All Grade</option>
                                                <option value="7">Grade 7</option>
                                                <option value="8">Grade 8</option>
                                                <option value="9">Grade 9</option>
                                                <option value="10">Grade 10</option>
                                                <option value="11">Grade 11</option>
                                                <option value="12">Grade 12</option>
                                        </select>
                                    
                                        <input type='text' placeholder='Search ' onChange={(e)=> filterstud(e.target.value)} value={filterSearch} className='w-[230px]  shadow-inner shadow-gray-500/50 border-[1px] p-[4px] border-gray-200 rounded-md px-2'/>
                                    </div>
                                </div>   
                            </div>

                            <div className='w-full mx-auto h-[70vh] max-h-[800px] bg-white overflow-auto'>
                                    <table className='w-full min-w-[800px] text-left text-sm font-light font-[poppins] border-t-[2px] border-black'>
                                        <thead className='border-b font-medium dark:border-neutral-500 sticky top-0 bg-white'>
                                            <tr className='font-bold text-[17px]'>
                                                <th scope="col" className="px-6 py-[10px]">No.</th>
                                                <th scope="col" className="px-6 py-[10px]">Grade Level</th>
                                                <th scope="col" className="px-6 py-[10px]">Last Name</th>
                                                <th scope="col" className="px-6 py-[10px]">First Name</th>
                                                <th scope="col" className="px-6 py-[10px]">Middle Name</th>
                                                <th scope="col" className="px-6 py-[10px] text-center">Suffix</th>
                                                <th scope="col" className="px-6 py-[10px] text-center">Status</th>
                                                <th scope="col" className="px-6 py-[10px] text-center">Edit</th>
                                            </tr>
                                        </thead>
                                        {records && !records[0]? 
                                                <tbody>
                                                    <tr>
                                                        <td className='text-[30px] py-2'>NO RECORD</td>
                                                    </tr>
                                                </tbody>
                                                :<>
                                        {records && records.map((value,index)=>{
                                            return  <tbody key={index} className='overflow-auto'>
                                            <tr className="border-b dark:border-neutral-500 text-[15px]">
                                                <td  className="px-6">{index + 1}</td>
                                                <td className="whitespace-nowrap px-4 ">{value.gradeLevel}</td>
                                                <td className="whitespace-wrap break-word px-6 py-[10px]">{value.lastname}</td>
                                                <td className="whitespace-wrap break-word px-6 py-[10px]">{value.firstname}</td>
                                                <td className="whitespace-wrap break-word px-6 py-[10px]">{value.middlename}</td>
                                                <td className="whitespace-wrap break-word text-center px-6 py-[10px]">{value.suffix}</td>
                                                <td className='py-[6px]'>
                                                    <p className='w-full flex justify-center'>
                                                        {value.userStatus === 'Active' ?
                                                        <Tooltip content="Change Status" placement="bottom" className=' text-[11px] z-50 px-1 bg-green-600 ' animate={{mount: { scale: 1.5, y: 10,  x:1 },unmount: { scale: 0, y: 0, x:0 }, }}>
                                                            <span><BsPersonFillCheck size={30} onClick={()=> SetStatus(value.userStatus, value.accountID)} className='cursor-pointer text-green-500 hover:text-green-600'/></span>
                                                        </Tooltip>
                                                        :
                                                        <Tooltip content="Change Status" placement="bottom" className=' text-[11px] z-50 px-1 bg-orange-600 ' animate={{mount: { scale: 1.5, y: 10,  x:1 },unmount: { scale: 0, y: 0, x:0 }, }}>
                                                            <span><BsPersonFillX size={30} onClick={()=> SetStatus(value.userStatus, value.accountID)} className='cursor-pointer text-orange-500 hover:text-orange-600'/></span>
                                                        </Tooltip>}
                                                        
                                                    </p>
                                                </td>
                                                <td className='py-[6px]'>
                                                    <p className='w-full flex justify-center'>
                                                        <Tooltip content="Change Details" placement="bottom" className=' text-[11px] z-50 px-1 bg-blue-600 ' animate={{mount: { scale: 1.5, y: 10,  x:1 },unmount: { scale: 0, y: 0, x:0 }, }}>
                                                            <span><FaUserEdit size={28} onClick={()=> seteditStud(value)} className='cursor-pointer text-blue-500 hover:text-blue-600'/></span>
                                                        </Tooltip>
                                                    </p>
                                                </td>
                                                
                                            </tr>
                                        </tbody>
                                        })}</>}
                                    
                                    </table>
                            </div>

                            <nav className='py-1 px-4 bg-[#068FFF] rounded-b-lg text-white w-full mx-auto'>
                                                    <ul className='flex flex-row items-center justify-center gap-6 w-[300px] px-4'>
                                                        <li>
                                                            <span  onClick={()=> setCurrentPage(1)} className='cursor-pointer'>
                                                                <BiSkipNext size={30} className='text-white rotate-180'/>
                                                            </span>
                                                        </li>
                                                        <li>
                                                            <span onClick={prePage} className='cursor-pointer rotate-180'>
                                                                <BiSolidRightArrow size={15} className='text-white rotate-180'/>
                                                            </span>
                                                        </li>
                                                            {diplayPages.map((n,i)=>(
                                                                <li key={i} className={`${currentPage === n ? 'activePage':''} text-center rounded-md cursor-pointer w-[200px] `}>
                                                                    {(n < 1) + ((numbers.length) < n) ? ' ':
                                                                    <span onClick={()=>setCurrentPage((n)*1 ? n:1)} className={`${currentPage === n ? 'activePage':''} w-[20px] font-bold`}>
                                                                    {n}
                                                                    </span>}
                                                                </li>
                                                            ))}
                                                        <li>
                                                            <span onClick={nextPage} className='cursor-pointer'>
                                                                <BiSolidRightArrow size={15}/>
                                                            </span>
                                                        </li>
                                                        <li>
                                                            <span onClick={()=> setCurrentPage(numbers.length)} className='cursor-pointer'>
                                                                <BiSkipNext size={30}/>
                                                            </span>
                                                        </li>
                                                    </ul>
                            </nav>
                        </div>
                
                    
                    </div>
                </div>  
            </>  
    

            {addStud && <AddStudents close={setaddStud} refresh={getPisContent} load={setloading} className='z-50'/>}

            {editStud && <EditStudents value={editStud} close={seteditStud} refresh={getPisContent} load={setloading} className='z-50'/>}

            {insertExcel && <InsertExcel close={setinsertExcel} className='z-50'/>}
    </>
  )
}
