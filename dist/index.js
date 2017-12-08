'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Event = require('./Event');

var _Event2 = _interopRequireDefault(_Event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Emitator = function () {
    function Emitator() {
        _classCallCheck(this, Emitator);

        this.register = {};
    }

    /**
     * Initialize Emitator lib
     * (in v.0.0.1 does nothing in fact)
     *
     * @param options: object
     */


    _createClass(Emitator, [{
        key: 'init',
        value: function init() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.checkOptions(options);

            // assign input options
            this.options = Object.assign({
                // default options

            }, options);
        }

        /**
         *
         * @param eventName: string
         * @param consequence: function
         * @param consequenceName: string
         */

    }, {
        key: 'set',
        value: function set(eventName, consequence) {
            var consequenceName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            this.checkEventName(eventName);
            this.checkConsequence(consequence);
            this.checkConsequenceName(consequenceName);

            if (!this.checkEventRegistered(eventName, '', false)) {
                this.register[eventName] = new _Event2.default();
            }

            this.register[eventName].set(consequence, consequenceName);
        }

        /**
         *
         * @param eventName: string
         * @returns {Event|void}
         */

    }, {
        key: 'get',
        value: function get(eventName) {
            this.checkEventName(eventName, 'get');
            if (this.checkEventRegistered(eventName)) {
                return this.register[eventName];
            }
        }

        /**
         *
         * @param eventName: string
         * @param consequenceName: string
         */

    }, {
        key: 'emit',
        value: function emit(eventName) {
            var consequenceName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            this.checkEventName(eventName, 'emit');
            this.checkConsequenceName(consequenceName);

            if (!this.checkEventRegistered(eventName, false, 'emit')) {
                console.warn('Warning. Emitator.emit(): Event `' + eventName + '` is not registered. Nothing will happen');
            } else {
                this.register[eventName].emit(consequenceName);
            }
        }
    }, {
        key: 'checkOptions',
        value: function checkOptions(options) {
            if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
                throw 'Exception. Emitator.init(): Type of `options` should be `object`. `' + (typeof options === 'undefined' ? 'undefined' : _typeof(options)) + '` given.';
            }
        }
    }, {
        key: 'checkEventName',
        value: function checkEventName(eventName) {
            var f = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'set';

            if (typeof eventName !== 'string') {
                throw 'Exception. Emitator.' + f + '(): Type of `eventName` should be `string`. `' + (typeof eventName === 'undefined' ? 'undefined' : _typeof(eventName)) + '` given.';
            }
            if (eventName.length === 0) {
                throw 'Exception. Emitator.' + f + '(): Empty `eventName`';
            }
        }
    }, {
        key: 'checkConsequence',
        value: function checkConsequence(consequence) {
            var f = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'set';

            if (typeof consequence !== 'function') {
                throw 'Exception. Emitator.' + f + '(): Type of `consequence` should be `functions`. `' + (typeof consequence === 'undefined' ? 'undefined' : _typeof(consequence)) + '` given.';
            }
        }
    }, {
        key: 'checkConsequenceName',
        value: function checkConsequenceName(consequenceName) {
            var f = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'set';

            if (consequenceName !== false) {
                if (typeof consequenceName !== 'string') {
                    throw 'Exception. Emitator.' + f + '(): Type of `consequenceName` should be `string`. `' + (typeof consequenceName === 'undefined' ? 'undefined' : _typeof(consequenceName)) + '` given.';
                }
            }
        }
    }, {
        key: 'checkEventRegistered',
        value: function checkEventRegistered(eventName) {
            var exception = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var f = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'get';

            if (typeof this.register[eventName] === 'undefined') {
                if (exception) {
                    throw 'Exception. Emitator.' + f + '(): Event `' + eventName + '` is not registered.';
                }
                return false;
            }
            return true;
        }
    }]);

    return Emitator;
}();

exports.default = new Emitator();