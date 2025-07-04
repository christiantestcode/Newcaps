import React,{useEffect, useState} from 'react'
import StudPis from './StudPis'
import Studpis2 from './Studpis2'
import Studpis3 from './Studpis3'
import Studpis4 from './Studpis4'
import Studpis5 from './Studpis5'
import { motion } from 'framer-motion'
import { RxCross2 } from 'react-icons/rx'
import PacmanLoader from "react-spinners/PacmanLoader";
import Swal from 'sweetalert2'
import Axios from 'axios';
import useStorePIS from '../../Store/storePIS';

export default function Mainpis({close,student}) {

        const container = {
                hidden: { opacity: 0 , },
                show: {
                  opacity: 1,
                  transition: {
                        duration:.5,
                  }
                }
        }

        const addPersonalbg = useStorePIS( state => state.addPersonalbg)
        const addFamilybg = useStorePIS( state => state.addFamilybg)
        const addSiblings = useStorePIS( state => state.addSiblings)
        const addMaritalS = useStorePIS( state => state.addMaritalS)
        const addeducBG = useStorePIS( state => state.addeducBG)
        const addeducBG2 = useStorePIS( state => state.addeducBG2)
        const addUniqueHealthCosult = useStorePIS( state => state.addUniqueHealthCosult)
        const addPisID = useStorePIS( state => state.addPisID)
        const addHomeS = useStorePIS( state => state.addHomeS)

        const content = ['I. Personal Background','II. Family Background','II. Educational Background','IV. Unique Features & V. Health Information', 'VI. Household Sketch']
        const [progresStatus,setprogresStatus] = useState([])
        // console.log(progresStatus)
        


        const requiredPersonalBackground = ['lastname','firstname','dateOfBirth','placeOfBirth','gender','birthAmongSib','citizenship','religion','civilStatus','currentAddress','cellphoneNo']
        const requiredFamilyBackground = ['name','age','religion','contactNumber','nationality']
        const getPisContent = async (action)=>{
                // setloading(true)
                try{
                        const response= await Axios.get(`http://localhost:3500/pis/${student.accountID}`)
                                if(response.data === '404 Not Found') { 
                                        Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'NO RESPONSE'
                                        })
                                }



                        addPersonalbg(JSON.parse(response.data.pis.personalBackground))
                        const personalBackground =  JSON.parse(response.data.pis.personalBackground)
                        
                        
                        addFamilybg(JSON.parse(response.data.pis.familyBackground))
                        const parents = JSON.parse(response.data.pis.familyBackground)
                        const father = parents.father
                        const mother = parents.mother
                        const guardian = parents.guardian

                
                        
                        // const fatherRequiredNumber = requiredFamilyBackground.filter((value)=> father[value] != '').length
                        // const motherRequiredNumber= requiredFamilyBackground.filter((value)=> mother[value] != '')
                        // const guardianRequiredNumber =requiredFamilyBackground.filter((value)=> guardian[value] != '').length == '1'

                        const fatherRequiredNumber = father.status == 'living'
                        const motherRequiredNumber= mother.status == 'living'
                        const guardianRequiredNumber = guardian.contactNumber != '+63'

                        
                        addSiblings(JSON.parse(response.data.pis.siblings))
                        const siblingsRequiredNumber =  JSON.parse(response.data.pis.siblings).length > 0
                        
                        // console.log(motherRequiredNumber)
                        // console.log(guardianRequiredNumber)
                        const updateStatus = fatherRequiredNumber || motherRequiredNumber || guardianRequiredNumber ? true:false
                        addMaritalS(JSON.parse(response.data.pis.maritalStatus)) 



                        addeducBG(JSON.parse(response.data.pis.educationalInformation))
                        const educBgRequiredNumber =  JSON.parse(response.data.pis.educationalInformation).length > 0        
                        addeducBG2(JSON.parse(response.data.pis.educbg2))



                        addUniqueHealthCosult(JSON.parse(response.data.pis.uniqueHealthCosult))
                        const requiredInputs = JSON.parse(response.data.pis.uniqueHealthCosult)
                        const requiredFourFive = (requiredInputs.emerContact != '') && (requiredInputs.address != '') && (requiredInputs.contactNumber.length > 9)

                        addPisID(response.data.pisID)

                        addHomeS(JSON.parse(response.data.pis.homeSketch))
                        const requiredHomeSketch = JSON.parse(response.data.pis.homeSketch).length > 0

                        setprogresStatus([requiredPersonalBackground.filter((value,index)=> personalBackground[value] != '').length == '11',
                                        updateStatus,
                                        educBgRequiredNumber,
                                        requiredFourFive,
                                        requiredHomeSketch 
                                        ])        
                                setTimeout(()=>{
                                        setloading(false)
                                },1500)
                
                        }catch (err){
                                if (!err?.response) {
                                        console.log(err)
                                }
                }
        }
       


        const pisPb = useStorePIS((state)=>state.pb)
        const pisFb = useStorePIS((state)=>state.fb)
        const sib = useStorePIS((state)=>state.sib)
        const educBG = useStorePIS((state)=>state.educBG)
        const fromDB = useStorePIS((state)=>state.aDDuhc)
        const pisHomeS = useStorePIS((state)=>state.homeS)

        useEffect(()=>{
                if(JSON.stringify(pisPb).length === 0){
                        getPisContent('dontChange')
                }else if(pisPb.lrn != student.LRN){
                        getPisContent()
                }else{
                        setloading(false)
                        
                        const father = pisFb.father
                        const mother = pisFb.mother
                        const guardian = pisFb.guardian
                        
                        // const fatherRequiredNumber = requiredFamilyBackground.filter((value)=> father[value] != '').length == '5'
                        // const motherRequiredNumber= requiredFamilyBackground.filter((value)=> mother[value] != '').length == '5'
                        // const guardianRequiredNumber =requiredFamilyBackground.filter((value)=> guardian[value] != '').length == '5' 

                        const fatherRequiredNumber = father.status == 'living'
                        const motherRequiredNumber= mother.status == 'living'
                        const guardianRequiredNumber = guardian.contactNumber != '+63'

                        
                        const siblingsRequiredNumber =  sib.length > 0
                        const updateStatus = fatherRequiredNumber || motherRequiredNumber || guardianRequiredNumber ? true:false

                        const educBgRequiredNumber =  educBG.length > 0  

                        const requiredFourFive = (fromDB.emerContact != '') && (fromDB.address != '') && (fromDB.contactNumber.length > 9)

                        const requiredHomeSketch = pisHomeS.length > 0 

                        setprogresStatus([requiredPersonalBackground.filter((value,index)=> pisPb[value] != '').length == '11',
                                        updateStatus,
                                        educBgRequiredNumber,
                                        requiredFourFive,
                                        requiredHomeSketch
                                        ])
                                        console.log(updateStatus)
                }
        },[])
        
        const [loading,setloading] = useState(true)

        
        const forSmallNav = {
                hide: { y: 0 },
                open: {
                        y: -210,
                        opacity: 1,
                        transition: {
                                // duration:0.5,
                        }
                },
                show:{ rotate: 0 ,  },
                close:{ rotate: 180 }
        }
        const [smallNav,setsmallNav] = useState(false)
        

        const [selected, setselected] = useState(null)
        const toggle = (i) =>{
                if(selected === i){
                        return setselected(null)
                }
                setselected(i)
        }
        const data = [
                <StudPis refresh={getPisContent} close={toggle}/> ,
                <Studpis2 refresh={getPisContent} close={toggle}/>,
                <Studpis3 refresh={getPisContent} close={toggle}/>,
                <Studpis4 refresh={getPisContent} close={toggle}/>,
                <Studpis5 refresh={getPisContent} close={toggle}/>
        ]


        const mustComplete = (value) =>{
                        toggle(value)
                        getPisContent()
              
        }
        

  return (
  <>

        {loading ?
        <>
          <div className='inset-0 absolute bg-black flex w-full h-full justify-center items-center text-center z-50 bg-opacity-10 ' >
                <PacmanLoader speedMultiplier={2} color={'black'}/>
          </div>
        </>:<>
        <motion.div className='absolute top-0 left-0 w-full rounded-md shadow-xl shadow-gray bg-white min-h-[700px] p-2'
                variants={container}
                initial="hidden"
                animate="show">
                        
                <div className='w-full h-full relative pt-[30px] '>
                                <div className='absolute right-10 top-1 border-blue-600 border-[2px] py-1 px-3 text-center cursor-pointer active:bg-blue-600 bg-blue-500 hover:bg-blue-600 text-white font-bold tracking-wider text-[20px] md:text-[15px] rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>
                                        Help?
                                </div>
                                <div onClick={(()=>close(false))} className='text-black absolute top-0 right-0 z-30 cursor-pointer '><RxCross2 size={35}/></div>
                                {data.map((value,i)=>{
                                        return <div key={i} className='w-full flex flex-col '>
                                                        <div onClick={()=> mustComplete(i)} className={`${selected == i ? '' : 'border-[gray]'} z-30 px-4 py-10 text-[20px] font-bold flex flex-row justify-between items-center cursor-pointer  border-[black] border-b-[2px]`}>
                                                                <div>
                                                                        <span className={selected == i ? '' : 'text-[gray]'}>{content[i]}</span> 
                                                                        <span className={selected == i ? 'text-[blue]' : 'text-blue-500'}> {progresStatus && progresStatus[i] ? 'Complete' :'In-Complete'}</span>
                                                                </div>
                                                                <div onClick={()=> mustComplete(i)}  className='underline text-[17px]'>{selected == i ? '' : 'Show'}</div>
                                                        </div>
                                                        <div className={`${selected == i ? '' : 'hidden'} border-[1px] border-[gray] `}>{value}</div>
                                                </div>
                                })}
                </div>
        </motion.div>
        

        
        </>
      }
  </>
  )
}
