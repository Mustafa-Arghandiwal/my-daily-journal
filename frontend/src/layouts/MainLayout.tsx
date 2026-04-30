import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState, type PropsWithChildren } from "react";
import { LogIn, Notebook, UserRound } from "lucide-react";
import { Flame, Sun, Moon, Github, Twitter, Mail } from "lucide-react";
import { AuthContext, AuthModalContext, ThemeContext } from "../App";
export default function MainLayout({ children }: PropsWithChildren) {

    const { setIsAuthModalOpen } = useContext(AuthModalContext)!
    const { isDark, setIsDark } = useContext(ThemeContext)!
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
        window.location.reload()
    }

    //display streak
    const today = new Date().toLocaleDateString('en-CA')
    const yesterdayDate = new Date()
    yesterdayDate.setDate(yesterdayDate.getDate() - 1)
    const yesterday = yesterdayDate.toLocaleDateString('en-CA')
    const displayStreak = user ? user.last_entry_date === today || user.last_entry_date === yesterday ? user.streak : 0 : 0

    return (
        <div className="min-h-screen flex flex-col  ">
            <header className="flex justify-between items-center px-2 sm:px-6 py-3 border-b-3">
                <Link to="/" className="flex gap-3 items-center">
                    <div className=" border p-1 rounded-md shadow-[3px_3px_0px_black]">
                        <Notebook size={18} />
                    </div>

                    <p className="font-bold hidden xs:block">My Journal</p>
                </Link>
                {user &&
                    <div className="relative group border-2 text-nowrap cursor-default shadow-[3px_3px_0px_black] font-bold  rounded-full flex gap-1 items-center px-2 py-0.5">
                        <Flame size={20}
                            className={`${displayStreak > 0 ? "text-orange-500 dark:text-orange-400" : " text-stone-700 dark:text-stone-300 opacity-40"}`} />
                        <p className="min-w-[5ch] text-center">
                            {displayStreak === 1 ? `${displayStreak} Day` : `${displayStreak} Days`}
                        </p>

                        <p className="absolute flex gap-1 justify-center items-center font-bold bg-stone-100 text-slate-800 dark:bg-stone-900 dark:text-stone-200 text-sm whitespace-nowrap
                                        py-1 px-2 -bottom-10 right-1/2 translate-x-1/2 rounded-full border-2 shadow-[3px_3px_0px_black]
                            invisible group group-hover:visible opacity-0 group-hover:opacity-100 duration-150">
                            <Flame size={20}
                                className={`${displayStreak > 0 ? "text-orange-500 dark:text-orange-400" : " text-stone-700 dark:text-stone-300 opacity-40"}`} />
                            Longest streak: {user?.longest_streak}</p>
                    </div>
                }

                <div className="flex items-center gap-2 sm:gap-4">
                    <button onClick={() => setIsDark((prev: boolean) => !prev)} className="border-2 rounded-full w-8 h-8 grid place-items-center cursor-pointer">
                        {isDark ?
                            <Sun size={18} />
                            :
                            <Moon size={18} />
                        }
                    </button>
                    {user ?
                        <div className="relative">
                            <button ref={profileBtnRef} onClick={() => setIsProfileMenuOpen(prev => !prev)} className="cursor-pointer grid place-items-center border-2 w-8 h-8 rounded-full">
                                <UserRound size={18} />
                            </button>

                            <ul ref={menuRef} className={`border-2 font-bold absolute ${isProfileMenuOpen ? "visible opacity-100 z-50" : "invisible opacity-0"} duration-100 whitespace-nowrap rounded-sm
                                            top-full mt-1  right-0`}>
                                <li className="">
                                    <button onClick={() => logout()} className="cursor-pointer px-1.5 py-0.5 bg-stone-100 text-slate-800 dark:bg-stone-900 dark:text-stone-200 rounded-sm">Log out</button>
                                </li>
                            </ul>
                        </div>
                        :
                        <button onClick={() => setIsAuthModalOpen(true)} className="relative group cursor-pointer grid place-items-center border-2 w-8 h-8 rounded-full">
                            <LogIn size={18} />
                            <p className="absolute font-bold dark:bg-stone-100 dark:text-slate-800 bg-stone-900 text-stone-200 text-sm whitespace-nowrap py-1 px-2 -bottom-9 -right-6 rounded-sm
                            invisible group group-hover:visible opacity-0 group-hover:opacity-100 duration-150">Log in / Sign up</p>
                        </button>
                    }
                </div>
            </header>

            <main className="relative flex-1">

                {children}
            </main>
            <footer className="border-t-[0.5px] grid place-items-center py-2 rounded-t-xl">
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
        </div>

    )
}
