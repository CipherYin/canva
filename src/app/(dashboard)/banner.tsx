"use client"
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import {useCreateProject} from "@/features/projects/api/use-create-project"
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
const Banner = () => {
    const router = useRouter();
    const mutation = useCreateProject()
    const [ConfirmationDialog,confirm] = useConfirm(
        "点击确认前往编辑.....",
        " "
    )
  
    const onClick =  () => {
        mutation.mutate({
            name: "Untitled project",
            json: "",
            width: 900,
            height: 1200
        },
        {
            onSuccess: async ({data}) => {
                const ok = await confirm();
                if(ok){
                    router.push(`/editor/${data.id}`)
                }
                
                
                
            }
        }
    )
    }
    return ( 
        <div className="text-white aspect-[5/1] min-h-[248px] flex gap-x-6 p-6 
                items-center rounded-xl bg-gradient-to-r from-[#2e62cb] 
                via-[#0073ff] to-[#3faff5]">
            <ConfirmationDialog/>
            <div className="rounded-full size-28 flex items-center justify-center bg-white/50 hidden md:flex">
                <div className="rounded-full size-20 flex items-center justify-center bg-white">
                    <Sparkles className="h-20 text-[#0073ff] fill-[#0073ff]"/>
                </div>
            </div>

            <div className="flex flex-col gap-y-2">
                <h1 className="text-xl md:text-3xl font-semibold">
                    让你的想法变为现实
                </h1>
                <p className="text-xs md:text-sm mb-2">
                    随时将你的想法转为设计. 
                </p>
                <Button
                    disabled={mutation.isPending}
                    onClick={onClick}
                    variant="secondary"
                    className="w-[160px]"
                >   
                    开始设计
                    <ArrowRight className="size-4 ml-2"/>
                </Button>
            </div>
        </div> 
    );
}
 
export default Banner;