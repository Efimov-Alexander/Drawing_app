import { useActions, useAppSelector } from "./hooks"
import { fabric } from 'fabric'
import { FabricJSEditor } from "fabricjs-react"
import { useEffect, useState } from 'react'

let copyCanvasState: any[] = [{}]
let modalSaveContent: any
const fileReader = new FileReader()
let isDragging = false
let lastPosX = 0
let lastPosY = 0

export const useApp = (editor: FabricJSEditor | undefined) => {
	if (editor) { editor.canvas.selection = false }
	const { borderDropdown, colorPicker, currentPage, canvasState } = useAppSelector(state => state.app)
	const { setCurrentPage, setCanvasState } = useActions()
	const [modalSaveIsOpen, setModalSaveIsOpen] = useState(false)
	const lastPage = canvasState.length - 1

	editor?.canvas.on('object:moving', () => {
		copyCanvasState = [...canvasState, editor?.canvas.toJSON()]
	})

	editor?.canvas.on('mouse:down', function (e) {
		const activeObject = editor?.canvas._activeObject
		if (e.e instanceof MouseEvent && editor && (activeObject === undefined || activeObject === null)) {
			isDragging = true;
			editor?.canvas.setCursor("grab")
			lastPosX = e.e.clientX;
			lastPosY = e.e.clientY;
		}
	});
	editor?.canvas.on('mouse:move', function (event) {
		const activeObject = editor?.canvas.getActiveObject()
		if (isDragging && editor && editor.canvas.viewportTransform && (activeObject === undefined || activeObject === null)) {
			editor?.canvas.setCursor("grab")
			const e = event.e;
			editor.canvas.viewportTransform[4] += e.clientX - lastPosX;
			editor.canvas.viewportTransform[5] += e.clientY - lastPosY;
			lastPosX = e.clientX;
			lastPosY = e.clientY;
			editor.canvas.getObjects().forEach(item => item.setCoords())
			editor.canvas.renderAll();
		}
	});
	editor?.canvas.on('mouse:up', function (e) {
		const activeObject = editor?.canvas._activeObject
		if (activeObject === undefined || activeObject === null) {
			isDragging = false;
			editor?.canvas.setCursor("default")
			editor.canvas.renderAll();
		}
	});

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
		if (currentPage === lastPage) {
			setCanvasState([...canvasState, editor?.canvas.toJSON()])
			setCurrentPage(currentPage + 1)
		} else {
			setCanvasState([...canvasState.slice(0, currentPage + 1), editor?.canvas.toJSON()])
			setCurrentPage(currentPage + 1)
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
					strokeWidth: borderDropdown.value,
				})
				addObj(triangle)
				break
			case "text":
				const text = new fabric.Textbox("Enter text", {
					fill: colorPicker.value,
					width: 200,
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
				const activeObject = editor?.canvas.getActiveObject()
				if (activeObject !== undefined || activeObject !== null) {
					editor?.deleteSelected()
					setCanvasState([...canvasState, editor?.canvas.toJSON()])
					setCurrentPage(currentPage + 1)
				}
				break
			case "deleteAll":
				editor?.deleteAll()
				setCanvasState([...canvasState, editor?.canvas.toJSON()])
				setCurrentPage(currentPage + 1)
				break
			case "save":
				modalSaveContent = editor?.canvas.toSVG()
				setModalSaveIsOpen(true)
				break
			case "svg":
				event?.preventDefault()
				const svg = event?.target.files[0]
				fileReader.onload = (event: any) => {
					fabric.loadSVGFromString(event.target.result, (objects, options) => {
						const svg = fabric.util.groupSVGElements(objects, options)
						addObj(svg)
					})
				}
				if (svg && svg.type.match('.svg')) {
					fileReader.readAsText(svg);
				}
				break
			case "image":
				event?.preventDefault()
				const image = event?.target.files[0]
				fileReader.onload = (event: any) => {
					fabric.Image.fromURL(event.target.result, img => { addObj(img) })
				}
				if (image && image.type.match('image.*')) {
					fileReader.readAsDataURL(image);
				}
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

	return { actionHandler, lastPage, currentPage, modalSaveContent, modalSaveIsOpen, setModalSaveIsOpen }
}