import { type Cookie, createCookie } from "react-router"

let secrets = ["toc8uwenroity4fhklsajmhlfj"]

export let accessTokenCookie = createCookie("access-token", {
  httpOnly: true,
  sameSite: "strict",
  maxAge: 34560000,
  secrets,
})

export let refreshTokenCookie = createCookie("refresh-token", {
  httpOnly: true,
  sameSite: "strict",
  maxAge: 34560000,
  secrets,
})

export async function setTokens(
  access: string,
  refresh: string,
  response: Response,
) {
  if (access) {
    response.headers.append(
      "Set-Cookie",
      await accessTokenCookie.serialize(access),
    )
  }

  if (refresh) {
    response.headers.append(
      "Set-Cookie",
      await refreshTokenCookie.serialize(refresh),
    )
  }
}

export async function parseTokens(request: Request) {
  let cookieHeader = request.headers.get("cookie") ?? ""
  let accessToken = await accessTokenCookie.parse(cookieHeader)
  let refreshToken = await refreshTokenCookie.parse(cookieHeader)

  return { accessToken, refreshToken }
}

export async function clearTokens(response: Response) {
  await clearCookies([accessTokenCookie, refreshTokenCookie], response)
}

export async function clearCookies(cookies: Cookie[], response: Response) {
  for (const cookie of cookies) {
    response.headers.append(
      "Set-Cookie",
      await cookie.serialize("", { maxAge: 1 }),
    )
  }
}
