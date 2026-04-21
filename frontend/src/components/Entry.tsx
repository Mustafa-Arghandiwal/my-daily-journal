import type { EntryType } from "../types/entry"

export default function Entry({ entry }: { entry: EntryType }) {

    return (
        <div className="border-2 rounded-md bg-white shadow-[-4px_3px_0px_black] py-2 px-8 cursor-pointer min-h-44">
            <p className="font-bold text-xl">{entry.title}</p>
            <p className="font-semibold text-lg">{entry.feeling && `Feeling ${entry.feeling}`}</p>
            <p className="text-sm">{(entry.created_at).slice(0, -3)}</p>
            <p className="mt-4 line-clamp-3">{entry.content}</p>

        </div>
    )
}
