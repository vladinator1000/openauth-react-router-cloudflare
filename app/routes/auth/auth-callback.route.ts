import { redirect } from "react-router"
import type { Route } from "./+types/auth-callback.route"
import { createAuthClient } from "./auth-client"
import { setTokens } from "./auth-cookies"

export async function loader({ request, context }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const code = url.searchParams.get("code") ?? ""

  let authClient = createAuthClient(context.config)
  const exchanged = await authClient.exchange(
    code,
    `${url.origin}/auth-callback`,
  )

  if (exchanged.err) {
    return Response.json(exchanged.err, { status: 400 })
  }

  let response = redirect(url.origin)
  await setTokens(exchanged.tokens.access, exchanged.tokens.refresh, response)

  return response
}
