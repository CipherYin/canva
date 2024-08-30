import { cn } from "@/lib/utils";
import { ActiveTool, Editor, 
     } from "../types";
import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button";

interface TextSidebarProps{
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

const TextSidebar = (
    {
        editor,
        activeTool,
        onChangeActiveTool
    }: TextSidebarProps
) => {

   
    const  onClose = ()=>{
        onChangeActiveTool("select")
    }


    return (
    <aside
        className={cn(
            "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "text" ? "visible" : "hidden"
        )}
        >
           <ToolSidebarHeader
                title="文本"
                description="向画布添加文本"
           />
           <ScrollArea>
                <div className="p-4 space-y-4">
                    <Button
                        className="w-full"
                        onClick={()=>editor?.addText("Textbox")}
                    >
                        添加文本
                    </Button>

                    <Button
                        variant="secondary"
                        className="w-full h-16"
                        size="lg"
                        onClick={()=>editor?.addText("Heading",{
                            fontSize: 80,
                            fontWeight: 700,
                            
                        }
                        )}
                    >
                        <span className="text-2xl font-bold">
                            添加标题
                        </span>
                        
                    </Button>

                    <Button
                        variant="secondary"
                        className="w-full h-16"
                        size="lg"
                        onClick={()=>editor?.addText("subHeading",{
                            fontSize: 44,
                            fontWeight: 600,
                            
                        }
                        )}
                    >
                        <span className="text-xl font-medium">
                            添加副标题
                        </span>
                        
                    </Button>
                    <Button
                        variant="secondary"
                        className="w-full"
                        size="lg"
                        onClick={()=>editor?.addText("Paragraph",{
                            fontSize: 32,                            
                        }
                        )}
                    >
                        添加段落
                        
                    </Button>
                </div>
                
           </ScrollArea>
           
           <ToolSidebarClose onClick={onClose}  />
    </aside> 
    
);
}
 
export default TextSidebar;