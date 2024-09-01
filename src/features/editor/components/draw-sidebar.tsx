import { cn } from "@/lib/utils";
import { ActiveTool, Editor, FILL_COLOR, STROKE_COLOR, STROKE_WIDTH } from "../types";
import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area"
import { ColorPicker } from "./color-picker";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";


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
    const color = editor?.getActiveStrokeColor() || STROKE_COLOR;
    const width = editor?.getActiveStrokeWidth() || STROKE_WIDTH;

    const  onClose = ()=>{
        editor?.disableDrawingMode();
        onChangeActiveTool("select")
    }

    const onColorChange = (value: string) => {
        editor?.changeStrokeColor(value)
    }
    const onWidthChange = (value: number) => {
        editor?.changeStrokeWidth(value)
    }

    return (
    <aside
        className={cn(
            "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "draw" ? "visible" : "hidden"
        )}
        >
           <ToolSidebarHeader
                title="绘图模式"
                description="修改画笔设置"
           />
           <ScrollArea>
                <div className="p-4 space-y-6 border-b">
                    <Label className="text-sm">
                        画笔宽度
                    </Label>
                    <Slider 
                        value={[width]}
                        onValueChange={(values)=>onWidthChange(values[0])}
                    />
                </div>
                <div className="p-4 space-y-6">
                <Label className="text-sm">
                        画笔颜色
                    </Label>
                    <ColorPicker
                        color={color}
                        onChange={onColorChange}
                    />
                </div>
           </ScrollArea>
           
           <ToolSidebarClose onClick={onClose}  />
    </aside> 
    
);
}
 
export default DrawSidebar;