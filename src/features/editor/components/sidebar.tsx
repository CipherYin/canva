"use client";

import { ImageIcon, LayoutTemplate, Pencil, Presentation, Settings, Shapes, Sparkles, TextIcon, Type } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { ActiveTool } from "../types";

interface SidebarProps {
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

const Sidebar = (
    {
        activeTool,
        onChangeActiveTool
    }: SidebarProps
) => {
    return ( 
        <aside className="bg-white flex flex-col w-[100px] h-full border-r overflow-y-auto">
            <ul className="flex flex-col">
                <SidebarItem
                    icon={LayoutTemplate}
                    lable="Design"
                    isActive={activeTool === "templates"}
                    onClick={()=>onChangeActiveTool("templates")}
                />
               <SidebarItem
                    icon={ImageIcon}
                    lable="Image"
                    isActive={activeTool === "images"}
                    onClick={()=>onChangeActiveTool("images")}
                />
                 <SidebarItem
                    icon={Type}
                    lable="Text"
                    isActive={activeTool === "text"}
                    onClick={()=>onChangeActiveTool("text")}
                />
                 <SidebarItem
                    icon={Shapes}
                    lable="Shapes"
                    isActive={activeTool==="shapes"}
                    onClick={()=>onChangeActiveTool("shapes")}
                />

                <SidebarItem
                    icon={Sparkles}
                    lable="AI"
                    isActive={activeTool==="ai"}
                    onClick={()=>onChangeActiveTool("ai")}
                />
                 <SidebarItem
                    icon={Settings}
                    lable="Settings"
                    isActive={activeTool==="settings"}
                    onClick={()=>onChangeActiveTool("settings")}
                />
            </ul>
        </aside> 
    );
}
 
export default Sidebar;