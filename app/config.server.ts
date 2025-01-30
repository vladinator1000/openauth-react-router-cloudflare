type AppMode = "development" | "production"

export type ServerConfig = {
  mode: AppMode
  clientUrl: string
}

export function getServerConfig(env: Env, request: Request): ServerConfig {
  let mode = (env.MODE ?? "development") as AppMode

  let url = new URL(request.url)
  let clientUrl = mode === "production" ? url.hostname : "http://localhost:5173"

  return {
    mode,
    clientUrl,
  }
}
