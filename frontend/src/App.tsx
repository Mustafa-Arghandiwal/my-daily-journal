import { useState } from "react"

function App() {

	const [data, setData] = useState("")
	function clickHandler() {
		fetch('http://localhost:3000/msg')
			.then(response => {
				if (!response.ok) {
					throw new Error(`Server error: ${response.status} ${response.statusText}`)
				}
				return response.json()
			})
			.then(data => {
				console.log(data)
				setData(data.msg)
			}
			)
			.catch(err => console.log(err))
	}

	return (
		<>
			<button className="temp" onClick={clickHandler}>
				Click me
			</button>
			<hr />
			<div className="temp">{data}</div>
		</>
	)
}

export default App
