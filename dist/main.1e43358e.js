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
})({"src/models/abstract/data/Store.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var Store = function () {
  var db = JSON.parse(localStorage.getItem("_todos"));

  var getTodos = function getTodos() {
    if (anyData(db) == false) {
      dbInit();
    }

    return db;
  };

  var saveData = function saveData(data) {
    localStorage.setItem("_todos", JSON.stringify(data));
  };

  var dbInit = function dbInit() {
    var _id = Math.floor(Math.random() * 100);

    var data = [{
      id: _id,
      title: "You're up & running!",
      completed: false
    }];
    saveData(data);
  };

  var anyData = function anyData(data) {
    return data == null || data == undefined ? false : true;
  };

  return {
    todos: getTodos,
    save: saveData
  };
}();

var _default = Store;
exports.default = _default;
},{}],"src/lib/Utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortData = exports.mergeObjs = exports.isLessThan = exports.isEmpty = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * check if field value is empty or not
 * @param {*} field 
 * returns @bool true/false
 */
var isEmpty = function isEmpty() {
  var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (typeof field !== 'string') {
    return true;
  }

  return field == null || field.trim().length == 0 || field == '' ? true : false;
};
/**
 * checks if field has characters less or equal to 5:
 * a minimum required for any input field
 * @param {*} field 
 * returns @bool true/false
 */


exports.isEmpty = isEmpty;

var isLessThan = function isLessThan(field) {
  return field.length < 6 ? true : false;
};

exports.isLessThan = isLessThan;

var mergeObjs = function mergeObjs(objArr, newObj) {
  var newArr = objArr.filter(function (obj) {
    return obj.id !== newObj.id;
  });
  return [].concat(_toConsumableArray(newArr), [newObj]);
};

exports.mergeObjs = mergeObjs;

var sortData = function sortData(data) {
  return data.sort(function (a, b) {
    return a.title.localeCompare(b.title);
  });
};

exports.sortData = sortData;
},{}],"src/models/abstract/Model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Store = _interopRequireDefault(require("./data/Store"));

var _Utils = require("../../lib/Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Handles all CRUD tasks
 * Abstracts methods for child models 
 * thru inheritance (all models inherit from Model class)
 */
var Model =
/*#__PURE__*/
function () {
  function Model(title) {
    _classCallCheck(this, Model);

    this.title = title;
    this.todos = _Store.default.todos();
  } // returns all todos


  _createClass(Model, [{
    key: "all",
    value: function all() {
      return this.todos;
    }
  }, {
    key: "get",
    value: function get(id) {
      return this.todos.filter(function (item) {
        return item.id == id;
      });
    }
    /**
     * invokes storeState method which engages 
     * persistence storage when saving NEW todo
     */

  }, {
    key: "save",
    value: function save() {
      this.storeState();
    }
  }, {
    key: "update",
    value: function update(data) {
      _Store.default.save(data);
    }
  }, {
    key: "storeState",
    value: function storeState() {
      this.todos.push({
        id: Math.floor(Math.random() * 100),
        title: this.title,
        completed: false
      });

      _Store.default.save(this.todos);
    }
  }, {
    key: "editTitle",
    value: function editTitle(id, newTitleText) {
      var todo = this.todos.filter(function (item) {
        return item.id == id;
      });
      todo[0].title = newTitleText;
      this.updateStore(todo);
    }
  }, {
    key: "updateStore",
    value: function updateStore(_todo) {
      // update - merge data and save it to store
      var newStore = (0, _Utils.mergeObjs)(this.todos, _todo[0]);

      _Store.default.save(newStore);
    }
  }, {
    key: "toggleCompleted",
    value: function toggleCompleted(id) {
      var todo = this.todos.filter(function (item) {
        return item.id == id;
      });
      todo[0].completed = !todo[0].completed;
      this.updateStore(todo);
    }
  }, {
    key: "delete",
    value: function _delete(_id) {
      var remainingTodos = this.todos.filter(function (todo) {
        return todo.id != _id;
      });

      _Store.default.save(remainingTodos);
    }
  }]);

  return Model;
}();

exports.default = Model;
},{"./data/Store":"src/models/abstract/data/Store.js","../../lib/Utils":"src/lib/Utils.js"}],"src/models/Todo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Model2 = _interopRequireDefault(require("./abstract/Model"));

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
}(_Model2.default);

exports.default = Todo;
},{"./abstract/Model":"src/models/abstract/Model.js"}],"src/components/UIBase.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UIBase =
/*#__PURE__*/
function () {
  function UIBase() {
    _classCallCheck(this, UIBase);

    // checkall flag
    UIBase.checkAllFlag = true;
  }

  _createClass(UIBase, null, [{
    key: "sortData",
    value: function sortData(data) {
      return data.sort(function (a, b) {
        return a.title.localeCompare(b.title);
      });
    }
  }, {
    key: "resetCheckAll",
    value: function resetCheckAll(element, flag) {
      if (flag === true) {
        element.setAttribute('checked', true);
      } else {
        element.removeAttribute('checked');
      }
    }
  }, {
    key: "resetFlag",
    value: function resetFlag(todo) {
      if (todo.completed === false) {
        UIBase.checkAllFlag = false;
      }
    }
  }, {
    key: "setAttrs",
    value: function setAttrs(obj, status, checked) {
      if (typeof checked === 'boolean') {
        UIBase.unsetCheckbox(obj, status);
        UIBase.setTableRowAttrs(obj, status);
      } else {
        UIBase.setCheckbox(obj, status, checked);
        UIBase.setTableRowAttrs(obj, status);
      }
    }
  }, {
    key: "setTableRowAttrs",
    value: function setTableRowAttrs(obj, status) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          obj[prop].setAttribute('class', status);
        }
      }
    }
  }, {
    key: "setCheckbox",
    value: function setCheckbox(obj, status, checked) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          obj[prop].setAttribute('checked', checked);
        }
      }
    }
  }, {
    key: "unsetCheckbox",
    value: function unsetCheckbox(obj, status, checked) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          obj[prop].removeAttribute('checked');
        }
      }
    }
  }]);

  return UIBase;
}();

exports.default = UIBase;
},{}],"src/components/UI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Todo = _interopRequireDefault(require("../models/Todo"));

var _Utils = require("../lib/Utils");

var _UIBase2 = _interopRequireDefault(require("./UIBase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Class responsible for creating dynamic DOM elements:
 * todo list, alerts etc
 * ref: https://davidwalsh.name/documentfragment
 */
var UI =
/*#__PURE__*/
function (_UIBase) {
  _inherits(UI, _UIBase);

  function UI(todos) {
    var _this;

    _classCallCheck(this, UI);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UI).call(this)); // init todos

    UI.todo = new _Todo.default();
    UI.todos = UI.todo.all().sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });

    if (UI.todos.length == 0) {
      // checkall flag
      _UIBase2.default.checkAllFlag = false;
    } // get div with id 'app' from index.html


    UI.appHook = document.getElementById("app");
    UI.table = document.createElement("table");
    UI.table.setAttribute("id", "list-items");
    UI.iniFooter();
    return _this;
  }

  _createClass(UI, null, [{
    key: "showTodos",
    value: function showTodos() {
      UI.appHook.innerHTML = '';

      if (!UI.todos) {
        /**
         * If no todos then show theres no todos:
         */
        // set notification variable
        var preText = '<span>You have no todos yet :)</span>'; // 1. create notification element - p tag
        // 2. set its attributes
        // 3. append to the parent element
        // 4. terminate script

        var p = document.createElement("p");
        p.setAttribute('id', 'pretext');
        p.innerHTML = preText;
        UI.appHook.appendChild(p);
        return;
      } // iterate through each todo and 
      //delegate DOM manipulation to showTodo()


      UI.todos.map(function (todo) {
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
      // reset flag 
      UI.resetFlag(todo); // update footer & its variables

      UI.iniFooter(); // create html elems (tr, td, input, span, button)

      var tr = document.createElement("tr");
      var td = document.createElement("td");
      var td1 = document.createElement("td");
      var td2 = document.createElement("td");
      var input = document.createElement("input");
      var span = document.createElement("span");
      var btn = document.createElement("button");

      if (todo.completed == true) {
        // check checkbox input if todo is completed
        input.setAttribute('checked', 'checked'); // apply a 'true' class

        tr.setAttribute('class', todo.completed);
      }

      input.setAttribute('type', 'checkbox');
      input.setAttribute('class', 'checkbox');
      input.setAttribute('value', todo.id);
      span.setAttribute('class', 'todo-title');
      span.setAttribute('id', todo.id);
      span.innerHTML = todo.title;
      btn.setAttribute('id', todo.id);
      btn.setAttribute('class', 'delete');
      btn.innerHTML = "X"; //append children to tds

      td.prepend(input);
      td1.appendChild(span);
      td2.appendChild(btn); // append tds to tr

      tr.appendChild(td);
      tr.appendChild(td1);
      tr.appendChild(td2); // append tr to table

      UI.table.appendChild(tr); // finally append table to main parent

      UI.appHook.appendChild(UI.table);
    }
  }, {
    key: "toggleTodo",
    value: function toggleTodo(el) {
      // select only element(s) with 'checkbos' class attrs
      if (el.classList.contains('checkbox')) {
        // update completed property
        UI.todo.toggleCompleted(el.value); // update the UI

        el.parentElement.parentElement.classList.toggle("true"); // if one of todos is unchecked 

        if (el.checked == false) {
          // then uncheck 'check all' checkbox
          var tickAll = document.querySelector('#tick-untick-all');
          tickAll.checked = false;
        }
      }
    }
  }, {
    key: "editTodo",
    value: function editTodo(el) {
      // if parent element has class of one of the 
      // elements we're looking for in its class list
      if (el.classList.contains('todo-title')) {
        // prompt user to supply new title text
        var newTitleText = prompt("Enter new todo title", el.innerHTML); // ensure input is not empty

        if ((0, _Utils.isEmpty)(newTitleText) == true) {
          // terminate script if input is empty
          return;
        } // otherwise update db 
        // then also update UI


        UI.todo.editTitle(el.id, newTitleText);
        el.innerHTML = newTitleText;
      }
    }
  }, {
    key: "removeTodo",
    value: function removeTodo(el) {
      // if parent element has class of one of the 
      // elements we're looking for in its class list
      if (el.classList.contains('delete')) {
        // attempt to delete todo from DB
        UI.todo.delete(el.id); // update copy of in-memory todos to ensure we retain
        // consistency by removing the deleted todo from array
        // or returning all todos except for the just-deleted todo
        // then save rest back in todos array

        UI.todos = UI.todos.filter(function (todo) {
          return todo.id != el.id;
        }); // update the UI also

        el.parentElement.parentElement.remove(); // ensure the stats on footer reflect this change

        UI.iniFooter();
      }
    }
  }, {
    key: "checkAll",
    value: function checkAll(element, status) {
      var tableRows = document.querySelector('#list-items').childNodes;
      var checkBoxes = document.querySelectorAll('.checkbox');
      var checked = status == true ? 'checked' : false; // UI.setTableRowAttrs(tableRows, status);
      // UI.setCheckboxAttrs(checkBoxes, status, checked);

      UI.setAttrs(tableRows, status, checked);
      UI.setAttrs(checkBoxes, status, checked);
      UI.todos.map(function (todo) {
        return todo.completed = status;
      });
      UI.todo.update(UI.todos); // element.toggle();

      element.classList.toggle('true');
    }
  }, {
    key: "iniFooter",
    value: function iniFooter() {
      // initialize variables
      var checkAllElem = document.querySelector('#tick-untick-all');
      var itemCount = document.querySelector('#item-count');
      var instruction = document.querySelector('#instruction');
      var instructionNote = '* double-click title to edit';
      var todoCount = UI.todos.length; // set values if there are todos (item count & instruction note)

      itemCount.childNodes[1].childNodes[0].innerHTML = UI.todos.length;

      if (todoCount > 0) {
        instruction.childNodes[1].innerHTML = instructionNote;
      }

      UI.resetCheckAll(checkAllElem, UI.checkAllFlag);
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
        return console.log('error array empty');
      } // hook to alerts section in index.html


      var alerts = document.getElementById('display-alerts'); // create a ul tag

      var ul = document.createElement("ul"); // loop thru errors

      errorArray.forEach(function (error) {
        // create li element each time
        var li = document.createElement("li"); // add error text to li element

        li.innerHTML = error; // append it immediately to the ul tag

        ul.appendChild(li);
      }); // append the ul tag to allerts div

      alerts.appendChild(ul); // clear msgs after 5 secs

      setTimeout(function () {
        alerts.remove();
      }, 5000);
    }
  }]);

  return UI;
}(_UIBase2.default);

exports.default = UI;
},{"../models/Todo":"src/models/Todo.js","../lib/Utils":"src/lib/Utils.js","./UIBase":"src/components/UIBase.js"}],"src/lib/Errors.js":[function(require,module,exports) {
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
},{}],"src/lib/Validation.js":[function(require,module,exports) {
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
},{"./Errors":"src/lib/Errors.js"}],"src/controllers/Actions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkAll = exports.removeTodo = exports.editTodo = exports.toggleCompleted = exports.todoSubmit = void 0;

var _Todo = _interopRequireDefault(require("../models/Todo"));

var _UI = _interopRequireDefault(require("../components/UI"));

var _Validation = _interopRequireDefault(require("../lib/Validation"));

var _Errors = _interopRequireDefault(require("../lib/Errors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * handle button click
 * display errors if any
 * collect form input, and delegate validation
 *  delegate todo persistence
 */
var todoSubmit = function todoSubmit() {
  // query button tag
  // const btn = document.getElementById("btn");
  var _input = document.getElementById("new-todo"); // add event to button tag


  _input.addEventListener("change", function (e) {
    /** 
     * initialize variables 
     * **/
    // set rules
    var rules = [{
      title: 'required|min'
    }]; // get input element
    // const _input = document.getElementById("new-todo");
    // obtain input name

    var _name = _input.name; // obtain input value

    var newTodo = _input.value;
    /** Initialize errors object **/

    new _Errors.default(); // validate input, passing rules and input value.

    if (_Validation.default.validate(rules, [{
      _name: newTodo
    }]) === true) {
      var p = document.querySelector('#pretext');
      /**
       * If Validation passes then...
       * initialize Todo object and save new Todo
       * clear input UI
       */

      var todo = new _Todo.default(newTodo);
      todo.save();
      p ? p.remove() : null;

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

exports.todoSubmit = todoSubmit;

var toggleCompleted = function toggleCompleted() {
  var todoList = document.querySelector('#list-items');

  if (todoList) {
    // add event to it plus its children (propgation)
    todoList.addEventListener('click', function (e) {
      /**
       * delegate action to UI toggle action -
       * passing the clicked element
       */
      _UI.default.toggleTodo(e.target);
    }, false);
  }
};

exports.toggleCompleted = toggleCompleted;

var editTodo = function editTodo() {
  var todoList = document.querySelector('#list-items');

  if (todoList) {
    todoList.addEventListener('dblclick', function (e) {
      /**
       * delegate action to UI edit action -
       * passing the clicked element
       */
      _UI.default.editTodo(e.target);
    }, false);
  }
};

exports.editTodo = editTodo;

var removeTodo = function removeTodo() {
  // selectlist item wrapper
  var todoList = document.querySelector('#list-items');

  if (todoList) {
    todoList.addEventListener('click', function (e) {
      _UI.default.removeTodo(e.target);
    }, false);
  }
};

exports.removeTodo = removeTodo;

var checkAll = function checkAll() {
  var tickAll = document.querySelector('#tick-untick-all');
  tickAll.addEventListener('click', function (e) {
    _UI.default.checkAll(tickAll, e.target.checked);
  });
};

exports.checkAll = checkAll;
},{"../models/Todo":"src/models/Todo.js","../components/UI":"src/components/UI.js","../lib/Validation":"src/lib/Validation.js","../lib/Errors":"src/lib/Errors.js"}],"src/main.js":[function(require,module,exports) {
"use strict";

var _UI = _interopRequireDefault(require("./components/UI"));

var _Actions = require("./controllers/Actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// display todos when DOM loads
window.document.addEventListener("DOMContentLoaded", function () {
  // initialize UI
  new _UI.default(); //display data

  _UI.default.showTodos(); // handle events


  (0, _Actions.todoSubmit)();
  (0, _Actions.toggleCompleted)();
  (0, _Actions.editTodo)();
  (0, _Actions.removeTodo)();
  (0, _Actions.checkAll)();
});
},{"./components/UI":"src/components/UI.js","./controllers/Actions":"src/controllers/Actions.js"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49558" + '/');

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