import { useNavigate } from 'react-router-dom';
import teacher from './images/frontPage/TeacherReferral.svg'
import firstP from './images/frontPage/FirstPage.svg'
import firstPimg from './images/frontPage/firstPimg.svg'
import PIS from './images/frontPage/PIS.svg'
import Appointments from './images/frontPage/appointment.svg'
import counseling from './images/frontPage/counseling.svg'
import paperP from './images/frontPage/paperP.svg'

export default function FrontPage() {

    const navigate = useNavigate()

  return (
  <>
           
        <div className='overflow-x-hidden'>
               
            <>
                <div name='Nav' className=' w-full flex flex-row justify-between py-4 px-5 lg:px-40 text-[20px] font-bold text-[#F6F1F1]  bg-[#279EFF]'>
                    <div>
                        <span className='bg-[#279EFF] w-fit px-2 py-1 rounded-md textS'>Cabangan High School</span>
                    </div>
                    <div onClick={()=> navigate('/login')} className='px-10 glass rounded-md pointer p-1 textS text-[20px] font-bold hidden md:flex cursor-pointer'>
                         <span>Login</span>
                     </div>
                </div>

                <div name='Home' className='w-full h-fit lg:h-[80vh] min-h-[500px] bg-[#F6F1F1]'>
                        <div className='w-full h-full bg-[#279EFF] rounded-bl-[150px]'>
                            <div className='w-[70%] mx-auto h-full flex flex-col lg:flex-row justify-around items-center gap-y-[50px] '>
                                <div className='w-[400px] h-[400px] flex flex-col items-center justify-center gap-y-[20px]'>  
                                    <p className='text-[30px] text-center textS font-bold text-white'>WELCOME TO GUIDANCE MANAGEMENT AND COUNSELING SERVICES SYSTEM </p>
                                    <div className='flex flex-row justify-around w-full relative'>
                                        <img src={firstPimg} className='w-[100px]'/>
                                        <img src={counseling} className='w-[100px]'/>
                                        <img src={paperP} className='w-[100px]'/>
                                    </div>
                                    <div onClick={()=> navigate('/login')} className='flex md:hidden px-10 glass rounded-md pointer p-1 textS text-[20px] font-bold gap-x-[10px] cursor-pointer textS'>
                                            <span>Login</span>
                                    </div>
                                </div>  
                                    <img src={firstP} className='min-w-[430px] w-[30%]'></img>
                            </div>
                        </div>
                </div>

                <div name='Referral' className='w-full h-fit lg:h-[90vh]  min-h-[600px] bg-[#279EFF]'>
                        <div className='w-full h-full bg-[#F6F1F1] rounded-r-[150px]'>
                            <div className='w-[95%] xl:w-[70%] h-full mx-auto relative'>
                                <div className='w-full h-full flex flex-col lg:flex-row justify-around items-center pt-[120px] lg:pt-1 gap-y-[50px] z-50 relative py-10'>
                                    <img src={teacher} className='min-w-[430px] w-[30%]'></img>
                                    <div className='pb-10'> 
                                        <div className='flex flex-col gap-4 py-4'>
                                            <p className='text-[30px] font-bold px-2 textSb'>Referral for Counseling</p>
                                            <p className='text-[16px] max-w-[500px] lg:max-h-[280px] px-10 sm:px-1 textSb'>A formal communication made by one individual or professional to another, typically a counselor or therapist, recommending a person for counseling services. It often includes information about the person in need of counseling, their specific issues or concerns, and the reasons for the referral. Additionally, it may highlight the urgency of the situation or any relevant background information that would assist the counselor in providing appropriate care. Referral requests play a crucial role in helping individuals access the appropriate support and resources for their mental health and well-being.</p>
                                        </div> 
                                    </div>
                                </div>
                                <div className='absolute z-20 top-[60%] left-[60%] lg:left-[40%] w-[250px] h-[250px] rounded-full bg-orange-500 bg-opacity-80'></div>
                                <div className='absolute z-20 bottom-[10%] lg:top-[20%] left-[-20%] sm:left-[10%] lg:left-[80%] w-[150px] h-[150px] rounded-full bg-[#279EFF] bg-opacity-80'></div>
                                <div className='absolute z-20 bottom-[2%] lg:top-[18%] left-[20%] lg:left-[65%] w-[100px] h-[100px] rounded-full bg-[#0802A3] bg-opacity-70'></div>
                            </div>
                        </div>
                </div>

                <div name='PIS' className='w-full h-fit lg:h-[90vh]  min-h-[600px] bg-[#F6F1F1] text-white'>
                        <div className='w-full h-full bg-[#279EFF] rounded-l-[150px]'>
                            <div className='w-[95%] xl:w-[70%] h-full mx-auto relative'>
                                <div className='w-full h-full flex flex-col lg:flex-row justify-around items-center pt-[120px] lg:pt-1 gap-y-[50px] z-50 relative py-10'>
                                    <div className='pb-10 order-2 lg:order-1'> 
                                        <div className='flex flex-col gap-4 py-4'>
                                            <p className='text-[30px] font-bold px-2 textS'>Personal Information</p>
                                            <p className='text-[16px] max-w-[500px] lg:max-h-[280px] px-10 sm:px-1 textS'>A personal data sheet provides your biographical and logistical information, including contact information and details such as past places of residence, education, and social or community activities. Personal data sheets are especially useful tools if you are sight-impaired, as they provide a complete list of accurate information that a scribe can then use to fill in forms. Some universities and other organizations request personal data sheets as a component of admissions or scholarship applications. Compile a personal data sheet by including as much information about yourself as you feel comfortable giving.</p>
                                        </div> 
                                    </div>
                                    <img src={PIS} className='min-w-[430px] w-[30%] order-1 lg:order-2 rounded-md pis'></img>
                                </div>
                                <div className='absolute z-20 top-[60%] lg:top-[20%] left-[60%] sm:left-[10%] lg:left-[20%] w-[150px] h-[150px] rounded-full bg-orange-500 bg-opacity-80'></div>
                                <div className='absolute z-20 bottom-[10%] left-[-20%] lg:left-[10%] w-[250px] h-[250px] rounded-full bg-[#0802A3] bg-opacity-80'></div>
                                <div className='absolute z-20 bottom-[2%] lg:top-[18%] left-[50%] lg:left-[45%] w-[100px] h-[100px] rounded-full bg-[#071952] bg-opacity-70'></div>
                            </div>
                        </div>
                </div>

                <div name='Appointment' className='w-full h-fit lg:h-[90vh]  min-h-[600px] bg-[#F6F1F1] text-black'>
                        <div className='w-full h-full bg-[#F6F1F1] rounded-r-[150px]'>
                            <div className='w-[95%] xl:w-[70%] h-full mx-auto relative'>
                                <div className='w-full h-full flex flex-col lg:flex-row justify-around items-center pt-[120px] lg:pt-1 gap-y-[50px] z-50 relative py-10'>
                                    <img src={Appointments} className='min-w-[430px] w-[30%]'></img>
                                    <div className='pb-10'> 
                                        <div className='flex flex-col gap-4 py-4'>
                                            <p className='text-[30px] font-bold px-2 textSb'>Counseling Appointment</p>
                                            <p className='text-[17px] max-w-[500px] lg:max-h-[280px] px-10 sm:px-1 textSb'>An appointment request for counseling is a formal request made by an individual seeking counseling services. It typically includes the request contact information, preferred date and time for the session, a brief description of the issues prompting counseling, and any specific preferences or requirements. This request helps the counselor or therapist understand the clients needs and arrange a suitable appointment to address their concerns effectively. It also serves as the initial step in establishing a therapeutic relationship between the client and the counselor.</p>
                                        </div> 
                                    </div>
                                </div>
                                <div className='absolute z-20 top-[60%] left-[60%] lg:left-[40%] w-[250px] h-[250px] rounded-full bg-orange-500 bg-opacity-80'></div>
                                <div className='absolute z-20 bottom-[10%] lg:top-[20%] left-[-20%] sm:left-[10%] lg:left-[80%] w-[150px] h-[150px] rounded-full bg-[#279EFF] bg-opacity-80'></div>
                                <div className='absolute z-20 bottom-[2%] lg:top-[18%] left-[20%] lg:left-[65%] w-[100px] h-[100px] rounded-full bg-[#0802A3] bg-opacity-70'></div>
                            </div>
                        </div>
                </div>

                <div name='Footer'  className='w-full h-[80px] bg-[#F6F1F1]'>
                        <div className='w-full flex justify-center items-center h-full bg-[#279EFF] rounded-tl-[150px] textS text-white tracking-widest'>
                                        Built by: Christian Babasa
                        </div>
                </div>

            </> 
        </div>
  </>

  )
}
    
