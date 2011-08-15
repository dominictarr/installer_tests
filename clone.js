
var installer = require('installer')
  , it = require('it-is')
  , exec = require('child_process').exec
  , fs = require('fs')
  , join = require('path').join

exports.__setup = function (test) {

  exec('rm -rf /tmp/installer_test', test.done)  

}

function getPackageJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf-8'))
}

exports['git clone'] = function (test) {

  var wd = '/tmp/installer_test/' + Math.random()

  installer.install(
    {repo: 
      { url: __dirname + '/curry'//'git@github.com:dominictarr/curry.git'
      , type: 'git' }
    , name: 'curry'}
    , wd
    , function (err, pkg) {
      if(err) throw err
      //check that paths resolve!

      console.log(wd)

      it(pkg.package).deepEqual(getPackageJson(join(__dirname, 'curry/package.json')))

      fs.statSync(join(wd, 'node_modules', 'curry'))
      fs.statSync(join(wd, 'node_modules', 'curry', '.git'))
      test.done()
    })

}