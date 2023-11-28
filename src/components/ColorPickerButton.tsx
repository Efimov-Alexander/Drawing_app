import { SketchPicker } from 'react-color';
import { useColorPicker } from '../hooks/useColorPicker';

export const ColorPickerButton = () => {

	const { color, isOpen, handleChange, handleClick, handleClose } = useColorPicker()

	return (
		<div className="color-button-wrapper">
			<button className='canvas-button color-button' style={{ background: color }} onClick={handleClick}>
			</button>
			{isOpen && <div className='color-picker'>
				<div className='color-overlay' onClick={handleClose} />
				<SketchPicker
					color={color}
					onChangeComplete={handleChange}
				/>
			</div>}
		</div>
	)
}