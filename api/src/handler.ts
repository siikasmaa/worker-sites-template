import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

const defaultHeaders = [
  ['Referrer-Policy', 'strict-origin'],
  ['Content-Security-Policy', 'frame-ancestors none'],
  ['Strict-Transport-Security', 'max-age=3600; includeSubDomains'],
  ['X-Content-Type-Options', 'nosniff'],
  ['X-Frame-Options', 'deny']
]

export const handleRequest = async (event: FetchEvent): Promise<Response> => {
  const { request } = event
  const url = new URL(request.url)

  try {
    const options = { cacheControl: { bypassCache: !!DEBUG } }
    const res = await getAssetFromKV(event, options)
    defaultHeaders.forEach(header => res.headers.set(header[0], header[1]))

    return res
  } catch (e) {
    if (!DEBUG) {
      try {
        let notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: req => new Request(`${url.origin}/404.html`, req)
        })

        return new Response(notFoundResponse.body, {
          ...notFoundResponse,
          status: 404
        })
      } catch (e) {}
    }

    return new Response(e.message || e.toString(), { status: 500 })
  }
}
