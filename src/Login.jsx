import {useState,useRef, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import logo from './images/Login/cabanganLogo.png'
import Axios from 'axios';
import Swal from 'sweetalert2'
import PacmanLoader from "react-spinners/PacmanLoader";
import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai";
import useStore from './Store/store';

export const blink = `https://newback-vlpc.onrender.com`;

export default function Login() {

  
  const userRef = useRef()

  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [loading,setloading] = useState(true)

  const [forgotPass,setforgotPass] = useState(false)
  const [showpass,setShowpass] = useState(false)

  const addcredentials = useStore( state => state.addCredentials)
  const logout = useStore( state => state.logout)
  
  
    useEffect(() => {
      setTimeout(()=>{
            setloading(false)
        },500)
      setTimeout(()=>{
            userRef.current.focus();
        },1000)

      logout()
    },[])

      // LOGIN
    const handleSubmit = async (e) =>{
      
      e.preventDefault(); 

        if(!user || !pwd){
          return  Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Enter Credentials'
          })
        }

      setloading(true)

        try{
          const response= await Axios.get(`${blink}/login/${user}/${pwd}`)
                
                setTimeout(()=>{
                  setloading(false)
                      if(response.status === 201){
                        setUser('');
                        setPwd('');
                        return Swal.fire({
                          position: 'center',
                          icon: 'warning',
                          title: 'No user found',
                          showConfirmButton: false,
                          timer: 2000
                        })
                      }

                      if(response.status === 241){
                        setUser('');
                        setPwd('');
                        return Swal.fire({
                          position: 'center',
                          icon: 'warning',
                          title: 'Wrong password',
                          showConfirmButton: false,
                          timer: 2000
                        })
                      }

                      if(response.data[0].status === 'In-active'){
                        setUser('');
                        setPwd('');
                        return Swal.fire({
                                  position: 'center',
                                  icon: 'warning',
                                  title: 'Your account is In-Active',
                                  showConfirmButton: false,
                                  timer: 2000
                                })
                              }
                     
                     if(response.data[0]) {
                      
                          Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Logged In',
                            showConfirmButton: false,
                            timer: 1500
                          })

                          addcredentials(response.data[0])
                            if(response.data[0].type === 'gc'){
                              return navigate(`/nav/home/gc/dashboard`)
                            }
                            navigate(`/nav/home/student`)
                        }
                    },1000)

        }catch (err){
          if (err) {
              setloading(false)
              setUser('');
              setPwd('');
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'SERVER ERROR'
            })
          }
        }
        
      }
     
      // GET NEW PASS
    const GetNewPass = async () =>{
        Swal.fire({
          title: 'Double check your input!',
          text: "New password will be sent to your contact number!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Proceed'
        }).then( async (result) => {
          if (result.isConfirmed) {
                if(!user)
                return  Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Please Enter username/LRN'
                })
                try{
                    const response= await Axios.patch(`http://localhost:3600/getstudAccDetails/${user}`)
                    setUser('')
                    setforgotPass(!forgotPass)
                    if(response.status===205){
                      setUser('')
                      return  Swal.fire({
                        icon: 'info',
                        title: 'Invalid action',
                        text: 'User does not exist!'
                      })
                    }
                    if(response.status===204){
                      setUser('')
                      return  Swal.fire({
                        icon: 'info',
                        title: 'Invalid action',
                        text: 'There is no registered contact number in your account'
                      })
                    }
                    if(response.data){
                      setUser('')
                      return  Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Your new password is sent to your contact number'
                      })
                    }
                }catch (err){
                    console.log(err)
                }
          }})
      }

  return (
    <>
                {loading &&
                <>
                  <div className='inset-0 absolute bg-black flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-40'>
                    <PacmanLoader speedMultiplier={2} color={'white'}/>
                  </div>
                </>}
                
      <div className=' bg h-[100vh] flex justify-center items-center z-10 overflow-hidden'>

        <form id='login' name='login' onSubmit={handleSubmit} className='sm:rounded-lg w-[370px] h-full sm:h-[400px] flex flex-col justify-around items-center text-white glass-cardS'>

          <img src={logo} alt='logo' className='w-[170px] z-40'/>

              {!forgotPass ? 
                   // LOGIN FORM
                <>
                    <div className=' z-40'>
                      <div className='relative flex justify-center z-40'>
                         <input
                          ref={userRef}
                          onChange={(e) => setUser(e.target.value)}
                          value={user}
                          type="text"
                          placeholder='Username / LRN'
                          className='bg-transparent border-b-2 border-white text-white  w-[300px] mx-0 rounded-sm p-2 pl-[50px] placeholder-white placeholder-opacity-75 focus:outline-none'/>
                        <FaUser size={25} className='text-white absolute left-[15px] top-[7px]'/>
                      </div>

                      <div className='relative flex justify-center mt-[15px] z-40'>
                        <input
                          onChange={(e) => setPwd(e.target.value)}
                          value={pwd}
                          type={showpass ? "text":"password"}
                          placeholder='Password'
                          className='bg-transparent border-b-2 border-white w-[300px] mx-0 rounded-sm p-2 pl-[50px] placeholder-white placeholder-opacity-75 text-white focus:outline-none'/>
                        <RiLockPasswordFill size={30} className='text-white absolute left-[15px] top-[7px]'/>
                        <div className='absolute right-0 h-full w-[30px] flex justify-center items-center'>
                          {showpass ? 
                              <AiFillEyeInvisible size={22} className='cursor-pointer' onClick={()=> setShowpass(!showpass)}/>
                            :
                             <AiFillEye size={22} className='cursor-pointer' onClick={()=> setShowpass(!showpass)}/>}
                        </div>
                      </div>
                      <div className='z-50  cursor-pointer my-2'>
                        <p className='hover:underline w-fit' 
                        onClick={()=> {
                          setUser('')
                          setforgotPass(!forgotPass)}}
                        > Forgot password ?</p>
                      </div>
                      
                        <div className='relative flex justify-center  z-40'>
                          <input
                            type="submit"
                            value="LOGIN"
                            className='bg-blue-500 p-2 px-32 m-auto rounded-sm cursor-pointer text-white hover:bg-blue-600 focus:outline-none'/>
                        </div>
                    </div>
                </>
                : 
                <>
                    <div className=' z-40'>
                      <div className='relative flex justify-center z-40'>
                         <input
                          ref={userRef}
                          onChange={(e) => setUser(e.target.value)}
                          value={user}
                          type="text"
                          placeholder='Username / LRN'
                          className='bg-transparent border-b-2 border-white w-[300px] mx-0 rounded-sm p-2 pl-[50px] placeholder-white placeholder-opacity-75 text-white focus:outline-none'/>
                        <FaUser size={25} className='text-white absolute left-[15px] top-[7px]'/>
                      </div>

                      <div className='relative flex justify-center mt-[15px] z-40  cursor-pointer'>
                            <p onClick={()=>{
                            Swal.fire({
                              icon: 'info',
                              title: 'Enter your username',
                              text: 'Enter your LRN / Username and Click "Get new pass" your new password will be send to registered number in your account if none nothing will happen'
                            })
                          }} className='hover:underline'> HELP?</p>
                      </div>
                      <div className='z-50  cursor-pointer'>
                        <p className='w-fit hover:underline' onClick={()=> {
                        setUser('')
                        setforgotPass(!forgotPass)}}>Back</p>
                        </div>
                      
                        <div className='relative flex justify-center mt-[15px] z-40'>
                          <div onClick={()=> GetNewPass()} className='bg-blue-500 text-center p-2 w-full m-auto rounded-sm cursor-pointer text-white mt-[15px] hover:bg-blue-600 focus:outline-none'>GET NEW PASSWORD</div>
                        </div>
                    </div>
                </>
              }
                 
          </form>

      </div>
     
    </>
    
  )
}
