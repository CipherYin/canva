"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useSubscriptionModal } from "../store/use-subscription-modal";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SubscriptionMoal = () => {
    const {isOpen,onClose} = useSubscriptionModal()

    return ( 
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className="flex items-center space-y-4" >
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={36}
                        height={36}
                    />
                    <DialogTitle className="text-center">
                        开通超级会员
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        开通超级会员解锁更多功能权益
                    </DialogDescription>
                    
                </DialogHeader>
                <Separator/>
                <ul className="space-y-2">
                        <li className="flex items-center">
                            <CheckCircle2 className="size-5 mr-2 fill-blue-500 text-white"/>
                            <p className="text-sm text-muted-foreground">无限数量</p>
                        </li>
                        <li className="flex items-center">
                            <CheckCircle2 className="size-5 mr-2 fill-blue-500 text-white"/>
                            <p className="text-sm text-muted-foreground">无限模版</p>
                        </li>
                        <li className="flex items-center">
                            <CheckCircle2 className="size-5 mr-2 fill-blue-500 text-white"/>
                            <p className="text-sm text-muted-foreground">AI图形生成</p>
                        </li>
                        <li className="flex items-center">
                            <CheckCircle2 className="size-5 mr-2 fill-blue-500 text-white"/>
                            <p className="text-sm text-muted-foreground">AI背景移除</p>
                        </li>
                    </ul> 
                <DialogFooter className="pt-2 mt-4 gap-y-2">
                    <Button 
                        className="w-full"
                        onClick={()=>{}}
                        disabled={false}
                        >
                        升级
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog> 
    );
}
 
  ;