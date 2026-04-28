import { X } from "lucide-react"
import { useState } from "react"
import confetti from 'canvas-confetti'
import Portal from "./Portal"

type Props = {
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    refreshEntries: () => Promise<void>
}

export default function NewEntryModal({ isModalOpen, setIsModalOpen, refreshEntries }: Props) {
    if (!isModalOpen) return null

    const [errors, setErrors] = useState<Record<string, string>>({})
    const feelingPlaceholders = ["confused", "excited", "thankful", "curious", "like shit", "overwhelmed", "motivated", "lonely", "frustrated", "tired"]
    const [randomIndex] = useState(() => Math.floor(Math.random() * feelingPlaceholders.length))
    const showConfetti = () => {
        confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.6 },
            colors: [
                "#FFF7AE",
                "#FFE066",
                "#FFD8A8",
                "#FFC078",
                "#FFA94D",
                "#FFD43B",
                "#FFF3BF",
            ],
        });
    };

    const createEntry = async (e: React.SubmitEvent<HTMLFormElement>) => {

        e.preventDefault()
        const formElement = e.currentTarget
        const formData = new FormData(formElement)
        const entryData = Object.fromEntries(formData)

        const result = await fetch('http://localhost:3000/entries', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entryData)
        })
        if (result.status === 401) {
            console.log('Not authenticated')
            return
        }
        const data = await result.json()
        if (!data.success) {
            setErrors(data.errors.fieldErrors)
        } else {
            setErrors({})
            await refreshEntries()
            showConfetti()
            setIsModalOpen(false)
        }



    }



    return (
        <Portal setModalState={setIsModalOpen}>
            <form onSubmit={createEntry} className="relative w-[80vw] max-w-2xl min-h-72 max-h-[95%]  border-2 p-7 rounded-md flex flex-col gap-4 ">

                <button type="button" className="absolute cursor-pointer right-1 top-2"
                    onClick={() => setIsModalOpen(false)}
                >
                    <X />
                </button>

                <input type="text" name="title" placeholder="Title"
                    className="mx-auto border-[0.5px] rounded-md text-xl sm:text-4xl p-1 text-center max-w-full " />
                <p className="text-sm text-red-600 ">{errors.title}</p>

                <div className="text-center">
                    <p className="text-lg sm:text-2xl  mt-2">Feeling</p>
                    <input type="text" name="feeling" placeholder={`e.g. ${feelingPlaceholders[randomIndex]}`}
                        className="p-1 mx-auto text-lg sm:text-2xl max-w-full border-[0.5px] rounded-md text-center  " />
                    <p className="text-sm text-red-600">{errors.feeling}</p>
                </div>

                <textarea
                    name="content"
                    placeholder="Start writing here..."
                    onInput={(e) => {
                        const target = e.currentTarget
                        target.style.height = "auto"
                        target.style.maxHeight = "50vh"
                        target.style.height = target.scrollHeight + "px"
                    }}
                    className="p-2 border-[0.5px] rounded-md max-w-full min-h-52 resize-none overflow-y-auto scrollbar-thin"
                />
                <p className="text-sm text-red-600">{errors.content}</p>

                <button className="rounded-md p-2 bg-stone-900 text-slate-200 font-bold border w-fit ml-auto cursor-pointer">Save Entry</button>

            </form>
        </Portal>

    )
}
