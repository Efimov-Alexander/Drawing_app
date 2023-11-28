import { useActions, useAppSelector } from "../hooks/hooks"
import { icons } from '../aseets/icons'

const BorderDropdownList = [1, 2, 3, 4, 5]

export const BorderDropdownButton = () => {

	const { borderDropdown } = useAppSelector(state => state.app)
	const { setBorderDropdownIsOpen, setBorderDropdownValue } = useActions()

	return (
		<button onClick={() => setBorderDropdownIsOpen(!borderDropdown.isOpen)} className="border-dropdown-button canvas-button">{<icons.borderWidth />}
			{borderDropdown.isOpen && <ul className="border-dropdown-list">
				{BorderDropdownList.map(item => <li key={item} className={`${borderDropdown.value === item ? "active" : ""}`} onClick={(e) => {
					e.stopPropagation()
					setBorderDropdownIsOpen(false)
					setBorderDropdownValue(item)
				}}></li>)}
			</ul>}
		</button>
	)
}