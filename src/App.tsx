
import './aseets/style/App.scss';
import './aseets/style/null.css';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { fabric } from "fabric"
import image from "./aseets/images/avatar.jpg"
import { useEffect, useState } from "react"
import { icons } from './aseets/icons'
import { CanvasButton } from './components/CanvasButtons';
import { ColorPickerButton } from './components/ColorPickerButton';
import { useActions, useAppSelector } from './hooks/hooks';
import { BorderDropdownButton } from './components/BorderDropdownButton';
import { useActionsHandler } from './hooks/useActionsHandler';


const svgStr = '<svg width="500" height="400" xmlns="http://www.w3.org/2000/svg"><!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ --><g><title>background</title><rect fill="#fff" id="canvas_background" height="402" width="502" y="-1" x="-1"/><g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid"><rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/></g></g><g><title>Layer 1</title><path id="svg_1" d="m118,242l64,-153l63,157c0,0 45,-71 49,-68c4,3 11,146 12,146c1,0 -173,-7 -173,-7c0,0 -61,-72 -61,-72c0,0 110,-156 46,-3z" fill-opacity="0.7" stroke-width="2" stroke="#995757" fill="#995757"/></g></svg>';

type TCanvasButton = {
	icon: any,
	actionType: string,
}

const CanvasButtons: TCanvasButton[] = [{ actionType: "line", icon: icons.line, }, { actionType: "circle", icon: icons.circle, }, { actionType: "rect", icon: icons.rect, }, { actionType: "trianlge", icon: icons.triangle, }, { actionType: "text", icon: icons.text, }, { actionType: "deleteSelected", icon: icons.eraser, }, { actionType: "zoomIn", icon: icons.zoomIn, }, { actionType: "zoomOut", icon: icons.zoomOut, }, { actionType: "deleteAll", icon: icons.trashcan, }, { actionType: "save", icon: icons.save, }, { actionType: "image", icon: icons.image, }]


export const App = () => {

	const { editor, onReady } = useFabricJSEditor()
	const { actionHandler, currentPage, lastPage } = useActionsHandler(editor)

	return (
		<div className='main-container'>
			<aside className="sidebar">
				<div className="buttons-wrapper">
					<button className={` canvas-button  ${currentPage == 0 ? "button-disable" : ""} `} onClick={() => actionHandler("undo")}>{<icons.undo />}</button>
					<button className={` canvas-button  ${(currentPage == lastPage) ? "button-disable" : ""} `} onClick={() => actionHandler("redo")}>{<icons.redo />}</button>
					{CanvasButtons.map((item: TCanvasButton) => <CanvasButton Icon={item.icon} actionType={item.actionType} onClick={actionHandler} key={item.actionType} />)}
					<BorderDropdownButton />
					<label className="input-svg-wrapper  canvas-button">
						<input className='input-svg' onChange={(e) => actionHandler("svg", e)} type="file" />
						{<icons.svg />}
					</label>
					<ColorPickerButton />
				</div>
			</aside>
			<FabricJSCanvas className="sample-canvas" onReady={onReady} />
		</div>
	)

}