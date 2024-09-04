"use client";
import { Button } from "@/components/ui/button";
import { protectServer } from "@/features/auth/utils";
import { Editor } from "@/features/editor/components/editor";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { Loader, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface EditorProjectIdPageProps{
    params: {
        projectId: string
    }
}
const EditorProjectIdPage =  ({params}: EditorProjectIdPageProps) => {
    const {data,isLoading,isError} = useGetProject(params.projectId)
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);
    if(isLoading || !data && showLoader){
        return (
            <div className="h-full flex flex-col items-center justify-center">
                <Loader className="size-6 animate-spin text-muted-foreground"/>
            </div>
        )
    }
    if(isError){
        return (
            <div className="h-full flex flex-col gap-y-5 items-center justify-center">
                <TriangleAlert className="size-6 animate-spin text-muted-foreground"/>
                <p>
                    Failed to fetch project
                </p>
                <Button asChild variant="secondary">
                    <Link href="/">
                        回到主页
                    </Link>
                </Button>
            </div>
        )
    }
    return (
       <Editor initialData={data}/>
    )
}

export default EditorProjectIdPage;