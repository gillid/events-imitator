'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _Event = require('./Event');

var _Event2 = _interopRequireDefault(_Event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Emitator = {

    register: {},

    /**
     * Initialize Emitator lib
     * (in v.0.0.1 does nothing in fact)
     *
     * @param options: object
     */
    init: function init() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        this.checkOptions(options);

        // assign input options
        this.options = Object.assign({
            // default options

        }, options);

        // mark Emitator inited
        this.inited = true;
    },


    /**
     *
     * @param eventName: string
     * @param consequence: function
     * @param consequenceName: string
     */
    set: function set(eventName, consequence) {
        var consequenceName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        this.checkEventName(eventName);
        this.checkConsequence(consequence);
        this.checkConsequenceName(consequenceName);

        if (!this.checkEventRegistered(eventName, '', false)) {
            this.register[eventName] = new _Event2.default();
        }

        this.register[eventName].set(consequence, consequenceName);
    },


    /**
     *
     * @param eventName: string
     * @returns {Event|void}
     */
    get: function get(eventName) {
        this.checkEventName(eventName, 'get');
        if (this.checkEventRegistered(eventName)) {
            return this.register[eventName];
        }
    },


    /**
     *
     * @param eventName: string
     * @param consequenceName: string
     */
    emit: function emit(eventName) {
        var consequenceName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        this.checkEventName(eventName, 'emit');
        this.checkConsequenceName(consequenceName);

        if (!this.checkEventRegistered(eventName, false, 'emit')) {
            console.warn('Warning. Emitator.emit(): Event `' + eventName + '` is not registered. Nothing will happen');
        } else {
            this.register[eventName].emit(consequenceName);
        }
    },
    checkOptions: function checkOptions(options) {
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
            throw 'Exception. Emitator.init(): Type of `options` should be `object`. `' + (typeof options === 'undefined' ? 'undefined' : _typeof(options)) + '` given.';
        }
    },
    checkEventName: function checkEventName(eventName) {
        var f = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'set';

        if (typeof eventName !== 'string') {
            throw 'Exception. Emitator.' + f + '(): Type of `eventName` should be `string`. `' + (typeof eventName === 'undefined' ? 'undefined' : _typeof(eventName)) + '` given.';
        }
        if (eventName.length === 0) {
            throw 'Exception. Emitator.' + f + '(): Empty `eventName`';
        }
    },
    checkConsequence: function checkConsequence(consequence) {
        var f = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'set';

        if (typeof consequence !== 'function') {
            throw 'Exception. Emitator.' + f + '(): Type of `consequence` should be `functions`. `' + (typeof consequence === 'undefined' ? 'undefined' : _typeof(consequence)) + '` given.';
        }
    },
    checkConsequenceName: function checkConsequenceName(consequenceName) {
        var f = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'set';

        if (consequenceName !== false) {
            if (typeof consequenceName !== 'string') {
                throw 'Exception. Emitator.' + f + '(): Type of `consequenceName` should be `string`. `' + (typeof consequenceName === 'undefined' ? 'undefined' : _typeof(consequenceName)) + '` given.';
            }
        }
    },
    checkEventRegistered: function checkEventRegistered(eventName) {
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
};

exports.default = Emitator;