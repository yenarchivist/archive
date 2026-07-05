export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/gallery-index') {
      const upstream = await fetch('https://gallery.yenament.com/gallery-index.json', {
        cf: { cacheTtl: 60, cacheEverything: true },
      });

      if (!upstream.ok) {
        return Response.json({ error: 'Failed to load gallery index' }, { status: 502 });
      }

      return new Response(await upstream.text(), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'public, max-age=60',
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
