import "./App.css";
import React, { useState } from "react";
// import RightSide from "./components/RigtSide/RightSide";

import MainDash from "./components/MainDash/MainDash";
import Sidebar from "./components/Sidebar";
import Users from "./components/Users/users";
import Attendance from "./components/Attendance/Attendance";
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [option, setOption] = useState(null);

  const handleOption = (Val) => {
    setOption(Val);
  };

  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar option={handleOption} />

        {/* <MainDash /> */}

        {option === 0 ? (
          <MainDash />
        ) : option === 1 ? (
          <Attendance />
        ) : option === 2 ? (
          <Users />
        ) : (
          <MainDash />
        )}

        {/* <RightSide/> */}

        {/* <h1>{if(message){}}</h1> */}
      </div>
    </div>
  );
}

export default App;
