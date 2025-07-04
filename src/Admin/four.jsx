import React,{useState,useEffect,useRef} from 'react'
import useStore from '../Store/store';
import {BsFillPersonFill , BsPersonSquare , BsDatabaseFillGear , BsClipboard2DataFill} from "react-icons/bs";
import { ImDownload2 } from "react-icons/im";
import Axios from 'axios';
import Swal from 'sweetalert2'
import { motion } from "framer-motion"
import {RxCross2} from 'react-icons/rx'
import StudAccounts from './GcConfig/StudAccounts'
import InsertExcel from './GcConfig/InsertExcel';
import CounselingRec from './GcConfig/CounselingRec';
import PacmanLoader from "react-spinners/PacmanLoader";
import { useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';
import Counseling from './Picture/counseling-icon.svg'


export default function Four() {

 


  const cUser = useStore(state => state.cUser)
  const id= cUser.accountID

  const navigate = useNavigate();
  const container = {
    hidden: {scale:0, opacity: 0 },
    show: {
      scale:1,
      opacity: 1,
      transition: {
        duration:0.5,
      }
    },
    exit: {
        scale:0,
        opacity: 0,
        transition: {
          duration:0.5
        }
      }
  }

  const [gcdetails,setgcdetails] = useState('')

  const getGCdetails = async ()=>{
    try{
        const response= await Axios.get(`http://localhost:3500/gcDetails/${id}`)
   
        setgcdetails(response.data[0])

        setlastname(response.data[0].lastname)
        setfirstname(response.data[0].firstname)
        setmiddlename(response.data[0].middlename)
        setcontactNumber(response.data[0].contactNumber.slice(3))

        setusername(response.data[0].username) 

      }catch (err){
          console.log(err)
      }
  }
    useEffect(()=>{
      getGCdetails();
  },[])  

  const [editable,seteditable] = useState(true)

  const [username,setusername] = useState(gcdetails && gcdetails.username)

  const [lastname,setlastname] = useState(gcdetails && gcdetails.lastname)
  const [firstname,setfirstname] = useState(gcdetails && gcdetails.firstname)
  const [middlename,setmiddlename] = useState(gcdetails && gcdetails.middlename)
  const [contactNumber,setcontactNumber] = useState()

  const editRef = useRef()

  const [showchangepass,setshowchangepass] = useState(false)

  const [oldshowpass,setoldshowpass] = useState(false)
  const [oldpassword,setoldpassword] = useState('')

  const [newshowpass,setnewshowpass] = useState(false)
  const [newpassword,setnewpassword] = useState('')

  


const saveTODB= async ()=>{


  const patternuseer = /^(?=.*[A-Za-z])[A-Za-z\d]{8,}$/;

  // if(!(patternuseer.test(username))){
  //   return Swal.fire({
  //     icon: 'error',
  //     title: 'Invalid input!', 
  //     text: 'Minimum eight characters, at least one letter and no special character',
  //     showConfirmButton: false,
  //     timer: 1500
  //   })
  // }


  const patternNum = /^(9)\d{9}$/;


  if(!(patternNum.test(contactNumber))){
    setcontactNumber(gcdetails.contactNumber.slice(3))
    return Swal.fire({
      icon: 'error',
      title: 'Invalid input!', 
      text: 'Please follow the example above',
      showConfirmButton: false,
      timer: 2000
    })
  }

  if(gcdetails.lastname === lastname && gcdetails.firstname === firstname && gcdetails.middlename === middlename && gcdetails.username === username && gcdetails.contactNumber.slice(3) === contactNumber){
    return Swal.fire({
              icon: 'warning',
              title: 'warning!',
              text: 'Nothing change!',
              showConfirmButton: false,
              timer: 1500
            })
  }
  setloading(true)
    try{
        const response= await Axios.patch(`http://localhost:3500/gcDetails`,{
          accID:id,
          lastname:lastname,
          firstname:firstname,
          middlename:middlename,
          username:username,
          contactNumber:'+63'+contactNumber,
          type:'details'
        })
              if(response.data) {
                setTimeout(()=>{
                  setloading(false) 
                  getGCdetails()
                   Swal.fire({
                          icon: 'success',
                          title: 'Saved!', 
                          text: 'Details changed!',
                          showConfirmButton: false,
                          timer: 1500
                        })
                },500)
              }
      }catch (err){
          console.log(err)
      }
 }


 const [loading,setloading] = useState(false)
 const savePass = async () =>{
  const patternpassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

      if(!(patternpassword.test(newpassword))){
        return Swal.fire({
          icon: 'error',
          title: 'Invalid input!', 
          text: 'Minimum eight characters, at least one letter and one number and no special character',
          showConfirmButton: false,
          timer: 1500
        })
      }


  if(!oldpassword || !newpassword){
    return Swal.fire({
      icon: 'error',
      title: 'Empty input!', 
      text: 'Input field empty!',
      showConfirmButton: false,
      timer: 1500
    })
  }else if(oldpassword === newpassword){
    return Swal.fire({
      icon: 'error',
      title: 'Wrong input!', 
      text: 'You enter your old password!',
      showConfirmButton: false,
      timer: 1500
    })  
  }
  setloading(true)
  try{
    const response= await Axios.patch(`http://localhost:3500/gcDetails`,{
      accID:id,
      bycrptOldpas:gcdetails.password,
      oldpassword:oldpassword,
      newpassword:newpassword,
      type:'password'
    })
    if(response.status === 200) {
    setTimeout(()=>{
      
      setloading(false) 
      getGCdetails()
      setoldpassword('')
      setnewpassword('')
       Swal.fire({
              icon: 'success',
              title: 'Saved!', 
              text: 'Password successfully changed!',
              showConfirmButton: false,
              timer: 1500
            })
            setshowchangepass(false) 
                
    },500)
  }
 
  }catch (err){
   
    setTimeout(()=>{
      if(err.response.status){
        setloading(false)
        getGCdetails()
        setoldpassword('')
        setnewpassword('')
         Swal.fire({
              icon: 'error',
              title: 'wrong input!', 
              text: 'Old password not match!',
              showConfirmButton: false,
              timer: 1500
      })}
      setshowchangepass(false) 
      },500)
  }
 }

 const [studACCs,setstudACCs] = useState(false)

 const [backUpRestore,setbackUpRestore] = useState(false)
 const [insertExcel,setinsertExcel] = useState(false)
 const [counselingRec,setcounselingRec] = useState(false)

 const logoutUSer = useStore( state => state.logout)

 const logout = ()=>{
  Swal.fire({

    text: "Are you sure you want to log out your account?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Log out'
  }).then((result) => {
    if (result.isConfirmed) {
      setloading(true)

      logoutUSer('logout')
      
        setTimeout(()=>{
          setloading(false)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Logged out',
            showConfirmButton: false,
            timer: 1500
          })
        },500)
      
    }
  })
  
 }
 

  return (
    <>
      {/* {loading &&
      <>
        <div className='inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-50 ' >
          <PacmanLoader speedMultiplier={2} color={'white'}/>
        </div>
      </>} */}
        <div className="absolute top-[15%] left-0 w-[100%] h-[1px] z-50 flex justify-center font-[poppins] min-w-[300px] ">
        <motion.div className="mx-auto border-0 rounded-lg shadow-lg fixed flex flex-col w-fit  outline-none focus:outline-none"
                                              variants={container}
                                              initial="hidden"
                                              animate="show"> 
      <div className='w-full font-[poppins] '>    
        <div className='w-full h-fit overflow-auto flex md:items-center justify-center'>
            <div className='w-full h-fit'>
                <div className='flex flex-col md:flex-row w-full h-fit justify-center items-center gap-[50px]'>

                    <div>
                        <div className='bg-white boxShadow rounded-lg w-[360px] md:w-[500px] font-[poppins] ' >
            
                          <div className=' h-full w-full mx-auto '>

                            <p className='text-center font-bold text-white py-4 w-full bg-[#068FFF] rounded-t-lg'>Account details</p>
                            <div className='flex flex-row h-[55px] justify-evenly items-center lg:px-10'>
                              <p className='text-[15px] sm:text-[25px] font-bold text-gray-600'>Guidance Counselor{loading && 'loading'}</p>
                              <BsFillPersonFill size={55}/>
                            </div>
                            <div className='text-[15px] text-center text-gray-600'>Username</div>
                            <input type='text' ref={editRef} className='w-full text-[22px] bg-transparent text-center' readOnly={editable} onChange={(e)=>setusername(e.target.value)} value={username}></input>
                          
                          </div>
                            
                          {showchangepass ? 
                          <>
                              <div className='mb-2 mx-auto px-4'>
                                  <div>Enter old password</div>
                                  <input type={!oldshowpass? 'password' : 'text'} onChange={(e)=> setoldpassword(e.target.value)} value={oldpassword}  
                                    className='w-[300px] max-h-[50px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                  </input>
                                  <div className='flex flex-row items-center'>
                                    <input type='checkbox' checked={oldshowpass} onChange={()=> setoldshowpass(!oldshowpass)} className=''></input><span className='self-start text-[15px] mx-1'>Show password</span> 
                                  </div>
                              </div>   
                              <div className='mb-2 mx-auto px-4'>
                                  <div>Enter new password</div>
                                  <input type={!newshowpass? 'password' : 'text'} onChange={(e)=> setnewpassword(e.target.value)} value={newpassword}  
                                    className='w-[300px] max-h-[50px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                  </input>
                                  <div className='flex flex-row items-center'>
                                    <input type='checkbox' checked={newshowpass} onChange={()=> setnewshowpass(!newshowpass)} className=''></input><span className='self-start text-[15px] mx-1'>Show password</span> 
                                  </div>
                              </div>  
                              <div className='flex flex-row justify-between p-4'>
                                <div onClick={()=> savePass()} className='w-[49%] px-2 py-1 rounded-md bg-green-500 hover:bg-green-600 text-white text-center cursor-pointer shadow-sm shadow-black'> Save</div>
                                <div onClick={()=> {
                                  setoldpassword('')
                                  setnewpassword('')
                                  setshowchangepass(false)
                                  }} className='w-[50%] px-2 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white text-center cursor-pointer shadow-sm shadow-black'> Back</div>
                              </div>
                          </>
                            :
                          <>
                            <div className='flex flex-col items-center mx-auto py-1 text-gray-600'>
                              <div>
                                <div className='text-[15px]'>Last Name:</div>
                                <input type='text' 
                                readOnly={editable} 
                                placeholder='lastname'
                                onChange={(e)=> setlastname(e.target.value)}
                                value={lastname} 
                                className=' shadow-inner  shadow-gray-500/50 border-[1px] w-[290px] border-gray-200 rounded-md px-2 py-1' ></input>
                              </div>
                              <div>
                                <div className='text-[15px]'>First Name:</div>
                                <input type='text' 
                                readOnly={editable} 
                                placeholder='firstname' 
                                onChange={(e)=> setfirstname(e.target.value)}
                                value={firstname}
                                className='shadow-inner shadow-gray-500/50 border-[1px] w-[290px] border-gray-200 rounded-md px-2 py-1' ></input>
                              </div>
                              <div>
                                <div className='text-[15px]'>Middle Name:</div>
                                <input type='text' 
                                readOnly={editable} 
                                placeholder='middlename' 
                                onChange={(e)=> setmiddlename(e.target.value)}
                                value={middlename}
                                className='shadow-inner shadow-gray-500/50 border-[1px] w-[290px] border-gray-200 rounded-md px-2 py-1' ></input>
                              </div>
                              <div>
                                <div className='text-[15px]'>Contact No: <span className='text-white'>example "9123456789"</span></div>
                                
                                <div className='flex flex-row w-[290px] items-center'><span className='shadow-inner px-2 py-1 shadow-gray-500/50 border-[1px] text-black border-gray-200 rounded-md'>+63</span>
                                            <input type='text' className='shadow-inner w-full shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2 py-1 relative' 
                                                pattern='^(9)\d{9}$'
                                                readOnly={editable} 
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

                            <div className='flex flex-row justify-around py-2 bg-[#068FFF] rounded-b-lg text-white'>
                              {editable?
                              <div
                                onClick={()=>{
                                  seteditable(false)
                                  editRef.current.focus();
                                } }
                                className='w-fit md:w-[20%] flex justify-center items-center px-2  rounded-md bg-green-500 hover:bg-green-600 text-[15px] text-center  cursor-pointer shadow-sm shadow-[gray]'>EDIT 
                              </div>
                              :
                              <div
                                onClick={()=>{
                                  seteditable(true)
                                  saveTODB()
                                } }
                                className='w-[20%] flex justify-center items-center px-2 py-1 text-white rounded-md bg-green-500 hover:bg-green-600text-[15px] text-center cursor-pointer shadow-sm shadow-[gray]'>SAVE
                              </div>
                              }
                              <div 
                              onClick={()=> setshowchangepass(true)}
                              className='w-[30%] flex justify-center items-center px-2 py-1 rounded-md bg-red-500 hover:bg-red-600 text-[15px] text-center cursor-pointer shadow-sm shadow-[gray]'>CHANGE PASS</div>
                              <div 
                              onClick={()=> logout()}
                              className='w-fit md:w-[20%] flex justify-center items-center px-2 py-1 rounded-md bg-red-500 hover:bg-red-600 text-center cursor-pointer shadow-sm shadow-[gray]'>LOG OUT</div>
                            </div>

                          </>}
                          
                        </div>
                    </div>
                 
                  
                </div>
            </div>
        </div>   
      </div> 
      </motion.div>
      </div>

    </>  
  )
}
