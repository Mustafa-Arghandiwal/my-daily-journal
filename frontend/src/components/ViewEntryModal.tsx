import Portal from "./Portal";
import type { EntryType } from "../types/entry";
import { X } from "lucide-react";
import formatDate from "../utils/formatDate";

type Props = {
    entry: EntryType
    isViewModalOpen: boolean,
    setIsViewModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ViewEntryModal({ entry, isViewModalOpen, setIsViewModalOpen }: Props) {

    if (!isViewModalOpen) return null

    return (
        <Portal>
            <div className="relative w-[80vw] max-w-2xl min-h-72 max-h-96 overflow-y-auto scrollbar-thin bg-white border-2 p-6 rounded-md flex flex-col gap-4 ">

                <button type="button" className="absolute cursor-pointer right-2 top-2"
                    onClick={() => setIsViewModalOpen(false)}
                >
                    <X />
                </button>
                <p className="text-xl font-bold">{entry.title}</p>
                <p className="font-semibold">{entry.feeling}</p>
                <p className="text-sm underline">{formatDate(entry.created_at)}</p>
                <p>{entry.content}</p>

            </div>

        </Portal>
    )
}
