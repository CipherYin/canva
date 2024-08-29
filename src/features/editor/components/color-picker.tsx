import { ChromePicker, CirclePicker } from "react-color";
import { COLORS } from "../types";
import { rgbaObjectToString } from "../utils";

interface ColorPickerProps{
    color: string;
    onChange: (color: string)=>void;
}

export const ColorPicker = ({
    color, 
    onChange
}: ColorPickerProps)=>{
    return (
       <div className="w-full space-y-4">
            <ChromePicker
                color={color}
                onChange={(color)=>{
                    const formattedValue = rgbaObjectToString(color.rgb);
                    onChange(formattedValue)
                }}
                className="border rounded-lg"
            />
            <CirclePicker
                color={color}
                colors={COLORS}
                onChangeComplete={(color) => {
                    const formattedValue = rgbaObjectToString(color.rgb);
                    onChange(formattedValue)
                }}
            />
       </div> 
    )
}