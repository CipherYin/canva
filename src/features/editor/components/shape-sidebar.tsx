import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../types";
import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area"
import ShapeTool from "./shape-tool";
import {FaCircle, FaSquare, FaSquareFull} from "react-icons/fa"
import {IoTriangle} from "react-icons/io5"
import {FaDiamond} from "react-icons/fa6"
interface ShapeSidebaProps{
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

const ShapeSidebar = (
    {
        editor,
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
                        onClick={()=>editor?.addCircle()}
                        icon={FaCircle}
                    />
                    <ShapeTool
                        onClick={()=>editor?.addSoftRectangle()}
                        icon={FaSquare}
                    />
                    <ShapeTool
                        onClick={()=>editor?.addRectangle()}
                        icon={FaSquareFull}
                    />
                    <ShapeTool
                        onClick={()=>editor?.addTrangle()}
                        icon={IoTriangle}
                    />
                     <ShapeTool
                        onClick={()=>editor?.addInverseTrangle()}
                        icon={IoTriangle}
                        iconClassName="rotate-180"
                    />

                    <ShapeTool
                        onClick={()=>editor?.addDiamond()}
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