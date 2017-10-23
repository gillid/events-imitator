'use strict'

export default class Event {

    /**
     * Initialize object Event in Emitator lib
     * - setups storage
     * 
     * @param options
     */
    constructor(options) {
        this.storage = {}
    }

    /**
     * Clears storage
     */
    clear() {
        this.storage = {}
    }

    /**
     *
     * @param consequence: function
     * @param consequenceName: string
     */
    set(consequence, consequenceName) {
        if(consequenceName === false) {
            consequenceName = this.generateDefaultConsequenceName()
        }
        this.storage = Object.assign(this.storage, {[consequenceName]:consequence})
    }

    /**
     *
     * @param consequenceName: string
     */
    unset(consequenceName) {
        if(typeof consequenceName !== 'string') {
            throw 'Exception. Emitator => Event.unset(): Type of `consequenceName` should be `string`. `' + (typeof consequenceName) + '` given.'
        }
        if(this.checkExists(consequenceName, 'unset')) {
            delete this.storage[consequenceName]
        }
    }

    /**
     *
     * @param consequenceName: string
     */
    emit(consequenceName = false) {
        if(consequenceName === false) {
            this.emitAll()
        }
        else {
            this.emitExact(consequenceName)
        }
    }

    /**
     *
     */
    emitAll() {
        for(let k in this.storage) {
            if(this.storage.hasOwnProperty(k)) {
                this.storage[k]()
            }
        }
    }

    /**
     *
     * @param consequenceName: string
     */
    emitExact(consequenceName) {
        if(this.checkExists(consequenceName)) {
            this.storage[consequenceName]()
        }
    }

    /**
     *
     * @returns {string}
     */
    generateDefaultConsequenceName(){
        return 'DEFAULT_CONSEQUENCE_' + (parseInt(Object.keys(this.storage).length) + 1)
    }

    checkExists(consequenceName, f = 'emitExact') {
        if(typeof this.storage[consequenceName] === 'undefined') {
            console.warn('Warning. Emitator => Event. ' + f + '() consequence named `' + consequenceName + '` is not registered. Nothing will happen');
            return false
        }
        return true;
    }

}