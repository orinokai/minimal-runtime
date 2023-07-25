import fs from 'fs-extra'
import path from 'path'
import * as url from 'url';

export const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
export const __dirpath = path.relative('.', __dirname)

const normalizePath = (src) => {
  return path.resolve(...src.split('/'))
}

export const copy = (src, dest, overwrite = true) => {
  fs.copySync(normalizePath(src), normalizePath(dest), { overwrite })
}

export const move = (src, dest, overwrite = true) => {
  fs.moveSync(normalizePath(src), normalizePath(dest), { overwrite })
}
