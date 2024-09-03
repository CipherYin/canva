"use client";

import { useSession,signOut } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { CreditCard, Loader, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const UserButton = () => {
    const session = useSession()
    if(session.status === 'loading'){
        return <Loader className="size-4 animate-spin text-muted-foreground"/>
    }

    if(session.status === 'unauthenticated' || !session.data){
        return null;
    }
    const name = session?.data?.user?.name!;
    const imageUrl = session?.data?.user?.image;
    return ( 
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
                {/* {todo: 高级用户添加皇冠} */}
                <Avatar className="size-10 hover:opacity-75 transition">
                    <AvatarImage alt={name} src={imageUrl || ""}/>
                    <AvatarFallback className="bg-blue-500 font-medium text-white">
                        {name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuItem
                    disabled={false}
                    className="h-10"
                    onClick={()=>{}}
                >
                    <CreditCard className="size-4 mr-2"/>
                    收费
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className="h-10"
                    onClick={()=>signOut()}
                >
                    <LogOut className="size-4 mr-2"/>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
 
export default UserButton; 