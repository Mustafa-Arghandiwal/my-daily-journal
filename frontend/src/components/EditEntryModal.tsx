
import { X } from "lucide-react"
import { useState } from "react"
import Portal from "./Portal"
import type { EntryType } from "../types/entry"

type Props = {
    entry: EntryType
    isEditModalOpen: boolean,
    setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    refreshEntries: () => Promise<void>
}

export default function EditEntryModal({ entry, isEditModalOpen, setIsEditModalOpen, refreshEntries }: Props) {
    if (!isEditModalOpen) return null

    const [errors, setErrors] = useState<Record<string, string>>({})

    const editEntry = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formElement = e.currentTarget
        const formData = new FormData(formElement)
        const entryData = Object.fromEntries(formData)

        try {
            const result = await fetch(`http://localhost:3000/entries/${entry.id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(entryData)
            })
            const data = await result.json()

            if (result.status === 422) {
                setErrors(data.errors.fieldErrors)
                return
            }
            if (!result.ok) {
                console.log(data.message || 'Edit failed')
                return
            }

            setErrors({})
            await refreshEntries()
            setIsEditModalOpen(false)
        } catch (err) {
            console.log('Network error')
        }

    }



    return (
        <Portal setModalState={setIsEditModalOpen}>
            <form key={entry.id} onSubmit={editEntry} className="relative w-[80vw] max-w-2xl min-h-72  bg-white border-2 p-6 rounded-md flex flex-col gap-4 ">

                <button type="button" className="absolute cursor-pointer right-2 top-2"
                    onClick={() => setIsEditModalOpen(false)}
                >
                    <X />
                </button>

                <input type="text" name="title" placeholder="Title" defaultValue={entry.title}
                    className="mx-auto border-[0.5px] rounded-md text-4xl p-1 text-center " />
                <p className="text-sm text-red-600 ">{errors.title}</p>

                <div className="text-center">
                    <p className="text-2xl mt-2">Feeling</p>
                    <input type="text" name="feeling" defaultValue={entry.feeling}
                        className="p-1 mx-auto text-2xl border-[0.5px] rounded-md text-center  " />
                    <p className="text-sm text-red-600 ">{errors.feeling}</p>
                </div>

                <textarea
                    name="content"
                    placeholder="Start writing here..."
                    defaultValue={entry.content}
                    onInput={(e) => {
                        const target = e.currentTarget
                        target.style.height = "auto"
                        target.style.height = target.scrollHeight + "px"
                    }}
                    className="p-2 border rounded-md w-full min-h-52  resize-none overflow-hidden"
                />
                <p className="text-sm text-red-600">{errors.content}</p>

                <button className="rounded-md p-2 text-white bg-black w-fit ml-auto cursor-pointer">Save Changes</button>

            </form>
        </Portal>

    )
}
