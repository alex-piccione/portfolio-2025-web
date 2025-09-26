// src/utils/cookie.utils.ts
import { debug } from '@/utils/utils'

type cookie = 'AuthToken' | 'RefreshToken' | 'Username'

export default class CookieUtils {
  static readCookie = (name: cookie, caller: string) => {
    // Read all values of cookie and return first
    const cookies = document.cookie.split('; ')
    const cookie = cookies.find((c) => c.startsWith(`${name}=`))
    const encodedValue = cookie?.split('=')[1] || null
    const decodedValue = encodedValue && decodeURIComponent(encodedValue)
    debug(`readCookie "${name}" (for ${caller}): ${decodedValue}`)
    return decodedValue
  }

  // I can't use HttpOnly because it is not clear how the hell it works, and it has to be set server-side.
  // "secure" requires HTTPS, so it is not used in development.
  static setCookie = (name: cookie, value: string, expiresAt: Date) => {
    debug(`set cookie "${name}". Expires: ${expiresAt.toUTCString()}`)
    const encodedValue = encodeURIComponent(value);
    let cookie = `${name}=${encodedValue}; expires=${expiresAt.toUTCString()}; path=/; SameSite=Strict;`
    if (window.location.protocol === 'https:') cookie += 'secure; '
    document.cookie = cookie
  }

  static removeCookie = (name: cookie) => {
    debug(`remove cookie "${name}"`)
    let cookie = `${name}=; expires=${new Date().toUTCString()}; path=/; SameSite=Strict;`
    if (window.location.protocol === 'https:') cookie += 'secure; '
    document.cookie = cookie
  }
}
