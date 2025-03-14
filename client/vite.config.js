import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { VitePWA } from "vite-plugin-pwa";
dotenv.config();

// export default defineConfig({
//   plugins: [react(),
//     VitePWA({
//       registerType: "autoUpdate",
//       manifest: {
//         name: "Travellersneed",
//         short_name: "TN",
//         description: "Explore the World, Book with Ease – Your Perfect Trip Awaits!",
//         start_url: "/",
//         display: "standalone",
//         background_color: "#ffffff",
//         theme_color: "#6200ea",
//         icons: [
//           {
//             src: "/TNlogo192.png",
//             sizes: "192x192",
//             type: "image/png",
//           },
//           {
//             src: "/TNlogo512.png",
//             sizes: "512x512",
//             type: "image/png",
//           },
//         ],
//       },
//       workbox: {
//         runtimeCaching: [
//           {
//             urlPattern: ({ request }) => request.destination === "document",
//             handler: "NetworkFirst",
//             options: {
//               cacheName: "html-cache",
//             },
//           },
//           {
//             urlPattern: ({ request }) => request.destination === "script" || request.destination === "style",
//             handler: "StaleWhileRevalidate",
//             options: {
//               cacheName: "static-cache",
//             },
//           },
//           {
//             urlPattern: ({ request }) => request.destination === "image",
//             handler: "CacheFirst",
//             options: {
//               cacheName: "image-cache",
//               expiration: {
//                 maxEntries: 50,
//                 maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
//               },
//             },
//           },
//           {
//             urlPattern: ({ url }) => url.pathname.startsWith("/api"),
//             handler: "NetworkFirst",
//             options: {
//               cacheName: "api-cache",
//               networkTimeoutSeconds: 10,
//               expiration: {
//                 maxEntries: 50,
//                 maxAgeSeconds: 60 * 60, // 1 hour
//               },
//             },
//           },
//         ],
//       },
//     }),
//   ],
//   base: '/',
//   optimizeDeps: {
//     force: true, // Ensures dependencies are always optimized on start
//     include: ["lightbox2","jquery"], // Add any problematic dependencies here
//     exclude: [], // Specify dependencies to exclude from optimization
//   },
//   resolve: {
//     alias: {
//       jquery: 'jquery/dist/jquery.min.js', // Alias for jQuery
//     },
//   },
//   build: {
//     target: "esnext", // Set to modern JavaScript target
//     outDir: "dist", // Specify output directory
//     chunkSizeWarningLimit: 1000, // Increase chunk size warning limit if needed
//   },
// });
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Travellersneed",
        short_name: "TN",
        description: "Explore the World, Book with Ease – Your Perfect Trip Awaits!",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#6200ea",
        icons: [
          {
            src: "/TNlogo192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/TNlogo512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024, // Increased to 6MB
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "document",
            handler: "NetworkFirst",
            options: {
              cacheName: "html-cache",
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "script" || request.destination === "style",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-cache",
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/api"),
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60, // 1 hour
              },
            },
          },
        ],
      },
    }),
  ],
  base: "/",
  optimizeDeps: {
    force: true, // Ensures dependencies are always optimized on start
    include: ["lightbox2", "jquery"], // Add any problematic dependencies here
  },
  resolve: {
    alias: {
      jquery: "jquery/dist/jquery.min.js", // Alias for jQuery
    },
  },
  build: {
    minify: "terser", // Minify JS files
    terserOptions: {
      compress: {
        drop_console: true, // Removes console logs to reduce size
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Code splitting for better performance
          }
        },
      },
    },
    target: "esnext", // Set to modern JavaScript target
    outDir: "dist", // Specify output directory
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit if needed
  },
});