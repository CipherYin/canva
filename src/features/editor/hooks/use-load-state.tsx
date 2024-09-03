import { useEffect, useRef } from "react";
import { JSON_KEYS } from "../types";


interface UseLoadStateProps {
    autoZoom: () => void;
    canvas: fabric.Canvas | null;
    initialState: React.MutableRefObject<string | undefined>;
    canvasHistory: React.MutableRefObject<String[]>;
    setHistoryIndex: React.Dispatch<React.SetStateAction<number>>
}

export const useLoadState = (
    {
        autoZoom,
        canvas,
        initialState,
        canvasHistory,
        setHistoryIndex
    }: UseLoadStateProps
)=>{
    const initialied = useRef(false);

    useEffect(() => {
        if(!initialied.current && initialState?.current && canvas){
            const dataToLoad = JSON.parse(initialState.current)
            canvas.loadFromJSON(dataToLoad,
            ()=>{
                const currentState = JSON.stringify(canvas.toJSON(JSON_KEYS));
                canvasHistory.current = [currentState];
                setHistoryIndex(0);
                autoZoom()
            });
            initialied.current = true
        }
    },[
        canvas,
        autoZoom,
        initialState,
        canvasHistory,
        setHistoryIndex
    ])
}