import { X } from "lucide-react";

type Props = {
	isSignUpModalOpen: boolean,
	setIsSignUpModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function SignUpModal({ isSignUpModalOpen, setIsSignUpModalOpen }: Props) {

	if (!isSignUpModalOpen) return null

	return (
		<form className=" bg-white p-8 absolute top-36 left-1/2 -translate-x-1/2 border-2 rounded-md flex flex-col gap-2">

			<button className="absolute cursor-pointer right-2 top-2" onClick={() => setIsSignUpModalOpen(false)}>
				<X />
			</button>
			<h3 className="font-bold text-3xl text-center">Sign Up</h3>

			<label className="block ">
				Name
				<input type="text" className="block px-1 border rounded-md  min-w-64 " />
			</label>
			<label className="block  ">
				Email
				<input type="text" className="block px-1 border rounded-md w-full " />
			</label>
			<label className="block  ">
				Password
				<input type="password" className="block px-1 border rounded-md w-full" />
			</label>
			<label className="block  ">
				Confirm Password
				<input type="password" className="block px-1 border rounded-md w-full " />
			</label>

			<button onClick={(e) => e.preventDefault()} className="font-bold w-full  mt-5 cursor-pointer py-1 rounded-md text-white bg-black">Sign Up</button>

		</form>
	)
}
