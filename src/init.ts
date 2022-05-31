import * as fs from 'fs'
import { join } from 'path'
import * as process from 'process'
import * as Shell from 'shelljs'

const logGreen = (text: string) => {
  console.log(`\x1B[32m ${text}`)
}
const logRed = (text: string) => {
  console.log(`\x1B[31m ${text}`)
}

interface Options {
  template?: string
}

const init = async (options?: Options) => {
  const argv = require('minimist')(process.argv.slice(2))
  const cwd = process.cwd()

  const targetDir = argv._[0]

  if (fs.existsSync(targetDir)) {
    logRed(`${targetDir} already existed, please delete it`)
    return
  }

  logGreen('creating...')
  Shell.cp('-r', `${join(__dirname, '../example/color-thief-wasm')}`, `${join(cwd, `./${targetDir}`)}`)
  Shell.cp('-r', `${join(__dirname, '../gitignore.tpl')}`, `${join(cwd, `./${targetDir}/.gitignore`)}`)

  logGreen('Created succeed ')

  console.log(`  cd ${targetDir}`)
  console.log('  npm install (or `yarn`)')
  console.log('  npm start (or `yarn start`)')
  console.log()
}

export {
  init
}
