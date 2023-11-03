const execa = require('execa')

;(async function () {
  const { stdout } = await execa('syncthing')
})()
