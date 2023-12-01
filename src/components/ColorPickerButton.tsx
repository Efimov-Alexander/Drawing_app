import { SketchPicker } from 'react-color';
import { useColorPicker } from '../hooks/useColorPicker';

export const ColorPickerButton = () => {

	const { color, isOpen, handleChange, handleClick, handleClose } = useColorPicker()

	return (
		<div className="sidebar__color-button-wrapper">
			<button className='sidebar__button' style={{ background: color }} onClick={handleClick}>
			</button>
			{isOpen && <div className='sidebar__color-picker'>
				<div className='sidebar__color-overlay' onClick={handleClose} />
				<SketchPicker
					color={color}
					onChangeComplete={handleChange}
				/>
			</div>}
		</div>
	)
}