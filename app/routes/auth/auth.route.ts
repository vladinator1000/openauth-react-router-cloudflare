import type { Route } from "./+types/auth.route"
import { createAuthServer } from "./auth-server"

export async function loader(arg: Route.LoaderArgs) {
  return createAuthServer(arg)
}

export async function action(arg: Route.ActionArgs) {
  return createAuthServer(arg)
}
