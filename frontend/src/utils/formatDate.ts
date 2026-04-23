
export default function formatDate(date: string) {

    const local = new Date(date + 'Z')

    const formattedDate = local.toLocaleString('sv-SE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })
    return formattedDate
}
