import { Trash } from "lucide-react"
import type { EntryType } from "../types/entry"

export default function Entry({ entry, refreshEntries }: { entry: EntryType, refreshEntries: () => Promise<void> }) {

    const deleteEntry = async (id: number) => {
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


    }
    return (
        <div className="relative border-2 rounded-md bg-white shadow-[-4px_3px_0px_black] py-2 px-8 cursor-pointer min-h-44">
            <button onClick={() => deleteEntry(entry.id)} type="button" className="cursor-pointer absolute top-2 right-2 hover:scale-125 duration-100 ">
                <Trash size={18} className="text-red-700" />
            </button>

            <p className="font-bold text-xl">{entry.title}</p>
            <p className="font-semibold text-lg">{entry.feeling && `Feeling ${entry.feeling}`}</p>
            <p className="text-sm">{(entry.created_at).slice(0, -3)}</p>
            <p className="mt-4 line-clamp-3">{entry.content}</p>

        </div>
    )
}
