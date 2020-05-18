# Cloudflare worker sites template

This is a quick template for a Cloudflare sites worker with a CRA bootstrapped frontend.

## Press play to start

Some steps that should be taken before publishing anything:

1. Rename the file `wrangler.example.toml` to `wrangler.toml`, in order to have wrangler detecting the correct configuration
2. Add the `wrangler.toml` configuration for Cloudflare `account_id`
3. Come up with a project name and add it to `wrangler.toml`, `package.json`, `api/package.json`, `frontend/package.json`

## Good to know

- The transpiled frontend is expected to be served from the directory `frontend/build`. This setting can be changed in the wrangler configuration `wrangler.toml`
