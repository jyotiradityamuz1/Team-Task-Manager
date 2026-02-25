import DashBoard from "./Pages/DashBoard";
import Login from "./Pages/Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistrationPage from "./Pages/RegistrationPage";
import { APP_URLS, } from "./config/url";
import ProjectPage from "./Pages/ProjectPage";
import CreatProject from "./Pages/CreatProject";
import Team from "./Pages/Team";
import SettingPage from "./Pages/SettingPage";
import ChangePassword from "./Pages/ChangePassword";
import ForgetPassword from "./Pages/ForgetPassword";
function App() {


  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        
        <Route path={APP_URLS.LOGIN} element={<Login />} />
        <Route path="/" element= {<DashBoard />} />
        <Route path ={APP_URLS.PROJECT} element={<ProjectPage/>}/>
        <Route path={APP_URLS.REGISTER} element={<RegistrationPage />} />
        <Route path={APP_URLS.CREAT_PROJECT} element={<CreatProject />} />
        <Route path={APP_URLS.TEAM} element={<Team/>} />
        <Route path={APP_URLS.SETTING} element={<SettingPage/>} />
        <Route path={APP_URLS.CHANGE_PASSWORD} element={<ChangePassword/>} />
        <Route path={APP_URLS.FORGET_PASSWORD} element={<ForgetPassword/>} />


      </Routes>
    </BrowserRouter>
  )
}

export default App;
