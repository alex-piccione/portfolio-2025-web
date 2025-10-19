import config from "@/utils/configuration"

const configuration = await config.getInstance()

export const debug = (...data: unknown[]) => {
  if (configuration.debug) {
    const now = new Date()
    console.log(`${now.getMinutes() + ":" + now.getSeconds()} ${data}`)
  }
}
