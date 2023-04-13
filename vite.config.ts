/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react-swc'
import checker from 'vite-plugin-checker'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts'
    // * NOTE 테스트 속도 저하 문제로 CSS를 테스트에 사용할 경우에만 true로 해준다. 현재는 필요없어 비활성화 처리함.
    // css: true,
  },
  plugins: [react(), checker({ typescript: true }), tsconfigPaths()],
  server: {
    port: 3000
  },
  build: {
    manifest: true,
    outDir: 'docs'
  }
})
