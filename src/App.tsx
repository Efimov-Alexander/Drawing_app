
import './aseets/style/App.scss';
import './aseets/style/null.css';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { fabric } from "fabric"
import image from "./aseets/images/avatar.jpg"
import { ColorResult, SketchPicker } from 'react-color'
import { useState } from "react"
import { IoAnalyticsOutline } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa";
import { MdOutlineRectangle } from "react-icons/md";
import { IoTriangleOutline } from "react-icons/io5";
import { IoEllipseOutline } from "react-icons/io5";
import { CiText } from "react-icons/ci";
import { BsZoomIn } from "react-icons/bs";
import { GoZoomOut } from "react-icons/go";
import { TbEraser } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { BsFiletypeSvg } from "react-icons/bs";
import { FaRegFileImage } from "react-icons/fa";
import { CanvasButton } from './components/CanvasButtons';


const svgStr = '<svg width="500" height="400" xmlns="http://www.w3.org/2000/svg"><!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ --><g><title>background</title><rect fill="#fff" id="canvas_background" height="402" width="502" y="-1" x="-1"/><g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid"><rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/></g></g><g><title>Layer 1</title><path id="svg_1" d="m118,242l64,-153l63,157c0,0 45,-71 49,-68c4,3 11,146 12,146c1,0 -173,-7 -173,-7c0,0 -61,-72 -61,-72c0,0 110,-156 46,-3z" fill-opacity="0.7" stroke-width="2" stroke="#995757" fill="#995757"/></g></svg>';

type TCanvasButton = {
	icon: any,
	actionType: string,
}

const CanvasButtons: TCanvasButton[] = [{ actionType: "line", icon: IoAnalyticsOutline, }, { actionType: "circle", icon: FaRegCircle, }, { actionType: "rect", icon: MdOutlineRectangle, }, { actionType: "trianlge", icon: IoTriangleOutline, }, { actionType: "ellipse", icon: IoEllipseOutline, }, { actionType: "text", icon: CiText, }, { actionType: "zoomIn", icon: BsZoomIn, }, { actionType: "zoomOut", icon: GoZoomOut, }, { actionType: "deleteSelected", icon: TbEraser, }, { actionType: "deleteAll", icon: MdDeleteOutline, }, { actionType: "save", icon: FaRegSave, }, { actionType: "svg", icon: BsFiletypeSvg, }, { actionType: "image", icon: FaRegFileImage, },
]

function App() {
	const { editor, onReady } = useFabricJSEditor()

	const [background, setBackground] = useState("fff")

	const handleChangeComplete = (color: ColorResult) => {
		setBackground(color.hex);
	};

	const onClick = (obj: string) => {
		switch (obj) {
			case "line":
				const line = new fabric.Line([50, 50, 300, 300], {
					stroke: background,
					strokeWidth: 3
				})
				editor?.canvas.centerObject(line).add(line)
				break
			case "circle":
				const circle = new fabric.Circle({
					radius: 50,
					strokeWidth: 5,
					fill: background,

				})
				editor?.canvas.centerObject(circle).add(circle)
				break
			case "rect":
				const rect = new fabric.Rect({
					fill: background,
					width: 50,
					height: 50,
				});
				editor?.canvas.centerObject(rect).add(rect)
				break
			case "trianlge":
				const triangle = new fabric.Triangle({
					fill: background,
				})
				editor?.canvas.centerObject(triangle).add(triangle)
				break
			case "text":
				const text = new fabric.Text("fds")
				editor?.canvas.centerObject(text).add(text)
				break
			case "zoomIn":
				editor?.zoomIn()
				break
			case "zoomOut":
				editor?.zoomOut()
				break
			case "deleteSelected":
				editor?.deleteSelected()
				break
			case "deleteAll":
				editor?.deleteAll()
				break
			case "save":
				console.log(editor?.canvas.toSVG())
				break
			case "svg":
				fabric.loadSVGFromString(svgStr, (objects, options) => {
					const svg = fabric.util.groupSVGElements(objects, options);
					editor?.canvas.centerObject(svg).add(svg)
				})
				break
			case "image":
				fabric.Image.fromURL(image, img => {
					editor?.canvas.centerObject(img).add(img);
				});
				break
		}
	}

	return (
		<div className='main-container'>
			<aside className="sidebar">
				<div className="buttons-wrapper">
					{CanvasButtons.map((item: TCanvasButton) => <CanvasButton Icon={item.icon} actionType={item.actionType} onClick={onClick} key={item.actionType} />)}
				</div>
				<SketchPicker
					color={background}
					onChangeComplete={handleChangeComplete} />
			</aside>
			<FabricJSCanvas className="sample-canvas" onReady={onReady} />
		</div>
	)

}

export default App;
