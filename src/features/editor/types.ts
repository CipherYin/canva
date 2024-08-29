import { fabric } from "fabric";
import * as material from "material-colors";

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
export type BuildEditorProps = {
    canvas: fabric.Canvas;
    fillColor: string;
    strokeColor: string;
    strokeWidth: number;
    setFillColor: (color: string)=>void;
    setStrokeColor: (color: string)=>void;
    setStrokeWidth: (width: number)=>void;
}

export interface Editor{
    addCircle: ()=>void;
    addSoftRectangle: ()=>void;
    addRectangle: ()=>void;
    addTrangle: ()=>void;
    addInverseTrangle: ()=>void;
    addDiamond: ()=>void;
    changeFillColor: (color: string)=>void;
    changeStrokeColor: (color: string)=>void;
    changeStrokeWidth: (width: number)=>void;
    fillColor: string;
    strokeColor: string;
    strokeWidth: number;
    canvas: fabric.Canvas;
}