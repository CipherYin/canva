"use client";

import Logo from "@/features/editor/components/logo";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { ChevronDown, Download, MousePointerClick, Redo2, Undo2 } from "lucide-react";
import { CiFileOn } from "react-icons/ci";
import { Separator } from "@/components/ui/separator";
import { Hint } from "@/components/hint";
import { BsCloudCheck } from "react-icons/bs";
import { ActiveTool, Editor } from "../types";
import { cn } from "@/lib/utils";
import {useFilePicker} from "use-file-picker"
import { any } from "zod";
interface NavbarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Navbar = (
    {
        editor,
        activeTool,
        onChangeActiveTool
    }: NavbarProps
)=>{
    const {openFilePicker} = useFilePicker({
        accept: ".json",
        onFilesSuccessfullySelected: ({plainFiles}: any) => {
            if(plainFiles && plainFiles.length>0){
                const file = plainFiles[0]
                const reader = new FileReader();
                reader.readAsText(file,'UTF-8');
                reader.onload = () => {
                    editor?.loadFromJson(reader.result as string)
                }
            }
        }
    })
    return (
        <nav className="w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]">
            <Logo/>
            <div className="w-full flex items-center gap-x-1 h-full">
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">
                            文件
                            <ChevronDown className="size-4 ml-2"/>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start" className="min-w-60">
                        <DropdownMenuItem
                            onClick={() => openFilePicker()} 
                            className="flex items-center gap-x-2"
                        >
                            <CiFileOn className="size-8"/>
                            <div>
                                <p>打开</p>
                                <p className="text-xs text-gray-600">
                                    Json 文件
                                </p>
                            </div>
                        </DropdownMenuItem>
                        
                       
                </DropdownMenuContent>
                </DropdownMenu>
                    
                <Separator orientation="vertical" className="mx-2"/>
                <Hint lable="选择" side="bottom" sideOffset={10}>
                    <Button 
                        variant="ghost"
                        size="icon"
                        onClick={()=>onChangeActiveTool("select")} 
                        className={cn(activeTool === "select" && "bg-gray-100")}

                    >
                        <MousePointerClick className="size-4"/>
                    </Button>
                </Hint>
                <Hint lable="撤销" side="bottom" sideOffset={10}>
                    <Button 
                        disabled={!editor?.canUndo()}
                        variant="ghost"
                        size="icon"
                        onClick={()=>editor?.onUndo()}
                        className="" 

                    >
                        <Undo2 className="size-4"/>
                    </Button>
                </Hint>
                <Hint lable="恢复" side="bottom" sideOffset={10}>
                    <Button 
                        disabled={!editor?.canRedo()}
                        variant="ghost"
                        size="icon"
                        onClick={()=>editor?.onRedo()}
                        className="" 
                    >
                        <Redo2 className="size-4"/>
                    </Button>
                </Hint>
                <Separator orientation="vertical" className="mx-2"/>
                <div className="flex items-center gap-x-2">
                    <BsCloudCheck className="size-[20px] text-muted-foreground"/>
                    <div className="text-xs text-muted-foreground">
                        已保存
                    </div>
                </div>

                <div className="ml-auto flex items-center gap-x-4">
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost">
                                导出
                                <Download className="size-4 ml-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="min-w-60">
                            <DropdownMenuItem
                                className="flex items-center gap-x-2"
                                onClick={()=>editor?.saveJson()}
                            >
                                <CiFileOn className="size-6"/>
                                <div>
                                    <p>JSON</p>
                                </div>

                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className="flex items-center gap-x-2"
                                onClick={()=>editor?.savePng()}
                            >
                                <CiFileOn className="size-6"/>
                                <div>
                                    <p>PNG</p>
                                </div>

                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="flex items-center gap-x-2"
                                onClick={()=>editor?.saveJpg()}
                            >
                                <CiFileOn className="size-6"/>
                                <div>
                                    <p>JPG</p>
                                    
                                </div>

                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="flex items-center gap-x-2"
                                onClick={()=>editor?.saveSvg()}
                            >
                                <CiFileOn className="size-6"/>
                                <div>
                                    <p>SVG</p>
                                </div>

                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* add use button */}
                </div>

        </div>
        </nav>
    )
}