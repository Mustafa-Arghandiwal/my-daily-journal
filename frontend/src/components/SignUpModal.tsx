import { X } from "lucide-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";


type Props = {
	isSignUpModalOpen: boolean,
	setIsSignUpModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
type ErrorType = {
	name?: string,
	email?: string,
	password?: string,
	confirmPassword?: string
}
type LoginErrorType = {
	email?: string,
	password?: string
}
type SubmitButtonProps = {
	text?: string
}

function SubmitButton({ text = "Submit" }: SubmitButtonProps) {
	const { pending } = useFormStatus()
	return <button disabled={pending} className="font-bold w-full  mt-5 cursor-pointer py-1 rounded-md text-white bg-black disabled:bg-gray-300 ">
		{pending ? "..." : text}
	</button>
}

export default function SignUpModal({ isSignUpModalOpen, setIsSignUpModalOpen }: Props) {

	if (!isSignUpModalOpen) return null
	const [isSignUp, setIsSignUp] = useState(false)

	const [msg, setMsg] = useState('')
	const [errors, setErrors] = useState<ErrorType>({})
	const [loginErrors, setLoginErrors] = useState<LoginErrorType>({})

	const signUp = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		const form = e.currentTarget

		const formData = new FormData(form)
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
				if (result.errors) {
					setErrors(result.errors)
				} else {
					setMsg(result.message)
				}
			} else {
				setMsg(result.message)
				form.reset()
				setErrors({})
			}
		} catch (err) {
			console.log(err)
		}

	}






	const login = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		const form = e.currentTarget

		const formData = new FormData(form)
		const signUpData = Object.fromEntries(formData)
		try {
			const res = await fetch('http://localhost:3000/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(signUpData)
			})

			const result = await res.json()
			if (!res.ok) {
				if (result.errors) {
					setLoginErrors(result.errors)
				} else {
					setMsg(result.message)
				}
			} else {
				form.reset()
				// setMsg(result.message)
				setLoginErrors({})
			}
		} catch (err) {
			console.log(err)
		}

	}
	return (
		isSignUp ?
			<form onSubmit={signUp} className=" bg-white p-8 absolute top-36 left-1/2 -translate-x-1/2 border-2 rounded-md flex flex-col gap-2 w-72 sm:w-96">

				<button className="absolute cursor-pointer right-2 top-2" onClick={() => setIsSignUpModalOpen(false)}>
					<X />
				</button>



				<div className="flex gap-4 items-baseline justify-center">
					<button type="button" onClick={() => setIsSignUp(false)} className="font-bold cursor-pointer">Log in</button>
					<h3 className="font-bold text-3xl ">Sign up</h3>
				</div>

				<label className="block ">
					Name
					<input type="text" name="name" className="block px-1 border rounded-md  w-full " />
					<p className="text-sm text-red-600 ">{errors.name}</p>
				</label>
				<label className="block  ">
					Email
					<input type="text" name="email" className="block px-1 border rounded-md w-full " />
					<p className="text-sm text-red-600 ">{errors.email}</p>
				</label>
				<label className="block  ">
					Password
					<input type="password" name="password" className="block px-1 border rounded-md w-full" />
					<p className="text-sm text-red-600 ">{errors.password}</p>
				</label>
				<label className="block  ">
					Confirm Password
					<input type="password" name="confirmPassword" className="block px-1 border rounded-md w-full " />
					<p className="text-sm text-red-600 ">{errors.confirmPassword}</p>
				</label>

				{/* <button className="font-bold w-full  mt-5 cursor-pointer py-1 rounded-md text-white bg-black">Sign Up</button> */}
				<SubmitButton text="Sign up" />
				<p className="text-center text-green-500">{msg}</p>

			</form>
			:
			<form onSubmit={login} className=" bg-white p-8 absolute top-36 left-1/2 -translate-x-1/2 border-2 rounded-md flex flex-col gap-2 w-72 sm:w-96">

				<button className="absolute cursor-pointer right-2 top-2" onClick={() => setIsSignUpModalOpen(false)}>
					<X />
				</button>


				<div className="flex gap-4 items-baseline justify-center">
					<h3 className="font-bold text-3xl ">Log in</h3>
					<button type="button" onClick={() => setIsSignUp(true)} className="font-bold cursor-pointer">Sign up</button>
				</div>

				<label className="block  ">
					Email
					<input type="text" name="email" className="block px-1 border rounded-md w-full " />
					<p className="text-sm text-red-600 ">{loginErrors.email}</p>
				</label>
				<label className="block  ">
					Password
					<input type="password" name="password" className="block px-1 border rounded-md w-full" />
					<p className="text-sm text-red-600 ">{loginErrors.password}</p>
				</label>

				<SubmitButton text="Log in" />
				<p className="text-center text-green-500">{msg}</p>

			</form>
	)
}
