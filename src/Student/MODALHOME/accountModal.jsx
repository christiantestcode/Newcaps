import {useEffect, useState, useRef} from 'react'
import { motion } from "framer-motion"
import useStore from '../../Store/store';
import useStorePIS from '../../Store/storePIS';
import Axios from 'axios';
import Swal from 'sweetalert2'
import PacmanLoader from "react-spinners/PacmanLoader";
import { FaCheck } from "react-icons/fa6";


export default function AccountModal({close}) {

    const cUser = useStore(state => state.cUser)
    const addcredentials = useStore( state => state.addCredentials)
    const id= cUser.accountID

  

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

    const [loading,setloading] = useState(true)

    const [studAcc,setstudAcc] = useState('')

    const getStudAccD = async (ress)=>{
          try{
              const response= await Axios.get(`http://localhost:3600/getstudAccDetails/${id}`)
              setstudAcc(response.data[0])

              setcontactnumber(response.data[0].contactNumber.slice(3))

              setcurrpassword(response.data[0].password)

              setTimeout(()=>{
                setloading(false)
                if(ress === 'changeD')  
                 return Swal.fire({
                  icon: 'success',
                  title: 'Saved!',
                  text: 'Contact #. changed!!',
                  showConfirmButton: false,
                  timer: 1500
                })
                if(ress === 'changeP')  
                 return Swal.fire({
                  icon: 'success',
                  title: 'Saved!',
                  text: 'Password changed!!',
                  showConfirmButton: false,
                  timer: 1500
                })
              },500)

            }catch (err){
                console.log(err)
            }
        }
        useEffect(()=>{
          getStudAccD();
      },[])    

      const [contactnumber,setcontactnumber] = useState()

      const [edit,setEdit] = useState(true)

      const [showchangepass,setshowchangepass] = useState(false)

      const [oldshowpass,setoldshowpass] = useState(false)
      const [oldpassword,setoldpassword] = useState('')

      const [newshowpass,setnewshowpass] = useState(false)
      const [newpassword,setnewpassword] = useState('')

      const [currpassword,setcurrpassword] = useState('')


     const saveTODB=  ()=>{
      
          
            const patternContactNum = /^(9)\d{9}$/;

            if(studAcc.contactNumber.slice(3) === contactnumber){
                    setcontactnumber(studAcc.contactNumber.slice(3))
                    setEdit(true)   
              return Swal.fire({
                        icon: 'warning',
                        title: 'warning!',
                        text: 'Nothing change!!',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    
                      
            }
            const numCP= '+63'+contactnumber
            if(!(patternContactNum.test(contactnumber))){
                    setcontactnumber(studAcc.contactNumber.slice(3))
                    setEdit(true)
              return Swal.fire({
                        icon: 'warning',
                        title: 'Invalid input!!',
                        text: 'Follow this format 9123456789',
                        showConfirmButton: false,
                        timer: 2000
                      })
            }
            Swal.fire({
              title: 'Are you sure?',
              text: "Please double check your input!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Save?'
            }).then( async (result) =>  {
              if (result.isConfirmed) {
                setloading(true)
                  try{
                      const response= await Axios.patch(`http://localhost:3600/getstudAccDetails`,{
                        accID:id,
                        lrn:studAcc.LRN,
                        contactNumber:numCP,
                        type:'details'
                      })
                      if(response.data){
                        addcredentials({
                          LRN:cUser.LRN,
                          accountID:cUser.accountID,
                          contactNum:numCP,
                          type:cUser.type
                        })
                        setEdit(true)
                        getStudAccD('changeD')
                      }
                    }catch (err){
                        console.log(err)
                    }
          }
        })
     }

     

    const savePass = async () =>{

      const patternpassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

      if(!oldpassword || !newpassword){
        return Swal.fire({
          icon: 'error',
          title: 'empty input!', 
          text: 'input field empty!!',
          showConfirmButton: false,
          timer: 1500
        })
      }


      if(!(patternpassword.test(newpassword))){
        return Swal.fire({
          icon: 'error',
          title: 'Invalid input!', 
          text: 'Minimum eight characters, at least one letter and one number and no special character',
          showConfirmButton: false,
          timer: 1500
        })
      }
      if(newpassword === oldpassword){
        return Swal.fire({
          icon: 'error',
          title: 'Invalid input!', 
          text: 'Old and New passowrd are the same',
          showConfirmButton: false,
          timer: 1500
        })
      }


      Swal.fire({
        title: 'Are you sure?',
        text:"Double check your Input?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Proceed!'
      }).then( async (result) => {
        if (result.isConfirmed) {


            
         
            setloading(true)

            try{
                  const response= await Axios.patch(`http://localhost:3600/getstudAccDetails`,{
                    accID:id,
                    bycrptOldpas :currpassword,
                    oldpassword:oldpassword,
                    newpassword:newpassword,
                    type:'password'
                  })
                  setTimeout(()=>{
                    setloading(false)
                    if(response.status === 200){
                      setoldpassword('')
                      setnewpassword('')
                      setshowchangepass(!showchangepass)  
                      getStudAccD('changeP')
                    }
                },500)

              }catch (err){

                setTimeout(()=>{
                  setloading(false)
                  if(err.response.status){
                    setoldpassword('')
                    setnewpassword('')
                    setshowchangepass(!showchangepass) 
                    return Swal.fire({
                          icon: 'error',
                          title: 'wrong input!', 
                          text: 'old password not match!!',
                          showConfirmButton: false,
                          timer: 1500
                  })}
                  },500)
              }

          }
        })
     }

     const logoutUSer = useStore( state => state.logout)
     const logoutUSerPIS = useStorePIS( state => state.logout)
     const logoutUSerPIS1 = useStorePIS( state => state.logout1)
     const logoutUSerPIS2 = useStorePIS( state => state.logout2)
     const logoutUSerPIS3 = useStorePIS( state => state.logout3)
     const logoutUSerPIS4 = useStorePIS( state => state.logout4)
     const logoutUSerPIS5 = useStorePIS( state => state.logout5)
     const logoutUSerPIS6 = useStorePIS( state => state.logout6)
     const logoutUSerPIS7 = useStorePIS( state => state.logout7)
     const logoutUSerPIS8 = useStorePIS( state => state.logout8)

     const logout = ()=>{
      
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Log out ?'
      }).then((result) => {
        if (result.isConfirmed) {
          setloading(true)
          logoutUSer('logout')
          logoutUSerPIS('logout')
          logoutUSerPIS1('logout')
          logoutUSerPIS2('logout')
          logoutUSerPIS3('logout')
          logoutUSerPIS4('logout')
          logoutUSerPIS5('logout')
          logoutUSerPIS6('logout')
          logoutUSerPIS7('logout')
          logoutUSerPIS8('logout')
          
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

     const patterrn = () =>{
        setshowchangepass(true)
        Swal.fire({
          icon: 'info',
          text: 'Minimum 8 characters, at least 1 letter and 1 number and no special character',
        })
     }
     const backk = () =>{
      setshowchangepass(false)
      setoldpassword('')
      setnewpassword('')
   }

     

  return (
    <>
              {
                loading ?
                <>
                <div className=' inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-70 ' >
                <PacmanLoader speedMultiplier={2} color={'white'}/>
                </div>
                </>
                :<>
          
            <div className="h-[100vh] absolute top-0 overflow-auto w-[100%] z-50 flex justify-center font-[poppins] min-w-[300px] ">
                                {/*content*/}
                                            <div className="m-auto rounded-lg shadow-lg flex flex-col w-fit  bg-[white] outline-none focus:outline-none shadow-gray border-2 border-white"
                                              > 
                                    {/*header*/}
                                                    <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                                                        <h3  className=" text-[black] w-full m-auto flex flex-col items-center">
                                                              <div className='text-[25px] break-words'>Account details</div>
                                                        </h3>
                                                    </div>
                                    {/*body*/} 

                                    
                                                {/* <div className={`relative px-2 z-50 w-[full] ${!showchangepass?`sm:w-[500px] md:w-[700px]`:`sm:w-[350px] md:w-[350px]`} flex flex-col`}> */}
                                                <div className={`relative px-4 py-2 z-50 w-full sm:w-[350px] flex flex-col`}>
                                                {!showchangepass?
                                                  <>
                                                       <div>
                                                            <div className='text-[15px]'>LRN</div>
                                                            <div className=' shadow-inner  shadow-gray-500/50 border-[1px] w-[290px] border-gray-200 rounded-md px-2 py-1' >
                                                              {studAcc && studAcc.LRN}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='text-[15px]'>Last Name</div>
                                                            <div className=' shadow-inner  shadow-gray-500/50 border-[1px] w-[290px] border-gray-200 rounded-md px-2 py-1' >
                                                              {studAcc && studAcc.lastname}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='text-[15px]'>First Name</div>
                                                            <div className=' shadow-inner  shadow-gray-500/50 border-[1px] w-[290px] border-gray-200 rounded-md px-2 py-1' >
                                                              {studAcc && studAcc.firstname}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='text-[15px]'>Middle Name</div>
                                                            <div className=' shadow-inner  shadow-gray-500/50 border-[1px] w-[290px] border-gray-200 rounded-md px-2 py-1' >
                                                              {studAcc && studAcc.middlename}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='text-[15px]'>Contact Number</div>
                                                            <div className='w-full flex flex-row'>
                                                              <div className=' shadow-inner  shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2 py-1'>+63</div>
                                                              <input type='text'  className=' shadow-inner  shadow-gray-500/50 border-[1px] w-[290px] border-gray-200 rounded-md px-2 py-1'
                                                                value={contactnumber}
                                                              onChange={(e)=> {
                                                                if(isNaN(e.target.value)){
                                                                 return alert('Input Number only!')
                                                                }
                                                                setcontactnumber(e.target.value)
                                                              }} 
                                                              maxLength={10}
                                                              /> 
                                                              <div onClick={()=> saveTODB()} className='hover:bg-green-600 cursor-pointer rounded-md hover:text-white px-1 flex items-center'><FaCheck size={27}/></div>
                                                            </div>
                                                            
                                                        </div>
                                                      
                                                  </>:
                                                      <>
                                                      <div className='mb-2 flex flex-col'>
                                                          <div>Enter old password</div>
                                                          <input type={!oldshowpass? 'password' : 'text'} onChange={(e)=> setoldpassword(e.target.value)} value={oldpassword}  
                                                            className='w-[300px] max-h-[50px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                                          </input>
                                                          <div className='self-start flex flex-row items-center'>
                                                            <input type='checkbox' checked={oldshowpass} onChange={()=> setoldshowpass(!oldshowpass)} className=''></input><span className='self-start text-[15px] mx-1'>Show Password</span> 
                                                          </div>
                                                      </div>   

                                                      <div className='mb-2 flex flex-col'>
                                                          <div>Enter new password</div>
                                                          <input type={!newshowpass? 'password' : 'text'} onChange={(e)=> setnewpassword(e.target.value)} value={newpassword}  
                                                            className='w-[300px] max-h-[50px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                                          </input>
                                                          <div className='self-start flex flex-row items-center'>
                                                            <input type='checkbox' checked={newshowpass} onChange={()=> setnewshowpass(!newshowpass)} className=''></input><span className='self-start text-[15px] mx-1'>Show Password</span> 
                                                          </div>
                                                      </div>  

                                                  </>}
                                                  


                                                    {!showchangepass? 
                                                    <>
                                                      <div className='flex flex-row justify-between items-center'>
                                                        {/* {!edit && <div onClick={()=> saveTODB()} className='text-white self-end rounded-sm bg-blue-400 hover:bg-blue-500 cursor-pointer py-1 my-2 shadow-sm shadow-black px-2'>Save</div>} */}
                                                        <div onClick={()=>patterrn()} className='text-white self-end rounded-sm bg-blue-400 hover:bg-blue-500 cursor-pointer py-1 my-2 shadow-sm shadow-black px-2'>Change Password</div>
                                                      </div>
                                                    </>:
                                                    <>
                                                    <div className='flex flex-row justify-between'>
                                                      
                                                      <button onClick={()=>savePass()} className='text-white self-end rounded-sm bg-blue-400 hover:bg-blue-500 cursor-pointer px-4 py-1 my-2 shadow-sm shadow-black'>Save</button>
                                                      <button onClick={()=>backk()} className='text-white self-end rounded-sm bg-blue-400 hover:bg-blue-500 cursor-pointer px-4 py-1 my-2 shadow-sm shadow-black'>Back</button>
                                                    </div>
                                                    </>}
                                                
                                                </div>
                                    {/*footer*/}
                                            <div className="flex items-center justify-between p-2 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        className="text-white-500 rounded-md bg-green-400 hover:bg-green-500 background-transparent text-white font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={()=>close(false)}
                                                    >
                                                        Close
                                                    </button>
                                                    <button
                                                        className="text-white-500 rounded-md bg-red-400 hover:bg-red-500 background-transparent text-white font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={()=>logout()}
                                                    >
                                                        Logout
                                                    </button>
                                                   
                                            </div>
                                        </div>
                                </div>
                          <div onClick={()=>close(false)}  className="opacity-25 fixed inset-0 z-40 bg-black "></div>
                   
            </> }                
    </>
  
  )
 
}

