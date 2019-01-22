// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"src/models/abstract/AbstractModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Model =
/*#__PURE__*/
function () {
  function Model(title) {
    _classCallCheck(this, Model);

    var data = JSON.parse(localStorage.getItem("_todos"));
    this.todos = data ? data : [];
    this.title = title;
  }

  _createClass(Model, [{
    key: "storeState",
    value: function storeState() {
      this.todos.push({
        id: Math.floor(Math.random() * 100),
        title: this.title,
        completed: false
      });
      localStorage.setItem("_todos", JSON.stringify(this.todos));
    }
  }, {
    key: "setStore",
    value: function setStore(data) {
      this.storeState(data);
    }
  }, {
    key: "all",
    value: function all() {
      return this.todos;
    }
  }, {
    key: "get",
    value: function get(id) {
      if (id === null) {
        return console.log("function expects exactly 1 arg. 0 passed");
      }

      return this.store.filter(function (item) {
        return item.id === id;
      });
    }
  }, {
    key: "save",
    value: function save() {
      this.storeState();
      return this;
    }
  }, {
    key: "edit",
    value: function edit() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (id === null || title === null) {
        return console.log("Update function expects exactly 1 arg. 0 passed");
      }

      var todo = this.store.filter(function (item) {
        return item.id === id;
      });

      if (todo) {
        todo.title = title;
        var newStore = [].concat(_toConsumableArray(this.store), [edited]);
        this.setStore(newStore);
        return true;
      }

      return console.log('Cannot find todo');
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      if (id === null) {
        return console.log("Remove function expects exactly 1 arg. 0 passed");
      }

      this.store = this.store.filter(function (todo) {
        return todo.id !== id;
      });
      return true;
    }
  }]);

  return Model;
}();

exports.default = Model;
},{}],"src/models/Todo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractModel = _interopRequireDefault(require("./abstract/AbstractModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Extends model abstract
 * initializes instance properties
 */
var Todo =
/*#__PURE__*/
function (_Model) {
  _inherits(Todo, _Model);

  function Todo() {
    var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, Todo);

    return _possibleConstructorReturn(this, _getPrototypeOf(Todo).call(this, title));
  }

  return Todo;
}(_AbstractModel.default);

exports.default = Todo;
},{"./abstract/AbstractModel":"src/models/abstract/AbstractModel.js"}],"src/components/UI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Todo = _interopRequireDefault(require("../models/Todo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Class responsible for creating dynamic DOM elements:
 * todo list, alerts etc
 * ref: https://davidwalsh.name/documentfragment
 */
var UI =
/*#__PURE__*/
function () {
  function UI() {
    _classCallCheck(this, UI);
  }

  _createClass(UI, null, [{
    key: "showTodos",
    // display todos from Todo model
    value: function showTodos() {
      // initize todos
      var todos = new _Todo.default(); // parse json from todo model

      UI.state = todos.all(); // iterate through each todo and delegate DOM manipulation to showTodo()

      UI.state.map(function (todo) {
        return UI.showTodo(todo);
      });
    }
    /**
     * method responsible for creating new DOM nodes and 
     * assigning todo values to list nodes.
     * @param {*} todo 
     */

  }, {
    key: "showTodo",
    value: function showTodo(todo) {
      /**
       * initialize variables:
       * hook to app id in index.html
       * create ul, li elements
       * append children to each respectively
       */
      // get div with id 'app' from index.html
      var appHook = document.getElementById("app"); // create a UL & LI elements

      var ul = document.createElement("ul");
      var li = document.createElement("li");
      var input = document.createElement("input");
      var btn1 = document.createElement("button");
      var btn2 = document.createElement("button"); // add attributes

      input.setAttribute('type', 'checkbox');
      input.setAttribute('id', 'checkbox');
      btn1.setAttribute('id', todo.id);
      btn1.setAttribute('id', 'btn1');
      btn1.innerHTML = "Edit";
      btn2.setAttribute('id', todo.id);
      btn2.setAttribute('id', 'btn2');
      btn2.innerHTML = "Delete"; // append children to li tag

      li.innerHTML = todo.title;
      li.appendChild(input);
      li.appendChild(btn1);
      li.appendChild(btn2); // then append the li to ul tag

      ul.appendChild(li); // finally append the ul tag to the appHook

      appHook.appendChild(ul);
    }
    /**
     * displays errors when called
     * @param {*} errorArray 
     */

  }, {
    key: "renderErrors",
    value: function renderErrors() {
      var errorArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      // ensure errorsAray is set
      if (errorArray.length === 0) {
        // stop script if array is empty. log message
        return console.log('expect error array not to be empty');
      } // hook to alerts section in index.html


      var alerts = document.getElementById('display-alerts'); // create a ul tag

      var ul = document.createElement("ul"); // loop thru errors

      errorArray.forEach(function (error) {
        // create li element each time
        var li = document.createElement("li"); // add error text to li element

        li.innerHTML = error; // append it immediately to the ul tag

        ul.appendChild(li);
      }); // append the ul tag to allerts div

      alerts.appendChild(ul);
    }
  }]);

  return UI;
}();

exports.default = UI;
},{"../models/Todo":"src/models/Todo.js"}],"src/utils/Errors.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Error handling class
 * contains errors class property
 * and get & set class methods
 */
var Errors =
/*#__PURE__*/
function () {
  function Errors() {
    _classCallCheck(this, Errors);

    // initialize errors property to empty array
    Errors.errors = [];
  } // returns errors array


  _createClass(Errors, null, [{
    key: "get",
    value: function get() {
      return Errors.errors;
    } // sets values to errors property

  }, {
    key: "set",
    value: function set() {
      var errMsg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      Errors.errors.push(errMsg);
    }
  }]);

  return Errors;
}();

exports.default = Errors;
},{}],"src/utils/Validation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Errors = _interopRequireDefault(require("./Errors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * NOTE: class subject to extention as theres 
 * a lot of methods that could potentially be added
 * eg: email, password etc
 */

/**
 * Validation class validates any form input.
 * call validate class method and pass it rules & 
 * form data. Any errors are routed to Errors class within
 * its methods.
 */
var Validation =
/*#__PURE__*/
function () {
  function Validation() {
    _classCallCheck(this, Validation);
  }

  _createClass(Validation, null, [{
    key: "validate",

    /**
     * cycles through inputs array and returns TRUE/FALSE
     * depending on whether there are errors or not
     * @param {*} rules 
     * @param {*} data 
     * returns @bool depending on whether form is valid on not
     */
    value: function validate(rules, data) {
      // set valide to true unless something is wrong within data object
      var valid = true; // loop through rules first

      rules.forEach(function (rule, index) {
        // extract rules into callback array.
        var callbacks = rule.title.split('|'); // loop thru rules array

        callbacks.forEach(function (callback) {
          /**
           * extract input data and set value variable
           * extract keys from data object and set field name
           * variable
           */
          var value = data[index] ? data[index] : null;
          var fieldName = Object.keys(data[0])[0]; // dynamically call this class methods and pass value and field name.

          if (Validation[callback](value, fieldName) === false) {
            /**
             * if false ie nthere was a problem: no input value 
             * or value infringes some rule then set form validity to false.
             */
            valid = false;
          }
        });
      }); // return whether form was valid or not

      return valid;
    }
    /**
     * Check if input has minimum character length
     * @param {*} value 
     * @param {*} fieldName 
     * Returns @bool true/false 
     */

  }, {
    key: "min",
    value: function min() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var fieldName = arguments.length > 1 ? arguments[1] : undefined;
      // initialize validity
      var valid = null; // check if input is less that a certain minimum

      if (Validation.lessThan(value._name) === true) {
        // if so set valid to false: input has less characters ...
        // than required
        valid = false; // set error message to errors class

        _Errors.default.set("".concat(fieldName, " must be more than 5 characters."));
      } else {
        // otherwise input has right number of characters
        // set valid to true.
        valid = true;
      } // return validity


      return valid;
    }
    /**
     * Check input for missing value: input MUST contain value
     * @param {*} value 
     * @param {*} fieldName 
     * returns @bool true/false
     */

  }, {
    key: "required",
    value: function required() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var fieldName = arguments.length > 1 ? arguments[1] : undefined;
      // initialize validity
      var valid = null; // check if input has empty string

      if (Validation.empty(value._name) === true) {
        // if so set validity to false: input is empty
        valid = false; // set error message to errors class

        _Errors.default.set("".concat(fieldName, " is reqired"));
      } else {
        // otherwise input is valid: set validity to true
        valid = true;
      } // return valid


      return valid;
    }
    /**
     * check if field value is empty or not
     * @param {*} field 
     * returns @bool true/false
     */

  }, {
    key: "empty",
    value: function empty() {
      var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return field === null || field.trim().length === 0 ? true : false;
    }
    /**
     * checks if field has characters less or equal to 5:
     * a minimum required for any input field
     * @param {*} field 
     * returns @bool true/false
     */

  }, {
    key: "lessThan",
    value: function lessThan() {
      var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return field.length <= 5 ? true : false;
    }
  }]);

  return Validation;
}();

exports.default = Validation;
},{"./Errors":"src/utils/Errors.js"}],"src/utils/Actions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandleBtnClick = void 0;

var _Todo = _interopRequireDefault(require("../models/Todo"));

var _UI = _interopRequireDefault(require("../components/UI"));

var _Validation = _interopRequireDefault(require("./Validation"));

var _Errors = _interopRequireDefault(require("./Errors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * handle button click
 * display errors if any
 * collect form input, and delegate validation
 *  delegate todo persistence
 */
var HandleBtnClick = function HandleBtnClick() {
  // query button tag
  var btn = document.getElementById("btn"); // add event to button tag

  btn.addEventListener("click", function () {
    /** 
     * initialize variables 
     * **/
    // set rules
    var rules = [{
      title: 'required|min'
    }]; // get input element

    var _input = document.getElementById("new-todo"); // obtain input name


    var _name = _input.name; // obtain input value

    var newTodo = _input.value;
    /** Initialize errors object **/

    new _Errors.default(); // validate input, passing rules and input value.

    if (_Validation.default.validate(rules, [{
      _name: newTodo
    }]) === true) {
      /**
       * If Validation passes then...
       * initialize Todo object and save new Todo
       * clear input UI
       */
      var todo = new _Todo.default(newTodo);
      todo.save();

      _UI.default.showTodo(todo);

      _input.value = "";
    } else {
      /**
       * Otherwise render errors on UI
       */
      _UI.default.renderErrors(_Errors.default.get());
    }
  });
};

exports.HandleBtnClick = HandleBtnClick;
},{"../models/Todo":"src/models/Todo.js","../components/UI":"src/components/UI.js","./Validation":"src/utils/Validation.js","./Errors":"src/utils/Errors.js"}],"src/main.js":[function(require,module,exports) {
"use strict";

var _UI = _interopRequireDefault(require("./components/UI"));

var _Actions = require("./utils/Actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// display todos when DOM loads
window.document.addEventListener("DOMContentLoaded", function () {
  //display data
  _UI.default.showTodos();
}); // handle "add new todo" button click

(0, _Actions.HandleBtnClick)();
},{"./components/UI":"src/components/UI.js","./utils/Actions":"src/utils/Actions.js"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63528" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.js"], null)
//# sourceMappingURL=/main.1e43358e.map