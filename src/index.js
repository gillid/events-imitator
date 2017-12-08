'use strict'

import Event from './Event'

class Emitator {

    constructor() {
        this.register = {}
    }

    /**
     * Initialize Emitator lib
     * (in v.0.0.1 does nothing in fact)
     *
     * @param options: object
     */
    init(options = {}) {
        this.checkOptions(options)

        // assign input options
        this.options = Object.assign({
            // default options

        }, options)
    }

    /**
     *
     * @param eventName: string
     * @param consequence: function
     * @param consequenceName: string
     */
    set(eventName, consequence, consequenceName = false){
        this.checkEventName(eventName)
        this.checkConsequence(consequence)
        this.checkConsequenceName(consequenceName)

        if(!this.checkEventRegistered(eventName, '', false)) {
            this.register[eventName] = new Event()
        }

        this.register[eventName].set(consequence, consequenceName)
    }

    /**
     *
     * @param eventName: string
     * @returns {Event|void}
     */
    get(eventName) {
        this.checkEventName(eventName, 'get')
        if(this.checkEventRegistered(eventName)) {
            return this.register[eventName]
        }
    }

    /**
     *
     * @param eventName: string
     * @param consequenceName: string
     */
    emit(eventName, consequenceName = false) {
        this.checkEventName(eventName, 'emit')
        this.checkConsequenceName(consequenceName)

        if(!this.checkEventRegistered(eventName, false,  'emit')) {
            console.warn('Warning. Emitator.emit(): Event `' + eventName + '` is not registered. Nothing will happen');
        }
        else {
            this.register[eventName].emit(consequenceName)
        }
    }

    checkOptions(options) {
        if(typeof options !== 'object') {
            throw 'Exception. Emitator.init(): Type of `options` should be `object`. `' + (typeof options) + '` given.'
        }
    }

    checkEventName(eventName, f = 'set') {
        if(typeof eventName !== 'string') {
            throw 'Exception. Emitator.' + f + '(): Type of `eventName` should be `string`. `' + (typeof eventName) + '` given.'
        }
        if(eventName.length === 0) {
            throw 'Exception. Emitator.' + f + '(): Empty `eventName`'
        }
    }

    checkConsequence(consequence, f = 'set') {
        if(typeof consequence !== 'function') {
            throw 'Exception. Emitator.' + f + '(): Type of `consequence` should be `functions`. `' + (typeof consequence) + '` given.'
        }
    }

    checkConsequenceName(consequenceName, f = 'set') {
        if(consequenceName !== false) {
            if(typeof consequenceName !== 'string') {
                throw 'Exception. Emitator.' + f + '(): Type of `consequenceName` should be `string`. `' + (typeof consequenceName) + '` given.'
            }
        }
    }

    checkEventRegistered(eventName, exception = true, f = 'get') {
        if(typeof this.register[eventName] === 'undefined') {
            if(exception) {
                throw 'Exception. Emitator.' + f + '(): Event `' + eventName + '` is not registered.'
            }
            return false
        }
        return true
    }
}

export default new Emitator()