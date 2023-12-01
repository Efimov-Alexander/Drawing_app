
import './aseets/style/App.scss';
import './aseets/style/null.css';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { icons } from './aseets/icons'
import { ColorPickerButton } from './components/ColorPickerButton';
import { BorderWidthButton } from './components/BorderWidthButton';
import { useApp } from './hooks/useApp';


type TCanvasButton = {
	icon: any,
	actionType: string,
}

const CanvasButtons: TCanvasButton[] = [{ actionType: "line", icon: icons.line, }, { actionType: "circle", icon: icons.circle, }, { actionType: "rect", icon: icons.rect, }, { actionType: "trianlge", icon: icons.triangle, }, { actionType: "text", icon: icons.text, }, { actionType: "deleteSelected", icon: icons.eraser, }, { actionType: "zoomIn", icon: icons.zoomIn, }, { actionType: "zoomOut", icon: icons.zoomOut, }, { actionType: "deleteAll", icon: icons.trashcan, }, { actionType: "save", icon: icons.save, }]


export const App = () => {
	const { editor, onReady } = useFabricJSEditor()
	const { actionHandler, currentPage, lastPage, modalSaveContent, setModalSaveIsOpen, modalSaveIsOpen } = useApp(editor)

	return (
		<div className='main__container'>
			<aside className="sidebar">
				<div className="sidebar__wrapper">
					<button
						className={`sidebar__button  ${currentPage == 0 ? "disable" : ""} `}
						onClick={() => actionHandler("undo")}>{<icons.undo />}</button>
					<button
						className={`sidebar__button  ${(currentPage == lastPage) ? "disable" : ""} `}
						onClick={() => actionHandler("redo")}>{<icons.redo />}</button>
					{CanvasButtons.map((item: TCanvasButton) =>
						<button
							className="sidebar__button"
							onClick={() => actionHandler(item.actionType)}
							key={item.actionType}>{<item.icon />}</button>
					)}
					<label className=" sidebar__button">
						<input
							className='sidebar__image-button'
							onChange={(e) => actionHandler("image", e)}
							accept='image/png, image/jpeg'
							type="file" />{<icons.image />}
					</label>
					<label className="sidebar__button">
						<input
							className='sidebar__svg-button'
							onChange={(e) => actionHandler("svg", e)}
							accept='.svg'
							type="file" />{<icons.svg />}
					</label>
					<ColorPickerButton />
					<BorderWidthButton />
				</div>
			</aside>
			<FabricJSCanvas className="canvas" onReady={onReady} />
			{modalSaveIsOpen && <div className="modal-save__overlay" onClick={() => setModalSaveIsOpen(false)}><div onClick={(e) => e.stopPropagation()} className="modal-save__content">
				{modalSaveContent}
				<button className="modal-save__close-button" onClick={() => setModalSaveIsOpen(false)}>
					<span></span>
					<span></span>
				</button>
			</div></div>}
		</div>
	)

}