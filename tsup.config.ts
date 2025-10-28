import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm", "iife"],
  globalName: "yoctoqueue2",
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  minify: true,
  tsconfig: "tsconfig.json",
});
