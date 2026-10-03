import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  plugins: ["./src/lib/invalid-path.server.ts"],
});
