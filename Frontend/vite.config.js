import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [
      react(),
      tailwindcss(),

      VitePWA({
        registerType: 'autoUpdate',

        manifest: {
          name: 'DIVA',
          short_name: 'DIVA',
          description: 'DIVA Online Store',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: 'standalone',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },

        // workbox: {
        //   globPatterns: [
        //     '**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}',
        //   ],
        // },

        // workbox: {
        //   globPatterns: [
        //     '**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}',
        //   ],

        //   globIgnores: [
        //     '**/jewell.png',
        //   ],
        // },

        // workbox: {
        //   globPatterns: [
        //     '**/*.{js,css,html,ico,woff,woff2,ttf,eot}',
        //   ],

        //   globIgnores: [
        //     '**/jewell.png',
        //   ],

        //   runtimeCaching: [
        //     {
        //       // Images are downloaded when actually requested,
        //       // rather than during PWA installation.
        //       urlPattern: /\.(?:png|jpg|jpeg|webp|svg|gif)$/i,
        //       handler: 'CacheFirst',
        //       options: {
        //         cacheName: 'image-cache',

        //         expiration: {
        //           maxEntries: 100,
        //           maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        //         },

        //         cacheableResponse: {
        //           statuses: [0, 200],
        //         },
        //       },
        //     },
        //   ],
        // },


        workbox: {
          globPatterns: [
            '**/*.{js,css,html,ico,woff,woff2,ttf,eot}',
          ],

          globIgnores: [
            '**/jewell.png',
          ],

          navigateFallback: '/index.html',

          runtimeCaching: [
            {
              // Public product list + product details
              // urlPattern: /\/API\/products(?:\/[^/?]+)?(?:\?.*)?$/i,
              urlPattern: ({ url }) => {
                return (
                  url.pathname === '/API/products' ||
                  url.pathname.startsWith('/API/products/')
                );
              },
              handler: 'NetworkFirst',
              options: {
                cacheName: 'product-api-cache',

                networkTimeoutSeconds: 3,

                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24, // 24 hours
                },

                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },

            {
              // Public product reviews
              urlPattern: /\/API\/reviews\/product\/[^/?]+$/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'product-review-cache',

                networkTimeoutSeconds: 3,

                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24, // 24 hours
                },

                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },

            {
              urlPattern: /\.(?:png|jpg|jpeg|webp|svg|gif)$/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'image-cache',

                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },

                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },

      }),
    ],

    server: {
      host: '0.0.0.0',
      port: 5173,

      proxy: {
        '/API': {
          target: env.VITE_API_URL,
          changeOrigin: true,
        },
      },
    },
  });
};