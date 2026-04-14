import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState, type PropsWithChildren } from "react";
import { LogIn, Notebook, UserRound } from "lucide-react";
import { Flame, Sun, Moon, Github, Twitter, Mail } from "lucide-react";
import SignUpModal from "../components/SignUpModal";
import { AuthContext } from "../App";
export default function MainLayout({ children }: PropsWithChildren) {

    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
    const { user, setUser } = useContext(AuthContext)!
    const menuRef = useRef<HTMLUListElement | null>(null)
    const profileBtnRef = useRef<HTMLButtonElement | null>(null)

    const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node
        if (profileBtnRef.current && menuRef.current &&
            !profileBtnRef.current.contains(target) &&
            !menuRef.current.contains(target)
        ) {

            setIsProfileMenuOpen(false)
        }
    }
    useEffect(() => {
        if (!isProfileMenuOpen) return
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isProfileMenuOpen])



    const logout = async () => {
        await fetch('http://localhost:3000/auth/logout', {
            method: "POST",
            credentials: "include"
        })
        setUser(null)
        // window.location.reload()
    }

    return (
        <>
            <header className="flex justify-between items-center px-6 py-3 border-b-3">
                <Link to="/" className="flex gap-3 items-center">
                    <div className="bg-white border p-1 rounded-md shadow-[3px_3px_0px_black]">
                        <Notebook size={18} />
                    </div>

                    <p className="font-bold">My Journal</p>
                </Link>
                {user &&
                    <div className="bg-white border-2 shadow-[3px_3px_0px_black] font-bold  rounded-full flex gap-1 items-center px-2 py-0.5">
                        <Flame size={20} className="text-orange-500" />
                        0 Days
                    </div>
                }

                <div className="flex items-center gap-4">
                    <button className="border-2 rounded-full w-8 h-8 grid place-items-center cursor-pointer">
                        <Moon size={18} />
                    </button>
                    {user ?
                        <div className="relative">
                            <button ref={profileBtnRef} onClick={() => setIsProfileMenuOpen(prev => !prev)} className="cursor-pointer grid place-items-center border-2 w-8 h-8 rounded-full">
                                <UserRound size={18} />
                            </button>

                            <ul ref={menuRef} className={`border-2 font-bold absolute ${isProfileMenuOpen ? "visible opacity-100 z-50" : "invisible opacity-0"} duration-100 whitespace-nowrap rounded-sm
                                            top-full mt-1 bg-white right-0`}>
                                <li className="">
                                    <button onClick={() => logout()} className="cursor-pointer px-1.5 py-0.5 hover:bg-gray-100 rounded-sm">Log out</button>
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
