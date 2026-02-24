import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { Pencil } from "lucide-react";
import Entry from "../components/Entry";
import EntryModal from "../components/EntryModal";
import { useState } from "react";


export default function Home() {

	const currentHour = new Date().getHours()
	const greetingMsg =
		currentHour < 12
			? "Buenos días"
			: currentHour < 18
				? "Buenas tardes"
				: "Buenas noches"



	return (
		<MainLayout>
			<div className="absolute inset-0 -z-10 h-full w-full bg-[#f6f4f1] bg-[radial-gradient(#cbcfd5_1px,transparent_1px)] bg-size-[16px_16px]"></div>

			{/* <Link to='/'>Home</Link> <br /> */}
			{/* <Link to='/signup'>Sign Up</Link> */}
			{/**/}
			{/* <p className="font-comic-neue  text-2xl">This is the story about a man called ganjman</p> */}
			{/* <p className="font-patrick-hand font-bold text-2xl">This is the story about a man called ganjman</p> */}

			<section className="max-w-200 px-2  mx-auto py-8">
				<h2 className="text-5xl text-center">{greetingMsg}</h2>
				<div className="flex  justify-between items-center">
					<p className="font-bold text-xl">Let's write something</p>
					<button className="border flex gap-2 p-2 rounded-md text-white bg-black">
						<Pencil />
						New Entry
					</button>

				</div>
				<div className="mt-12 flex flex-col gap-5">
					<Entry />
					<Entry />
					<Entry />
					<Entry />
				</div>



				<EntryModal />

			</section>



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
