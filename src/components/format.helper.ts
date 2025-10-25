const formatDate = (date: Date) => {
    if (!date) return ""
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0") // Months are 0-indexed
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

/**
 * Create a ISO 8601 date string using 00:00 UTC time
 * @param date string date
 */
const createDatetime = (date: string) =>
    new Date(date + "T00:00:00Z").toISOString()

export { formatDate, createDatetime }
