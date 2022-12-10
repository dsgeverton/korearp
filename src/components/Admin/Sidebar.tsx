import { faArrowAltCircleLeft, faArrowLeft, faBoxesStacked, faChartLine, faChevronCircleLeft, faChevronCircleRight, faGear, faHouse, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarItem } from "./SidebarItem";


export const Sidebar = () => {

  const [expanded, setExpanded] = useState(true)

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");

  }, []);

  return (
    <div className={`flex flex-col bg-gray-900 ${expanded && "w-1/5"} transition-all text-white relative`}>
      <div className="absolute -right-4 top-4 z-20">
        {
          expanded ?
          <FontAwesomeIcon onClick={() => {setExpanded(!expanded)}} className="cursor-pointer" icon={faChevronCircleLeft} size={"2xl"} />
          :
          <FontAwesomeIcon onClick={() => {setExpanded(!expanded)}} className="cursor-pointer" icon={faChevronCircleRight} size={"2xl"} />

        }
      </div>
      <div className="text-center p-4 mb-4 uppercase">
        {
          expanded && <h1>Painel Admin</h1>
        }
      </div>
      <ul className="flex gap-2 flex-col p-2">
        <SidebarItem description={`${expanded ? "home" : "" }`} icon={faHouse} uri={'/'} />
        <SidebarItem description={`${expanded ? "membros" : "" }`} icon={faPeopleGroup} uri={'/membros'} />
        <SidebarItem description={`${expanded ? "itens" : "" }`} icon={faBoxesStacked} uri={'/itens'} />
        <SidebarItem description={`${expanded ? "dashboard" : "" }`} icon={faChartLine} uri={'/dashboard'} />
        <SidebarItem description={`${expanded ? "configs" : "" }`} icon={faGear} uri={'/config'} />
      </ul>
    </div>
  );
};