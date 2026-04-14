import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { createContext, useEffect, useState } from "react"

type User = {
    name: string
}
type AuthContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null)
function App() {

    const [user, setUser] = useState<User | null>(null)
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
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export { AuthContext }
export default App
