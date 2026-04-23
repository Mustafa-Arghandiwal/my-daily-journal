import { createPortal } from "react-dom";

type Props = {
    children: React.ReactNode,
    setModalState: React.Dispatch<React.SetStateAction<boolean>>,
    closeOnOutsideClick?: boolean,
}

export default function Portal({ children, setModalState, closeOnOutsideClick = false }: Props) {

    return createPortal(
        <div onClick={() => closeOnOutsideClick && setModalState(false)} className="fixed inset-0  backdrop-blur-[2px] bg-black/30 flex items-center justify-center">
            <div onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.body
    )
}
