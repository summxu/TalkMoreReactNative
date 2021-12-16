"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys (object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread (target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var api = require('./api');

var accounts = require('./resources/accounts');

var streams = require('./resources/streams');

var messages = require('./resources/messages');

var queues = require('./resources/queues');

var events = require('./resources/events');

var users = require('./resources/users');

var emojis = require('./resources/emojis');

var typing = require('./resources/typing');

var reactions = require('./resources/reactions');

var server = require('./resources/server');

var filters = require('./resources/filters');

var eventsWapper = require('./events_wrapper');

function getCallEndpoint (config) {
  return function callEndpoint (endpoint) {
    var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
    var params = arguments.length > 2 ? arguments[2] : undefined;

    var myConfig = _objectSpread({}, config);

    var finalendpoint = endpoint;

    if (!endpoint.startsWith('/')) {
      finalendpoint = "/".concat(endpoint);
    }

    var url = myConfig.apiURL + finalendpoint;
    return api(url, myConfig, method, params);
  };
}

function resources (config, reslut) {
  return {
    reslut: reslut,
    config: config,
    callEndpoint: getCallEndpoint(config),
    accounts: accounts(config),
    streams: streams(config),
    messages: messages(config),
    queues: queues(config),
    events: events(config),
    users: users(config),
    emojis: emojis(config),
    typing: typing(config),
    reactions: reactions(config),
    server: server(config),
    filters: filters(config),
    callOnEachEvent: eventsWapper(config)
  };
}

function zulip (_x) {
  return _zulip.apply(this, arguments);
}

function _zulip () {
  _zulip = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee (initialConfig) {
    var config, res;
    return _regenerator["default"].wrap(function _callee$ (_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!initialConfig.zuliprc) {
              _context.next = 6;
              break;
            }

          // node 下的环境变量
          // _context.t0 = resources;
          // _context.next = 4;
          // return (0, _zuliprc["default"])(initialConfig.zuliprc);

          case 4:
            _context.t1 = _context.sent;
            return _context.abrupt("return", (0, _context.t0)(_context.t1));

          case 6:
            config = initialConfig;

            if (config.realm.endsWith('/api')) {
              config.apiURL = "".concat(config.realm, "/v1");
            } else {
              config.apiURL = "".concat(config.realm, "/api/v1");
            }

            if (config.apiKey) {
              _context.next = 13;
              break;
            }

            _context.next = 11;
            return accounts(config).retrieve();

          case 11:
            res = _context.sent;
            config.apiKey = res.api_key;

          case 13:
            return _context.abrupt("return", resources(config, res));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _zulip.apply(this, arguments);
}

module.exports = zulip;