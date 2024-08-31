import { fabric } from "fabric";
import { ITextboxOptions } from "fabric/fabric-impl";
import * as material from "material-colors";

export const fonts = [
    "Arial",
    "Arial Black",
    "Verdana",
    "Helvetica",
    "Tahoma",
    "Trebuchet MS",
    "Times New Roman",
    "Georgia",
    "Garamond",
    "Courier New",
    "Brush Script MT",
    "Palatino",
    "Bookman",
    "Comic Sans MS",
    "Impact",
    "Lucida Sans Unicode",
    "Geneva",
    "Lucida Console",
]
export interface EditorHookProps {
    clearSelectionCallback?: ()=>void
};
export const selectionDependentTools = [
    "fill",
    "font",
    "filter",
    "opacity",
    "remove-bg",
    "stroke-color",
    "stroke-width"
]

export const COLORS = [
    material.red["500"],
    material.pink["500"],
    material.purple["500"],
    material.deepPurple["500"],
    material.indigo["500"],
    material.blue["500"],
    material.lightBlue["500"],
    material.cyan["500"],
    material.teal["500"],
    material.green["500"],
    material.lightGreen["500"],
    material.lime["500"],
    material.yellow["500"],
    material.amber["500"],
    material.orange["500"],
    material.deepOrange["500"],
    material.brown["500"],
    material.grey["500"],
    material.blueGrey["500"],
    "transparent"
]


export type ActiveTool = 
"select"
| "shapes"
| "text"
| "images"
| "draw"
| "fill"
| "stroke-color"
| "stroke-width"
| "font"
| "opacity"
| "filter"
| "settings"
| "ai"
| "remove-bg"
| "templates";

export const FILL_COLOR = "rgba(0,0,0,1)";
export const STROKE_COLOR = "rgba(0,0,0,1)";
export const STROKE_WIDTH = 2;
export const STROKE_DASH_ARRAY = [];
export const FONT_FAMILI ="Arial";
export const FONT_SIZE = 32;
export const FONT_WEIGHT = 400;


export const CRICLE_OPTIONS = {
    left: 100,
    top: 100,
    radius: 170,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
  
    
}

export const RECTANGLE_OPTIONS = {
    left: 100,
    top: 100,
    width: 300,
    height: 300,
    angle: 0,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
}
export const TRIANGLE_OPTIONS = {
    left: 100,
    top: 100,
    width: 300,
    height: 300,
    angle: 0,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
}

export const DIAMOND_OPTIONS = {
    left: 100,
    top: 100,
    width: 300,
    height: 300,
    angle: 0,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
}

export const TEXT_OPTIONS = {
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    type: "textbox",
    fontSize: FONT_SIZE,
    fontFamily: FONT_FAMILI
}
export type BuildEditorProps = {
    canvas: fabric.Canvas;
    fillColor: string;
    strokeColor: string;
    strokeWidth: number;
    strokeDashArray: number[];
    fontFamily: string;
    fontWeight: number;
    setFontWeight: (weight: number) => void;
    setStrokeDashArray: (value: number[])=>void;
    setFillColor: (color: string)=>void;
    setStrokeColor: (color: string)=>void;
    setStrokeWidth: (width: number)=>void;
    setFontFamily: (value: string) => void;
    selectedObjects: fabric.Object[]
}

export interface Editor{
    addImage: (value: string) => void;
    bringForward: () => void;
    sendBackwards: () => void;
    addCircle: ()=>void;
    addSoftRectangle: ()=>void;
    addRectangle: ()=>void;
    addTrangle: ()=>void;
    addInverseTrangle: ()=>void;
    addDiamond: ()=>void;
    addText: (value: string, options?: ITextboxOptions) => void;
    delete: ()=>void;
    changeOpacity: (value:number) => void;
    changeFillColor: (color: string)=>void;
    changeStrokeColor: (color: string)=>void;
    changeStrokeWidth: (width: number)=>void;
    changeStrokeDashArray: (value: number[])=>void;
    changeFontFamily: (value:string)=>void;
    changeFontWeight: (value: number)=>void;
    changeFontStyle: (value:string) => void;
    changeFontLinethrough: (value:boolean)=>void;
    changeFontUnderline: (value:boolean)=>void;
    changeFontSize: (value:number)=>void;
    changeTextAlign: (value:string)=>void;
    getActiveFillColor: () => string;
    getActiveStrokeColor: () => string;
    getActiveStrokeWidth: () => number;
    getActiveStrokeDashArray: () => number[];
    getActiveOpacity: () => number;
    getActiveFontFamily: () => string;
    getActiveFontWeight: () => number;
    getActiveFontStyle: () => string;
    getActiveLinethrough: ()=>boolean;
    getActiveUnderline: ()=>boolean;
    getActiveTextAlign: ()=>string;
    getActiveFontSize: ()=>number;
    canvas: fabric.Canvas;
    fillColor: string;
    strokeColor: string;
    strokeWidth: number;
    fontFamily: string;
    selectedObjects: fabric.Object[]
    
    
}