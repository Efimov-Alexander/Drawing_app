import { useActions, useAppSelector } from "../hooks/hooks"
import { icons } from '../aseets/icons'

const BorderDropdownList = [1, 2, 3, 4, 5]

export const BorderWidthButton = () => {

	const { borderDropdown } = useAppSelector(state => state.app)
	const { setBorderDropdownIsOpen, setBorderDropdownValue } = useActions()

	return (
		<button onClick={() => setBorderDropdownIsOpen(!borderDropdown.isOpen)} className="sidebar__border-width-button sidebar__button">{<icons.borderWidth />}
			{borderDropdown.isOpen && <div onClick={() => setBorderDropdownIsOpen(false)} className="sidebar__border-width-button-overlay" />}
			{borderDropdown.isOpen && <ul className="sidebar__border-width-list">
				{BorderDropdownList.map(item => <li key={item} className={`${borderDropdown.value === item ? "active" : ""}`} onClick={(e) => {
					e.stopPropagation()
					setBorderDropdownIsOpen(false)
					setBorderDropdownValue(item)
				}}><span /></li>)}
			</ul>}
		</button>
	)
}