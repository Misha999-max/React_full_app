import './Button.css'

export default function Button({ name, text, onClick, disabled }) {
	return (
		<button
			disabled={disabled}
			className={name !== undefined ? name : 'btn'}
			onClick={onClick}
		>
			{text}
		</button>
	)
}
