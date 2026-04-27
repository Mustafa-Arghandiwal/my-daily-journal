import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { createContext, useEffect, useState } from "react"
import AuthModal from "./components/AuthModal"

type User = {
    name: string
}
type AuthContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
type AuthModalContextType = {
    isAuthModalOpen: boolean,
    setIsAuthModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextType | null>(null)
const AuthModalContext = createContext<AuthModalContextType | null>(null)
function App() {

    const [user, setUser] = useState<User | null>(null)
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

    useEffect(() => {
        fetch('http://localhost:3000/api/me', {
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

    }, [])


    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <AuthModalContext.Provider value={{ isAuthModalOpen, setIsAuthModalOpen }}>
                <AuthModal />
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </AuthModalContext.Provider>
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthModalContext }
export default App
