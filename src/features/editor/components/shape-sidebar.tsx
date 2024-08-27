import { cn } from "@/lib/utils";
import { ActiveTool } from "../types";
import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area"
import ShapeTool from "./shape-tool";
import {FaCircle, FaSquare, FaSquareFull} from "react-icons/fa"
import {IoTriangle} from "react-icons/io5"
import {FaDiamond} from "react-icons/fa6"
interface ShapeSidebaProps{
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

const ShapeSidebar = (
    {
        activeTool,
        onChangeActiveTool
    }: ShapeSidebaProps
) => {

    const  onClose = ()=>{
        onChangeActiveTool("select")
    }
    return (
    <aside
        className={cn(
            "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "shapes" ? "visible" : "hidden"
        )}
        >
           <ToolSidebarHeader
                title="图形"
                description="向画布加入图形"
           />
           <ScrollArea>
                <div className="grid grid-cols-3 gap-4 p-4">
                    <ShapeTool
                        onClick={()=>{}}
                        icon={FaCircle}
                    />
                    <ShapeTool
                        onClick={()=>{}}
                        icon={FaSquareFull}
                    />
                    <ShapeTool
                        onClick={()=>{}}
                        icon={IoTriangle}
                    />
                     <ShapeTool
                        onClick={()=>{}}
                        icon={IoTriangle}
                        iconClassName="rotate-180"
                    />

                    <ShapeTool
                        onClick={()=>{}}
                        icon={FaDiamond}
                        iconClassName="rotate-180"
                    />
                </div>
           </ScrollArea>
           
           <ToolSidebarClose onClick={onClose}  />
    </aside> 
    
);
}
 
export default ShapeSidebar;