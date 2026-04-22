import { Edit, Trash } from "lucide-react"
import type { EntryType } from "../types/entry"
import { useState } from "react"
import EditEntryModal from "./EditEntryModal"
import Portal from "./Portal"

export default function Entry({ entry, refreshEntries }: { entry: EntryType, refreshEntries: () => Promise<void> }) {

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const deleteEntry = async (id: number) => {
        try {
            const result = await fetch(`http://localhost:3000/entries/${id}`, {
                method: "DELETE",
                credentials: "include"
            })
            if (!result.ok) {
                const error = await result.json()
                console.log(error.message || "Deletion failed")
            } else {
                await refreshEntries()
            }
        } catch (err) {
            console.log('Network error')
        }
    }


    return (
        <div className="relative border-2 rounded-md bg-white shadow-[-4px_3px_0px_black] py-2 px-8 cursor-pointer min-h-44">

            <div className="flex gap-2 absolute top-2 right-2">
                <button onClick={() => setIsEditModalOpen(true)} type="button" className="cursor-pointer  hover:scale-125 duration-100 ">
                    <Edit size={18} className="text-yellow-700" />
                </button>

                <button onClick={() => deleteEntry(entry.id)} type="button" className="cursor-pointer hover:scale-125 duration-100 ">
                    <Trash size={18} className="text-red-700" />
                </button>
            </div>

            <p className="font-bold text-xl">{entry.title}</p>
            <p className="font-semibold">{entry.feeling && `Feeling ${entry.feeling}`}</p>
            <p className="text-sm underline">{(entry.created_at).slice(0, -3)}</p>
            <p className="mt-4 line-clamp-3">{entry.content}</p>


            <EditEntryModal id={entry.id} title={entry.title} feeling={entry.feeling} content={entry.content} isEditModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen} refreshEntries={refreshEntries} />
        </div>
    )
}
