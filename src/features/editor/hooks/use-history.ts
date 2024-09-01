import { useCallback, useRef, useState } from "react"
import { JSON_KEYS } from "../types";

interface UseHistoryProps {
    canvas: fabric.Canvas | null;

}


export const useHistory = ({canvas}:UseHistoryProps)=>{
    const [historyIndex,setHistoryIndex] = useState(0);
    const canvasHistory = useRef<String[]>([]);
    const skipSave = useRef(false);

    const canUndo = useCallback(() => {
        return historyIndex > 0;
    },[historyIndex])

    const canRedo = useCallback(()=>{
        return historyIndex < canvasHistory.current.length-1
    },[historyIndex])

    const save = useCallback((skip = false)=>{
        if(!canvas) return;
        const currentState = canvas.toJSON(JSON_KEYS);
        const json = JSON.stringify(currentState);

        if(!skip && !skipSave.current) {
            canvasHistory.current.push(json)
            setHistoryIndex(canvasHistory.current.length-1);
        } 
        //todo: save callback
    },[canvas])

    const undo = useCallback(()=>{
        if(canUndo()){
            skipSave.current = true;
            canvas?.clear().renderAll()
            const previousIndex = historyIndex-1;
            const previousStates = JSON.parse(
                canvasHistory.current[previousIndex] as string
            )

            canvas?.loadFromJSON(previousStates,()=>{  
                canvas.renderAll();
                setHistoryIndex(previousIndex);
                skipSave.current = false
            })
        }
    },[canUndo,canvas,historyIndex])
    const redo = useCallback(()=>{
        if(canRedo()){
            skipSave.current = true;
            canvas?.clear().renderAll()
            const nextIndex = historyIndex+1;
            const nextStates = JSON.parse(
                canvasHistory.current[nextIndex] as string
            )

            canvas?.loadFromJSON(nextStates,()=>{
                canvas.renderAll();
                setHistoryIndex(nextIndex);
                skipSave.current = false
            })
        }
    },[canRedo,canvas,historyIndex])

    return {save,
            canRedo,
            canUndo,
            redo,
            undo,
            setHistoryIndex,
            canvasHistory}
}