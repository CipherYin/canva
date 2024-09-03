import { cn } from "@/lib/utils";
import { ActiveTool, Editor, fonts, 
     } from "../types";
import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button";
import { useGetImages } from "@/features/images/api/use-get-images";
import { AlertTriangle, Crown, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { UploadButton } from "@/lib/uploadthing";
import { ResponseType, useGetTemplates } from "@/features/projects/api/use-get-templates";
import { useConfirm } from "@/hooks/use-confirm";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";

interface TemplateSidebarProps{
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

const TemplateSidebar = (
    {
        editor,
        activeTool,
        onChangeActiveTool
    }: TemplateSidebarProps
) => {
    const paywall = usePaywall()
    const [ConfirmationDialog,confirm] = useConfirm(
        "你确定要执行此操作吗",
        "项目将会替换成当前选择的模版"
    )
    const {data,isLoading,isError} = useGetTemplates({
        limit: "20",
        page: "1"
    });
    const  onClose = ()=>{
        onChangeActiveTool("select")
    }

    const  onClick = async (template: ResponseType["data"][0])=>{
        if(template.isPro && paywall.shouldBlock){
            paywall.triggerPaywall()
            return;
        }
        const ok = await confirm()
        if(ok){
            editor?.loadFromJson(template.json);
        }
        
    }


    return (
    <aside
        className={cn(
            "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "templates" ? "visible" : "hidden"
        )}
        >
            <ConfirmationDialog/>
           <ToolSidebarHeader
                title="模版"
                description="选择合适的模版进行设计"
           />
          
           {
            isLoading &&(
                <div className="flex items-center justify-center flex-1">
                    <Loader className="size-4 text-muted-foreground animate-spin"/>
                </div>
            )
           }
           {
            isError && (
                <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
                    <AlertTriangle className="size-4 text-muted-foreground"/>
                    <p className="text-muted-foreground text-xs">
                        获取模版失败
                    </p>
                </div>
            )
           }

           <ScrollArea>
            <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                    {
                    data && data.map((template) => {
                        return (
                            <button
                                style={{aspectRatio: `${template.width}/${template.height}`}}
                                onClick={()=>onClick(template)}
                                key={template.id}
                                className="relative w-full group hover:opacity-75
                                    transition bg-muted rounded-sm overflow-hidden border"
                            >

                                <Image
                                    fill
                                    src={template.thumbnaiUrl || ''}
                                    alt={template.name || "Template"}
                                    className="object-cover"
                                />
                                {
                                    template.isPro && (
                                        <div className="absolute top-2 right-2 size-8 items-center
                                            flex justify-center bg-black/50 rounded-full">
                                            <Crown className="size-4 fill-yellow-500 text-yellow-500"/>
                                        </div>
                                    )
                                }
                                <div
                                    className="opacity-0 group-hover:opacity-100 absolute 
                                                left-0 bottom-0 w-full text-[10px] truncate      
                                                text-white p-1 bg-black/50 text-left"
                                >
                                    {template.name}
                                </div>
                            </button>
                        )
                    })
                }
                </div>
               
            </div>
                
           </ScrollArea>
           
           <ToolSidebarClose onClick={onClose}  />
    </aside> 
    
);
}
 
export default TemplateSidebar;
