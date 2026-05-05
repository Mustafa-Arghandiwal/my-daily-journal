import Portal from "./Portal";

type Props = {
    setIsQuickInfoOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function QuickInfoModal({ setIsQuickInfoOpen }: Props) {

    return (
        <Portal setModalState={setIsQuickInfoOpen} closeOnOutsideClick={true}>
            <div className="border p-8 rounded-md">
                <p className="text-center text-xl font-bold">Quick info</p>
                <ul className="max-w-130 font-semibold mx-auto leading-relaxed list-disc ">
                    <li>Your entries are securely encrypted and not stored in plain text.</li>
                    <li>Write something every day to keep your streak going. It can be as short as one sentence.</li>
                    <li>You have a 2-day grace period. As long as you come back and write within those two days, your streak won’t break. So missing a day or two is okay.</li>
                    <li>This project is open source. You can review the code on {" "} <a href="https://github.com/Mustafa-Arghandiwal/my-daily-journal" target="_blank" rel="noopener noreferrer" className="underline" >
                        GitHub </a></li>
                </ul>
            </div>
        </Portal>
    )
}
