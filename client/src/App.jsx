import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import url from "./url.json";
import LoginMain from "./container/LoginMain";
import WebsiteBuilder from "./container/WebsiteBuilder";
import ProjectDashboard from "./container/ProjectDashboard";
import { UserVerify } from "./scripts/UserAuth";
const  App=()=>{
  const[register,setRegister] = useState({
    state:false,
    info:null,
  });
 
  
  const check=async()=>{
    let info = await UserVerify();
    if(info!=null){
      setRegister({
        state:true,
        info:info,
      }
      );
    }else{
      setRegister({
        state:false,
        info:null
      });
    }
  }
  useEffect(()=>{
    check();
  })
  return (
    <Routes>
      <Route path={url.Dashboard} element={register.state==true?<ProjectDashboard />:<LoginMain setRegister={setRegister}></LoginMain>} />
      <Route path={url.Main} element={register.state==true?<WebsiteBuilder />:<LoginMain setRegister={setRegister}></LoginMain>}></Route>
      <Route path="*" element={register.state==true?<ProjectDashboard/>:<LoginMain setRegister={setRegister}/>}></Route>
    </Routes>
  );
}

export default App;
