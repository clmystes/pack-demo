
  (function(modules, entry) {
    function require(path) {
      const module = { exports: {} }
      const exports = module.exports
      modules[path](exports, module, require)
      return module.exports
    }
    require(entry)
  })({"./entry.js": function(exports, module, require) {
    "use strict";

var _hello = require("./hello.js");

var _hello2 = _interopRequireDefault(_hello);

var _world = require("./world.js");

var _world2 = _interopRequireDefault(_world);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_hello2.default + _world2.default);
  },"./hello.js": function(exports, module, require) {
    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = 'hello';
  },"./world.js": function(exports, module, require) {
    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = 'world';
  },}, './entry.js')
