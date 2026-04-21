import { X } from "lucide-react"
import { useEffect, useState } from "react"
import confetti from 'canvas-confetti'

type Props = {
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    refreshEntries: () => Promise<void>
}

export default function EntryModal({ isModalOpen, setIsModalOpen, refreshEntries }: Props) {
    if (!isModalOpen) return null

    const [errors, setErrors] = useState({})
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
        <form onSubmit={createEntry} className="absolute max-w-2xl w-full min-h-72 top-22 right-1/2 translate-x-1/2 bg-white border-2 p-6 rounded-md flex flex-col gap-4 ">

            <button type="button" className="absolute cursor-pointer right-2 top-2"
                onClick={() => setIsModalOpen(false)}
            >
                <X />
            </button>

            <input type="text" name="title" placeholder="Title"
                className="mx-auto border-[0.5px] rounded-md text-4xl p-1 text-center " />
            <p className="text-sm text-red-600 ">{errors.title}</p>

            <div className="text-center">
                <p className="text-2xl mt-2">Feeling</p>
                <input type="text" name="feeling" placeholder={`e.g. ${feelingPlaceholders[randomIndex]}`}
                    className="p-1 mx-auto text-2xl border-[0.5px] rounded-md text-center  " />
                <p className="text-sm text-red-600 ">{errors.feeling}</p>
            </div>

            <textarea
                name="content"
                placeholder="Start writing here..."
                onInput={(e) => {
                    const target = e.currentTarget
                    target.style.height = "auto"
                    target.style.height = target.scrollHeight + "px"
                }}
                className="p-2 border rounded-md w-full min-h-52 resize-none overflow-hidden"
            />
            <p className="text-sm text-red-600">{errors.content}</p>

            <button className="rounded-md p-2 text-white bg-black w-fit ml-auto cursor-pointer">Save Entry</button>

        </form>
    )
}
