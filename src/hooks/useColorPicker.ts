import { useState } from "react";
import { useActions, useAppSelector } from "./hooks";

export const useColorPicker = () => {
	const { colorPicker } = useAppSelector(state => state.app)
	const { setColorPickerValue, setColorPickerIsOpen } = useActions()

	const handleClick = () => {
		setColorPickerIsOpen(!colorPicker.isOpen)
	};

	const handleClose = () => {
		setColorPickerIsOpen(false)
	};

	const handleChange = (color: any) => {
		setColorPickerValue(`rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`)
	};

	return { color: colorPicker.value, isOpen: colorPicker.isOpen, handleClick, handleChange, handleClose }
}