const execSync = require('child_process').execSync
const fs = require('fs')
const path = require('path')
const envPathAfter = 'public/version.js'
const charSet = 'utf8'

//写一个方法用来判断及重写或者追加版本号
const setEnvVersion = (version, envPath) => {
  // 判断文件是否存在
  fs.access(envPath, err => {
    if (err) {
      fs.writeFileSync(envPath, `\n window.version = '${version}'`)
    } else {
      fs.readFile(envPath, charSet, (err, data) => {
        if (err) {
          //console.log(err)
          return
        }
        if (data.indexOf('window.version') === -1) {
          fs.appendFileSync(envPath, `window.version = '${version}' \n`)
        } else {
          let str = data.substring(0, data.indexOf('window.version = ') + 16) + ` '${version}' \n`
          fs.writeFileSync(envPath, str)
        }
      })
    }
  })
}

// 处理promise异常
process.on('unhandledRejection', error => {
  console.error('unhandledRejection', error)
  process.exit(1) // To exit with a 'failure' code
})

// 判断父文件夹是否存在并且创建
const ensureDirectoryExistence = filePath => {
  var dirname = path.dirname(filePath)
  if (fs.existsSync(dirname)) {
    return true
  }
  ensureDirectoryExistence(dirname)
  fs.mkdirSync(dirname)
}

// 获取git信息
const getGitVersion = () => {
  const version = {}
  version.buildData = new Date()
  // version.commitData = new Date(execSync('git show -s --format=%cd').toString())
  // version.name = execSync('git show -s --format=%ce')
  //   .toString()
  //   .trim()
  version.hash = execSync('git show -s --format=%H')
    .toString(charSet)
    .trim()
  version.branch = execSync('git rev-parse --abbrev-ref HEAD')
    .toString(charSet)
    .trim()
  return version
}

const initVersion = () => {
  const envPath = path.join(__dirname, envPathAfter)
  // 创建目录
  ensureDirectoryExistence(envPathAfter)
  // 写入文件
  setEnvVersion(JSON.stringify(getGitVersion()), envPath)
}

initVersion()
