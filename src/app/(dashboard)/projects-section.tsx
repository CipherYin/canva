"use client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { AlertTriangle, CopyIcon, FileIcon, Loader, MoreHorizontal, Search, Trash, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import {formatDistanceToNow} from "date-fns"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { useDuplicateroject } from "@/features/projects/api/use-duplicate-project";
import { useDeleteProject } from "@/features/projects/api/use-delete-project";
import { useConfirm } from "@/hooks/use-confirm";
const ProjectsSectionPage = () => {
    const router = useRouter()
    const duplicateMutation = useDuplicateroject();
    const removeMutation = useDeleteProject();
  

    const [ConfirmationDialog,confirm] = useConfirm(
        "确定要执行此操作吗？",
        "你将删除选择的项目"
    )
    const onDelete = async (id: string) => {
        const ok = await confirm();
        if(ok){
            removeMutation.mutate({id})
        }
        
    }
    const onCopy = (id: string) => {
        duplicateMutation.mutate({id})
    }
    const {
        data,
        status,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage
    } = useGetProjects();


    if(status === "pending"){
        <div className="space-y-4">
                <h3 className="font-semibold text-lg"> 
                    最近项目
                </h3>
                <div className="flex flex-col gap-y-4 items-center justify-center h-32">
                    <Loader className="size-6 animate-spin text-muted-foreground"/>
                </div>
            </div>
    }
    if(status==='error'){
        return (
            <div className="space-y-4">
                <h3 className="font-semibold text-lg"> 
                    最近项目
                </h3>
                <div className="flex flex-col gap-y-4 items-center justify-center h-32">
                    <AlertTriangle className="size-6 text-muted-foreground"/>
                    <p className="text-muted-foreground text-sm">
                        Failed to load projects
                    </p>
                </div>
            </div>
        )
    }
    if(!data?.pages.length || !data.pages[0].data.length){
        return (
            <div className="space-y-4">
                <h3 className="font-semibold text-lg"> 
                    最近项目
                </h3>
                <div className="flex flex-col gap-y-4 items-center justify-center h-32">
                    <Search className="size-6 text-muted-foreground"/>
                    <p className="text-muted-foreground text-sm">
                        No projects found
                    </p>
                </div>
            </div>
        )
    }
    return ( 
        <div className="space-y-4">
            <ConfirmationDialog/>
            <h3 className="font-semibold text-lg">
                最近项目
            </h3>
            <Table>
                <TableBody>
                    {data.pages.map((group,i) => (
                        <React.Fragment key={i}>
                            {group.data.map((project)=>(
                                <TableRow key={project.id}>
                                    <TableCell 
                                        onClick={()=>router.push(`/editor/${project.id}`)}
                                        className="font-medium flex items-center gap-x-2 cursor-pointer">
                                        <FileIcon className="size-6"/>
                                        {project.name}
                                    </TableCell>
                                    <TableCell 
                                        onClick={()=>router.push(`/editor/${project.id}`)}
                                        className="hidden md:table-cell cursor-pointer">
                                        {project.width} x {project.height} px
                                     </TableCell>
                                     <TableCell 
                                        onClick={()=>router.push(`/editor/${project.id}`)}
                                        className="hidden md:table-cell cursor-pointer">
                                            {
                                                formatDistanceToNow(project.updatedAt,{
                                                    addSuffix: true,
                                                })
                                            }
                                     </TableCell>
                                     <TableCell 
                                        className="flex items-center justify-end">
                                        <DropdownMenu modal={false}>
                                            <DropdownMenuTrigger asChild>
                                                <Button 
                                                    disabled={false}
                                                    size="icon" variant="ghost">
                                                    <MoreHorizontal className="size-4"/>
                                                </Button>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent align="end" className="w-60">
                                                <DropdownMenuItem
                                                    className="h-10 cursor-pointer"
                                                    disabled={duplicateMutation.isPending}
                                                    onClick={()=>onCopy(project.id)}
                                                >
                                                    <CopyIcon className="size-4 mr-2"/>
                                                    复制
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="h-10 cursor-pointer"
                                                    disabled={removeMutation.isPending}
                                                    onClick={()=>onDelete(project.id)}
                                                >
                                                    <Trash className="size-4 mr-2"/>
                                                    删除
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu> 
                                     </TableCell>
                                </TableRow>
                            ))}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
            {hasNextPage && (
                <div className="w-full flex items-center justify-center pt-4">
                    <Button
                        variant="ghost"
                        onClick={()=>fetchNextPage()}
                        disabled={isFetchingNextPage}
                    >
                        加载更多
                    </Button>
                </div>
            )}
        </div> 
    );
}
 
export default ProjectsSectionPage;