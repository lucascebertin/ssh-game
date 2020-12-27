interface ConfigApi {
  PORT: number
}

interface Config {
  API: ConfigApi
}

declare global {
  interface Window {
    config: Config
  }
}

const ApiBaseUrl = `http://${location.hostname}:${window.config.API.PORT}`

export default {
  API: {
    LOGIN: `${ApiBaseUrl}/login`,
    TEAM: `${ApiBaseUrl}/team`,
    FLAG: `${ApiBaseUrl}/flag`,
    RANKING: `${ApiBaseUrl}/rank`,
  },
}
