import { copy, move, __dirpath } from "./file.js"

export const onBuild = ({ netlifyConfig: { functions, redirects } }) => {
  // stash next output in .netlify directory
  move('.next', '.netlify/.next')

  // move static assets to publish directory
  copy('public', '.next')
  copy('.netlify/.next/static', '.next/_next/static')

  // copy server files and handler to functions directory
  copy('.netlify/.next/standalone/.next', '.netlify/functions-internal/___netlify-handler/.next')
  copy(`${__dirpath}/handler.js`, '.netlify/functions-internal/___netlify-handler/___netlify-handler.js')

  // include server files in function bundle
  functions['___netlify-handler'] ||= {}
  functions['___netlify-handler'].included_files ||= []
  functions['___netlify-handler'].included_files.push('.netlify/functions-internal/___netlify-handler/.next/**/*')

  // redirect all requests to handler
  redirects ||= []
  redirects.push({ from: `/*`, to: '/.netlify/functions/___netlify-handler', status: 200 })
}
