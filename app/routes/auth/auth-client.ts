import { type Client, createClient } from "@openauthjs/openauth/client"
import type { ServerConfig } from "~/config.server"
import { parseTokens } from "./auth-cookies"
import { authSubjects } from "./auth-subjects"

export function createAuthClient(config: ServerConfig) {
  return createClient({
    clientID: "my-website",
    issuer: config.clientUrl,
  })
}
export async function verifyAuth(request: Request, client: Client) {
  let tokens = await parseTokens(request)

  if (!tokens || !tokens.accessToken) {
    return null
  }

  return client.verify(authSubjects, tokens.accessToken, {
    refresh: tokens.refreshToken,
  })
}
