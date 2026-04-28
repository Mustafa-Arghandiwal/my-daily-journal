import { useState } from "react"

type LoginErrorType = {
    email?: string,
    password?: string
}


export default function LoginModal() {
    const [loginErrors, setLoginErrors] = useState<LoginErrorType>({})
    const [msg, setMsg] = useState('')

    const login = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget

        const formData = new FormData(form)
        const loginData = Object.fromEntries(formData)
        try {
            const res = await fetch('http://localhost:3000/auth/login', {
                credentials: "include",
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })

            const result = await res.json()
            if (!res.ok) {
                if (result.errors) {
                    setLoginErrors(result.errors)
                } else {
                    setMsg(result.message)
                    setLoginErrors({})
                }
            } else {
                window.location.reload()
            }
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <form onSubmit={login}>


            <label className="block  ">
                Email
                <input type="email" name="email" className="block px-1 border rounded-md w-full " />
                <p className="text-sm text-red-600 ">{loginErrors.email}</p>
            </label>
            <label className="block  ">
                Password
                <input type="password" name="password" className="block px-1 border rounded-md w-full" />
                <p className="text-sm text-red-600 ">{loginErrors.password}</p>
            </label>

            <button type="submit" className="font-bold w-full mt-5 cursor-pointer py-1 rounded-md bg-stone-900 text-slate-200 border ">
                Log in
            </button>

            <p className="text-center text-red-600">{msg}</p>

        </form>

    )
}
