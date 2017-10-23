'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function () {

    /**
     * Initialize object Event in Emitator lib
     * - setups storage
     * 
     * @param options
     */
    function Event(options) {
        _classCallCheck(this, Event);

        this.storage = {};
    }

    /**
     * Clears storage
     */


    _createClass(Event, [{
        key: 'clear',
        value: function clear() {
            this.storage = {};
        }

        /**
         *
         * @param consequence: function
         * @param consequenceName: string
         */

    }, {
        key: 'set',
        value: function set(consequence, consequenceName) {
            if (consequenceName === false) {
                consequenceName = this.generateDefaultConsequenceName();
            }
            this.storage = Object.assign(this.storage, _defineProperty({}, consequenceName, consequence));
        }

        /**
         *
         * @param consequenceName: string
         */

    }, {
        key: 'unset',
        value: function unset(consequenceName) {
            if (typeof consequenceName !== 'string') {
                throw 'Exception. Emitator => Event.unset(): Type of `consequenceName` should be `string`. `' + (typeof consequenceName === 'undefined' ? 'undefined' : _typeof(consequenceName)) + '` given.';
            }
            if (this.checkExists(consequenceName, 'unset')) {
                delete this.storage[consequenceName];
            }
        }

        /**
         *
         * @param consequenceName: string
         */

    }, {
        key: 'emit',
        value: function emit() {
            var consequenceName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (consequenceName === false) {
                this.emitAll();
            } else {
                this.emitExact(consequenceName);
            }
        }

        /**
         *
         */

    }, {
        key: 'emitAll',
        value: function emitAll() {
            for (var k in this.storage) {
                if (this.storage.hasOwnProperty(k)) {
                    this.storage[k]();
                }
            }
        }

        /**
         *
         * @param consequenceName: string
         */

    }, {
        key: 'emitExact',
        value: function emitExact(consequenceName) {
            if (this.checkExists(consequenceName)) {
                this.storage[consequenceName]();
            }
        }

        /**
         *
         * @returns {string}
         */

    }, {
        key: 'generateDefaultConsequenceName',
        value: function generateDefaultConsequenceName() {
            return 'DEFAULT_CONSEQUENCE_' + (parseInt(Object.keys(this.storage).length) + 1);
        }
    }, {
        key: 'checkExists',
        value: function checkExists(consequenceName) {
            var f = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'emitExact';

            if (typeof this.storage[consequenceName] === 'undefined') {
                console.warn('Warning. Emitator => Event. ' + f + '() consequence named `' + consequenceName + '` is not registered. Nothing will happen');
                return false;
            }
            return true;
        }
    }]);

    return Event;
}();

exports.default = Event;