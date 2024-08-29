import { useCallback, useMemo, useState } from "react";
import { fabric } from "fabric";
import { useAutoResize } from "./use-auto-resize";
import { BuildEditorProps,
         CRICLE_OPTIONS,
         DIAMOND_OPTIONS,
         Editor, 
         FILL_COLOR, 
         RECTANGLE_OPTIONS, 
         STROKE_COLOR, 
         STROKE_WIDTH, 
         TRIANGLE_OPTIONS} from "../types";
import { useCanvasEvents } from "./use-canvas-events";


const buildEditor = ({canvas}: BuildEditorProps): Editor => {
    const getWorkpace = ()=>{
        return canvas.getObjects().find((obj)=>obj.name === "clip")
    }
    const center = (object: fabric.Object)=>{
        const workspace = getWorkpace();
        const center = workspace?.getCenterPoint();
        if(!center) return;
        //@ts-ignore
        canvas._centerObject(object,center);
        // canvas.centerObject(object);
    }

    const addToCanvas = (object: fabric.Object)=>{
        center(object)
        canvas.add(object);
        canvas.setActiveObject(object)
    }
    return {
        addCircle: ()=>{
            console.log("addCircle")
            const circle = new fabric.Circle({
                ...CRICLE_OPTIONS,
            });
           addToCanvas(circle)
        },
        addSoftRectangle: () => {
            const softRectangle = new fabric.Rect({
                ...RECTANGLE_OPTIONS,
                rx: 50,
                ry: 50,
            });
            addToCanvas(softRectangle)
        },
        addRectangle: ()=>{
            const rectangle = new fabric.Rect({
                ...RECTANGLE_OPTIONS,
            });
            addToCanvas(rectangle)
        },
        addTrangle: ()=>{
            const trangle = new fabric.Triangle({
                ...TRIANGLE_OPTIONS,
            });
            addToCanvas(trangle)
        },
        addInverseTrangle: ()=>{
            const invertedTrangle = new fabric.Triangle({
                ...TRIANGLE_OPTIONS,
                angle: 180,
            });
            addToCanvas(invertedTrangle)
        },
        addDiamond: ()=>{
            const HEIGHT = DIAMOND_OPTIONS.height;
            const WIDTH = DIAMOND_OPTIONS.width;
            const diamond = new fabric.Polygon([
                new fabric.Point(0, HEIGHT/2),
                new fabric.Point(WIDTH/2, 0),
                new fabric.Point(WIDTH, HEIGHT/2),
                new fabric.Point(WIDTH/2, HEIGHT),
            ], {
                ...DIAMOND_OPTIONS,
            })
            addToCanvas(diamond)
        }
    }
}


export const useEditor = ()=>{
    const [canvas,setCanvas] = useState<fabric.Canvas | null>(null);
    const [container,setContainer] = useState<HTMLDivElement | null>(null);
    const [_selectedObjects,setSelectedObjects] = useState<fabric.Object[] | null>([]);
    const [fillColor,setFillColor] = useState<string>(FILL_COLOR);
    const [strokeColor,setStrokeColor] = useState<string>(STROKE_COLOR);
    const [strokeWidth,setStrokeWidth] = useState<number>(STROKE_WIDTH);

    const editor = useMemo(()=>{
        if(canvas){
            return buildEditor({canvas});
        }
        return undefined;
    },[canvas])

    useCanvasEvents({
        canvas,
        setSelectedObjects
    })
    useAutoResize({
        canvas,
        container
    });
    const init = useCallback(({
        initialCanvas,
        initialContainer
    }:{
        initialCanvas: fabric.Canvas;
        initialContainer: HTMLDivElement
    }) => {
        fabric.Object.prototype.set({
            cornerColor: "#FFF",
            cornerStyle: "circle",
            borderColor: "#3b82f6",
            borderScaleFactor: 1.5,
            transparentCorners: false,
            borderOpacityWhenMoving: 1,
            cornerStrokeColor: "#3b82f6"
        })
        const initialWorkspace = new fabric.Rect({
            width: 900,
            height: 1200,
            name: "clip",
            fill: "white",
            selectable: false,
            hasControls: false,
            shadow: new fabric.Shadow({
                color: "rgba(0,0,0,0.8)",
                blur: 5
            })
        }); 

        console.log(`${initialContainer.offsetWidth} - ${initialContainer.offsetHeight}`)
        initialCanvas.setWidth(initialContainer.offsetWidth);
        initialCanvas.setHeight(initialContainer.offsetHeight);

        initialCanvas.add(initialWorkspace);
        initialCanvas.centerObject(initialWorkspace);
        initialCanvas.clipPath = initialWorkspace;

        setCanvas(initialCanvas)
        setContainer(initialContainer)
       

        // 创建一个圆形对象并添加到 canvas
        // const circle = new fabric.Circle({
        //     left: 200,
        //     top: 50,
        //     radius: 50,
        //     fill: 'green'
        // });

        // initialCanvas.add(circle);
        // initialCanvas.centerObject(circle)
    },[]) 
    return {init,editor}
}