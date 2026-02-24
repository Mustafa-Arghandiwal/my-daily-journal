import { X } from "lucide-react"
import { useState } from "react"


export default function EntryModal() {
	const [isModalOpen, setIsModalOpen] = useState(true)
	if (!isModalOpen) return null
	return (
		<div className="absolute max-w-2xl w-full min-h-72 top-36 right-1/2 translate-x-1/2 bg-white border-2 p-6 rounded-md flex flex-col gap-4 ">


			<button className="absolute cursor-pointer right-2 top-2"
				onClick={() => setIsModalOpen(false)}
			>
				<X />
			</button>


			<div>
				I am feeling{" "}
				<input type="text" placeholder="e.g. confused" className="px-1 border rounded-md" />
			</div>

			<textarea
				placeholder="Start writing here..."
				className="p-2 border rounded-md w-full min-h-52 resize-none overflow-hidden"
				onInput={(e) => {
					const target = e.currentTarget
					target.style.height = "auto"
					target.style.height = target.scrollHeight + "px"
				}}
			/>
			<button className="rounded-md p-2 text-white bg-black w-fit ml-auto cursor-pointer">Save Entry</button>

		</div>
	)
}
