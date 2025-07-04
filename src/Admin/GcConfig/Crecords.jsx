import React,{useEffect, useState} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'
import {RxCross2} from 'react-icons/rx'

export default function Crecords({close}) {
    const todaydate = new Date();
    var dd = todaydate.getDate();
    var mm = todaydate.getMonth()+1; 
    var yyyy = todaydate.getFullYear();

    if(dd<10) {dd='0'+dd} 
    if(mm<10) { mm='0'+mm} 
    const todayD =  `${yyyy}-${mm}-${dd}`
  

    const getCounselingRec = async ()=>{
        try{
            const response= await Axios.get(`http://localhost:3500/getCounselingRec`)
            
                    const datas = ((response.data).filter((value)=>   value.setDate < todayD))
                    setdisplay((datas).filter((value)=> value.setDate.includes(`${yyyy}-${mm}`)))
                    setall(datas)

          }catch (err){
            if (!err?.response) {
              console.log(err)
            }
          }
      }
     
    useEffect(()=>{
       getCounselingRec()
    },[])

    const [display,setdisplay] = useState([])
    const [all,setall] = useState([])

    // console.log(['2023-02-15','2023-01-15','2023-02-15','2023-02-15','2023-02-15'].filter((value)=> value.includes('2023-02')))

    const [month,setmonth] = useState(`${yyyy}-${mm}`)

    const filterMonth = (fvalue) =>{
        setmonth(fvalue)
        setdisplay(all.filter((value)=> value.setDate.includes(fvalue)))
    } 
    
  return (
    <>
 <div className="absolute h-[100vh] left-0 top-0 w-full z-50 font-[poppins] min-w-[300px] ">
                
               
                <div className="z-50 relative w-fill h-[100vh] flex items-start py-10 justify-center ">
             

                {/* <div className='h-full w-full relative z-50 bg-white'> */}
             <div className="opacity-25 fixed inset-0 z-10 bg-black "onClick={(()=>close(false))}/>
            <div className='w-full sm:w-1/2 px-2 h-[90%] bg-white relative z-50 rounded-md overflow-auto'>
            <div className='flex flex-col sm:flex-row w-full justify-between px-2 py-2'>
              <div onClick={(()=>close(false))} className="absolute top-1 right-1 z-30 text-black cursor-pointer"><RxCross2 size={35}/></div>
                
                <div className='flex flex-col xl:flex-row'>
                  <p className='text-[20px] 2xl:text-[25px] xl:px-4'>Counseling Records</p>
                  <div className='flex flex-row gap-x-[1px] '>
                    <button className="rounded-md border-green-600 bg-green-500 text-white w-[50px] border-[2px] text-black active:bg-green-600 hover:bg-green-600 hover:text-white text-center  hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="button" onClick={()=> setdisplay(all)}>All</button>
                    <div className=' w-fit shadow-inner shadow-gray-500/50 border-[1px] py-[4px] border-gray-200 rounded-md px-2 bg-white font-bold'>
                    <p className=''>Total:<span>{' '}{display.length}</span></p>
                    </div>
                  
                      <input type='month' onChange={(e)=> filterMonth(e.target.value)} value={month}  className='w-fit shadow-inner shadow-gray-500/50 border-[1px] p-[4px] border-gray-200 rounded-md px-2'/>
                  </div>
                
               </div>  
            </div>
                    <table className='w-full text-left text-sm font-light font-[poppins] '>
                        <thead className='border-b font-medium dark:border-neutral-500 sticky top-0 bg-white'>
                            <tr className='font-bold'>
                                <th scope="col" className="px-6 py-[10px]">Date</th>
                                <th scope="col" className="px-6 py-[10px]">Time</th>
                            </tr>
                        </thead>
                        
                        {display[0] ? 
                        <>{display && display.map((value,index)=>{
                                return  <tbody key={index} className='overflow-auto'>
                                    <List value={value} />
                            </tbody>})}
                            </>
                        :
                        <>
                        <tbody>
                        <tr className="border-b dark:border-neutral-500 text-[18px]">
                            <td className="whitespace-nowrap px-6 py-2 text-[30px]">NO RECORDS</td>
                        </tr></tbody>
                        </>}
                      
                      
                       
                    </table>
            </div>
        </div>


                </div>
 {/* </div>  */}


    </>
  )
}


function List({value}){

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
 ];


    const date = new Date(value.setDate);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    const pastDate = monthNames[month]+` ${day} ${year}`



    return(
        <>
            <tr className="border-b dark:border-neutral-500 text-[18px]">
                                <td className="whitespace-nowrap px-6 py-2">{pastDate}</td>
                                <td className="whitespace-nowrap px-6 py-2">{JSON.parse(value.setTime).toString()}</td>
                               
                            </tr>
        </>
    )
}