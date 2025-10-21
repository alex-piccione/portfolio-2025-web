import { z } from "zod"

const as_date = () => z.string().transform((str) => new Date(str))

export const login = {
  ResponseSchema: z.object({
    accessToken: z.string().min(1),
    accessTokenExpiresAt: as_date(),
    refreshToken: z.string().min(1),
    refreshTokenExpiresAt: as_date(),
    user: z.object({
      id: z.string(), //.uuid()
      username: z.string().min(1),
    }),
  }),
}

export type LoginResponse = z.infer<typeof login.ResponseSchema>


export const refresh = {
    ResponseSchema: z.object({
    accessToken: z.string().min(1),
    accessTokenExpiresAt: as_date(),
    refreshToken: z.string().min(1),
    refreshTokenExpiresAt: as_date(),
  }),
}

export type RefreshResponse = z.infer<typeof refresh.ResponseSchema>