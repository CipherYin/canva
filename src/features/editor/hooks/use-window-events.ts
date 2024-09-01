import { useEvent } from "react-use"

export const useWindowEvents = () => {
    useEvent("beforeunload", (event) => {
        (event || window.event).returnValue = "你确定要离开吗?"
    });
}