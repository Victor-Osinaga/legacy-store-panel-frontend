import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: 'jarryindumentaria.vercel.app', // Tu host personalizado
  //   port: 5173,                      // Puerto que prefieras
  // }
})
