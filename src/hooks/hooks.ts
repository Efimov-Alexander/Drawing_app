import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import { actions as canvasActions } from "../store/appSlice"
import { useMemo } from "react"
import { bindActionCreators } from "@reduxjs/toolkit"

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const rootActions = {
	...canvasActions,
}

export const useActions = () => {
	const dispatch = useDispatch()
	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}