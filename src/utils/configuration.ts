/*export default {
    environment: "Local",
    debug: true,
    apiUrl: "http://localhost:3000"
}*/

import { debug } from "./utils"

interface Configuration {
    environment: String,
    debug: boolean,
    apiUrl: string
}

const DEFAULT_CONFIGURATION_FILE = "configuration_local.json"
const MAX_RETRY:number = 5

export class ConfigurationProvider {
    private static configuration: Configuration
    private static isLoading = false    
    private static loadPromise: Promise<Configuration> | null = null

    static async getInstance(): Promise<Configuration> {
        // Return existing promise if already loading
        if (this.loadPromise) {
            return this.loadPromise
        }

        // Return data if already loaded
        if (this.configuration) {
            return this.configuration
        }

        // Read from file
        return this.load()
    }

    static async load(retryCount:number = 0): Promise<Configuration> {
        this.isLoading = true
        let response: Response | undefined // Declare response here to be accessible in finally or catch

        try {
            const path = import.meta.env.VITE_CONFIGURATION_FILE || DEFAULT_CONFIGURATION_FILE
            if(!path) throw new Error("CONFIGURATION_FILE environment variable is missed")
            console.log(`configuration file: ${path}`)

            response = await fetch(path)
            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(`HTTP error! Status: ${response.status}, StatusText: ${response.statusText}, Body: ${errorText.substring(0, 200)}...`)
            }

            this.configuration = await response.json()

            return this.configuration
        } catch (error) {
            console.error(`Failed to load configuration (retry: ${retryCount}). ${error}`)
            if (response)
                console.error(`HTTP Status: ${response.status}, Status Text: ${response.statusText}`)
            
            console.error('Error details:', error)

            //if (error.status)
            //    console.error(`Status: ${error.status}, ${error.statusText}`)
            if(retryCount > MAX_RETRY) throw new Error(`Failed to load configuration. ${error}`)
            else return this.load(retryCount+1)
        } finally {
            this.isLoading = false
        }
    }
}

export default ConfigurationProvider