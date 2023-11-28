import '../aseets/style/App.scss'

type TCanvasButtonProps = {
	Icon: any,
	onClick: (actionType: string) => void,
	actionType: string,
}

export const CanvasButton = ({ Icon, onClick, actionType }: TCanvasButtonProps) => {

	return (
		<button className="canvas-button" onClick={() => {
			onClick(actionType)
		}
		}>{<Icon />}</button>
	)
}