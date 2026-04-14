import { Link } from "react-router-dom";
import { useContext, useState, type PropsWithChildren } from "react";
import { LogIn, Notebook, UserRound } from "lucide-react";
import { Flame, Sun, Moon, Github, Twitter, Mail } from "lucide-react";
import SignUpModal from "../components/SignUpModal";
import { AuthContext } from "../App";
export default function MainLayout({ children }: PropsWithChildren) {

    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

    const { user } = useContext(AuthContext)!
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
                    <button className="border-2 rounded-full w-8 h-8 grid place-items-center cursor-pointer">
                        <Moon size={18} />
                    </button>
                    {user ?
                        <div className="relative">
                            <button onClick={() => setIsProfileMenuOpen(prev => !prev)} className="cursor-pointer grid place-items-center border-2 w-8 h-8 rounded-full">
                                <UserRound size={18} />

                            </button>
                            <ul className={`border  absolute invisible opacity-0 ${isProfileMenuOpen ? "visible opacity-100 z-50" : ""} duration-100 whitespace-nowrap rounded-sm -bottom-10 bg-white right-0`}>
                                <li className="">
                                    <button className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded-sm">Log out</button>
                                </li>
                            </ul>
                        </div>
                        :
                        <button onClick={() => setIsSignUpModalOpen(true)} className="relative group cursor-pointer grid place-items-center border-2 w-8 h-8 rounded-full">
                            <LogIn size={18} />
                            <p className="absolute text-sm bg-black text-white whitespace-nowrap py-1 px-2 -bottom-9 -right-6 shadowmd rounded-sm
                            invisible group group-hover:visible opacity-0 group-hover:opacity-100    duration-150">Log in / Sign up</p>
                        </button>
                    }
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
