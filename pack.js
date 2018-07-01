// input -> './entry.js'
const fs = require('fs')
const { transformSync, traverse, transformFileSync } = require('@babel/core')

const rawCode = fs.readFileSync('./entry.js', 'utf-8')
// console.log(rawCode)

const ast = transformSync(rawCode, { ast: true }).ast
const deps = ['./entry.js']

traverse(ast, {
  enter(path) {
    if (path.node.type === 'ImportDeclaration') {
      deps.push(path.node.source.value)
    }
  }
})

const transformCode = file => {
  const code = transformFileSync(file, {
    "presets": ["env"],
  }).code
  return code
}
transformCode('./entry.js')

// const modules = {}
// deps.forEach(p => {
//   modules[p] = `function() {
//     ${transformCode(p)}
//   }`
// })
// const entry = './entry.js'

// const result = `
//   (function(modules, entry) {
//     function require(path) {
//       return modules[path]()
//     }
//     require(entry)
//   })(${JSON.stringify(modules)}, '${entry}')
// `
const entry = './entry.js'
let modules = ''
deps.forEach(p => {
  modules += `${JSON.stringify(p)}: function(exports, module, require) {
    ${transformCode(p)}
  },`
})

const result = `
  (function(modules, entry) {
    function require(path) {
      const module = { exports: {} }
      const exports = module.exports
      modules[path](exports, module, require)
      return module.exports
    }
    require(entry)
  })({${modules}}, '${entry}')
`
fs.writeFileSync('./bundle.js', result)
// ouput -> bundle.js