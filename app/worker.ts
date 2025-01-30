import { createRequestHandler } from "react-router"
import { getLoadContext } from "./load-context"

const requestHandler = createRequestHandler(
  // @ts-expect-error - virtual module provided by React Router at build time
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
)

export default {
  async fetch(request, env, ctx) {
    try {
      const loadContext = await getLoadContext({
        request,
        context: {
          cloudflare: {
            ctx: {
              waitUntil: ctx.waitUntil.bind(ctx),
              passThroughOnException: ctx.passThroughOnException.bind(ctx),
            },
            cf: request.cf as never,
            // @ts-expect-error - ASSETS is a virtual module provided by Cloudflare
            env,
          },
        },
      })

      return requestHandler(request, loadContext)
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: <Log error on the server logs, but don't show to user>
      console.error(error)
      return new Response("An unexpected error occurred", { status: 500 })
    }
  },
} satisfies ExportedHandler<Env>
