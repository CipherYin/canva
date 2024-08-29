import { fabric } from "fabric"
import { useCallback, useEffect } from "react";
interface UseAutoResizeProps {
    canvas: fabric.Canvas | null;
    container: HTMLDivElement | null;
}
export const useAutoResize = ({
    canvas,
    container
}:UseAutoResizeProps)=>{

    const autoZoom = useCallback(() => {
        if (!canvas || !container) return;
        
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        // console.log(`${width} - auto-size - ${height}`);
        
        canvas.setWidth(width);
        canvas.setHeight(height);
        
        const center = canvas.getCenter();
        const zoomRatio = 0.85;
        
        const localWorkspace = canvas.getObjects().find((object) => object.name === 'clip');
        if (!localWorkspace) return;
        
        // @ts-ignore
        const scale = fabric.util.findScaleToFit(localWorkspace, { width, height });
        const zoom = zoomRatio * scale;
        
        canvas.setViewportTransform(fabric.iMatrix.concat()); // 重置视口变换
        canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom); // 缩放画布
        
        const workspaceCenter = localWorkspace.getCenterPoint();
        const viewportTransform = canvas.viewportTransform;
        
        if (!viewportTransform || !canvas.width || !canvas.height) return;
        
        // console.log(`${viewportTransform[4]} 放大前 ${viewportTransform[5]}`);
        
        viewportTransform[4] = canvas.width / 2 - workspaceCenter.x * viewportTransform[0];
        viewportTransform[5] = canvas.height / 2 - workspaceCenter.y * viewportTransform[3];
        
        // console.log(`${viewportTransform[4]} 放大后 ${viewportTransform[5]}`);
        canvas.setViewportTransform(viewportTransform); // 应用更新后的视口变换
        
        // 设置 clipPath 并请求渲染
        localWorkspace.clone((cloned: fabric.Rect) => {
            canvas.clipPath = cloned;
            canvas.requestRenderAll();
        });
    }, [canvas, container]);
    
    



    useEffect(()=>{
        let resizeObserver: ResizeObserver | null = null;

        if(canvas && container){
            resizeObserver = new ResizeObserver(()=>{
                autoZoom()
            });
            resizeObserver.observe(container)
        }

        return () => {
            if(resizeObserver) {
                resizeObserver.disconnect()
            }
        }
    },[canvas,container])
}