import { Link } from "react-router-dom";
import { useState, type PropsWithChildren } from "react";
import { Notebook } from "lucide-react";
import { Flame, Sun, Moon, Github, Twitter, Mail } from "lucide-react";
import SignUpModal from "../components/SignUpModal";
export default function MainLayout({ children }: PropsWithChildren) {

	const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)

	return (
		<>

			<header className="flex justify-between items-center px-6 py-3 border-b-3">
				<Link to="/" className="flex gap-3 items-center">
					<div className="bg-white border p-1 rounded-md shadow-[3px_3px_0px_black]">
						<Notebook size={18} />

					</div>

					<p className="font-bold">My Journal</p>
				</Link>
				<div className="bg-white border-2 shadow-[3px_3px_0px_black] font-bold  rounded-full flex gap-1 items-center px-2 py-0.5">
					<Flame size={20} className="text-orange-500" />
					0 Days
				</div>
				<div className="flex items-center gap-4">
					<div className="border-2 rounded-full w-8 h-8 grid place-items-center ">
						<Moon size={18} />
					</div>
					<button onClick={() => setIsSignUpModalOpen(true)} className="font-bold cursor-pointer border-2 px-2 py-0.5 rounded-full">Sign Up</button>
				</div>
			</header>

			<main className=" relative">

				<SignUpModal isSignUpModalOpen={isSignUpModalOpen} setIsSignUpModalOpen={setIsSignUpModalOpen} />
				{children}
			</main>
			<footer className="border grid place-items-center bg-white py-4">
				<div className="flex gap-3">

					<a href="https://github.com/Mustafa-Arghandiwal" target="_blank">
						<Github size={18} />
					</a>
					<a href="https://x.com/_its_mustafa" target="_blank">
						<Twitter size={18} />
					</a>
					<a href="mailto:hi@arghandiwal.dev">
						<Mail size={18} />
					</a>
				</div>
				<p className="tracking-widest text-xs mt-2">&copy; {new Date().getFullYear()} My Journal</p>

			</footer>
		</>

	)
}
