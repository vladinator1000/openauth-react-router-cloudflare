import { redirect } from "react-router"
import type { Route } from "./+types/auth.route"
import { createAuthClient } from "./auth-client"
import { parseTokens, setTokens } from "./auth-cookies"
import { authSubjects } from "./auth-subjects"

export async function loader({ request, context }: Route.LoaderArgs) {
  let tokens = await parseTokens(request)
  let authClient = createAuthClient(context.config)

  if (tokens) {
    let verified = await authClient.verify(authSubjects, tokens.accessToken, {
      refresh: tokens.refreshToken,
    })

    if (!verified.err && verified.tokens) {
      let response = redirect("/")
      await setTokens(verified.tokens.access, verified.tokens.refresh, response)

      return response
    }
  }

  let onCompleteRedirectUrl = `${context.config.clientUrl}/auth-callback`
  let { url } = await authClient.authorize(onCompleteRedirectUrl, "code")

  // Start the auth flow
  return redirect(url)
}
