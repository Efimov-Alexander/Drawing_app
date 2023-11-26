import s from './CanvasButton.module.scss'

type TCanvasButtonProps = {
	Icon: any,
	onClick: (actionType: string) => void,
	actionType: string,
}


export const CanvasButton = ({ Icon, onClick, actionType }: TCanvasButtonProps) => {


	return (
		<button className={s.button} onClick={() => {
			onClick(actionType)
		}
		}>{<Icon size="30px" />}</button>
	)
}