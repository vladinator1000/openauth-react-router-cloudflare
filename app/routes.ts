import { type RouteConfig, index, route } from "@react-router/dev/routes"

const routes: RouteConfig = [index("routes/home.route.tsx"), ...getAuthRoutes()]

function getAuthRoutes() {
  let patterns = ["/authorize", "/.well-known/*", "/password/*", "/token"]

  let authServerRoutes = patterns.map((pattern) =>
    route(pattern, "routes/auth/auth.route.ts", { id: pattern }),
  )

  return [
    ...authServerRoutes,
    route("login", "routes/auth/login.route.ts"),
    route("auth-callback", "routes/auth/auth-callback.route.ts"),
  ]
}

export default routes
