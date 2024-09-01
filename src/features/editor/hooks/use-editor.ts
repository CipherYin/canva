import { useCallback, useMemo, useState } from "react";
import { fabric } from "fabric";
import { useAutoResize } from "./use-auto-resize";
import { BuildEditorProps,
         CRICLE_OPTIONS,
         DIAMOND_OPTIONS,
         Editor, 
         EditorHookProps, 
         FILL_COLOR, 
         FONT_FAMILI, 
         FONT_SIZE, 
         FONT_WEIGHT, 
         JSON_KEYS, 
         RECTANGLE_OPTIONS, 
         STROKE_COLOR, 
         STROKE_DASH_ARRAY, 
         STROKE_WIDTH, 
         TEXT_OPTIONS, 
         TRIANGLE_OPTIONS} from "../types";
import { useCanvasEvents } from "./use-canvas-events";
import { createFilter, downloadFile, isTextType, transformText } from "../utils";
import { useClipboard } from "./use-clipboard";
import { useHistory } from "./use-history";
import { useHotKeys } from "./use-hotkeys";
import { useWindowEvents } from "./use-window-events";


const buildEditor = ({
    save,
    canRedo,
    canUndo,
    redo,
    undo,
    autoZoom,
    copy,
    paste,
    canvas,
    fillColor,
    strokeColor,
    strokeWidth,
    strokeDashArray,
    setStrokeDashArray,
    setFillColor,
    setStrokeColor,
    setStrokeWidth,
    selectedObjects,
    fontFamily,
    fontWeight,
    setFontWeight,
    setFontFamily
}: BuildEditorProps): Editor => {

    const generationSaveOptions = () => {
        const {width, height, left, top} = getWorkpace() as fabric.Rect;

        return {
            name: "Image",
            format: "png",
            quality: 1,
            width,
            height,
            left,
            top
        }
    };
    const savePng = () => {
        const options = generationSaveOptions();

        canvas.setViewportTransform([1,0,0,1,0,0])
        const dataUrl = canvas.toDataURL(options);

        downloadFile(dataUrl,'png');
        autoZoom();
    }
    const saveSvg = () => {
        const options = generationSaveOptions();

        canvas.setViewportTransform([1,0,0,1,0,0])
        const dataUrl = canvas.toDataURL(options);

        downloadFile(dataUrl,'svg');
        autoZoom();
    }
    const saveJpg = () => {
        const options = generationSaveOptions();

        canvas.setViewportTransform([1,0,0,1,0,0])
        const dataUrl = canvas.toDataURL(options);

        downloadFile(dataUrl,'jpg');
        autoZoom();
    }

    const saveJson = async () => {
        const dataUrl = canvas.toJSON(JSON_KEYS);
        await transformText(dataUrl.objects);
        const fileString = `data:text/json;charset=utf-8,${
            encodeURIComponent(JSON.stringify(dataUrl,null,"\t"))
        }`
        downloadFile(fileString,"json");
    }

    const loadFromJson = (json: string) => {
        const data = JSON.parse(json);

        canvas.loadFromJSON(data,()=>{
            autoZoom
        })
    }




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

        autoZoom,
        zoomIn: ()=>{
            let zoomRatio = canvas.getZoom();
            zoomRatio+=0.05
            const center = canvas.getCenter();
            canvas.zoomToPoint(
                new fabric.Point(center.left,center.top),
                zoomRatio >1 ?1: zoomRatio
            )

        },
        zoomOut: ()=>{
            let zoomRatio = canvas.getZoom();
            zoomRatio-=0.05
            const center = canvas.getCenter();
            canvas.zoomToPoint(
                new fabric.Point(center.left,center.top),
                zoomRatio <0.2 ? 0.2:zoomRatio
            )

        },
        getWorkpace,
        enableDrawingMode: ()=> {
                canvas.discardActiveObject();
                canvas.renderAll();

                canvas.isDrawingMode = true;
                canvas.freeDrawingBrush.width = strokeWidth;
                canvas.freeDrawingBrush.color = strokeColor;
                
        },
        disableDrawingMode: () => {
            canvas.isDrawingMode=false;
        },
        delete: () => {
            canvas.getActiveObjects().forEach((object) => canvas.remove(object))
            canvas.discardActiveObject();
            canvas.renderAll()
        },
        bringForward: () => {
            canvas.getActiveObjects().forEach((object) => {
                canvas.bringForward(object);
            })
            // to fix workspace overflow
            canvas.renderAll()

            const workspace = getWorkpace();
            workspace?.sendToBack()
        },
        sendBackwards: () => {
            canvas.getActiveObjects().forEach((object) => {
                canvas.sendBackwards(object);
            })
            canvas.renderAll();
            const workspace = getWorkpace();
            workspace?.sendToBack()
        },
        changeFillColor: (color: string)=>{
            setFillColor(color);
            canvas.getActiveObjects().forEach((obj)=>{
                obj.set({fill: color})
            })
            canvas.renderAll()
        },
        changeStrokeColor: (color: string)=>{
            setStrokeColor(color)
            canvas.getActiveObjects().forEach((obj)=>{
                // text types don't have stroke
                if(isTextType(obj.type)){
                    obj.set({fill: color})
                    return;
                }
                obj.set({stroke: color})
            })
            canvas.freeDrawingBrush.color = strokeColor;
            canvas.renderAll()
        },
        changeStrokeWidth: (width: number)=>{
            setStrokeWidth(width)
            canvas.getActiveObjects().forEach((obj)=>{
                obj.set({strokeWidth: width})
            })
            canvas.freeDrawingBrush.width = strokeWidth;
            canvas.renderAll()
        },
        changeStrokeDashArray: (value: number[])=>{
            setStrokeDashArray(value)
            canvas.getActiveObjects().forEach((obj)=>{
                obj.set({strokeDashArray: value})
            })
            canvas.renderAll()
        },
        changeFontFamily: (value: string) => {
            setFontFamily(value);
            canvas.getActiveObjects().forEach((object) => {
                if(isTextType(object.type)){
                    //@ts-ignore
                    object.set({fontFamily: value})
                }
                
            })
            canvas.renderAll()
        },
        changeOpacity: (opacity: number) => {
            canvas.getActiveObjects().forEach((object) => {
                object.set({opacity: opacity})
            })
            canvas.renderAll()
        },
        changeFontWeight: (weight: number) => {
            setFontWeight(weight)
            canvas.getActiveObjects().forEach((object) => {
                if(isTextType(object.type)){
                    //@ts-ignore
                    object.set({fontWeight: weight})
                }
               
            })
            canvas.renderAll()
        },
        changeFontStyle: (value: string) => {
            canvas.getActiveObjects().forEach((object) => {
                if(isTextType(object.type)){
                    //@ts-ignore
                    object.set({fontStyle: value})
                }
               
            })
            canvas.renderAll()
        },
        changeFontLinethrough: (value: boolean) => {
            canvas.getActiveObjects().forEach((object) => {
                if(isTextType(object.type)){
                    //@ts-ignore
                    object.set({linethrough: value})
                }
               
            })
            canvas.renderAll()
        },
        changeFontUnderline: (value: boolean) => {
            canvas.getActiveObjects().forEach((object) => {
                if(isTextType(object.type)){
                    //@ts-ignore
                    object.set({underline: value})
                }
               
            })
            canvas.renderAll()
        },
        changeTextAlign: (value: string) => {
            canvas.getActiveObjects().forEach((object) => {
                if(isTextType(object.type)){
                    //@ts-ignore
                    object.set({textAlign: value})
                }
               
            })
            canvas.renderAll()
        },
        changeFontSize: (value: number) => {
            canvas.getActiveObjects().forEach((object) => {
                if(isTextType(object.type)){
                    //@ts-ignore
                    object.set({fontSize: value})
                }
               
            })
            canvas.renderAll()
        },
        changeImageFilter: (value: string) => {
            const objects = canvas.getActiveObjects();
            objects.forEach((object) => {
                if(object.type === "image"){
                    const imageObject = object as fabric.Image;
                    const effect = createFilter(value);
                    imageObject.filters = effect ? [effect]:[];
                    imageObject.applyFilters();
                    canvas.renderAll();
                }
            })
        },
        changeSize: (size: {width: number;height: number}) => {
            const workspace = getWorkpace();
            workspace?.set(size);
            autoZoom()
            save()
        },
        changeBackground: (value:string)=>{
            const workspace = getWorkpace();
            workspace?.set({fill: value});
            canvas.renderAll();
            save()
        },
        addCircle: ()=>{
            console.log("addCircle")
            const circle = new fabric.Circle({
                ...CRICLE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
            });
           addToCanvas(circle)
        },
        addSoftRectangle: () => {
            const softRectangle = new fabric.Rect({
                ...RECTANGLE_OPTIONS,
                rx: 50,
                ry: 50,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
            });
            addToCanvas(softRectangle)
        },
        addRectangle: ()=>{
            const rectangle = new fabric.Rect({
                ...RECTANGLE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
            });
            addToCanvas(rectangle)
        },
        addTrangle: ()=>{
            const trangle = new fabric.Triangle({
                ...TRIANGLE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
            });
            addToCanvas(trangle)
        },
        addInverseTrangle: ()=>{
            const invertedTrangle = new fabric.Triangle({
                ...TRIANGLE_OPTIONS,
                angle: 180,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
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
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
            })
            addToCanvas(diamond)
        },
        addText: (value,options) => {
            const object = new fabric.Textbox(value,{
                ...TEXT_OPTIONS,
                fill: fillColor,
                ...options
            });
            addToCanvas(object)
        },
        addImage: (value: string) => {
            fabric.Image.fromURL(
                value,
                (image) => {
                    const workspace = getWorkpace();
                    image.scaleToWidth(workspace?.width ||0)
                    image.scaleToHeight(workspace?.height ||0)
                    addToCanvas(image);
                },
                {
                    crossOrigin: "anonymous",
                }
            )
            canvas.renderAll()
        },
        canvas,
        fillColor,
        getActiveFillColor: ()=>{
            const selectedObject = selectedObjects[0]
            if(!selectedObject){
                return fillColor;
            }
            const value = selectedObject.get("fill") || fillColor;
            return value as string;
        },
        getActiveStrokeColor: ()=>{
            const selectedObject = selectedObjects[0]
            if(!selectedObject){
                return strokeColor;
            }
            const value = selectedObject.get("stroke") || strokeColor;
            return value as string;
        },
        getActiveStrokeWidth: ()=>{
            const selectedObject = selectedObjects[0]
            if(!selectedObject){
                return strokeWidth;
            }
            const value = selectedObject.get("strokeWidth") || strokeWidth;
            return value as number;
        },
        getActiveStrokeDashArray: ()=>{
            const selectedObject = selectedObjects[0]
            if(!selectedObject){
                return strokeDashArray;
            }
            const value = selectedObject.get("strokeDashArray") || strokeDashArray;
            return value as number[];
        },
        getActiveOpacity: ()=>{
            const selectedObject = selectedObjects[0]
            if(!selectedObject){
                return 1;
            }
            const value = selectedObject.get("opacity") || 1;
            return value as number;
        },
        getActiveFontFamily: ()=>{
            const selectedObject = selectedObjects[0]
            if(!selectedObject){
                return fontFamily;
            }
            // @ts-ignore
            const value = selectedObject.get("fontFamily") || fontFamily;
            return value as string;
        },
        getActiveFontWeight: ()=>{
            const selectedObject = selectedObjects[0]
            if(!selectedObject){
                return fontWeight;
            }
            // @ts-ignore
            const value = selectedObject.get("fontWeight") || fontWeight;
            return value as number;
        },
        getActiveFontStyle: ()=>{
            const selectedObject = selectedObjects[0]
            if(!selectedObject){
                return "normal";
            }
            // @ts-ignore
            const value = selectedObject.get("fontStyle") || "normal";
            return value as string;
        }, 
        getActiveLinethrough: ()=>{
            const selectedObject = selectedObjects[0]
            if(!selectedObject){
                return false;
            }
            // @ts-ignore
            const value = selectedObject.get("linethrough") || false;
            return value as boolean;
        },
        getActiveUnderline: ()=>{
            const selectedObject = selectedObjects[0]
            if(!selectedObject){
                return false;
            }
            // @ts-ignore
            const value = selectedObject.get("underline") || false;
            return value as boolean;
        },
        getActiveTextAlign: ()=>{
            const selectedObject = selectedObjects[0]
            if(!selectedObject){
                return "left";
            }
            // @ts-ignore
            const value = selectedObject.get("textAlign") || "left";
            return value as string;
        },
        getActiveFontSize: ()=>{
            const selectedObject = selectedObjects[0]
            if(!selectedObject){
                return FONT_SIZE;
            }
            // @ts-ignore
            const value = selectedObject.get("fontSize") || FONT_SIZE;
            return value as number;
        },
       
        fontFamily,
        strokeColor,
        strokeWidth,
        selectedObjects,
        onCopy: ()=>copy(),
        onPaste: ()=>paste(),
        onUndo: ()=>undo(),
        onRedo: ()=>redo(),
        canUndo,
        canRedo,
        savePng,
        saveJpg,
        saveSvg,
        saveJson,
        loadFromJson    
    };
};


export const useEditor = (
    {
        clearSelectionCallback
    }: EditorHookProps
)=>{
    const [canvas,setCanvas] = useState<fabric.Canvas | null>(null);
    const [container,setContainer] = useState<HTMLDivElement | null>(null);
    const [selectedObjects,setSelectedObjects] = useState<fabric.Object[]>([]);
    const [fillColor,setFillColor] = useState<string>(FILL_COLOR);
    const [strokeColor,setStrokeColor] = useState<string>(STROKE_COLOR);
    const [strokeWidth,setStrokeWidth] = useState<number>(STROKE_WIDTH);
    const [strokeDashArray,setStrokeDashArray] = useState<number[]>(STROKE_DASH_ARRAY);
    const [fontFamily, setFontFamily] = useState(FONT_FAMILI)
    const [fontWeight, setFontWeight] = useState(FONT_WEIGHT)

    const {save,canRedo,canUndo,redo, undo,setHistoryIndex,canvasHistory} = useHistory({canvas});
    const {copy,paste} = useClipboard({
            canvas
        }
    );
    useWindowEvents()
    const {autoZoom} = useAutoResize({
        canvas,
        container
    });
    const editor = useMemo(()=>{
        if(canvas){
            return buildEditor({
                save,
                canRedo,
                canUndo,
                redo,
                undo,
                
                autoZoom,
                copy,
                paste,
                canvas,
                fillColor,
                strokeColor,
                strokeWidth,
                strokeDashArray,
                setStrokeDashArray,
                setFillColor,
                setStrokeColor,
                setStrokeWidth,
                selectedObjects,
                fontFamily,
                fontWeight,
                setFontWeight,
                setFontFamily
            });
        }
        return undefined;
    },[
        save,
        canRedo,
        canUndo,
        redo,
        undo,
        autoZoom,
        canvas,
        fillColor,
        strokeColor,
        strokeWidth,
        selectedObjects,
        strokeDashArray,
        fontFamily,
        fontWeight
    ])

    useCanvasEvents({
        save,
        canvas,
        setSelectedObjects,
        clearSelectionCallback
    })

    useHotKeys({
        canvas,
        undo,
        redo,
        save,
        copy,
        paste
    })
    
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

        setCanvas(initialCanvas);
        setContainer(initialContainer);
        
        const currentState = JSON.stringify(initialCanvas.toJSON());
        canvasHistory.current = [currentState];
        setHistoryIndex(0)
        // 创建一个圆形对象并添加到 canvas
        // const circle = new fabric.Circle({
        //     left: 200,
        //     top: 50,
        //     radius: 50,
        //     fill: 'green'
        // });

        // initialCanvas.add(circle);
        // initialCanvas.centerObject(circle)
    },[
        canvasHistory,
        setHistoryIndex
    ]) 
    return {init,editor}
}