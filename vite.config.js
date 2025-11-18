import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      "@chakra-ui/react",
      "@chakra-ui/utils",
      "@chakra-ui/system",
      "@chakra-ui/styled-system",
      "@emotion/react",
      "@emotion/styled"
    ],
    esbuildOptions: {
      mainFields: ["module", "jsnext:main", "jsnext"],
    },
  },
  resolve: {
    dedupe: ["@chakra-ui/react", "@emotion/react", "@emotion/styled"]
  }
});
