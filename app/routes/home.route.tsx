import type { Route } from "./+types/home.route"
import { createAuthClient, verifyAuth } from "./auth/auth-client"

export async function loader({ request, context }: Route.LoaderArgs) {
  let authClient = createAuthClient(context.config)
  let verification = await verifyAuth(request, authClient)

  if (!verification || verification.err) {
    return null
  }

  let user = verification.subject

  return { user }
}

export default function Index({ loaderData }: Route.ComponentProps) {
  return (
    <main>
      {loaderData?.user && (
        <pre>{JSON.stringify(loaderData.user, null, 2)}</pre>
      )}
    </main>
  )
}
