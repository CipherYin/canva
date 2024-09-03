import { cn } from "@/lib/utils";
import { ActiveTool, Editor, FILL_COLOR } from "../types";
import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useGenerateImage } from "@/features/ai/use-generate-image";
import { useState } from "react";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";


interface AISidebarProps{
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

const AISidebar = (
    {
        editor,
        activeTool,
        onChangeActiveTool
    }: AISidebarProps
) => {
    const paywall = usePaywall()
    const mutation = useGenerateImage();
    const [value,setValue] = useState("");
    const onSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

    if(paywall.shouldBlock){
        paywall.triggerPaywall()
        return;
    }
    mutation.mutateAsync({
            prompt: value
        }).then(({data}) => {
            editor?.addImage(data as string);
        })

    }
    const  onClose = ()=>{
        onChangeActiveTool("select")
    }

    const onChange = (value: string) => {
        editor?.changeFillColor(value)
    }

    return (
    <aside
        className={cn(
            "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "ai" ? "visible" : "hidden"
        )}
        >
           <ToolSidebarHeader
                title="AI"
                description="使用AI生成图像"
           />
           <ScrollArea>
               <form 
                    onSubmit={onSubmit} 
                    className="p-4 space-y-6">
                        <Textarea
                            disabled={mutation.isPending}
                            placeholder="P5GLTKH SHPS composition, Ultra minimalist Constructivism, P5GLTKH style tropical village"
                            cols={30}
                            rows={10}
                            required
                            minLength={3}
                            className=""
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <Button
                            disabled={mutation.isPending}
                            type="submit"
                            className="w-full"
                        >
                            生成
                        </Button>
               </form>
           </ScrollArea>
           
           <ToolSidebarClose onClick={onClose}  />
    </aside> 
    
);
}
 
export default AISidebar;