import { cn } from "@/lib/utils";
import { ActiveTool, Editor, filters, fonts, 
     } from "../types";
import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button";

interface FilterSidebarProps{
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

const FilterSidebar = (
    {
        editor,
        activeTool,
        onChangeActiveTool
    }: FilterSidebarProps
) => {
    const  onClose = ()=>{
        onChangeActiveTool("select")
    }


    return (
    <aside
        className={cn(
            "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "filter" ? "visible" : "hidden"
        )}
        >
           <ToolSidebarHeader
                title="滤镜"
                description="向图片添加滤镜"
           />
           <ScrollArea>
           <div className="p-4 space-y-1 border-b">
           {filters.map((filter) => {
                const [[englishName, chineseName]] = Object.entries(filter);
                return (
                <Button
                    onClick={() => editor?.changeImageFilter(englishName)}
                    key={englishName}
                    variant="secondary"
                    size="lg"
                    className="w-full  h-16 justify-start text-left"
                >
                    {chineseName}
                </Button>
                );
           })}
         
            </div>
                
           </ScrollArea>
           
           <ToolSidebarClose onClick={onClose}  />
    </aside> 
    
);
}
 
export default FilterSidebar;
