import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/notion': {
          target: 'https://api.notion.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/notion/, ''),
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              // Inject the API key securely so the browser never sees it
              proxyReq.setHeader('Authorization', `Bearer ${env.NOTION_API_TOKEN}`);
              proxyReq.setHeader('Notion-Version', '2022-06-28');
            });
          }
        }
      }
    }
  }
})
