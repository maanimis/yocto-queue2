import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm", "iife"],
  globalName: "YoctoQueue2",
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  minify: true,
  tsconfig: "tsconfig.json",
});
