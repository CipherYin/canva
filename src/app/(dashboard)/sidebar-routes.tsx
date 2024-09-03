"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Crown, Home, MessageCircleQuestion } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";

const SidebarRoutes = () => {
    const pathname = usePathname()
    return (  
        <div className="flex flex-col gap-y-4 flex-1">
            <div className="px-4">
                <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {}}
                    className="w-full rounded-xl border-none hover:bg-white hover:opacity-75 transition"
                >
                    <Crown className="mr-2 size-4 fill-yellow-500 text-yellow-500" />
                    开通超级会员
                </Button>
            </div>
            <div className="px-3">
                <Separator/>
            </div>
            <ul className="flex flex-col gap-y-1 px-3">
                <SidebarItem 
                    href="/"
                    icon={Home}
                    label="主页"
                    isActive={pathname === "/"}
                />
            </ul>
            <div className="px-3">
                <Separator/>
            </div>
            <ul className="flex flex-col gap-y-1 px-3">
                <SidebarItem 
                    href={pathname}
                    icon={CreditCard}
                    label="收费"
                    onClick={()=>{}}
                   
                />
                <SidebarItem 
                    href="mailto:support@codewithantonio.com"
                    icon={MessageCircleQuestion}
                    label="帮助"
                    onClick={()=>{}}
                   
                />
            </ul>
        </div>
    );
}
 
export default SidebarRoutes;