// import React,{useEffect, useState, useRef,useMemo} from 'react'
// import {HashLink as Link} from 'react-router-hash-link'

// export default function GuidanceHome() {

//    const myRef = useRef()

//     useEffect(()=>{
//       console.log('myref', myRef.current)
//     },[])

    

//   return (
//     <>
//     <div className='h-[100vh] w-full overflow-x-hidden overflow-y-auto ' > 
//     <nav className='w-full absolute top-0'>
//       <ul className='flex flex-row w-full justify-around'>
//         <li><Link smooth={true} to='#one' className='cursor-pointer'>one</Link></li>
//         <li><Link smooth={true} to='#two'className='cursor-pointer'>two</Link></li>
//         <li><Link smooth={true} to='#three'className='cursor-pointer'>three</Link></li>
//         <li><Link smooth={true} to='#four'className='cursor-pointer'>four</Link></li>
//       </ul>
//     </nav>

//      <section id='one' ref={myRef} className='bg-red-500 w-full h-[100vh] pt-10'>one</section>
//      <section id='two' ref={myRef} className='bg-green-500 w-full h-[100vh]'>two</section>
//      <section id='three' ref={myRef} className='bg-yellow-500 w-full h-[100vh]'>three</section>
//      <section id='four' ref={myRef} className='bg-blue-500 w-full h-[100vh]'>four</section>

//     </div>
// </>
//   )
// }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React,{useState,useEffect,useRef} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'
import { motion } from "framer-motion"
import FileDownload from 'js-file-download'
import PacmanLoader from "react-spinners/PacmanLoader";
import { useNavigate } from 'react-router-dom'

export default function Restore() {
    const navigate = useNavigate();
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



      const backUP = async () => {

        Swal.fire({
          title: 'Are you sure?',
          text: "This will take some Time!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Proceed!'
        }).then( async (result) => {
          if (result.isConfirmed) {
            setloading(true)
            try{
              const response= await Axios.get(`http://localhost:3500/backUPrestore`,{
                responseType: 'blob'
              })

              FileDownload(response.data,`${new Date()}.sql`)
                setTimeout(()=>{
                  setloading(false)
                    if(response.data)
                    return Swal.fire({
                            icon: 'success',
                            title: 'Saved!',
                            text: 'Back up is downloaded!',
                            showConfirmButton: false,
                            timer: 1500
                          })
                  },1500)

            }catch (err){
                if(err.response.status)
                return Swal.fire({
                  icon: 'error',
                  title: 'Error!',
                  text: 'Something went Wrong!',
                  showConfirmButton: false,
                  timer: 1500
                })
            }
          
          }
        })
        
       }
      
       const formData = new FormData()
       const [filee,setfilee]= useState('')

    const restore = async (e) =>{
        e.preventDefault()
        
              const myFiles = document.getElementById('myFiles').files
        
              Object.keys(myFiles).forEach(key => {
                formData.append(myFiles.item(key).name, myFiles.item(key))
            })
            Swal.fire({
              title: 'Are you sure?',
              text: "This will take some Time!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Proceed!'
            }).then( async (result) => {
              if (result.isConfirmed) {
                setloading(true)
                  try{
                          const response = await fetch(`http://localhost:3500/upload`, {
                            method: 'POST',
                            body: formData
                        })
                          setTimeout(()=>{
                              setloading(false)
                              navigate(`/nav/home/gc`)
                              Swal.fire({
                                icon: 'success',
                                title: 'data restored',
                                showConfirmButton: false,
                                timer: 1500
                              }) 
                        },1500)
                  
                }catch (err){
                        if (!err?.response) {
                          Swal.fire({
                            icon: 'error',
                            title: 'ERROR',
                            showConfirmButton: false,
                            timer: 1500
                          }) 
                        }
                 }
              }
            })
       }

       const [loading,setloading] = useState(false)

  return (
    <>
    <div className='bg-[#EEEEEE] min-h-[100vh] h-[100vh] w-full overflow-hidden ' >
            {
                loading &&
                <>
                <div className='inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-50 ' >
                <PacmanLoader speedMultiplier={2} color={'white'}/>
                </div>
                </>}
    <div className="absolute top-[10%] left-0 w-[100%] h-[1px] z-40 flex justify-center font-[poppins] min-w-[300px] ">
    {/*content*/}
                
                <motion.div className="mx-auto border-0 rounded-lg shadow-lg fixed flex flex-col w-fit bg-[white] outline-none focus:outline-none"
                  variants={container}
                  initial="hidden"
                  animate="show"> 
        {/*header*/}  
                        <div className="flex items-start justify-between py-2 border-b border-solid border-slate-200 rounded-t">
                            <h3  className=" text-[black] w-full m-auto flex flex-col items-center text-[20px]">
                                Back up and Restore
                            </h3>
                        </div>
        {/*body*/}
                    <div className="flex flex-col px-4 py-3 z-50 font-[poppins] w-[320px]">
                   
                        <button onClick={()=> backUP()} className='px-4 py-2 rounded-md bg-green-500 border-[2px] border-green-600 hover:bg-green-600 text-white font-bold  shadow-black my-2'>Back-up</button>

                        <form onSubmit={restore} className='py-6'>
                          <div className='py-2 text-center'>Choose " .sql File " to restore</div>
                            <input type="file" id="myFiles" accept="*" onChange={(e)=> setfilee(e.target.value)} className='w-[100px] text-ellipsis truncate 
                            '/>
                            {filee && <button className='w-full px-4 py-1 text-white rounded-md bg-green-500  font-bold border-[2px] border-green-600 hover:bg-green-600 shadow-black my-1'>Restore</button> }
                        </form>

                        
                    
                    </div>
        {/*footer*/}
                <div className="flex items-center justify-start px-2 py-2 border-t border-solid border-slate-200 rounded-b">
                        <button
                            className="border-gray-600 border-[2px] text-black active:bg-gray-600 hover:bg-gray-500 hover:text-white font-bold uppercase text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={()=> navigate(`/nav/home/gc/dashboard`)} >
                             Back
                        </button>
                </div>
            </motion.div>
    </div>

       

    
    </div>
  
    </>
  );

//   return(
//     <>
//       <div>
//         {['one','two','three','ffour'].map((value,index)=>{
//           return <Pagess key={index} value={value}/>
//         })}
//       </div>
//     </>
//   )
// }

// function Pagess({value}){
//   const ref = useRef(null);
//   const isInView = useInView(ref,{
//     amount:0.3
//   });

//   useEffect(()=>{
//       console.log(isInView)
//       console.log(isInView && value)
//   },[isInView])

//   return(
//     <>
//       <motion.div className='h-[100vh] w-full bg-blue-500 border-2 border-black py-2'
//       //  animate={{ x: isInView?  '100px': '200px'}}
//        >
//         <motion.div ref={ref} className='bg-white w-fit mx-2 h-full'
//         animate={
//           { x: isInView?  '100px': '500px',
//           opacity:isInView? 1:0
//         }
//         }
//         transition={{
//           duration:3
//         }}

//         >{value}</motion.div>

//       </motion.div>
//     </>
//   )
}
// import React,{useEffect, useState, useRef,useMemo} from 'react'
// import {HashLink as Link} from 'react-router-hash-link'

// import Layout from './layout';

// export default function GuidanceHome() {
//   const arr = ['one', 'two', 'three', 'four'];
//   const [myelementVisible, myelmentVisible]= useState('dashboard')

//   const nav= document.querySelector('nav')

//   const refs = useRef([]);
//   const options = {
//     threshold : 0.2
//   }
//     useEffect(()=>{
//         const observer = new IntersectionObserver((entries) =>{
//           entries.forEach(e => {
            
//             if(e.isIntersecting){
//               if(e.target.id !== 'dashboard'){
//                 myelmentVisible(e.target.id)
//               }else{
//                 myelmentVisible('dashboard')
//               }
//             }
//           })
//         },options)
        
//         refs.current.forEach(section => {
//           observer.observe(section)
//         })
    
         
//     },[])

   
//   return (
//     <div className='h-[100vh] w-full overflow-x-hidden overflow-y-auto ' > 
//         <nav className='w-full absolute top-0'>
//               <ul className='flex flex-row w-full justify-around'>
//                 <li><Link smooth={true} to='#dashboard' className={`${myelementVisible === 'dashboard' && 'bg-green-600'} transition-all cursor-pointer`}>dashboard</Link></li>
//                 <li><Link smooth={true} to='#one' className={`${myelementVisible === 'one' && 'bg-green-600'} transition-all cursor-pointer`}>one</Link></li>
//                 <li><Link smooth={true} to='#two' className={`${myelementVisible === 'two' && 'bg-green-600'} transition-all cursor-pointer`}>two</Link></li>
//                 <li><Link smooth={true} to='#three' className={`${myelementVisible === 'three' && 'bg-green-600'} transition-all cursor-pointer`}>three</Link></li>
//                 <li><Link smooth={true} to='#four' className={`${myelementVisible === 'four' && 'bg-green-600'} transition-all cursor-pointer`}>four</Link></li>
            
//               </ul>
//             </nav>
//             <div className='bg-red-500 w-full h-[100vh] pt-10 shadow-md shadow-black border-2 border-black' id='dashboard'>

//             </div>
//           {arr.map((item, index) => {
//             return (
//               <section
                
//                 key={index}
//                 id={item}
//                 className='bg-red-500 w-full h-[100vh] pt-10 shadow-md shadow-black border-2 border-black'
//                 ref={(element) => {
//                   refs.current[index] = element;
//                 }}
//               >
//                <Layout pageName={item}/>
//               </section>
//             );
//           })}


//       {/* <section id='one' ref={refs} className='bg-red-500 w-full h-[100vh] pt-10'>one</section>
//       <section id='two'  className='bg-green-500 w-full h-[100vh]'>two</section>
//       <section id='three'  className='bg-yellow-500 w-full h-[100vh]'>three</section>
//       <section id='four' className='bg-blue-500 w-full h-[100vh]'>four</section>

//  */}

    
//     </div>
//   );
// }