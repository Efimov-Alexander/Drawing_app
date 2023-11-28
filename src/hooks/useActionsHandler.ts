import { useActions, useAppSelector } from "./hooks"
import { fabric } from 'fabric'
import image from "../aseets/images/avatar.jpg"
import { useFabricJSEditor } from "fabricjs-react";
import { useEffect } from 'react'

const svgStr = '<svg width="500" height="400" xmlns="http://www.w3.org/2000/svg"><!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ --><g><title>background</title><rect fill="#fff" id="canvas_background" height="402" width="502" y="-1" x="-1"/><g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid"><rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/></g></g><g><title>Layer 1</title><path id="svg_1" d="m118,242l64,-153l63,157c0,0 45,-71 49,-68c4,3 11,146 12,146c1,0 -173,-7 -173,-7c0,0 -61,-72 -61,-72c0,0 110,-156 46,-3z" fill-opacity="0.7" stroke-width="2" stroke="#995757" fill="#995757"/></g></svg>';
let copyCanvasState: any[] = [{}]

export const useActionsHandler = (editor: any) => {

	const { borderDropdown, colorPicker, currentPage, canvasState } = useAppSelector(state => state.app)
	const { setCurrentPage, setCanvasState } = useActions()
	const lastPage = canvasState.length - 1

	editor?.canvas.on('object:moving', () => {
		copyCanvasState = [...canvasState, editor?.canvas.toJSON()]
	})

	useEffect(() => {
		const handler = setTimeout(() => {
			setCanvasState(copyCanvasState)
			if (currentPage != 0) {
				setCurrentPage(currentPage + 1)
			}
		}, 300);
		return () => clearTimeout(handler)
	}, [copyCanvasState])

	const addObj = (obj: any) => {
		editor?.canvas.centerObject(obj).add(obj)
		setCurrentPage(currentPage + 1)
		if (currentPage === lastPage) {
			setCanvasState([...canvasState, editor?.canvas.toJSON()])
		} else {
			setCanvasState([...canvasState.slice(0, currentPage + 1), editor?.canvas.toJSON()])
		}
	}
	const actionHandler = (obj: string, event?: any) => {
		switch (obj) {
			case "line":
				const line = new fabric.Line([50, 50, 300, 300], {
					stroke: colorPicker.value,
					strokeWidth: borderDropdown.value
				})
				addObj(line)
				break
			case "circle":
				const circle = new fabric.Circle({
					radius: 50,
					stroke: "000",
					strokeWidth: borderDropdown.value,
					fill: colorPicker.value,
				})
				addObj(circle)
				break
			case "rect":
				const rect = new fabric.Rect({
					stroke: "000",
					strokeWidth: borderDropdown.value,
					fill: colorPicker.value,
					width: 50,
					height: 50,
				});
				addObj(rect)
				break
			case "trianlge":
				const triangle = new fabric.Triangle({
					fill: colorPicker.value,
					stroke: "000",
				})
				addObj(triangle)
				break
			case "text":
				const text = new fabric.Textbox("Enter text", {
					fill: colorPicker.value,
				})
				addObj(text)
				break
			case "zoomIn":
				editor?.zoomIn()
				break
			case "zoomOut":
				editor?.zoomOut()
				break
			case "deleteSelected":
				editor?.deleteSelected()
				setCanvasState([...canvasState, editor?.canvas.toJSON()])
				setCurrentPage(currentPage + 1)
				break
			case "deleteAll":
				editor?.deleteAll()
				setCanvasState([...canvasState, editor?.canvas.toJSON()])
				setCurrentPage(currentPage + 1)
				break
			case "save":
				console.log(editor?.canvas.toSVG())
				break
			case "svg":
				event?.preventDefault()
				console.log(event?.target.files)
				fabric.loadSVGFromString(svgStr, (objects, options) => {
					const svg = fabric.util.groupSVGElements(objects, options);
					addObj(svg)
				})
				break
			case "image":
				fabric.Image.fromURL(image, img => {
					addObj(image)
				});
				break
			case "undo":
				editor?.canvas.loadFromJSON(canvasState[currentPage - 1], () => {
					editor?.canvas.renderAll();
				})
				setCurrentPage(currentPage - 1)
				break
			case "redo":
				editor?.canvas.loadFromJSON(canvasState[currentPage + 1], () => {
					editor?.canvas.renderAll();
				})
				setCurrentPage(currentPage + 1)
				break
		}
	}

	return { actionHandler, lastPage, currentPage }
}