import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type TInitialState = {
	colorPicker: {
		isOpen: boolean,
		value: string,
	},
	borderDropdown: {
		isOpen: boolean,
		value: number,
	},
	canvasState: any[],
	currentPage: number,
}

export const initialState: TInitialState = {
	colorPicker: {
		isOpen: false,
		value: "rgba(39,204,100,100)",
	},
	borderDropdown: {
		isOpen: false,
		value: 1,
	},
	canvasState: [{}],
	currentPage: 0,
}

const appSlice = createSlice({
	name: 'appSlice',
	initialState,
	reducers: {
		setColorPickerValue(state, action: PayloadAction<string>) {
			state.colorPicker.value = action.payload
		},
		setColorPickerIsOpen(state, action: PayloadAction<boolean>) {
			state.colorPicker.isOpen = action.payload
		},
		setBorderDropdownValue(state, action: PayloadAction<number>) {
			state.borderDropdown.value = action.payload
		},
		setBorderDropdownIsOpen(state, action: PayloadAction<boolean>) {
			state.borderDropdown.isOpen = action.payload
		},
		setCanvasState(state, action: PayloadAction<any>) {
			state.canvasState = action.payload
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
	},
});

export const { actions, reducer } = appSlice;