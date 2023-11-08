import { updateContentLayerFiles } from './clone_contentlayer.mjs'
globalThis.isCloning = globalThis.isCloning || false

const isProduction = process.env.NODE_ENV === 'production'

async function updateFiles() {
  if (!isProduction && !globalThis.isCloning) {
    await updateContentLayerFiles()
    globalThis.isCloning = true
  }
}

updateFiles()