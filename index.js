"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
If Window DOES NOT exist (Server side) return false
If Window exists (Client side) return result of IntersectionObserver check
*/
var intersectionObserverSupport = typeof window !== "undefined" ? "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype : false;

var ViewportObserver = /*#__PURE__*/function (_Component) {
  _inherits(ViewportObserver, _Component);

  var _super = _createSuper(ViewportObserver);

  function ViewportObserver(props) {
    var _this;

    _classCallCheck(this, ViewportObserver);

    _this = _super.call(this, props);
    _this.state = {
      hasIntersected: false
    };
    _this.isIntersecting = _this.isIntersecting.bind(_assertThisInitialized(_this));
    _this.addObserver = _this.addObserver.bind(_assertThisInitialized(_this));
    _this.observer = null;
    return _this;
  }

  _createClass(ViewportObserver, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        /* If Intersection Observer NOT supported - set state hasIntersected straight away */
        hasIntersected: !intersectionObserverSupport
      });
      this.addObserver();
    }
  }, {
    key: "isIntersecting",
    value: function isIntersecting(entries) {
      var _this2 = this;

      entries.forEach(function (entry) {
        _this2.setState({
          hasIntersected: entry.isIntersecting
        });

        if (entry.isIntersecting) {
          _this2.removeObserver();
        }
      });
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps() {
      this.addObserver(); //reset
    }
  }, {
    key: "addObserver",
    value: function addObserver() {
      if (!this.observer && intersectionObserverSupport) {
        this.observer = new IntersectionObserver(this.isIntersecting, {
          rootMargin: this.props.rootMargin,
          threshold: this.props.threshold
        });
        this.observer.observe(this.node);
      }
    }
  }, {
    key: "removeObserver",
    value: function removeObserver() {
      if (this.observer) {
        this.observer.unobserve(this.node);
        this.observer = null;
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.removeObserver();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          height: "100%",
          width: "100%"
        },
        ref: function ref(node) {
          return _this3.node = node;
        }
      }, this.props.children(this.state.hasIntersected));
    }
  }]);

  return ViewportObserver;
}(_react.Component);

_defineProperty(ViewportObserver, "defaultProps", {
  rootMargin: "0px 0px 0px 0px",
  threshold: 0
});

var _default = ViewportObserver;
exports["default"] = _default;
