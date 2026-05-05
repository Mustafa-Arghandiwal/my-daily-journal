import { useEffect } from "react";
import { createPortal } from "react-dom";

type Props = {
    children: React.ReactNode,
    setModalState: React.Dispatch<React.SetStateAction<boolean>>,
    closeOnOutsideClick?: boolean,
}

export default function Portal({ children, setModalState, closeOnOutsideClick = false }: Props) {

    //don't scroll page when modal is open
    // useEffect(() => {
    //     const originalOverflow = document.body.style.overflow
    //
    //     document.body.style.overflow = "hidden"
    //
    //     return () => {
    //         document.body.style.overflow = originalOverflow
    //     }
    // }, [])

    //escape key to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setModalState(false)
            }
        }
        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    return createPortal(
        <div onClick={() => closeOnOutsideClick && setModalState(false)} className="fixed inset-0  backdrop-blur-[2px] bg-black/30 flex items-center justify-center">
            <div onClick={(e) => e.stopPropagation()} className=" bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-md">
                {children}
            </div>
        </div>,
        document.body
    )
}
