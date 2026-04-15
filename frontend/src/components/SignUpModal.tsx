import { useState } from "react";


type ErrorType = {
    name?: string,
    email?: string,
    password?: string,
    confirmPassword?: string
}


export default function SignUpModal() {

    const [msg, setMsg] = useState('')
    const [errors, setErrors] = useState<ErrorType>({})


    const signUp = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget

        const formData = new FormData(form)
        const signUpData = Object.fromEntries(formData)
        try {
            const res = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                credentials: 'include',
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
                    setErrors({})
                    setMsg(result.message)
                }
            } else {
                window.location.reload()

            }
        } catch (err) {
            console.log(err)
        }

    }






    return (

        <form key="signup" onSubmit={signUp} className={``}>

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

            <button type="submit" className="font-bold w-full mt-5 cursor-pointer py-1 rounded-md text-white bg-black">
                Sign Up
            </button>
            <p className="text-center text-red-600">{msg}</p>

        </form>

    )
}
