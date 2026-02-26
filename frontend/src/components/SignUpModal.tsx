import { X } from "lucide-react";
import { useState } from "react";
// import { useState } from "react";

type Props = {
	isSignUpModalOpen: boolean,
	setIsSignUpModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function SignUpModal({ isSignUpModalOpen, setIsSignUpModalOpen }: Props) {

	if (!isSignUpModalOpen) return null

	const [msg, setMsg] = useState('')

	const signUp = async (formData: FormData) => {
		const signUpData = Object.fromEntries(formData)
		try {
			const res = await fetch('http://localhost:3000/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(signUpData)
			})

			const result = await res.json()
			if (!res.ok) {
				setMsg(result.error)
			} else {
				setMsg(result.message)
			}
		} catch (err) {
			console.log(err)
		}

	}
	return (
		<form action={signUp} className=" bg-white p-8 absolute top-36 left-1/2 -translate-x-1/2 border-2 rounded-md flex flex-col gap-2">

			<button className="absolute cursor-pointer right-2 top-2" onClick={() => setIsSignUpModalOpen(false)}>
				<X />
			</button>


			<h3 className="font-bold text-3xl text-center">Sign Up </h3>

			<label className="block ">
				Name
				<input type="text" name="name" className="block px-1 border rounded-md  min-w-64 " />
			</label>
			<label className="block  ">
				Email
				<input type="text" name="email" className="block px-1 border rounded-md w-full " />
			</label>
			<label className="block  ">
				Password
				<input type="password" name="password" className="block px-1 border rounded-md w-full" />
			</label>
			<label className="block  ">
				Confirm Password
				<input type="password" name="confirmPassword" className="block px-1 border rounded-md w-full " />
			</label>

			<button className="font-bold w-full  mt-5 cursor-pointer py-1 rounded-md text-white bg-black">Sign Up</button>
			<p className="text-center text-green-500">{msg}</p>

		</form>
	)
}
