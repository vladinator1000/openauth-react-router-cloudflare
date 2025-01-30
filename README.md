# OpenAuth on Cloudflare with React Router 7

OpenAuth doesn't work when trying to deploy.

Bug reproduction:

1. Install dependencies
```
pnpm install
```

2. Build the app
```
pnpm build
```

3. Log into your Cloudflare dashboard
4. Create a KV store and replace the IDs in wrangler.toml
5. Log in with the Wrangler CLI
```
pnpm wrangler login
```

6. Try to deploy the worker
```
pnpm deploy-preview
```

7. Observe error

```
✘ [ERROR] A request to the Cloudflare API failed.

  Uncaught Error: No such module "node:fs".
    imported from "index.js"
   [code: 10021]
```

8. Open [/app/routes/auth/auth-server.ts](/app/routes/auth/auth-server.ts)

9. Comment out issuer code
```ts
import { issuer } from "@openauthjs/openauth" // <-- Comment this out on line 1
// ...

let authIssuer = issuer() // <-- Comment this out on line 18
```

10. Build the app again

```
pnpm build
```

11. Deploy
```
pnpm deploy-preview
```

12. Observe no error

```
Uploaded openauth-react-router-cloudflare-preview (11.03 sec)
```