import MainLayout from "../layouts/MainLayout";
import { Pencil } from "lucide-react";
import Entry from "../components/Entry";
import NewEntryModal from "../components/NewEntryModal";
import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthModalContext } from "../App";
import type { EntryType } from "../types/entry";


export default function Home() {

    const { setIsAuthModalOpen } = useContext(AuthModalContext)!
    const currentHour = new Date().getHours()
    const greetingMsg = currentHour < 12 ? "Buenos días" : currentHour < 18 ? "Buenas tardes" : "Buenas noches"
    const { user } = useContext(AuthContext)!
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [entries, setEntries] = useState<EntryType[]>([])

    const getEntries = async () => {
        const result = await fetch('http://localhost:3000/entries', {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (result.status === 401) {
            console.log('Not authenticated')
        } else {
            const data: EntryType[] = await result.json()
            setEntries(data)
        }

    }

    useEffect(() => {
        getEntries()
    }, [])



    return (
        <MainLayout>
            <div className="absolute inset-0 h-full w-full bg-stone-100 dark:bg-stone-900 bg-[radial-gradient(#d6d3d1_1px,transparent_1px)]
                            dark:bg-[radial-gradient(#44403c_1px,transparent_1px)] bg-size-[16px_16px]">
            </div>


            <section className="relative max-w-200 px-2 mx-auto py-8">
                {/* <h1 className="text-6xl text-center mb-20">Sign up to start journalling secure</h1> */}
                <h2 className="text-4xl xs:text-5xl text-center capitalize">{user ? `${greetingMsg}, ${user.name} 👋` : greetingMsg + ", Stranger"} </h2>
                <div className="flex justify-center gap-2 flex-col items-center mt-8">
                    {user &&
                        <>

                            <p className="text-center font-bold text-xl">Write something today, even if it's just one sentence.</p>
                            <button className="font-bold border flex gap-2 p-2 rounded-md cursor-pointer bg-stone-800 text-slate-200"
                                onClick={() => setIsModalOpen(true)}>
                                <Pencil />
                                New Entry
                            </button>
                        </>
                    }

                </div>
                <div className="mt-12 flex flex-col gap-5">
                    {!user ?
                        <>
                            <p className="text-center text-2xl font-bold">
                                <button className="underline cursor-pointer" onClick={() => setIsAuthModalOpen(true)}>
                                    Login
                                </button>

                                &nbsp;to create entries.</p>
                            <p className="text-center text-xl font-bold mt-8">Quick info</p>
                            <ul className="max-w-lg font-semibold  mx-auto leading-relaxed list-disc ">
                                <li>Your entries are securely encrypted and not stored in plain text.</li>
                                <li>Write something every day to keep your streak going. It can be as short as one sentence.</li>
                                <li>If you miss a day, you have a 2-day grace period. As long as you come back and write within those two days, your streak won’t break.</li>
                                <li>This project is open source. You can review the code on {" "} <a href="https://github.com/Mustafa-Arghandiwal/my-daily-journal" target="_blank" rel="noopener noreferrer" className="underline" >
                                    GitHub </a></li>
                            </ul>
                        </>

                        :
                        entries.length > 0 ?
                            entries.map(entry => (
                                <Entry key={entry.id} entry={entry} refreshEntries={getEntries} />
                            ))
                            :
                            <p className="text-center text-2xl font-bold">No entries to show. Start by creating one.</p>
                    }
                </div>



                {user &&
                    <NewEntryModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} refreshEntries={getEntries} />
                }

            </section>

        </MainLayout>
    )
}
