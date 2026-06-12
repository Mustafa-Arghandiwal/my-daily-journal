import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { createContext, useEffect, useState } from "react"
import AuthModal from "./components/AuthModal"

type User = {
    name: string,
    email: string,
    streak: number,
    last_entry_date: string | null,
    longest_streak: number

}
type AuthContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    getUser: () => Promise<void>
}
type AuthModalContextType = {
    isAuthModalOpen: boolean,
    setIsAuthModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
type ThemeContextType = {
    isDark: boolean,
    setIsDark: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextType | null>(null)
const AuthModalContext = createContext<AuthModalContextType | null>(null)
const ThemeContext = createContext<ThemeContextType | null>(null)
function App() {

    const [user, setUser] = useState<User | null>(null)
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
    const [isDark, setIsDark] = useState(() => {
        const storedTheme = localStorage.getItem('theme')
        if (storedTheme !== null) {
            return storedTheme === 'dark'
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    })

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }

    }, [isDark])


    const getUser = async () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => {
                if (res.status === 401) {
                    setUser(null)
                    return null
                }
                return res.json()
            })
            .then(data => {
                if (data) setUser(data.user)
            })
    }

    useEffect(() => {
        getUser()

    }, [])


    return (
        <ThemeContext.Provider value={{ isDark, setIsDark }}>
            <AuthContext.Provider value={{ user, setUser, getUser }}>
                <AuthModalContext.Provider value={{ isAuthModalOpen, setIsAuthModalOpen }}>
                    <div className="min-h-screen bg-stone-100 text-slate-800 dark:bg-stone-900 dark:text-slate-200">
                        <AuthModal />
                        <BrowserRouter>
                            <Routes>
                                <Route path='/' element={<Home />} />
                            </Routes>
                        </BrowserRouter>
                    </div>
                </AuthModalContext.Provider>
            </AuthContext.Provider>
        </ThemeContext.Provider>
    )
}

export { AuthContext, AuthModalContext, ThemeContext }
export default App
