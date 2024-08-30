import { cn } from "@/lib/utils";
import { ActiveTool, Editor, 
    STROKE_DASH_ARRAY, STROKE_WIDTH } from "../types";
import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area"
import { ColorPicker } from "./color-picker";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";


interface StrokeWidthSidebarProps{
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

const StrokeWidthSidebar = (
    {
        editor,
        activeTool,
        onChangeActiveTool
    }: StrokeWidthSidebarProps
) => {
    const width = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
    const strokeDashArray = editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY;
    const  onClose = ()=>{
        onChangeActiveTool("select")
    }

    const onChange = (value: number) => {
        editor?.changeStrokeWidth(value)
    }

    const onChangeStrokeType = (value: number[]) => {
        editor?.changeStrokeDashArray(value)
    }

    return (
    <aside
        className={cn(
            "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "stroke-width" ? "visible" : "hidden"
        )}
        >
           <ToolSidebarHeader
                title="边框选项"
                description="修改边框样式"
           />
           <ScrollArea>
                <div className="p-4 space-y-4 border-b">
                    <Label className="text-sm">
                        边框宽度
                    </Label>
                    <Slider
                        value={[width]}
                        onValueChange={(values) => onChange(values[0])}
                    />
                </div>
                <div className="p-4 space-y-4 border-b">
                    <Label className="text-sm">
                        边框类型
                    </Label>
                    <Button 
                        onClick={() => onChangeStrokeType([])}
                        variant="secondary"
                        size="lg"
                        className={cn(
                            "w-full h-16 justify-start text-left",
                            JSON.stringify(strokeDashArray) === '[]' && "border border-blue-500"
                        )
                           }
                        style={{padding: "8px 16px"}}
                        >
                        <div className="w-full border-black rounded-full border-4"/>
                    </Button>

                    <Button 
                        onClick={() => onChangeStrokeType([5,5])}
                        variant="secondary"
                        size="lg"
                        className={cn(
                            "w-full h-16 justify-start text-left",
                            JSON.stringify(strokeDashArray) === '[5,5]' && "border border-blue-500"
                        )
                    }
                        style={{padding: "8px 16px"}}
                        >
                        <div className="w-full border-black rounded-full border-4 border-dashed"/>
                    </Button>
                </div>
           </ScrollArea>
           
           <ToolSidebarClose onClick={onClose}  />
    </aside> 
    
);
}
 
export default StrokeWidthSidebar;