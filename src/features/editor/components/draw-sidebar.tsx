import { cn } from "@/lib/utils";
import { ActiveTool, Editor, FILL_COLOR } from "../types";
import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area"
import { ColorPicker } from "./color-picker";


interface DrawSidebarProps{
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

const DrawSidebar = (
    {
        editor,
        activeTool,
        onChangeActiveTool
    }: DrawSidebarProps
) => {
    const color = editor?.getActiveFillColor() || FILL_COLOR;
    const  onClose = ()=>{
        onChangeActiveTool("select")
    }

    const onChange = (value: string) => {
        editor?.changeStrokeColor(value)
    }

    return (
    <aside
        className={cn(
            "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "draw" ? "visible" : "hidden"
        )}
        >
           <ToolSidebarHeader
                title="绘图"
                description="修改画笔设置"
           />
           <ScrollArea>
                <div className="p-4 space-y-6">
                    <ColorPicker
                        color={color}
                        onChange={onChange}
                    />
                </div>
           </ScrollArea>
           
           <ToolSidebarClose onClick={onClose}  />
    </aside> 
    
);
}
 
export default DrawSidebar;