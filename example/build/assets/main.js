webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	eval("/* WEBPACK VAR INJECTION */(function(global) {'use strict';\n\nvar _Session = __webpack_require__(95);\n\nvar _Session2 = _interopRequireDefault(_Session);\n\nvar _controllers = __webpack_require__(96);\n\nvar _controllers2 = _interopRequireDefault(_controllers);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nglobal.session = new _Session2.default({\n  mountPoint: global.document.getElementById('mount-point'),\n  controllers: _controllers2.default\n});\n/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/main.js\n// module id = 0\n// module chunks = 2\n//# sourceURL=webpack:///./src/main.js?");

/***/ },

/***/ 95:
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _sessionController = __webpack_require__(59);\n\nvar _sessionController2 = _interopRequireDefault(_sessionController);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar SessionController = function (_Session) {\n  _inherits(SessionController, _Session);\n\n  function SessionController(props) {\n    _classCallCheck(this, SessionController);\n\n    var _this = _possibleConstructorReturn(this, (SessionController.__proto__ || Object.getPrototypeOf(SessionController)).call(this, props));\n\n    _this.setCurrentController('example');\n    return _this;\n  }\n\n  return SessionController;\n}(_sessionController2.default);\n\nexports.default = SessionController;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/controllers/Session/index.js\n// module id = 95\n// module chunks = 2\n//# sourceURL=webpack:///./src/controllers/Session/index.js?");

/***/ },

/***/ 96:
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = {\n  example: function example(cb) {\n    __webpack_require__.e/* nsure */(1, function (require) {\n      var Controller = __webpack_require__(60).default;\n      cb(Controller);\n    });\n  }\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/controllers/index.js\n// module id = 96\n// module chunks = 2\n//# sourceURL=webpack:///./src/controllers/index.js?");

/***/ }

});