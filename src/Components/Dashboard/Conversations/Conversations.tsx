import React, { useState } from "react";
import MainFrame from "./MainFrame/MainFrame";
import SideBar from "./Sidebar/Sidebar";

const Conversations = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  return (
    <div className="relative z-0 flex grow">
      <SideBar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <MainFrame />
    </div>
  );
};

export default Conversations;
