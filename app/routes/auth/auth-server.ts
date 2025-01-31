import { issuer } from "@openauthjs/openauth"
import { PasswordProvider } from "@openauthjs/openauth/provider/password"
import { CloudflareStorage } from "@openauthjs/openauth/storage/cloudflare"
import { PasswordUI } from "@openauthjs/openauth/ui/password"
import type { AppLoadContext } from "react-router"
import type { Route } from "./+types/auth.route"
import { authSubjects } from "./auth-subjects"

/**
 * https://openauth.js.org/docs
 */
export function createAuthServer({
  request,
  context,
}: Route.LoaderArgs | Route.ActionArgs) {
  let { env } = context.cloudflare

  let authIssuer = issuer({
    storage: CloudflareStorage({
      // @ts-expect-error
      namespace: env.AUTH,
    }),
    subjects: authSubjects,
    providers: {
      password: PasswordProvider(
        PasswordUI({
          sendCode: async (email, code) => {
            // biome-ignore lint/suspicious/noConsole: <To do: email the verification code to the user>
            console.log(`Sending code ${code} to ${email}`)
          },
          copy: {
            input_code: "Code (check Worker logs)",
          },
        }),
      ),
    },
    theme: {
      title: "My App",
      primary: "#0051c3",
      favicon: "https://workers.cloudflare.com//favicon.ico",
      logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNoaXJ0Ij48cGF0aCBkPSJNMjAuMzggMy40NiAxNiAyYTQgNCAwIDAgMS04IDBMMy42MiAzLjQ2YTIgMiAwIDAgMC0xLjM0IDIuMjNsLjU4IDMuNDdhMSAxIDAgMCAwIC45OS44NEg2djEwYzAgMS4xLjkgMiAyIDJoOGEyIDIgMCAwIDAgMi0yVjEwaDIuMTVhMSAxIDAgMCAwIC45OS0uODRsLjU4LTMuNDdhMiAyIDAgMCAwLTEuMzQtMi4yM3oiLz48L3N2Zz4=",
    },
    success: async (ctx, value) => {
      return ctx.subject("user", {
        // To do: create user in the database
        id: await getOrCreateUser(env, value.email),
      })
    },
  })

  return authIssuer.fetch(request, env, context.cloudflare.ctx)
}

async function getOrCreateUser(
  env: AppLoadContext["cloudflare"]["env"],
  email: string,
) {
  return email
}

