import type { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children }: PropsWithChildren) {

    return createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="      ">
                {children}
            </div>


        </div>,
        document.body
    )
}
