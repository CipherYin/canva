import { cn } from "@/lib/utils";
import { ActiveTool, Editor, FILL_COLOR } from "../types";
import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useGenerateImage } from "@/features/ai/use-generate-image";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import Image from "next/image";
import { useRemoveBg } from "@/features/ai/use-remove-bg";


interface RemoveBgSidebarProps{
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

const RemoveBgSidebar = (
    {
        editor,
        activeTool,
        onChangeActiveTool
    }: RemoveBgSidebarProps
) => {
    const selectedObject = editor?.selectedObjects[0];
    const mutation = useRemoveBg();
    // @ts-ignore
    const imageSrc = selectedObject?._originalElement?.currentSrc;
    const  onClose = ()=>{
        onChangeActiveTool("select")
    }

    const onClick = () => {
        //todo : block with paywall
        mutation.mutate({
            image: imageSrc,
        },{
            onSuccess: ({data}) => {
                editor?.addImage(data as string);
            }
        })
    }
    

    return (
    <aside
        className={cn(
            "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "remove-bg" ? "visible" : "hidden"
        )}
        >
           <ToolSidebarHeader
                title="背景移除"
                description="使用AI移除图片的背景"
           />
           {!imageSrc && (
                <div className="fexl flex-col gap-y-4 items-center justify-center flex-1">
                    <AlertTriangle className="size-4 bg-muted-foreground"/>
                    <p className="text-muted-foreground text-xs">
                        此对象不具备该功能
                    </p>
                </div>
           )}
           {
            imageSrc && (
                <ScrollArea>
                 <div className="p-4 space-y-4">
                    <div className={cn(
                            "relative aspect-square rounded-md overflow-hidden transition bg-muted",
                            mutation.isPending && "opacity-50"
                        )}>
                            <Image
                                src={imageSrc}
                                fill
                                alt="Image"
                                className="object-cover"
                            />
                        </div>
                        <Button
                            onClick={onClick}
                            className="w-full"
                            disabled={mutation.isPending}
                        >
                            移除背景
                        </Button>
                 </div>
                    
                </ScrollArea>
            )
           }
           
           
           <ToolSidebarClose onClick={onClose}  />
    </aside> 
    
);
}
 
export default RemoveBgSidebar;