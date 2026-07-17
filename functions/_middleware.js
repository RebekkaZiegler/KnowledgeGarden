// Gates every request to this Pages project behind a single shared password
// (HTTP Basic Auth). Username is ignored — only the password is checked
// against the SITE_PASSWORD secret (set via `wrangler pages secret put`).
export async function onRequest(context) {
  const { request, env } = context;
  const authHeader = request.headers.get("Authorization") || "";

  if (authHeader.startsWith("Basic ")) {
    try {
      const decoded = atob(authHeader.slice(6));
      const password = decoded.slice(decoded.indexOf(":") + 1);
      if (password === env.SITE_PASSWORD) {
        const response = await context.next();
        // Explicitly forbid caching so no intermediate cache (edge or
        // otherwise) can ever replay an authenticated response to a
        // request that didn't present valid credentials.
        const headers = new Headers(response.headers);
        headers.set("Cache-Control", "private, no-store");
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers,
        });
      }
    } catch (_) {
      // fall through to 401
    }
  }

  return new Response("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Knowledge Garden"',
      "Cache-Control": "private, no-store",
    },
  });
}
