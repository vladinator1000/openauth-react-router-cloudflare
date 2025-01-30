import type { GetLoadContextFunction } from "@react-router/cloudflare"
import { type ServerConfig, getServerConfig } from "./config.server"

declare module "react-router" {
  interface AppLoadContext {
    cloudflare: ContextParam["cloudflare"]
    config: ServerConfig
  }
}

type LoadContextFunctionParams = Parameters<typeof getLoadContext>
type ContextParam = LoadContextFunctionParams[0]["context"]

export let getLoadContext: GetLoadContextFunction<Env> = async ({
  request,
  context,
}) => {
  let config = getServerConfig(context.cloudflare.env, request)

  return { ...context, config }
}
