import { App, staticFiles } from "fresh";
import { Builder } from "fresh/dev";

export const app = new App()
  .all("/api/:path*", async (ctx) => {
    const proxyPath = ctx.url.pathname.replace(/^\/api/, "") || "/";
    const proxyUrl = new URL(proxyPath, "http://127.0.0.1:8000");
    proxyUrl.search = ctx.url.search;

    const headers = new Headers(ctx.req.headers);
    headers.delete("host");

    const proxyRequest = new Request(proxyUrl, {
      method: ctx.req.method,
      headers,
      body: ctx.req.body,
      redirect: "manual",
    });

    return await fetch(proxyRequest);
  })
  .use(staticFiles())
  .fsRoutes();

const builder = new Builder();

await builder.listen(async () => app, { port: 8001 });
