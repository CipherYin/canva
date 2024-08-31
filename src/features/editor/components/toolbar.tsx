import { useEffect, useState } from "react";
import { ActiveTool, Editor, FONT_SIZE, FONT_WEIGHT } from "../types";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BsBorderWidth } from "react-icons/bs";
import { AlignCenter, AlignLeft, AlignRight, ArrowDown, ArrowUp, ChevronDown, Trash } from "lucide-react";
import {RxTransparencyGrid} from "react-icons/rx"
import { isTextType } from "../utils";
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa";
import FontSizeInput from "./font-size-input";
interface ToolbarProps{
  editor: Editor | undefined,
  activeTool: ActiveTool,
  onChangeActiveTool: (tool: ActiveTool)=>void;

}

const Toolbar = (
  {
    editor,
    activeTool,
    onChangeActiveTool,
  }: ToolbarProps
) => {
    const initialFillColor = editor?.getActiveFillColor();
    const initialStrokeColor = editor?.getActiveStrokeColor();
    const initialFontFamily = editor?.getActiveFontFamily();
    
    const initialFontWeight = editor?.getActiveFontWeight() || FONT_WEIGHT;
    const initialFontStyle = editor?.getActiveFontStyle() || "normal";
    const initialLinethrough = editor?.getActiveLinethrough() || false;
    const initialUnderline = editor?.getActiveUnderline() || false;
    const initialTextAlign = editor?.getActiveTextAlign() || "left";
    const initialFontSize = editor?.getActiveFontSize() || FONT_SIZE;
    const [properties, setProperties] = useState({
        fillColor: initialFillColor,
        strokeColor: initialStrokeColor,
        fontFamily: initialFontFamily,
        fontWeight: initialFontWeight,
        fontStyle: initialFontStyle,
        fontLinethrough: initialLinethrough,
        fontUnderline: initialUnderline,
        textAlign: initialTextAlign,
        fontSize: initialFontSize
    })

    useEffect(()=>{
      setProperties((current)=>({
        ...current,
        fillColor: initialFillColor,
        strokeColor: initialStrokeColor,
        fontFamily: initialFontFamily,
        fontWeight: initialFontWeight,
        fontStyle: initialFontStyle,
        fontLinethrough: initialLinethrough,
        fontUnderline: initialUnderline,
        textAlign: initialTextAlign,
        fontSize: initialFontSize
      }))
    },[
      initialFillColor,
      initialStrokeColor,
      initialFontFamily,
      initialFontWeight,
      initialFontStyle,
      initialLinethrough,
      initialUnderline,
      initialTextAlign,
      initialFontSize
    ])

    const selectObjectType = editor?.selectedObjects[0]?.type
    const isText = isTextType(selectObjectType);
    if(editor?.selectedObjects.length===0){
      return (
        <div className="shrink-0 h-[56px] border-b bg-white w-full 
                flex items-center overflow-x-auto z-[49] p-2 gap-x-2"/>
      )
    }

    const onChangeFontSize = (value: number) => {
      const selectObject = editor?.selectedObjects[0];

      if(!selectObject){
        return;
      }
      

      editor?.changeFontSize(value);
      setProperties((current)=>({
        ...current,
        fontSize: value
      }))
    }


    const onChangeTextAlign = (value: string) => {
      const selectObject = editor?.selectedObjects[0];

      if(!selectObject){
        return;
      }
      

      editor?.changeTextAlign(value);
      setProperties((current)=>({
        ...current,
        textAlign: value
      }))
    }

    const toggleBold = () => {
      const selectObject = editor?.selectedObjects[0];

      if(!selectObject){
        return;
      }
      const newValue = properties.fontWeight >500?500:700;

      editor?.changeFontWeight(newValue);
      setProperties((current)=>({
        ...current,
        fontWeight: newValue
      }))

    }

    const toggleItalic = () => {
      const selectObject = editor?.selectedObjects[0];

      if(!selectObject){
        return;
      }
      const isItalic = properties.fontStyle === "italic";
      const newValue = isItalic? "normal":"italic";

      editor?.changeFontStyle(newValue);
      setProperties((current)=>({
        ...current,
        fontStyle: newValue
      }))
    }

    const toggleLinethrough = () => {
      const selectObject = editor?.selectedObjects[0];

      if(!selectObject){
        return;
      }
      const newValue = properties.fontLinethrough? false:true;

      editor?.changeFontLinethrough(newValue);
      setProperties((current)=>({
        ...current,
        fontLinethrough: newValue
      }))
    }
    const toggleUnderline = () => {
      const selectObject = editor?.selectedObjects[0];

      if(!selectObject){
        return;
      }
      const newValue = properties.fontUnderline? false:true;

      editor?.changeFontUnderline(newValue);
      setProperties((current)=>({
        ...current,
        fontUnderline: newValue
      }))
    }
    return ( 
        <div className="shrink-0 h-[56px] border-b bg-white w-full 
                flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
          <div className="flex items-center h-full justify-center">
            <Hint lable="填充颜色" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("fill")}
                size="icon"
                variant="ghost"
                className={cn(
                  activeTool === "fill" && "bg-gray-200"
                )}
              >
                <div
                  className="rounded-sm size-4 border"
                  style={{
                    backgroundColor:  properties.fillColor
                  }}
               />
              </Button>
            </Hint>
          </div>
          {
            !isText &&
            <div className="flex items-center h-full justify-center">
            <Hint lable="边框颜色" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("stroke-color")}
                size="icon"
                variant="ghost"
                className={cn(
                  activeTool === "stroke-color" && "bg-gray-200"
                )}
              >
                <div
                  className="rounded-sm size-4 border-2 bg-white"
                  style={{
                    borderColor:  properties.strokeColor
                  }}
               />
              </Button>
            </Hint>
          </div>
          }
          {
            !isText &&
            <div className="flex items-center h-full justify-center">
              <Hint lable="边框选项" side="bottom" sideOffset={5}>
                <Button
                  onClick={() => onChangeActiveTool("stroke-width")}
                  size="icon"
                  variant="ghost"
                  className={cn(
                    activeTool === "stroke-width" && "bg-gray-200"
                  )}
                >
                  <BsBorderWidth
                    className="rounded-sm size-4"
                />
                </Button>
              </Hint>
          </div>
          }
          
          {
            isText &&
            <div className="flex items-center h-full justify-center">
              <Hint lable="字体样式" side="bottom" sideOffset={5}>
                <Button
                  onClick={() => onChangeActiveTool("font")}
                  size="icon"
                  variant="ghost"
                  className={cn(
                    "w-auto px-2 text-sm",
                    activeTool === "font" && "bg-gray-200"
                  )}
                >
                  <div className="max-w-[300px] truncate">
                    {properties.fontFamily}
                  </div>
                  <ChevronDown className="size-4 ml-2 shrink-0"/>
                </Button>
              </Hint>
          </div>
          }
          {
            isText &&
            <div className="flex items-center h-full justify-center">
              <Hint lable="粗细" side="bottom" sideOffset={5}>
                <Button
                  onClick={toggleBold}
                  size="icon"
                  variant="ghost"
                  className={cn(
                    properties.fontWeight > 500 && "bg-gray-200"
                  )}
                >
                  <FaBold className="size-4"/>
                </Button>
              </Hint>
          </div>
          }
          {
            isText &&
            <div className="flex items-center h-full justify-center">
              <Hint lable="斜体" side="bottom" sideOffset={5}>
                <Button
                  onClick={toggleItalic}
                  size="icon"
                  variant="ghost"
                  className={cn(
                    properties.fontStyle === "italic" && "bg-gray-200"
                  )}
                >
                  <FaItalic className="size-4"/>
                </Button>
              </Hint>
          </div>
          }
          {
            isText &&
            <div className="flex items-center h-full justify-center">
              <Hint lable="删除线" side="bottom" sideOffset={5}>
                <Button
                  onClick={toggleLinethrough}
                  size="icon"
                  variant="ghost"
                  className={cn(
                    properties.fontLinethrough  && "bg-gray-200"
                  )}
                >
                  <FaStrikethrough className="size-4"/>
                </Button>
              </Hint>
          </div>
          }
          {
            isText &&
            <div className="flex items-center h-full justify-center">
              <Hint lable="下划线" side="bottom" sideOffset={5}>
                <Button
                  onClick={toggleUnderline}
                  size="icon"
                  variant="ghost"
                  className={cn(
                    properties.fontUnderline && "bg-gray-200"
                  )}
                >
                  <FaUnderline className="size-4"/>
                </Button>
              </Hint>
          </div>
          }
          {
            isText &&
            <div className="flex items-center h-full justify-center">
              <Hint lable="左对齐" side="bottom" sideOffset={5}>
                <Button
                  onClick={()=>onChangeTextAlign("left")}
                  size="icon"
                  variant="ghost"
                  className={cn(
                    properties.textAlign === "left" && "bg-gray-200"
                  )}
                >
                  <AlignLeft className="size-4"/>
                </Button>
              </Hint>
          </div>
          }
          {
            isText &&
            <div className="flex items-center h-full justify-center">
              <Hint lable="居中" side="bottom" sideOffset={5}>
                <Button
                  onClick={() => onChangeTextAlign("center")}
                  size="icon"
                  variant="ghost"
                  className={cn(
                    properties.textAlign === "center" && "bg-gray-200"
                  )}
                >
                  <AlignCenter className="size-4"/>
                </Button>
              </Hint>
          </div>
          }
          {
            isText &&
            <div className="flex items-center h-full justify-center">
              <Hint lable="右对齐" side="bottom" sideOffset={5}>
                <Button
                  onClick={() => onChangeTextAlign("right")}
                  size="icon"
                  variant="ghost"
                  className={cn(
                    properties.textAlign === "right" && "bg-gray-200"
                  )}
                >
                  <AlignRight className="size-4"/>
                </Button>
              </Hint>
          </div>
          }
           {
            isText &&
            <div className="flex items-center h-full justify-center">
              <Hint lable="右对齐" side="bottom" sideOffset={5}>
                <FontSizeInput
                  value={properties.fontSize}
                  onChange={onChangeFontSize}
                />
              </Hint>
          </div>
          }
          <div className="flex items-center h-full justify-center">
            <Hint lable="上移" side="bottom" sideOffset={5}>
              <Button
                onClick={() => editor?.bringForward()}
                size="icon"
                variant="ghost"
                className={cn(
                  activeTool === "stroke-width" && "bg-gray-200"
                )}
              >
                <ArrowUp className="size-4"/>
              </Button>
            </Hint>
          </div>
          <div className="flex items-center h-full justify-center">
            <Hint lable="下移" side="bottom" sideOffset={5}>
              <Button
                onClick={() => editor?.sendBackwards()}
                size="icon"
                variant="ghost"
                className={cn(
                  activeTool === "stroke-width" && "bg-gray-200"
                )}
              >
                <ArrowDown className="size-4"/>
              </Button>
            </Hint>
          </div>
          <div className="flex items-center h-full justify-center">
            <Hint lable="透明度" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("opacity")}
                size="icon"
                variant="ghost"
                className={cn(
                  activeTool === "opacity" && "bg-gray-200"
                )}
              >
                <RxTransparencyGrid className="size-4"/>
              </Button>
            </Hint>
          </div>

          <div className="flex items-center h-full justify-center">
            <Hint lable="删除" side="bottom" sideOffset={5}>
              <Button
                onClick={() => editor?.delete()}
                size="icon"
                variant="ghost"
                className={cn(
                  activeTool === "opacity" && "bg-gray-200"
                )}
              >
                <Trash className="size-4"/>
              </Button>
            </Hint>
          </div>
        </div>

        
      );
}
 
export default Toolbar;