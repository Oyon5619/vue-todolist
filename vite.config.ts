import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import tailwindVite from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    tailwindVite(),
    visualizer({
      open: true, // 打包后自动代开分析图
      filename: "./distAnalyse/visualizer.html",
      gzipSize: true, // 显示gzip压缩大小
      brotliSize: true, // 显示brotliSize压缩大小
    }),
  ],
  build: {
    rolldownOptions: {
      output: {
        // 静态文件按类型分包
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".js", ".ts", ".vue"],
  },
  server: {
    port: 4002,
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
