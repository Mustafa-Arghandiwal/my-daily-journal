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

	const [info, setInfo] = useState({ email: "", password: "" })


	return (
		<>
			<button className="temp" onClick={clickHandler}>
				Click me
			</button>
			<hr />
			<hr />
			<div className="temp">{data}</div>

			{info.email} {info.password}
			<form onSubmit={(e) => {
				e.preventDefault()
				fetch('http://localhost:3000/register', {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(info)
				}).then(response => response.json())
					.then(data => { setData(data.message) })

			}}
				className="flex flex-col gap-8 mt-10 max-w-100 p-8">
				<input className="border rounded-sm p-1" type="text" name="email" placeholder="Email" onChange={(e) => setInfo({ ...info, email: e.target.value })} value={info.email} />
				<input className="border rounded-sm p-1" type="password" name="password" placeholder="Password" onChange={(e) => setInfo({ ...info, password: e.target.value })} value={info.password} />
				<button className="border rounded-sm p-1" type="submit">Sign in</button>
			</form>
		</>
	)
}

export default App
