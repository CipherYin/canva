import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useState } from "react";


export const useConfirm = (
    title: string,
    message: string,
): [()=>JSX.Element,()=>Promise<unknown>] => {
   const [promise,setPromise] = useState<{resolve: (value:boolean) =>void} | null>(null);

   const confirm = () => new Promise((resolve,reject) => {
        setPromise({resolve})
   })

   const handleClose = () => {
        setPromise(null)
   }

   const handleConfirm = () => {
    promise?.resolve(true)
    handleClose()
   }

   const handleCancel = () => {
    promise?.resolve(false);
    handleClose()
   }

   const ConfirmationDialog = () => (
        <Dialog open={promise !== null}>
            <DialogContent>
                <DialogHeader>
                    <DialogTrigger>
                        {title}
                    </DialogTrigger>
                    <DialogDescription>
                        {message}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="pt-2">
                    <Button onClick={handleCancel} variant="outline">
                        取消
                    </Button>
                    <Button onClick={handleConfirm}>
                        确认
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
   )
   return [ConfirmationDialog,confirm]
}
 
