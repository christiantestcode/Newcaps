import React,{useState} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'
import useStorePIS from '../../Store/storePIS';
import AddSiblings from '../../Student/PIS/MODALS/addSiblings';
import { FaAsterisk } from "react-icons/fa";

export default function Studpis2({refresh,close}) {

    const pisFb = useStorePIS((state)=>state.fb)
    const sib = useStorePIS((state)=>state.sib)
    const maritalStatus = useStorePIS((state)=>state.marital)


    const father = pisFb && pisFb.father

    const mother = pisFb && pisFb.mother
    
    const guardian = pisFb && pisFb.guardian
 

    const [fstatus,setfstatus]= useState(father.status)
    const [fname,setfname]= useState(father.name)
    const [fage,setfage]= useState(father.age)
    const [freligion,setfreligion]= useState(father.religion)
    const [fnationality,setfnationality]= useState(father.nationality)
    const [feducationalAttainment,setfeducationalAttainment]= useState(father.educationalAttainment)
    const [foccupation,setfoccupation]= useState(father.occupation)
    const [fpositionEmployer,setfpositionEmployer]= useState(father.positionEmployer)
    const [fofficeBusinessAddress,setfofficeBusinessAddress]= useState(father.officeBusinessAddress)
    const [fcontactNumber,setfcontactNumber]= useState(father.contactNumber.slice(3))

    const [mstatus,setmstatus]= useState(mother.status)
    const [mname,setmname]= useState(mother.name)
    const [mage,setmage]= useState(mother.age)
    const [mreligion,setmreligion]= useState(mother.religion)
    const [mnationality,setmnationality]= useState(mother.nationality)
    const [meducationalAttainment,setmeducationalAttainment]= useState(mother.educationalAttainment)
    const [moccupation,setmoccupation]= useState(mother.occupation)
    const [mpositionEmployer,setmpositionEmployer]= useState(mother.positionEmployer)
    const [mofficeBusinessAddress,setmofficeBusinessAddress]= useState(mother.officeBusinessAddress)
    const [mcontactNumber,setmcontactNumber]= useState(mother.contactNumber.slice(3))

    const [grelationshipW,setrelationshipW]= useState(guardian.relationshipW)
    const [gname,setgname]= useState(guardian.name)
    const [gage,setgage]= useState(guardian.age)
    const [greligion,setgreligion]= useState(guardian.religion)
    const [gnationality,setgnationality]= useState(guardian.nationality)
    const [geducationalAttainment,setgeducationalAttainment]= useState(guardian.educationalAttainment)
    const [goccupation,setgoccupation]= useState(guardian.occupation)
    const [gpositionEmployer,setgpositionEmployer]= useState(guardian.positionEmployer)
    const [gofficeBusinessAddress,setgofficeBusinessAddress]= useState(guardian.officeBusinessAddress)
    const [gcontactNumber,setgcontactNumber]= useState(guardian.contactNumber.slice(3))
    const [gMonthStayed,setgMonthStayed]= useState(guardian.monthStayed)

    const objectTopis = {
        father:{
            status:fstatus,
            name:fname,
            age:fage,
            religion:freligion,
            nationality:fnationality,
            educationalAttainment:feducationalAttainment,
            occupation:foccupation,
            positionEmployer:fpositionEmployer,
            officeBusinessAddress:fofficeBusinessAddress,
            contactNumber:'+63'+fcontactNumber
        },
        mother:{
            status:mstatus,
            name:mname,
            age:mage,
            religion:mreligion,
            nationality:mnationality,
            educationalAttainment:meducationalAttainment,
            occupation:moccupation,
            positionEmployer:mpositionEmployer,
            officeBusinessAddress:mofficeBusinessAddress,
            contactNumber:'+63'+mcontactNumber

        },
        guardian:{
            relationshipW:grelationshipW,
            name:gname,
            age:gage,
            religion:greligion,
            nationality:gnationality,
            educationalAttainment:geducationalAttainment,
            occupation:goccupation,
            positionEmployer:gpositionEmployer,
            officeBusinessAddress:gofficeBusinessAddress,
            contactNumber:'+63'+gcontactNumber,
            monthStayed:gMonthStayed

        }
    }

    const SaveAvailable = (e) =>{
        addFamilybg(objectTopis)
        addMaritalS(newMaritalStatus)
    }

    const pisID = useStorePIS((state)=>state.pisID)

    const savetoDB = async (familyBg,MaritalStat) =>{

      try {
             Axios.all([
                        await Axios.patch(`http://localhost:3500/pis`,
                        {
                        pisID:pisID,
                        content:familyBg,
                        tableName:'familyBackground'
                        }),
                        await Axios.patch(`http://localhost:3500/pis`,
                        {
                        pisID:pisID,
                        content:MaritalStat,
                        tableName:'maritalStatus'
                        })
                    ])
            refresh()
                Swal.fire({
                icon: 'success',
                title: 'Saved!',
                showConfirmButton: false,
                timer: 500
              })
       
        }catch (err){
            if (!err?.response) {
              console.log(err)
            }
          }

      }

    const addFamilybg = useStorePIS( state => state.addFamilybg)
    const addMaritalS = useStorePIS( state => state.addMaritalS)

    const finishLater = (value,name)=>{
        objectTopis[name]['status'] = value
        addFamilybg(objectTopis)
        addMaritalS(newMaritalStatus)
    }

    const removeSiblings = async (index) =>{
        sib.splice(index,1)
        const updatedSib = sib       
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'Warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then( async (result) => {
            if (result.isConfirmed) {
                try{
                    const response= await Axios.patch(`http://localhost:3500/pis`,
                    {
                      pisID:pisID,
                      content:updatedSib,
                      tableName:'siblings'
                    })
                      Swal.fire({
                          icon: 'success',
                          title: 'Deleted!',
                          showConfirmButton: false,
                        })
                        refresh()
                  }catch (err){
                    if (!err?.response) {
                      console.log(err)
                    }
                  }
            }
          })
      
    }
    const [showaddSiblings,setShowaddSiblings] = useState(false)

    ////MARITAL STATUS
    const [married,setmarried]= useState(maritalStatus.married)
    const [livingTogether,setlivingTogether]= useState(maritalStatus.livingTogether)
    const [singleParent,setsingleParent]= useState(maritalStatus.singleParent)
    const [widow,setwidow]= useState(maritalStatus.widow)
    const [temporarySeperated,settemporarySeperated]= useState(maritalStatus.temporarySeperated)
    const [permanentlySeperated,setpermanentlySeperated]= useState(maritalStatus.permanentlySeperated)
    const [marriedAnnulled,setmarriedAnnulled]= useState(maritalStatus.marriedAnnulled)
    const [fatherOfw,setfatherOfw]= useState(maritalStatus.fatherOfw)
    const [motherOfw,setmotherOfw]= useState(maritalStatus.motherOfw)
    const [fatherWpartner,setfatherWpartner]= useState(maritalStatus.fatherWpartner)
    const [motherWpartner,setmotherWpartner]= useState(maritalStatus.motherWpartner)

    const newMaritalStatus = {
        married:married,
        livingTogether:livingTogether,
        singleParent:singleParent,
        widow:widow,
        temporarySeperated:temporarySeperated,
        permanentlySeperated:permanentlySeperated,
        marriedAnnulled:marriedAnnulled,
        fatherOfw:fatherOfw,
        motherOfw:motherOfw,
        fatherWpartner:fatherWpartner,
        motherWpartner:motherWpartner
    }

    const updatedFb = useStorePIS((state)=>state.fb)
    const updatedMs = useStorePIS((state)=>state.marital)

    const saveAll = () =>{
        savetoDB(updatedFb,updatedMs)
    }    
    
    // const clearAll = (value,name) =>{
    //     objectTopis[name]['age'] = ''
    //     objectTopis[name]['contactNumber'] = ''
    //     objectTopis[name]['educationalAttainment'] = ''
    //     objectTopis[name]['name'] = ''
    //     objectTopis[name]['nationality'] = ''
    //     objectTopis[name]['occupation'] = ''
    //     objectTopis[name]['officeBusinessAddress'] = ''
    //     objectTopis[name]['positionEmployer'] = ''
    //     objectTopis[name]['religion'] = ''
    //     // console.log(objectTopis[name]['age'])
    //     setfstatus(value)
    //     finishLater()
    // }
    

  return (
    <>
    <div className='bg-white rounded-md flex flex-col px-4 overflow-auto overflow-x-hidden shadow-md shadow-black'>
        {/*//////////////////// FFATHER ///////////////*/}
        <div className='border-b-[2px] border-black py-4 relative'>
            
            <div>
                <div className='inline-block'>
                    <span className='text-[18px] font-bold'>FATHER </span>  
                    <span>Status:</span> 
                </div> 
                <span><FaAsterisk size={15} color='green' className='inline-block'/></span>
            </div> 
                    {/* STATUS */}
                            <div className='flex flex-row justify-around items-center py-4'>
                                <div className='flex justify-center items-center'>
                                    <input type='radio' className='w-[20px] h-[20px]'
                                    name="fstatus"
                                    value="living"
                                    checked={fstatus === 'living'}
                                    onChange={(e)=>{
                                        setfstatus(e.target.value)
                                        finishLater(e.target.value,'father')}}/> 
                                    <span>Living</span> 
                                </div>
                                <div className='flex justify-center items-center'>
                                    <input type='radio' className='w-[20px] h-[20px]'
                                    name="fstatus"
                                    value="deceased"
                                    checked={fstatus === 'deceased'}
                                    onChange={(e)=>{
                                        setfstatus(e.target.value)
                                        finishLater(e.target.value,'father')}}/> 
                                    <span>Deceased</span> 
                                </div>
                                <div className='flex justify-center items-center'>
                                    <input type='radio' className='w-[20px] h-[20px]'
                                    name="fstatus"
                                    value="unavailable"
                                    checked={fstatus === 'unavailable'}
                                    onChange={(e)=>{
                                        setfstatus(e.target.value)
                                        finishLater(e.target.value,'father')}}/> 
                                    <span>Unavailable</span>
                                </div>
                            </div>

                {fstatus === 'living'&& 
                <>  
                    <div className='mb-2'>
                        <div className='text-[15px]'>Name:{fstatus === 'living' && <span><FaAsterisk size={15} color='green' className='inline-block'/></span>}</div>
                        <input type='text' value={fname} onBlur={()=> SaveAvailable()} onChange={(e)=> setfname(e.target.value)} className='w-full shadow-inner h-[40px] shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                    </div>  

                    <div className='flex flex-col lg:flex-row gap-x-[10px]'>
                            <div className='mb-2'>
                                <div className='text-[15px]'>Age:{fstatus === 'living' && <span><FaAsterisk size={15} color='green' className='inline-block'/></span>}</div>
                                <input type='number' min='10' max='99' value={fage}  onChange={(e)=> setfage(e.target.value)} className='w-[40px] shadow-inner h-[40px] shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                    onBlur={(e)=>{
                                        if(e.target.value < 20){
                                            alert('Age must be 20 above')
                                        }
                                }}/>
                            </div>
                            <div className='mb-2 '>
                                <div className='text-[15px]'>Religion:{fstatus === 'living' && <span><FaAsterisk size={15} color='green' className='inline-block'/></span>}</div>
                                <select name="Religion" id="Religion"  value={freligion} onBlur={()=> SaveAvailable()} onChange={(e)=> setfreligion(e.target.value)}className='w-[150px] h-[40px] cursor-pointer shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                        <option value=""></option>
                                        <option value="Islam">Islam</option>
                                        <option value="Christian">Christian</option>
                                        <option value="Protestant">Protestant</option>
                                        <option value="Catholic">Catholic</option>
                                        <option value="I.N.C">I.N.C</option>
                                        <option value="Muslim">Muslim</option>
                                </select>
                            </div>
                            <div className='mb-2'>
                                <div className='text-[15px]'>Nationality:{fstatus === 'living' && <span><FaAsterisk size={15} color='green' className='inline-block'/></span>}</div>
                                <select name="citizenship" id="citizenship"  value={fnationality} onBlur={()=> SaveAvailable()} onChange={(e)=> setfnationality(e.target.value)} className='w-[150px] h-[40px] cursor-pointer shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                        <option value="Filipino">Filipino</option>
                                </select> 
                            </div>    
                    </div> 
   
                <div className='mb-2'>
                    <div>Educational Attainment</div>
                    <input type='text' value={feducationalAttainment} onBlur={()=> SaveAvailable()} onChange={(e)=> setfeducationalAttainment(e.target.value)} className='w-full h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                </div>  
                <div className='mb-2'>
                    <div>Occupation</div>
                    <input type='text' value={foccupation} onBlur={()=> SaveAvailable()} onChange={(e)=> setfoccupation(e.target.value)} className='w-full h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                </div> 
                <div className='mb-2'>
                    <div>Position</div>
                    <input type='text' value={fpositionEmployer} onBlur={()=> SaveAvailable()} onChange={(e)=> setfpositionEmployer(e.target.value)} className='w-full h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                </div> 
                <div className='mb-2'>
                    <div>Office / Business Address</div>
                    <input type='text' value={fofficeBusinessAddress} onBlur={()=> SaveAvailable()} onChange={(e)=> setfofficeBusinessAddress(e.target.value)} className='w-full h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                </div> 
                <div className='mb-2'>
                    <div>
                        <div className='text-[15px] inline-block'>Contact Number :{fstatus === 'living' && <span><FaAsterisk size={15} color='green' className='inline-block'/></span>}</div>
                        <span className='text-[gray] inline-block'>Example "9123456789"</span>
                    </div>
                    <div className='flex flex-row w-[290px] items-center'><span className='shadow-inner px-2 py-1 shadow-gray-500/50 border-[1px] border-gray-200 rounded-md'>+63</span>
                        <input type='text' className='shadow-inner h-[40px] w-full shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2 py-1 relative' 
                            onBlur={((e)=>{
                                if((fcontactNumber[0] == '9') && (fcontactNumber.length == 10)){ 
                                    setfcontactNumber(fcontactNumber)
                                }else{
                                    Swal.fire({
                                        icon: 'warning',
                                        title: 'Invalid input!!',
                                        text: ' Must start 9 and follow this format 9123456789',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    setfcontactNumber('')
                                   objectTopis['father']['contactNumber'] = '+63'
                                }    
                                SaveAvailable()
                            })} 
                            value={Number(fcontactNumber)? Number(fcontactNumber):''} 
                            maxLength="10"
                            onChange={(e)=> {
                                if(isNaN(e.target.value))
                                { return alert("Must input numbers")}
                                setfcontactNumber(e.target.value)
                            }}/>
                    </div>
                </div> 
                </>}
        </div>
                            {/*//////////////////// MOTHER ///////////////*/}
        <div className='border-b-[2px] border-black py-4'>
                    <div>
                        <div className='inline-block'>
                            <span className='text-[18px] font-bold'>MOTHER </span>  
                            <span>Status:</span> 
                        </div> 
                        <span><FaAsterisk size={15} color='green' className='inline-block'/></span>
                    </div> 
                    
                                <div className='flex flex-row justify-around items-center py-4'>
                                    <div className='flex justify-center items-center'>
                                        <input type='radio' className='w-[20px] h-[20px]' 
                                        name="mstatus"
                                        value="living"
                                        checked={mstatus === 'living'}
                                        onChange={(e)=>{
                                            setmstatus(e.target.value)
                                            finishLater(e.target.value,'mother')}}/> 
                                        <span>Living</span>  
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <input type='radio' className='w-[20px] h-[20px]' 
                                        name="mstatus"
                                        value="deceased"
                                        checked={mstatus === 'deceased'}
                                        onChange={(e)=>{
                                            setmstatus(e.target.value)
                                            finishLater(e.target.value,'mother')}}/> 
                                        <span>Deceased</span> 
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <input type='radio' className='w-[20px] h-[20px]'
                                        name="mstatus"
                                        value="unavailable"
                                        checked={mstatus === 'unavailable'}
                                        onChange={(e)=>{
                                            setmstatus(e.target.value)
                                            finishLater(e.target.value,'mother')}}/>  
                                        <span>Unavailable</span>
                                    </div>
                                </div>

                {mstatus === 'living' && <>
                    <div className='mb-2'>
                        <div className='text-[15px]'>Name:{fstatus === 'living' && <span><FaAsterisk size={15} color='green' className='inline-block'/></span>}</div>
                        <input type='text' value={mname} onBlur={()=> SaveAvailable()} onChange={(e)=> setmname(e.target.value)} className='w-full h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                    </div>  
                    <div className='flex flex-col lg:flex-row gap-x-[10px]'>
                            <div className='mb-2'>
                                <div className='text-[15px]'>Age:{fstatus === 'living' && <span><FaAsterisk size={15} color='green' className='inline-block'/></span>}</div>
                                <input type='number' min='10' max='99' value={mage}  onChange={(e)=> setmage(e.target.value)} className='w-[40px] h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                    onBlur={(e)=>{
                                        if(e.target.value < 20){
                                            alert('Age must be 20 above')
                                        }
                                        SaveAvailable()
                                }}/>
                            </div>
                            <div className='mb-2'>
                                <div className='text-[15px]'>Religion:{fstatus === 'living' && <span><FaAsterisk size={15} color='green' className='inline-block'/></span>}</div>
                                <select name="Religion" id="Religion" value={mreligion} onBlur={()=> SaveAvailable()} onChange={(e)=> setmreligion(e.target.value)}className='w-[150px] h-[40px] cursor-pointer shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                        <option value=""></option>
                                        <option value="Islam">Islam</option>
                                        <option value="Christian">Christian</option>
                                        <option value="Protestant">Protestant</option>
                                        <option value="Catholic">Catholic</option>
                                        <option value="I.N.C">I.N.C</option>
                                        <option value="Muslim">Muslim</option>
                                </select>
                            </div>
                            <div className='mb-2'>
                                <div className='text-[15px]'>Nationality:{fstatus === 'living' && <span><FaAsterisk size={15} color='green' className='inline-block'/></span>}</div>
                                <select name="citizenship" id="citizenship"  value={mnationality} onBlur={()=> SaveAvailable()} onChange={(e)=> setmnationality(e.target.value)} className='w-[150px] h-[40px] cursor-pointer shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                        <option value="Filipino">Filipino</option>
                                </select> 
                            </div>
                    </div> 
                <div className='mb-2'>
                    <div>Educational Attainment</div>
                    <input type='text' value={meducationalAttainment} onBlur={()=> SaveAvailable()} onChange={(e)=> setmeducationalAttainment(e.target.value)} className='w-full h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                </div>  
                <div className='mb-2'>
                    <div>Occupation</div>
                    <input type='text' value={moccupation} onBlur={()=> SaveAvailable()} onChange={(e)=> setmoccupation(e.target.value)} className='w-full h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                </div> 
                <div className='mb-2'>
                    <div>Position / Employer</div>
                    <input type='text' value={mpositionEmployer} onBlur={()=> SaveAvailable()} onChange={(e)=> setmpositionEmployer(e.target.value)} className='w-full h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/> 
                </div> 
                <div className='mb-2'>
                    <div>Office / Business Address</div>
                    <input type='text' value={mofficeBusinessAddress} onBlur={()=> SaveAvailable()} onChange={(e)=> setmofficeBusinessAddress(e.target.value)} className='w-full h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                </div> 
                <div className='mb-2'>
                    <div>
                        <div className='text-[15px] inline-block'>Contact Number :{mstatus === 'living' && <span><FaAsterisk size={15} color='green' className='inline-block'/></span>}</div>
                        <span className='text-[gray] inline-block'>Example "9123456789"</span>
                    </div>       
                    <div className='flex flex-row w-[290px] items-center'><span className='shadow-inner h-[40px] px-2 py-1 shadow-gray-500/50 border-[1px] border-gray-200 rounded-md'>+63</span>
                        <input type='text' className='shadow-inner h-[40px] w-full shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2 py-1 relative' 
                            onBlur={((e)=>{
                                if((mcontactNumber[0] == '9') && (mcontactNumber.length == 10)){ 
                                    setmcontactNumber(fcontactNumber)
                                }else{
                                    Swal.fire({
                                        icon: 'warning',
                                        title: 'Invalid input!!',
                                        text: ' Must start 9 and follow this format 9123456789',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    setmcontactNumber('')
                                   objectTopis['mother']['contactNumber'] = '+63'
                                }    
                                SaveAvailable()
                            })} 
                            value={Number(mcontactNumber)? Number(mcontactNumber):''} 
                            maxLength="10"
                            onChange={(e)=> {
                                    if(isNaN(e.target.value))
                                        { return alert("Must input numbers")}
                                        setmcontactNumber(e.target.value)
                            }} />
                    </div>
                </div>
                </>}  
        </div>
       
                            {/*//////////////////// GUARDIAN ///////////////*/}

        <div className='border-b-[2px] border-black py-2'>
                    <div className='text-[18px] font-bold'>GUARDIAN</div>
                    <div className='mb-2'>
                        <div>Indicate Relationship</div>
                        <input type='text' value={grelationshipW} onBlur={()=> SaveAvailable()} onChange={(e)=> setrelationshipW(e.target.value)} placeholder='TITA/LOLA' className='w-full h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                    </div>  
                    <div className='mb-2'>
                        <div>Name</div>
                        <input type='text' value={gname} onBlur={()=> SaveAvailable()} onChange={(e)=> setgname(e.target.value)} className='w-full h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                    </div>  
                    <div className='flex flex-col lg:flex-row gap-x-[20px]'>
                            <div className='mb-2'>
                                <div>Age</div>
                                <input type='text'value={gage} onChange={(e)=> setgage(e.target.value)} className='w-[40px] h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                onBlur={(e)=>{
                                    if(e.target.value < 20){
                                        alert('Age must be 20 above')
                                    }
                            }}></input>
                            </div>
                            <div className='mb-2 '>
                                <div>Religion</div>
                                 <select name="Religion" id="Religion" value={greligion} onBlur={()=> SaveAvailable()} onChange={(e)=> setgreligion(e.target.value)}className='w-[150px] h-[40px] cursor-pointer shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                        <option value=""></option>
                                        <option value="Islam">Islam</option>
                                        <option value="Christian">Christian</option>
                                        <option value="Protestant">Protestant</option>
                                        <option value="Catholic">Catholic</option>
                                        <option value="I.N.C">I.N.C</option>
                                        <option value="Muslim">Muslim</option>
                                </select>
                            </div>
                        <div className='mb-2'>
                            <div>Nationality</div>
                            <select name="citizenship" id="citizenship" value={gnationality} onBlur={()=> SaveAvailable()} onChange={(e)=> setgnationality(e.target.value)} className='w-[150px] h-[40px] cursor-pointer shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                    <option value="Filipino">Filipino</option>
                            </select>
                        </div>
                    </div> 
                  
   
                <div className='mb-2'>
                    <div>Educational Attainment</div>
                    <input type='text' value={geducationalAttainment} onBlur={()=> SaveAvailable()} onChange={(e)=> setgeducationalAttainment(e.target.value)} className='w-full h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>  
                </div>  
                <div className='mb-2'>
                    <div>Occupation</div>
                    <input type='text' value={goccupation} onBlur={()=> SaveAvailable()} onChange={(e)=> setgoccupation(e.target.value)} className='w-full h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                    
                </div> 
                <div className='mb-2'>
                    <div>Position / Employer</div>
                    <input type='text' value={gpositionEmployer} onBlur={()=> SaveAvailable()} onChange={(e)=> setgpositionEmployer(e.target.value)} className='w-full h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/> 
                </div> 
                <div className='mb-2'>
                    <div>Office / Business Address</div>
                    <input type='text' value={gofficeBusinessAddress} onBlur={()=> SaveAvailable()} onChange={(e)=> setgofficeBusinessAddress(e.target.value)} className='w-full h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                </div> 
                <div className='mb-2'>
                    <div>Contact No. <span className='text-[gray]'>example "9123456789"</span></div>
                    <div className='flex flex-row w-[290px] items-center'><span className='shadow-inner px-2 py-1 shadow-gray-500/50 border-[1px] border-gray-200 rounded-md'>+63</span>
                        <input type='text' disabled={!(mstatus === 'living') && !(fstatus === 'living')} className='shadow-inner h-[40px] w-full shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2 py-1 relative' 
                         onBlur={((e)=>{
                            if((gcontactNumber[0] == '9') && (gcontactNumber.length == 10)){ 
                                gcontactNumber(gcontactNumber)
                            }else{
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Invalid input!!',
                                    text: ' Must start 9 and follow this format 9123456789',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                gcontactNumber('')
                               objectTopis['guardian']['contactNumber'] = '+63'
                            }    
                            SaveAvailable()
                        })} 
                         value={Number(gcontactNumber)? Number(gcontactNumber):''} 
                         maxLength="10"
                         onChange={(e)=> {
                            if(isNaN(e.target.value))
                            { return alert("Must input numbers")}
                            setgcontactNumber(e.target.value)
                            }} >
                        </input>
                    </div>
                </div> 
                <div className='mb-2'>
                    <div>Number of months or years staying with the Guardian</div>
                    <input type='text' value={gMonthStayed} onBlur={()=> SaveAvailable()} onChange={(e)=> setgMonthStayed(e.target.value)} className='w-full h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/> 
                </div> 
        </div>

         {/* //////////////////////////////Number of Siblings */}
         <div className=''>
                    <div className='text-[18px] font-bold'>NUMBER OF SIBLINGS:</div>
                    {sib.map((value,index)=>{
                        return <div key={index} className='border-2 relative border-b-black border-transparent '> 
                                    <div className='mb-2'>
                                        <div onClick={()=> removeSiblings(index)} className='bg-red-600 text-white cursor-pointer absolute top-0 right-1 rounded-md hover:bg-red-700 px-2'>X</div>
                                        <div><span className='text-[16px]'>{index+1}</span>. Name</div>
                                        <input type='text' disabled className='w-full h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                            value={value.name}
                                        ></input>
                                    </div>  
                                    <div className='flex flex-col lg:flex-row gap-x-[10px]'>
                                            <div className='mb-2'>
                                                <div>Age</div>
                                                <input type='number' min='10' max='99' disabled className='w-[40px] h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                value={value.age}
                                            ></input>
                                            </div>
                                            <div className='mb-2 mx-2'>
                                                <div>Occupation</div>
                                                <input type='text' disabled className='w-[150px] h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                value={value.occupation}
                                                ></input>
                                            </div>
                                            <div className='mb-2'>
                                                <div>School / Place Of Work</div>
                                                <input type='text' disabled className='w-[240px] h-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                    value={value.school_placeWorkL}
                                                ></input>
                                            </div>

                                    </div>         
                                </div>
                    })}
                        <div className=' flex flex-row w-full justify-between border-2 border-t-black border-transparent p-2'>
                            <div className='bg-green-600 rounded-md px-4 py-2 w-full cursor-pointer hover:bg-green-500 text-center text-white font-bold' 
                             onClick={()=>{
                                setShowaddSiblings(true)
                            }}>ADD SIBLING INFO</div>
                        </div>
        </div>
                    
         {/* //////////////////////////////Marital Status */}
                    <div className='text-[18px] font-bold'>PARENTS' MARITAL STATUS</div>
                    <div className='flex flex-row'>
                        <div className='w-full sm:w-fit'>
                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' className='w-[30px] h-[20px]' readOnly checked={married && true} ></input>
                                        <div>MARRIED/SINCE WHEN:</div>
                                    </div>
                                    <input type='text' onBlur={()=> SaveAvailable()} onChange={(e)=>setmarried(e.target.value)} value={married} className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={livingTogether && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>LIVING TOGETHER /SINCE WHEN:</div>
                                    </div>
                                    <input type='text' onBlur={()=> SaveAvailable()} onChange={(e)=>setlivingTogether(e.target.value)} value={livingTogether} className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' onBlur={()=> SaveAvailable()} onClick={(e)=>setsingleParent(!singleParent)} checked={singleParent && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>SINGLE PARENT:</div>
                                    </div>
                                   
                                </div>

                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={widow && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>WIDOW or WIDOWER/SINCE WHEN:</div>
                                    </div>
                                    <input type='text' onBlur={()=> SaveAvailable()} onChange={(e)=>setwidow(e.target.value)} value={widow} className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={temporarySeperated && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>TEMPORARILY SEPERATED/SINCE WHEN:</div>
                                    </div>
                                    <input type='text' onBlur={()=> SaveAvailable()} onChange={(e)=>settemporarySeperated(e.target.value)} value={temporarySeperated} className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={permanentlySeperated && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>PERMANENTLY SEPERATED/SINCE WHEN:</div>
                                    </div>
                                    <input type='text' onBlur={()=> SaveAvailable()} onChange={(e)=>setpermanentlySeperated(e.target.value)} value={permanentlySeperated} className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>



                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={marriedAnnulled && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>MARRIED ANNULLED/SINCE WHEN:</div>
                                    </div>
                                    <input type='text' onBlur={()=> SaveAvailable()} onChange={(e)=>setmarriedAnnulled(e.target.value)} value={marriedAnnulled} className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={fatherOfw && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>FATHER OFW/SINCE WHEN:</div>
                                    </div>
                                    <input type='text' onBlur={()=> SaveAvailable()} onChange={(e)=>setfatherOfw(e.target.value)} value={fatherOfw} className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={motherOfw && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>MOTHER OFW/SINCE WHEN:</div>
                                    </div>
                                    <input type='text' onBlur={()=> SaveAvailable()} onChange={(e)=>setmotherOfw(e.target.value)} value={motherOfw} className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                                <div className='flex flex-col sm:flex-rowpy-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={fatherWpartner && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>FATHER W/ANOTHER PARTNER/SINCE WHEN:</div>
                                    </div>
                                    <input type='text' onBlur={()=> SaveAvailable()} onChange={(e)=>setfatherWpartner(e.target.value)} value={fatherWpartner} className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox'  checked={motherWpartner && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>MOTHER W/ANOTHER PARTNER/SINCE WHEN:</div>
                                    </div>
                                    <input type='text' onBlur={()=> SaveAvailable()} onChange={(e)=>setmotherWpartner(e.target.value)} value={motherWpartner} className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                        </div>
                    </div>


        <div className='text-[blue]  fixed bottom-16 right-8 z-30 cursor-pointer flex flex-col '>
                <div  onClick={(()=>saveAll())} className="border-green-600 border-[2px] py-1 px-3 text-center active:bg-green-600 bg-green-500 hover:bg-green-600 text-white font-bold tracking-wider text-[15px] md:text-[20px] shadow hover:shadow-lg outline-none focus:outline-none rounded-md ease-linear transition-all duration-150">
                 SAVE
                </div>
                <div onClick={()=> close(null)} className=' z-30 py-1 my-2 px-3 border-gray-500 border-2 rounded-md cursor-pointer text-center text-black hover:bg-gray-300'>HIDE</div>
        </div>
</div>
{showaddSiblings && <AddSiblings close={setShowaddSiblings} refresh={refresh}/> }

    </>
  )
}
