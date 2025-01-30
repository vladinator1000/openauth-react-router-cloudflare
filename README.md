# Vlady's Remix, Cloudflare Pages, drizzle, D1 template

Demo: https://remix-d1-4vz.pages.dev/

📖 See the [Remix docs](https://remix.run/docs) and the [Remix Vite docs](https://remix.run/docs/en/main/future/vite) for details on supported features.

## Typegen

`npm run gen` when you change `wrangler.toml`

## Database

[Create one](https://developers.cloudflare.com/d1/get-started/#3-create-a-database) and add it to `wrangler.toml`

`db-migrate-gen` when you change the schema

`db-migrate-apply` to apply the migrations to the database

`db-studio` to inspect the database

## Development

Run the Vite dev server:

```sh
npm run dev
```

To run Wrangler:

```sh
npm run build
npm run start
```

## Deployment

> [!WARNING]  
> Cloudflare does _not_ use `wrangler.toml` to configure deployment bindings.
> You **MUST** [configure deployment bindings manually in the Cloudflare dashboard][bindings].

First, build your app for production:

```sh
npm run build
```

Then, deploy your app to Cloudflare Pages, you'll need to manually set up the binding for the database in the cloudflare dashboard:

```sh
npm run deploy
```

[bindings]: https://developers.cloudflare.com/pages/functions/bindings/
