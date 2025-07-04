import { motion } from "framer-motion"

export default function HelpPis({close}) {

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

   
  return (
    <>
            
          
            <div className="h-[100vh] absolute top-0 overflow-auto w-[100%] z-50 flex justify-center font-[poppins] min-w-[300px] ">
                                {/*content*/}
                                            <motion.div className="m-auto border-0 rounded-lg shadow-lg flex flex-col w-fit  bg-[white] outline-none focus:outline-none"
                                              variants={container}
                                              initial="hidden"
                                              animate="show"> 
                                    {/*header*/}
                                                    <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                                                        <h3  className=" text-[black] w-full m-auto flex flex-col items-center">
                                                              <div className='text-[25px] break-words'>GUIDE</div>
                                                        </h3>
                                                    </div>
                                    {/*body*/} 
                                                <div>
                                                    <div className='px-4 h-[400px] overflow-auto w-full sm:w-[550px]'>
                                                        <div className='px-3 font-bold'>You can leave a blank if not available on the following:</div>
                                                        <p className='font-bold'>I.PERSONAL BACKGROUND</p>
                                                        <p className='px-3'>- Email</p>
                                                        <p className='px-3'>- Landline</p>
                                                        <p className='font-bold'>II.FAMILY BACKGROUND</p>
                                                        <p className='px-3'>- Position Employer</p>
                                                        <p className='px-3'>- Office / Business Address</p>
                                                        <p className='font-bold'>III.EDUCATIONAL BACKGROUND</p>
                                                        <p className='px-3'>- Subject with the Lowest Grade</p>
                                                        <p className='px-3'>- Subject with the Highest Grade</p>
                                                        <p className='px-3'>- Awards Honors Received</p>

                                                        <div className=' font-bold'>You cant leave a blank on the following:</div>
                                                        <p className='px-3'>- Person to contact in case of Emergency</p>
                                                        <p className='px-3'>- Address:</p>
                                                        <p className='px-3'>- Contact Number:</p>

                                                        <p className='font-bold p-2'><span className='text-red-500 font-bold'>NOTE: </span>Please atleast insert 1 random image if images for your HOMESKETCH is not available to set your PIS status COMPLETE ---image must be below 5mb</p>


                                                      {/* {picture && picture.map((value,index)=>{ 
                                                        return <div key={index} className='relative p-2'>
                                                                  <div className='text-white px-2 text-[20px] text-center rounded-md bg-blue-600 z-50 cursor-pointer shadow-md shadow-black'>Guide #{value.name} </div>
                                                                  <img src={value.picture} className='w-full sm:w-[550px] h-[450px] mb-3'/> 
                                                              </div>
                                                        })} */}

                                                    </div>
                                                </div>
                                    {/*footer*/}
                                            <div className="flex items-center justify-between p-2 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        className="text-white-500 hover:rounded-md hover:bg-red-500 background-transparent text-black font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={()=>close(false)}
                                                    >
                                                        close
                                                    </button>
                                            </div>
                                        </motion.div>
                                </div>
                          <div onClick={()=>close(false)}  className="opacity-25 fixed inset-0 z-40 bg-black "></div>
                   
                      
    </>
  )
}

