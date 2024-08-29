import { useState } from "react";
import { ActiveTool, Editor } from "../types";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ToolbarProps{
  editor: Editor | undefined,
  activeTool: ActiveTool,
  onChangeActiveTool: (tool: ActiveTool)=>void;

}

const Toolbar = (
  {
    editor,
    activeTool,
    onChangeActiveTool,
  }: ToolbarProps
) => {
    const fillColor = editor?.fillColor;
    console.log(`${fillColor}`)

  
    
    return ( 
        <div className="shrink-0 h-[56px] border-b bg-white w-full 
                flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
          <div className="flex items-center h-full justify-center">
            <Hint lable="颜色" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("fill")}
                size="icon"
                variant="ghost"
                className={cn(
                  activeTool === "fill" && "bg-gray-200"
                )}
              >
                <div
                  className="rounded-sm size-4 border"
                  style={{
                    backgroundColor:  fillColor
                  }}
               />
              </Button>
            </Hint>
          </div>
        </div>
      );
}
 
export default Toolbar;