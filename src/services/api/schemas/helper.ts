import z from "zod"

const z_date = () => z.string().transform((str) => new Date(str))

export default {
    z_date,
}
