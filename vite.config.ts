// The Vite TanStack Start configuration includes plugins for TanStack devtools,
// tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro, and path aliases.
// Additional config can be passed via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
