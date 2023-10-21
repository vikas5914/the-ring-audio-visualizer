import path from 'node:path'

import { splitVendorChunkPlugin } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import glslify from 'rollup-plugin-glslify'

import _config from './_config'

const HOST = _config.server.host
const PORT = _config.server.port

export default {
  base: './',
  server: {
    host: HOST,
    port: PORT
  },
  plugins: [
    legacy(),
    glslify(),
    splitVendorChunkPlugin()
  ]
}
