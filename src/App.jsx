import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import FrontPage from './FrontPage';
import Referral from './Referral';
import Login from './Login';
import RequireAuthOnline from './Auth/RequireAuthOnline';
import RequireAuth from './Auth/RequireAuth_role'
import Home from './Student/Home';
import Navs from './Admin/Nav'
import Dashboard from './Admin/Dashboard'
import StudentPis from './Admin/StudentPis';
import Requests from './Admin/Requests';
import Calendar from './Admin/Calendar';
import Restore from './Restore';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />}/>
        <Route path="/Referral" element={<Referral />}/>
        <Route path="/Login" element={<Login />}/>

            
        <Route element={<RequireAuthOnline allowed={["loggedIN"]}/>}>

            <Route element={<RequireAuth allowedRoles={["student"]}/>}>
                  <Route path="/nav/home/student" exact element={<Home/>}/>
            </Route>

            <Route element={<RequireAuth allowedRoles={["gc"]}/>}>
                  <Route path="/nav/home/gc/" exact element={<Navs/>}>
                        <Route path="dashboard" exact element={<Dashboard/>}/> 
                        <Route path="studentPis" exact element={<StudentPis/>}/> 
                        <Route path="requests/:type" exact element={<Requests/>}/> 
                        <Route path="calendar" exact element={<Calendar/>}/> 
                  </Route>
                  <Route path="/nav/home/restore" exact element={<Restore/>}/> 
            </Route>
        
        </Route>

        

      </Routes>
    </BrowserRouter>
   
  );
}

export default App;