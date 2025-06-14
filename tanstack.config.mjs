import { defineConfig } from '@tanstack/router-cli'

export default defineConfig({
  routesDir: 'src/routes',
  out: 'src/routeTree.gen.ts',
  tsconfig: 'tsconfig.json',
})