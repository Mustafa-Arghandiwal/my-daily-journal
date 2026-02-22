import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";


export default function Home() {


	return (
		<MainLayout>
			<div className="absolute inset-0 -z-10 h-full w-full bg-[#f6f4f1] bg-[radial-gradient(#cbcfd5_1px,transparent_1px)] bg-size-[16px_16px]"></div>

			<Link to='/'>Home</Link> <br />
			<Link to='/signup'>Sign Up</Link>

			<p className="font-comic-neue  text-2xl">This is the story about a man called ganjman</p>
			<p className="font-patrick-hand font-bold text-2xl">This is the story about a man called ganjman</p>
			{/* <form onSubmit={(e) => { */}
			{/* 	e.preventDefault() */}
			{/* 	fetch('http://localhost:3000/auth/register', { */}
			{/* 		method: 'POST', */}
			{/* 		headers: { */}
			{/* 			"Content-Type": "application/json" */}
			{/* 		}, */}
			{/* 		body: JSON.stringify(info) */}
			{/* 	}).then(response => response.json()) */}
			{/* 		.then(data => { setData(data.message) }) */}
			{/**/}
			{/* }} */}
			{/* 	className="flex flex-col gap-8 mt-10 max-w-100 p-8"> */}
			{/* 	<input className="border rounded-sm p-1" type="text" name="email" placeholder="Email" onChange={(e) => setInfo({ ...info, email: e.target.value })} value={info.email} /> */}
			{/* 	<input className="border rounded-sm p-1" type="password" name="password" placeholder="Password" onChange={(e) => setInfo({ ...info, password: e.target.value })} value={info.password} /> */}
			{/* 	<button className="border rounded-sm p-1" type="submit">Sign in</button> */}
			{/* </form> */}
			{/* <div className="temp">{data}</div> */}
		</MainLayout>
	)
}
