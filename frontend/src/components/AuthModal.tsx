import { useState } from "react"
import { X } from "lucide-react";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";
type Props = {
    isAuthModalOpen: boolean,
    setIsAuthModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}



export default function AuthModal({ isAuthModalOpen, setIsAuthModalOpen }: Props) {


    const [isSignUp, setIsSignUp] = useState(false)

    if (!isAuthModalOpen) return null

    return (
        <div className=" bg-white p-8 absolute top-36 left-1/2 -translate-x-1/2 border-2 rounded-md flex flex-col gap-2 w-72 sm:w-96 ">

            <button type="button" className="absolute cursor-pointer right-2 top-2" onClick={() => setIsAuthModalOpen(false)}>
                <X />
            </button>

            <div className={isSignUp ? "" : "hidden"}>
                <div className="flex gap-4 items-baseline justify-center">
                    <button type="button" onClick={() => {
                        setIsSignUp(false)
                    }}
                        className="font-bold cursor-pointer">Log in</button>
                    <h3 className="font-bold text-3xl cursor-pointer">Sign up</h3>
                </div>
                <SignUpModal />
            </div>
            <div className={isSignUp ? "hidden" : ""}>
                <div className="flex gap-4 items-baseline justify-center">
                    <p className="font-bold text-3xl cursor-pointer">Log in</p>
                    <button type="button" onClick={() => {
                        setIsSignUp(true)
                    }}
                        className="font-bold cursor-pointer">Sign up</button>
                </div>
                <LoginModal />
            </div>
        </div>

    )
}
