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
import { useEffect, useMemo, useState } from "react";


interface OpacitySidebarProps{
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

const OpacitySidebar = (
    {
        editor,
        activeTool,
        onChangeActiveTool
    }: OpacitySidebarProps
) => {
    const initialValues = editor?.getActiveOpacity() || 1;

    const [opacity,setOpacity] = useState(initialValues);
    const selectedObject = useMemo(
            ()=>editor?.selectedObjects[0],
            [editor?.selectedObjects]
        )
    useEffect(()=>{
        if(selectedObject){
            setOpacity(selectedObject.get("opacity") || 1)
        }
    },[selectedObject])

    const  onClose = ()=>{
        onChangeActiveTool("select")
    }

    const onChange = (value: number) => {
        editor?.changeOpacity(value);
        setOpacity(value)
    }

    return (
    <aside
        className={cn(
            "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "opacity" ? "visible" : "hidden"
        )}
        >
           <ToolSidebarHeader
                title="透明度"
                description="修改选中元素透明度"
           />
           <ScrollArea>
                <div className="p-4 space-y-4 border-b">
                    <Label className="text-sm">
                        透明度
                    </Label>
                    <Slider
                        value={[opacity]}
                        onValueChange={(values) => onChange(values[0])}
                        max={1}
                        min={0}
                        step={0.01}
                    />
                </div>
                
           </ScrollArea>
           
           <ToolSidebarClose onClick={onClose}  />
    </aside> 
    
);
}
 
export default OpacitySidebar;