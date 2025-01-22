import { useState } from 'react'

function Header() {
	const [date, setDate] = useState(new Date())
	setInterval(() => setDate(new Date()), 1000)
	return (
		<header className='header'>
			<h2 className='header-title'>To-Do App</h2>
			<p className='header-time'>Время сейчас: {date.toLocaleTimeString()}</p>
		</header>
	)
}

export default Header
